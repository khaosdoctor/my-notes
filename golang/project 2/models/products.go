package models

import localDB "project-2/db"

// Product is the representation of a store Product
// Name: Name of the product
// Description: Description of the product
// Price: Product Price
// Quantity: How much product is available in stock
type Product struct {
	ID          int
	Name        string
	Description string
	Price       float64
	Quantity    int
}

// ListAll lists all products in the database
func ListAll() []Product {
	db := localDB.ConnectDatabase()
	defer db.Close()

	allProducts, err := db.Query("SELECT * FROM products")
	if err != nil {
		panic(err.Error())
	}

	product := Product{}
	var products []Product

	for allProducts.Next() {
		var id, quantity int
		var name, description string
		var price float64

		err = allProducts.Scan(&id, &name, &description, &price, &quantity)
		if err != nil {
			panic(err.Error())
		}

		product.Name = name
		product.ID = id
		product.Description = description
		product.Price = price
		product.Quantity = quantity

		products = append(products, product)
	}

	return products
}

func InsertNewProduct(name string, description string, price float64, quantity int) Product {
	db := localDB.ConnectDatabase()
	insertQuery, err := db.Prepare("INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4)")
	if err != nil {
		panic(err.Error())
	}

	result, err := insertQuery.Exec(name, description, price, quantity)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	id, _ := result.LastInsertId()
	return Product{
		int(id),
		name,
		description,
		price,
		quantity,
	}
}
