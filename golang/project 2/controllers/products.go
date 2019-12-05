package controllers

import (
	"html/template"
	"net/http"
	"project-2/models"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func Index(w http.ResponseWriter, r *http.Request) {
	products := models.ListAll()

	templates.ExecuteTemplate(w, "Index", products)
}
