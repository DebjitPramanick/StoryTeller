package routers

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	
	app.Get("/api/health", controllers.CheckHealth)

	app.Get("/api/user", controllers.GetUser)
	app.Post("/api/register", controllers.RegisterUser)
}