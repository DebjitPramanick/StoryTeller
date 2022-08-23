package controllers

import (
	"context"
	"fmt"
	"server/database"
	"server/helpers"
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

	token, tokenError := claim.SignedString([]byte("Secret key"))

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
	userID, _ := primitive.ObjectIDFromHex(c.Params("id"));
	var user models.User

	queryError := database.Users.FindOne(context.TODO(), bson.M{"_id": userID}).Decode(&user)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	data := fiber.Map{
		"_id": user.ID,
		"name": user.Name,
		"bio": user.Bio,
		"avatar": user.Avatar,
	}

	return c.JSON(data)
}