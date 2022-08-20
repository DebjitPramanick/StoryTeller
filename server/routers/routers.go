package routers

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	
	app.Get("/api/health", controllers.CheckHealth)

	app.Get("/api/user/:id", controllers.GetUserByID)
	app.Post("/api/register", controllers.RegisterUser)
	app.Post("/api/login", controllers.LoginUser)
}