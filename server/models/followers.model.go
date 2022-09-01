package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Followers struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Following primitive.ObjectID `json:"follower,omitempty" bson:"follower,omitempty"`
	Follower  primitive.ObjectID `json:"following,omitempty" bson:"following,omitempty"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}
