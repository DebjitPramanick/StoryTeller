package routers

import (
	"server/controllers/userControllers"
	"server/controllers/testControllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	
	app.Get("/api/health", testcontrollers.CheckHealth)

	app.Get("/api/user", usercontrollers.GetUser)
	app.Get("/api/login", usercontrollers.GetUser)
	app.Get("/api/login", usercontrollers.GetUser)
}