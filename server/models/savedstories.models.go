package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SavedStories struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	StoryID   primitive.ObjectID `json:"storyId,omitempty" bson:"storyId,omitempty"`
	UserID    primitive.ObjectID `json:"userId,omitempty" bson:"userId,omitempty"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}
