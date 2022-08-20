package controllers

import "github.com/gofiber/fiber/v2"

func CheckHealth(c *fiber.Ctx) error {
	return c.SendString("APP IS RUNNING.")
}