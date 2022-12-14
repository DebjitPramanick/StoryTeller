package main

import (
	"fmt"
	"server/database"
	"server/routers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	fmt.Println("--- Starting server ---")
	
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "*",
	}))

	database.ConnectDB()

	app.Use(logger.New())

	routers.Setup(app)

	app.Listen(":4000")
}