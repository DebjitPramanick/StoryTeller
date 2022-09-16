package controllers

import (
	"context"
	"fmt"
	"server/database"
	"server/helpers"
	"server/middleware"
	"server/models"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *fiber.Ctx) error {
	
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	pass, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		ID: primitive.NewObjectID(),
		Name: data["name"],
		Bio: data["bio"],
		Email: data["email"],
		Password: pass,
		Username: data["username"],
		Avatar: data["avatar"],
		CreatedAt: time.Now(),
		Country: data["country"],
		Dob: data["dob"],
		Gender: data["gender"],
	}

	result, err := database.Users.InsertOne(context.TODO(), user)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error occurred when creating user. Please try again later.",
		})
	}

	fmt.Println("Created user with email & ID: ", user.Email, result.InsertedID)
	return c.JSON(user)
}

func LoginUser(c *fiber.Ctx) error {
	
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	var user models.User
	var query bson.M

	if helpers.IsKeyPresent(data, "email")  {
		query = bson.M{"email": data["email"]}
	} else {
		query = bson.M{"username": data["username"]}
	}
	queryError := database.Users.FindOne(context.TODO(), query).Decode(&user)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password is not correct.",
		})
	}

	claim := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: user.ID.Hex(),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}) 

	token, tokenError := claim.SignedString([]byte(middleware.JWTSECRET))

	if tokenError != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Could not login.",
		})
	}

	return c.JSON(fiber.Map{
		"user": user,
		"token": token,
	})
}

func GetUserByID(c *fiber.Ctx) error {
	userID, _ := primitive.ObjectIDFromHex(c.Params("userId"));
	var user models.User

	queryError := database.Users.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&user)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	return c.JSON(user)
}

func RemoveUserByID(c *fiber.Ctx) error {
	userID, _ := primitive.ObjectIDFromHex(c.Params("userId"));

	_, queryError := database.Users.DeleteOne(context.Background(), bson.M{"_id": userID})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	res, _ := database.Stories.DeleteMany(context.Background(), bson.M{"author._id": userID})
	fmt.Println(res)

	return c.JSON(fiber.Map{
		"message": "Removed user successfully.",
	})
}

func UpdateUserByID(c *fiber.Ctx) error {
	userID, _ := primitive.ObjectIDFromHex(c.Params("userId"));

	var data map[string]any

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	filter := bson.M{"_id": userID}
	update := bson.M{"$set": bson.M{
		"name": data["name"],
		"bio": data["bio"],
		"email": data["email"],
		"avatar": data["avatar"],
		"country": data["country"],
		"dob": data["dob"],
		"gender": data["gender"],
	}}

	_, queryError := database.Users.UpdateOne(context.Background(), filter, update)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	var user models.User

	e := database.Users.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&user)

	if e == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	storyFilter := bson.M{"author._id": userID}
	soryUpdate := bson.M{"$set": bson.M{
		"author": user,
	}}

	r, _ := database.Stories.UpdateMany(context.Background(), storyFilter, soryUpdate)
	fmt.Println("Updated: ", r.ModifiedCount)

	return c.JSON(fiber.Map{
		"message": "Updated user successfully.",
	})
}

func GetUsersByNameQuery(c *fiber.Ctx) error {

	var users []models.User
	var followers = make(map[primitive.ObjectID][]primitive.ObjectID)

	query := c.Params("query");

	filter := bson.M{
		"$or": bson.A{
			bson.M{"username": primitive.Regex{Pattern: query, Options: "i"}},
			bson.M{"name": primitive.Regex{Pattern: query, Options: "i"}},
		},
	}

	cur, _ := database.Users.Find(context.TODO(), filter)

	for cur.Next(context.TODO()) {
		var user models.User
		err := cur.Decode(&user)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		users = append(users, user)
		followers[user.ID] = GetFollowersHelper(user.ID)
	}

	if err := cur.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	defer cur.Close(context.TODO())

	result := fiber.Map{
		"users":   users,
		"followers": followers,
	}

	return c.JSON(result)
}

func CheckUsername(c *fiber.Ctx) error {

	var user models.User

	username := c.Params("username");

	queryError := database.Users.FindOne(context.TODO(), bson.M{"username": username}).Decode(&user)

	if queryError == mongo.ErrNoDocuments {
		return c.JSON(fiber.Map{
			"message": "Username is available.",
			"status": 0,
		})
	}

	return c.JSON(fiber.Map{
		"message": "Username is already taken.",
		"status": 1,
	})
}

func FollowUser(c *fiber.Ctx) error {

	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	follower, _ := primitive.ObjectIDFromHex(data["follower"])
	following, _ := primitive.ObjectIDFromHex(data["following"])

	fmt.Println("FLW Data", data, follower, following)

	if follower == following {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "User cannot follow himself/herself.",
		})
	}

	fmt.Println("FLW Data", data, follower, following)

	followData := models.Followers{
		ID:      primitive.NewObjectID(),
		Following:  following,
		Follower: follower,
	}

	_, insertErr := database.Followers.InsertOne(context.TODO(), followData)

	if insertErr != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Followed user successfully.",
	})
}

func UnfollowUser(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	follower, _ := primitive.ObjectIDFromHex(data["follower"])
	following, _ := primitive.ObjectIDFromHex(data["following"])

	if follower == following {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "User cannot unfollow himself/herself.",
		})
	}

	_, insertErr := database.Followers.DeleteOne(context.Background(), bson.M{"follower": follower, "following": following})

	if insertErr != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Unfollowed user successfully.",
	})
}

func GetFollowersHelper(userId primitive.ObjectID) []primitive.ObjectID {
	var results = []primitive.ObjectID{}

	cur, queryError := database.Followers.Find(context.TODO(), bson.M{"following": userId})
	
	fmt.Println(queryError, userId)

	if queryError == mongo.ErrNoDocuments {
		return results
	}

	for cur.Next(context.TODO()) {
		var data models.Followers
		err := cur.Decode(&data)
		if err != nil {
			return results
		}
		fmt.Println(data)
		results = append(results, data.Follower)
	}

	if err := cur.Err(); err != nil {
		return results
	}

	return results
}
