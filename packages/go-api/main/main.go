package main

import (
	"fmt"

	"../tsuki"
	"../tsuki/models"
)

func main() {
	fmt.Println("Hello, Go!")
	fmt.Println(tsuki.Add(10, 5))
	b := models.Book{Title: "Hello, Go", Author: "Gustavo Quinta"}
	fmt.Println("Book Title: %V", b.Title)
	fmt.Println("Gook Author: %V", b.Author)
}
