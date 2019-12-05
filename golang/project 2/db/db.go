package db

import (
	"database/sql"
	_ "github.com/lib/pq" // Imports PGSQL
)

// ConnectDatabase connects to the Postgres Database
func ConnectDatabase() *sql.DB {
	connection := "user=postgres dbname=store password=mysecretpass host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connection)
	if err != nil {
		panic(err.Error)
	}

	return db
}
