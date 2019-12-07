package controllers

import (
	"html/template"
	"log"
	"net/http"
	"project-2/models"
	"strconv"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func Index(w http.ResponseWriter, _ *http.Request) {
	products := models.ListAll()

	_ = templates.ExecuteTemplate(w, "Index", products)
}

func NewProduct(w http.ResponseWriter, _ *http.Request) {
	_ = templates.ExecuteTemplate(w, "NewProduct", nil)
}

func InsertNew(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		return
	}

	name := r.FormValue("nome")
	description := r.FormValue("descricao")
	price, err := strconv.ParseFloat(r.FormValue("preco"), 64)
	if err != nil {
		log.Println("Failed to convert price to Float:", err)
	}

	quantity, err := strconv.Atoi(r.FormValue("quantidade"))
	if err != nil {
		log.Println("Failed to convert quantity to Int:", err)
	}
	models.InsertNewProduct(name, description, price, quantity)
	http.Redirect(w, r, "/", 301)
}
