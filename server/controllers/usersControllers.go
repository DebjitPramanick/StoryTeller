package controllers

import (
	"context"
	"fmt"
	"log"
	"server/database"
	"server/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	return c.JSON(data)
}