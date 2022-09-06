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
	var feeds []models.Story
	savedBy := make(map[primitive.ObjectID][]primitive.ObjectID)
	likedBy := make(map[primitive.ObjectID][]primitive.ObjectID)

	cur, queryError := database.Stories.Find(context.TODO(), bson.M{})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Feeds not found.",
		})
	}

	for cur.Next(context.TODO()) {
		var feed models.Story
		err := cur.Decode(&feed)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		savedBy[feed.ID] = GetFeedSaves(feed.ID)
		likedBy[feed.ID] = GetFeedLikes(feed.ID)
		feeds = append(feeds, feed)
	}

	if err := cur.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	defer cur.Close(context.TODO())

	result := fiber.Map{
		"feeds":   feeds,
		"savedBy": savedBy,
		"likedBy": likedBy,
	}

	return c.JSON(result)
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
	savedBy := make(map[primitive.ObjectID][]primitive.ObjectID)
	likedBy := make(map[primitive.ObjectID][]primitive.ObjectID)

	userID, _ := primitive.ObjectIDFromHex(c.Params("userId"))

	cur, _ := database.SavedFeeds.Find(context.TODO(), bson.M{"userId": userID})

	for cur.Next(context.TODO()) {
		var data models.SavedFeeds
		err := cur.Decode(&data)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Something went wrong. Please try again later.",
			})
		}
		feedIds = append(feedIds, data.FeedID)
	}

	if err := cur.Err(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	defer cur.Close(context.TODO())

	if len(feedIds) != 0 {
		filter := bson.M{"_id": bson.M{"$in": feedIds}}

		fmt.Println(filter)

		cursor, _ := database.Stories.Find(context.TODO(), filter)

		for cursor.Next(context.TODO()) {
			var feed models.Story
			err := cursor.Decode(&feed)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"message": "Something went wrong. Please try again later.",
				})
			}
			savedBy[feed.ID] = GetFeedSaves(feed.ID)
			likedBy[feed.ID] = GetFeedLikes(feed.ID)
			feeds = append(feeds, feed)
		}

		defer cursor.Close(context.TODO())
	}

	result := fiber.Map{
		"feeds":   feeds,
		"savedBy": savedBy,
		"likedBy": likedBy,
	}

	return c.JSON(result)
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
		ID:     primitive.NewObjectID(),
		FeedID: feedID,
		UserID: userID,
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

	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	feedID, _ := primitive.ObjectIDFromHex(data["feedId"])
	userID, _ := primitive.ObjectIDFromHex(data["userId"])

	_, queryError := database.FeedLikes.DeleteOne(context.Background(), bson.M{"feedId": feedID, "userId": userID})

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
		ID:     primitive.NewObjectID(),
		FeedID: feedID,
		UserID: userID,
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

	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Something went wrong. Please try again later.",
		})
	}

	feedID, _ := primitive.ObjectIDFromHex(data["feedId"])
	userID, _ := primitive.ObjectIDFromHex(data["userId"])

	_, queryError := database.SavedFeeds.DeleteOne(context.Background(), bson.M{"feedId": feedID, "userId": userID})

	if queryError == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Save data not found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Removed story successfully.",
	})
}

func GetFeedSaves(feedID primitive.ObjectID) []primitive.ObjectID {
	var results = []primitive.ObjectID{}

	cur, queryError := database.SavedFeeds.Find(context.TODO(), bson.M{"feedId": feedID})

	if queryError == mongo.ErrNoDocuments {
		return results
	}

	for cur.Next(context.TODO()) {
		var data models.SavedFeeds
		err := cur.Decode(&data)
		if err != nil {
			return results
		}
		results = append(results, data.UserID)
	}

	if err := cur.Err(); err != nil {
		return results
	}

	return results
}

func GetFeedLikes(feedID primitive.ObjectID) []primitive.ObjectID {
	var results = []primitive.ObjectID{}

	cur, queryError := database.FeedLikes.Find(context.TODO(), bson.M{"feedId": feedID})

	if queryError == mongo.ErrNoDocuments {
		return results
	}

	for cur.Next(context.TODO()) {
		var data models.FeedLikes
		err := cur.Decode(&data)
		if err != nil {
			return results
		}
		results = append(results, data.UserID)
	}

	if err := cur.Err(); err != nil {
		return results
	}

	return results
}
