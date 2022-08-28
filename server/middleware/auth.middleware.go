package middleware

import (
	jwtware "github.com/gofiber/jwt/v2"
	"github.com/gofiber/fiber/v2"
)

const JWTSECRET = "SECRET_KEY"

func IsAuthorized() func(ctx *fiber.Ctx) error {
	authFunc := jwtware.New(jwtware.Config{
		SigningKey: []byte(JWTSECRET),
		AuthScheme: "Bearer",
	})

	return authFunc;
}