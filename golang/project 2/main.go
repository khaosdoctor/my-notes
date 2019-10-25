package main

import (
	"html/template"
	"net/http"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func main() {
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "index", nil)
}
