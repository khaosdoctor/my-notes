package main

import (
	"database/sql"
	"html/template"
	"net/http"

	_ "github.com/lib/pq"
)

func connectDatabase() *sql.DB {
	connection := "user=postgres dbname=store password=mysecretpass host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connection)
	if err != nil {
		panic(err.Error)
	}

	return db
}

// Product is the representation of a store Product
// Name: Name of the product
// Description: Description of the product
// Price: Product Price
// Quantity: How much product is available in stock
type Product struct {
	Id          int
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
	db := connectDatabase()

	allProducts, err := db.Query("SELECT * FROM products")
	if err != nil {
		panic(err.Error())
	}

	product := Product{}
	products := []Product{}

	for allProducts.Next() {
		var id, quantity int
		var name, description string
		var price float64

		err = allProducts.Scan(&id, &name, &description, &price, &quantity)
		if err != nil {
			panic(err.Error())
		}

		product.Name = name
		product.Id = id
		product.Description = description
		product.Price = price
		product.Quantity = quantity

		products = append(products, product)
	}

	templates.ExecuteTemplate(w, "Index", products)
	defer db.Close()
}
