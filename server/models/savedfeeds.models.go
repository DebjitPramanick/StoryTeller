package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SavedFeeds struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	StoryID   primitive.ObjectID `json:"storyId" bson:"storyId"`
	UserID    primitive.ObjectID `json:"userId" bson:"userId"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}
