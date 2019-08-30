package main

import "fmt"

func main() {
	name := "Lucas"
	version := 1.0

	fmt.Println("Hello", name)
	fmt.Println("You're running version", version)

	fmt.Println("=== MENU ===")
	fmt.Println("1- Begin monitoring")
	fmt.Println("2- Show logs")
	fmt.Println("0- Exit")
	fmt.Print("Choose your option: ")

	var choice int
	fmt.Scan(&choice)
}
