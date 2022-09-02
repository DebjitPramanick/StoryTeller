package routers

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	
	app.Get("/api/health", controllers.CheckHealth)

	// User & Auth APIs
	app.Post("/api/auth/register", controllers.RegisterUser)
	app.Post("/api/auth/login", controllers.LoginUser)
	app.Get("/api/user/:userId", controllers.GetUserByID)
	app.Delete("/api/user/delete/:userId", middleware.IsAuthorized(), controllers.RemoveUserByID)
	app.Put("/api/user/update/:userId", middleware.IsAuthorized(), controllers.UpdateUserByID)
	app.Get("/api/user/collection/:username", middleware.IsAuthorized(), controllers.GetUsersByUserName)
	app.Get("/api/user/check/:username", controllers.CheckUsername)

	// Story APIs
	app.Post("/api/story/create/:authorId", middleware.IsAuthorized(), controllers.CreateStory)
	app.Get("/api/story/author/:authorId", controllers.GetAuthorStories)
	app.Get("/api/story/:storyId", controllers.GetStoryByID)
	app.Delete("/api/story/delete/:storyId", middleware.IsAuthorized(), controllers.DeleteStory)
	app.Delete("/api/story/delete/all/:userId", middleware.IsAuthorized(), controllers.DeleteAllUserStories)
	app.Put("/api/story/update/:storyId", middleware.IsAuthorized(), controllers.UpdateStory)

	// Feed APIs
	app.Get("/api/feeds", controllers.GetFeeds)
	app.Get("/api/feeds/:feedId", controllers.GetFeedByID)
	app.Get("/api/feeds/saved/:userId", middleware.IsAuthorized(), controllers.GetSavedFeedsByUserId)
	app.Post("/api/feeds/:feedId/save", middleware.IsAuthorized(), controllers.SaveFeed)
	app.Post("/api/feeds/:feedId/like", middleware.IsAuthorized(), controllers.LikeFeed)
	app.Delete("/api/feeds/:saveId/remove", middleware.IsAuthorized(), controllers.RemoveFeed)
	app.Delete("/api/feeds/:likeId/dislike", middleware.IsAuthorized(), controllers.DislikeFeed)
}