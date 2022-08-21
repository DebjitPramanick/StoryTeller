package routers

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	
	app.Get("/api/health", controllers.CheckHealth)

	app.Get("/api/user/:id", controllers.GetUserByID)
	app.Post("/api/auth/register", controllers.RegisterUser)
	app.Post("/api/auth/login", controllers.LoginUser)

	app.Get("/api/story/:id", controllers.GetStoryByID)
	app.Post("/api/story/create", controllers.CreateStory)
	app.Get("/api/story/all", controllers.GetStories)
}