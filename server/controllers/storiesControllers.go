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
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateStory(c *fiber.Ctx) error {
	var data = new(models.Story)

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		});
	}

	authorID, _ := primitive.ObjectIDFromHex(c.Params("authorId"));
	var author models.User

	queryError := database.Users.FindOne(context.TODO(), bson.M{"_id": authorID}).Decode(&author)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Author not found",
		});
	}

	story := models.Story{
		ID: primitive.NewObjectID(),
		Author: author,
		Title: data.Title,
		Content: data.Content,
		Cover: data.Cover,
		Tags: data.Tags,
		CreatedAt: time.Now(),
	}

	result, err := database.Stories.InsertOne(context.TODO(), story)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong when creating story. Please try again later.",
		});
	}

	fmt.Println("Created story with ID: ", result.InsertedID)
	return c.JSON(story)
}

func GetAuthorStories(c *fiber.Ctx) error {
	var stories []models.Story
	savedBy := make(map[primitive.ObjectID] []primitive.ObjectID)
	likedBy := make(map[primitive.ObjectID] []primitive.ObjectID)

	opts := options.Find().SetSort(bson.D{{"created_at", -1}})

	authorID, _ := primitive.ObjectIDFromHex(c.Params("authorId"));
	cur, queryError := database.Stories.Find(context.TODO(), bson.M{"author._id": authorID}, opts)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Stories not found.",
		})
	}

	for cur.Next(context.TODO()) {
		var story models.Story
		err := cur.Decode(&story)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		savedBy[story.ID] = GetFeedSaves(story.ID)
		likedBy[story.ID] = GetFeedLikes(story.ID)
		stories = append(stories, story)
	}

	if err := cur.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	defer cur.Close(context.TODO())

	result := fiber.Map{
		"stories": stories,
		"savedBy": savedBy,
		"likedBy": likedBy,
	}

	return c.JSON(result)
}

func SearchStories(c *fiber.Ctx) error {
	var stories []models.Story

	query := c.Params("query");

	filter := bson.M{
		"$or": bson.A{
			bson.M{"title": primitive.Regex{Pattern: query, Options: "i"}},
		},
	}

	cur, _ := database.Stories.Find(context.TODO(), filter)

	for cur.Next(context.TODO()) {
		var story models.Story
		err := cur.Decode(&story)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		stories = append(stories, story)
	}

	if err := cur.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
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
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Story not found",
		})
	}

	return c.JSON(story)
}

func DeleteStory(c *fiber.Ctx) error {
	storyID, _ := primitive.ObjectIDFromHex(c.Params("storyId"));

	_, queryError := database.Stories.DeleteOne(context.Background(), bson.M{"_id": storyID})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Story not found",
		})
	}

	_, likedDBErr := database.FeedLikes.DeleteMany(context.Background(), bson.M{"feedId": storyID})
	_, savedDBErr := database.FeedLikes.DeleteMany(context.Background(), bson.M{"feedId": storyID})

	if likedDBErr == mongo.ErrNoDocuments || savedDBErr == mongo.ErrNoDocuments {
		return c.JSON(fiber.Map{
			"message": "Deleted story successfully.",
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
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Stories not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Deleted stories successfully.",
	})
}

func UpdateStory(c *fiber.Ctx) error {

	var data = new(models.Story)

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	storyID, _ := primitive.ObjectIDFromHex(c.Params("storyId"));
	update := bson.M{"$set": bson.M{
		"title": data.Title,
		"content": data.Content,
		"tags": data.Tags,
		"cover": data.Cover,
	}}

	_, queryError := database.Stories.UpdateOne(context.Background(), bson.M{"_id": storyID}, update)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Story not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Updated story successfully.",
	})
}
