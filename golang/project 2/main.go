package main

import (
	"html/template"
	"net/http"
	"project-2/models"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func main() {
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	products := models.ListAll()

	templates.ExecuteTemplate(w, "Index", products)
}
