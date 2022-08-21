package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Likes struct {
	Likes []User
}

type Tags struct {
	Tags []string
}

type Story struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Author    User               `json:"author"`
	Title     string             `json:"title"`
	Content   string             `json:"content"`
	Cover     string             `json:"cover"`
	Tags      Tags               `json:"tags"`
	Likes     Likes              `json:"likes"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}
