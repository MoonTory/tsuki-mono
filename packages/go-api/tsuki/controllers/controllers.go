package controllers

import (
	"net/http"
)

type Controller struct {
	Name string
	Path string
	Endpoints
}

type Endpoints interface {
	Get(w http.ResponseWriter, r *http.Request)
	Post(w http.ResponseWriter, r *http.Request)
	Delete(w http.ResponseWriter, r *http.Request)
	Update(w http.ResponseWriter, r *http.Request)
}
