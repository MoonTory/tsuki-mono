package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"../controllers"
)

type tsukiAPI struct {
	Router *mux.Router
	API
}

type API interface {
	config()
	NewAPI()
	Listen()
}

func NewAPI() tsukiAPI {
	a := tsukiAPI{}
	a.config()
	return a
}

func (api *tsukiAPI) config() {
	api.Router = mux.NewRouter().StrictSlash(true)

	BooksCntrl := controllers.NewBooksController("/books")

	fmt.Println(BooksCntrl.Name, "@", BooksCntrl.Path, "initialize successfully...")

	api.Router.HandleFunc(BooksCntrl.Path, BooksCntrl.Get).Methods("GET")
}

func (api *tsukiAPI) Listen() {
	fmt.Println("Blastoff @ http://localhost:5003...")
	log.Fatal(http.ListenAndServe(":5003", api.Router))
}
