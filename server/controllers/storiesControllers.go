package controllers

import (
	"context"
	"fmt"
	// "fmt"
	"server/database"
	"server/models"

	// "time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateStory(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	// story := models.Story{
	// 	ID: primitive.NewObjectID(),
	// 	Title: data["title"],
	// 	Content: data["content"],
	// 	Cover: data["cover"],
	// 	Tags: data["tags"],
	// 	Likes: data["likes"],
	// 	CreatedAt: time.Now(),
	// }

	// result, err := database.Stories.InsertOne(context.TODO(), story)

	// if err != nil {
	// 	log.Fatal(err)
	// 	return err
	// }

	// fmt.Println("Created story with ID: ", result.InsertedID)
	return c.JSON(data)
}

func GetStories(c *fiber.Ctx) error {
	var stories []models.Story

	cur, queryError := database.Stories.Find(context.TODO(), bson.D{{}})

	if queryError == mongo.ErrNoDocuments {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Stories not found.",
		})
	}

	for cur.Next(context.TODO()) {
		var story models.Story
		err := cur.Decode(&story)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		stories = append(stories, story)
	}

	if err := cur.Err(); err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	defer cur.Close(context.TODO())

	return c.JSON(stories)
}

func GetStoryByID(c *fiber.Ctx) error {
	storyID, _ := primitive.ObjectIDFromHex(c.Params("id"))
	var story models.Story

	queryError := database.Stories.FindOne(context.TODO(), bson.M{"_id": storyID}).Decode(&story)

	if queryError == mongo.ErrNoDocuments {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Story not found",
		})
	}

	return c.JSON(story)
}
