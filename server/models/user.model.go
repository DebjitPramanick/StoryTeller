package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name      string             `json:"name"`
	Bio       string             `json:"bio"`
	Email     string             `json:"email"`
	Username  string             `json:"username"`
	Password  []byte             `json:"password"`
	Avatar    string             `json:"avatar"`
	Country   string             `json:"country"`
	Dob       string             `json:"dob"`
	Gender    string             `json:"gender"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}
