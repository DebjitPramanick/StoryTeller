package routers

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	
	app.Get("/api/health", controllers.CheckHealth)

	// User & Auth APIs
	app.Get("/api/user/:id", controllers.GetUserByID)
	app.Post("/api/auth/register", controllers.RegisterUser)
	app.Post("/api/auth/login", controllers.LoginUser)

	// Story APIs
	app.Post("/api/story/create/:authorId", controllers.CreateStory)
	app.Get("/api/story/author/:authorId", controllers.GetAuthorStories)
	app.Get("/api/story/:storyId", controllers.GetStoryByID)
	app.Delete("/api/story/delete/:storyId", controllers.DeleteStory)
	app.Delete("/api/story/delete/all/:userId", controllers.DeleteAllUserStories)
	app.Delete("/api/story/update/:storyId", controllers.UpdateStory)

	// Feed APIs
	app.Get("/api/feeds", controllers.GetFeeds)
	app.Get("/api/feeds/:feedId", controllers.GetFeedByID)
}