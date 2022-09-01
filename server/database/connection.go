package database

import (
	"context"
	"fmt"
	"log"
	"server/helpers"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Users *mongo.Collection
var Stories *mongo.Collection
var Followers *mongo.Collection
var SavedStories *mongo.Collection
var StoryLikes *mongo.Collection

func ConnectDB() {
	connectionURL := helpers.GetEnvVariable("MONGO_URI")
	dbName := helpers.GetEnvVariable("DB_NAME")

	clientOption := options.Client().ApplyURI(connectionURL)
	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Successfully connected to DB")

	Users = client.Database(dbName).Collection("users")
	Stories = client.Database(dbName).Collection("stories")
	Followers = client.Database(dbName).Collection("followers")
	SavedStories = client.Database(dbName).Collection("savedstories")
	StoryLikes = client.Database(dbName).Collection("storylikes")

	helpers.CreateUserIndex(Users)

	fmt.Println("Collection instances are ready.")
}
