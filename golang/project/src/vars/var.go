package main

import (
	"fmt"
	"reflect"
)

func main() {
	var nome = "Lucas"
	var version = 1.0
	age := 24

	fmt.Println("Hello,", nome, "you are", age, "years-old")
	fmt.Println("Program version:", version)
	fmt.Println("The type of variable version is", reflect.TypeOf(version))
}
