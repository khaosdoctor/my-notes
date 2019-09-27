package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	showIntroduction()

	for {
		showMenu()
		switch readCommand() {
		case 1:
			beginMonitoring("")
		case 2:
			fmt.Println("Showing logs:")
		case 0:
			fmt.Println("Exiting...")
			os.Exit(0)
		default:
			fmt.Println("Invalid Command")
		}
	}
}

func showIntroduction() {
	name := "Lucas"
	version := 1.0

	fmt.Println("Hello", name)
	fmt.Println("You're running version", version)
}

func readCommand() int {
	var choice int
	fmt.Scan(&choice)
	return choice
}

func showMenu() {
	fmt.Println("=== MENU ===")
	fmt.Println("1- Begin monitoring")
	fmt.Println("2- Show logs")
	fmt.Println("0- Exit")
	fmt.Print("Choose your option: ")
}

func beginMonitoring(website string) {
	fmt.Println("Monitoring...")
	if website == "" {
		fmt.Println("Which website do you wish to monitor? (http://...)")
		fmt.Scan(&website)
	}
	response, _ := http.Get(website)

	if response.StatusCode != 200 {
		fmt.Println("Website is down with status", response.StatusCode)
	} else {
		fmt.Println("Website is up and running")
	}

	fmt.Println("Should we test it again? (0/1)")
	var choice bool
	fmt.Scan(&choice)

	if choice {
		beginMonitoring(website)
	}
}
