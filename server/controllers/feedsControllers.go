package controllers

import (
	"context"
	"server/database"
	"server/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetFeeds(c *fiber.Ctx) error {
	var stories []models.Story

	cur, queryError := database.Stories.Find(context.TODO(), bson.M{})

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

func GetFeedByID(c *fiber.Ctx) error {
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
