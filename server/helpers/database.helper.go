package helpers

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/x/bsonx"
)

func CreateUserIndex(Users *mongo.Collection) {
	userIndices := []mongo.IndexModel{
		{
			Keys:    bsonx.Doc{{Key: "username", Value: bsonx.String("text")}},
			Options: options.Index().SetUnique(true),
		},
		{
			Keys:    bsonx.Doc{{Key: "email", Value: bsonx.Int32(-1)}},
			Options: options.Index().SetUnique(true),
		},
	}
	opts := options.CreateIndexes().SetMaxTime(10 * time.Second)
	ind, err := Users.Indexes().CreateMany(context.Background(), userIndices, opts)

	if err != nil {
		fmt.Println("Creating user index ERROR:", err)
	}

	fmt.Println("User indices:", ind)
}