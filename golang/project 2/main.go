package main

import (
	"net/http"
	"project-2/routes"
)

func main() {
	routes.LoadRoutes()
	var err = http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err.Error())
	}
}
