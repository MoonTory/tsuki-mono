package controllers

import (
	"encoding/json"
	"net/http"

	TsukiModels "../models"
)

var Books []TsukiModels.Book

type booksController struct {
	Controller
}

func NewBooksController(path string) booksController {
	c := booksController{}
	c.Name = "BooksController"
	c.Path = path

	// this is temporary and only for testing
	b := TsukiModels.Book{
		Title:  "Hello, Go",
		Author: "Gustavo Quinta"}

	Books = append(Books, b)

	return c
}

func (c *booksController) Get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Books)
}

func (c *booksController) Post(w http.ResponseWriter, r *http.Request) {

}

func (c *booksController) Delete(w http.ResponseWriter, r *http.Request) {

}

func (c *booksController) Update(w http.ResponseWriter, r *http.Request) {

}
