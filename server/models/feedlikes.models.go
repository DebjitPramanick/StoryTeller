package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FeedLikes struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FeedID   primitive.ObjectID `json:"feedId,omitempty" bson:"feedId,omitempty"`
	UserID    primitive.ObjectID `json:"userId,omitempty" bson:"userId,omitempty"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}
