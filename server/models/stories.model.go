package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Story struct {
	ID        primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Author    User                 `json:"author"`
	Title     string               `json:"title"`
	Content   string               `json:"content"`
	Cover     string               `json:"cover"`
	Tags      []string             `json:"tags"`
	CreatedAt time.Time            `json:"created_at" bson:"created_at"`
}
