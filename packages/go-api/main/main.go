package main

import (
	"../tsuki/server"
)

func main() {
	srv := server.NewAPI()
	srv.Listen()
}
