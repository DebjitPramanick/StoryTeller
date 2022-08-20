package helpers

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string) string {
	err := godotenv.Load(".env.local")

	if err!=nil { 
		log.Fatal(err)
	}

	return os.Getenv(key);
}


func IsKeyPresent(data map[string]string, key string) bool {
	_, isPresent := data[key]
	return isPresent;
}