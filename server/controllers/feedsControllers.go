package controllers

import (
	"context"
	"fmt"
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
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Feeds not found.",
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

func GetFeedByID(c *fiber.Ctx) error {
	storyID, _ := primitive.ObjectIDFromHex(c.Params("feedId"))
	var story models.Story

	queryError := database.Stories.FindOne(context.TODO(), bson.M{"_id": storyID}).Decode(&story)

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Feed not found",
		})
	}

	return c.JSON(story)
}

func GetSavedFeedsByUserId(c *fiber.Ctx) error {
	var feeds []models.Story
	var feedIds []primitive.ObjectID

	userID, _ := primitive.ObjectIDFromHex(c.Params("userId"))

	cur, queryError := database.SavedFeeds.Find(context.TODO(), bson.M{"userId": userID})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No saved storied found.",
		})
	}

	for cur.Next(context.TODO()) {
		var data models.SavedFeeds
		err := cur.Decode(&data)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		feedIds = append(feedIds, data.StoryID)
	}

	if err := cur.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	defer cur.Close(context.TODO())

	filter := bson.M{"_id": bson.M{"$in": feedIds}}

	cursor, _ := database.Stories.Find(context.TODO(), filter)

	for cursor.Next(context.TODO()) {
		var feed models.Story
		err := cursor.Decode(&feed)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		feeds = append(feeds, feed)
	}

	defer cursor.Close(context.TODO())

	return c.JSON(feeds)
}

func LikeFeed(c *fiber.Ctx) error {

	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	feedID, _ := primitive.ObjectIDFromHex(data["feedId"])
	userID, _ := primitive.ObjectIDFromHex(data["userId"])

	likeData := models.FeedLikes{
		ID:      primitive.NewObjectID(),
		StoryID: feedID,
		UserID:  userID,
	}

	_, insertErr := database.FeedLikes.InsertOne(context.TODO(), likeData)

	if insertErr != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Liked feed successfully.",
	})
}

func DislikeFeed(c *fiber.Ctx) error {

	likeID, _ := primitive.ObjectIDFromHex(c.Params("likeId"))

	_, queryError := database.FeedLikes.DeleteOne(context.Background(), bson.M{"_id": likeID})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Like data not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Disliked story successfully.",
	})
}

func SaveFeed(c *fiber.Ctx) error {

	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	feedID, _ := primitive.ObjectIDFromHex(data["feedId"])
	userID, _ := primitive.ObjectIDFromHex(data["userId"])

	savedData := models.SavedFeeds{
		ID:      primitive.NewObjectID(),
		StoryID: feedID,
		UserID:  userID,
	}

	_, insertErr := database.SavedFeeds.InsertOne(context.TODO(), savedData)

	if insertErr != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Saved this feed successfully.",
	})
}

func RemoveFeed(c *fiber.Ctx) error {

	saveID, _ := primitive.ObjectIDFromHex(c.Params("saveId"))
	
	_, queryError := database.SavedFeeds.DeleteOne(context.Background(), bson.M{"_id": saveID})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Save data not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Removed story successfully.",
	})
}
