package controllers

import (
	"html/template"
	"net/http"
	"project-2/models"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func Index(w http.ResponseWriter, _ *http.Request) {
	products := models.ListAll()

	_ = templates.ExecuteTemplate(w, "Index", products)
}

func NewProduct(w http.ResponseWriter, _ *http.Request) {
	_ = templates.ExecuteTemplate(w, "NewProduct", nil)
}
