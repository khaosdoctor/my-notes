package main

import (
	"html/template"
	"net/http"
)

// Product is the representation of a store Product
// Name: Name of the product
// Description: Description of the product
// Price: Product Price
// Quantity: How much product is available in stock
type Product struct {
	Name        string
	Description string
	Price       float64
	Quantity    int
}

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func main() {
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	products := []Product{
		{Name: "Camiseta", Description: "Camiseta Azul", Price: 18.95, Quantity: 10},
		{"Tênis", "Confortável", 25.50, 30},
		{"Fone", "Redução de ruído", 59, 2},
	}
	templates.ExecuteTemplate(w, "Index", products)
}
