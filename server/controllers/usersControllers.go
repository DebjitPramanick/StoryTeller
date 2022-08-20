package controllers

import (
	"context"
	"fmt"
	"log"
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

func GetUser(c *fiber.Ctx) error {
	return c.SendString("User found.")
}

func RegisterUser(c *fiber.Ctx) error {
	
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		log.Fatal(err)
		return err
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
		log.Fatal(err)
		return err
	}

	fmt.Println("Created user with email & ID: ", user.Email, result.InsertedID)
	return c.JSON(user)
}

func LoginUser(c *fiber.Ctx) error {
	
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		log.Fatal(err)
		return err
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
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Password is not correct.",
		})
	}

	claim := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: user.ID.Hex(),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}) 

	token, tokenError := claim.SignedString([]byte("Secret key"))

	if tokenError != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login.",
		})
	}

	return c.JSON(fiber.Map{
		"user": user,
		"token": token,
	})
}