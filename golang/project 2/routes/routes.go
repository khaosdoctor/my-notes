package routes

import (
	"net/http"
	"project-2/controllers"
)

// LoadRoutes loads all routes
func LoadRoutes() {
	http.HandleFunc("/", controllers.Index)
	http.HandleFunc("/new", controllers.NewProduct)
}
