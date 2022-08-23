package controllers

import (
	"context"
	"fmt"
	"server/database"
	"server/models"

	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateStory(c *fiber.Ctx) error {
	var data = new(models.Story)

	err := c.BodyParser(&data)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	authorID, _ := primitive.ObjectIDFromHex(c.Params("authorId"));
	var author models.User

	queryError := database.Users.FindOne(context.TODO(), bson.M{"_id": authorID}).Decode(&author)

	if queryError == mongo.ErrNoDocuments {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Author not found",
		})
	}

	story := models.Story{
		ID: primitive.NewObjectID(),
		Author: author,
		Title: data.Title,
		Content: data.Content,
		Cover: data.Cover,
		Tags: data.Tags,
		Likes: data.Likes,
		CreatedAt: time.Now(),
	}

	result, err := database.Stories.InsertOne(context.TODO(), story)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Something went wrong when creating story. Please try again later.",
		})
	}

	fmt.Println("Created story with ID: ", result.InsertedID)
	return c.JSON(story)
}

func GetAuthorStories(c *fiber.Ctx) error {
	var stories []models.Story

	authorID, _ := primitive.ObjectIDFromHex(c.Params("authorId"));
	cur, queryError := database.Stories.Find(context.TODO(), bson.M{"author._id": authorID})

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
	storyID, _ := primitive.ObjectIDFromHex(c.Params("storyId"))
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

func DeleteStory(c *fiber.Ctx) error {
	storyID, _ := primitive.ObjectIDFromHex(c.Params("storyId"));

	_, queryError := database.Stories.DeleteOne(context.Background(), bson.M{"_id": storyID})

	if queryError == mongo.ErrNoDocuments {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Story not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Deleted story successfully.",
	})
}

func DeleteAllUserStories(c *fiber.Ctx) error {
	userID, _ := primitive.ObjectIDFromHex(c.Params("userId"));

	_, queryError := database.Stories.DeleteMany(context.Background(), bson.M{"author._id": userID})

	if queryError == mongo.ErrNoDocuments {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Story not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Deleted stories successfully.",
	})
}

func UpdateStory(c *fiber.Ctx) error {
	storyID, _ := primitive.ObjectIDFromHex(c.Params("storyId"));
	update := bson.M{"$set": bson.M{}}

	_, queryError := database.Stories.UpdateOne(context.Background(), bson.M{"_id": storyID}, update)

	if queryError == mongo.ErrNoDocuments {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Story not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Updated story successfully.",
	})
}
