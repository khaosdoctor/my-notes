# Golang para web

> Continuação do curso de Golang aplicando conceitos MVC

## Sumário

- [Golang para web](#golang-para-web)
  - [Sumário](#sumário)
  - [Criando um servidor web](#criando-um-servidor-web)
    - [Templates](#templates)
    - [Criando rotas](#criando-rotas)
    - [Criando o template](#criando-o-template)
  - [Criando uma Struct de produtos](#criando-uma-struct-de-produtos)
  - [Banco de dados](#banco-de-dados)
    - [Conectando o banco com nossa aplicação](#conectando-o-banco-com-nossa-aplicação)
    - [Exibindo os dados do banco](#exibindo-os-dados-do-banco)
  - [Modularizando o código](#modularizando-o-código)
  - [Criando novos produtos na loja](#criando-novos-produtos-na-loja)
    - [Buscando dados da Página](#buscando-dados-da-página)

## Criando um servidor web

Para que possamos iniciar, temos que criar nosso primeiro servidor web, um que será capaz de servir nossas páginas através de templates para todas as requisições recebidas.

Para isso, vamos criar um arquivo `index.html` em nossa raiz e vamos criar um arquivo `main.go` no mesmo lugar. Neste arquivo podemos criar as instruções para o nosso servidor HTML.

```go
package main

import "net/http"

func main() {
	http.ListenAndServe(":8000", nil)
}
```

Mas veja que, se executarmos o arquivo `main.go` com `go run main.go`, não vamos conseguir renderizar o nosso index. Isto porque não estamos definindo uma rota que irá servi-lo.

### Templates

Todas as páginas servidas pelo Go são chamadas de templates. Vamos criar uma nova pasta chamada `templates` e mover nosso arquivo `index.html` para dentro dela. Pois fica muito mais simples de acharmos o nosso template e mais organizado também.

Para carregarmos os nossos templates vamos usar duas funções do pacote `template`:

```go
package main

import (
	"html/template"
	"net/http"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func main() {
	http.ListenAndServe(":8000", nil)
}
```

A primeira função, `Must` irá carregar todos os que foram retornados da segunda função `ParseGlob`.

### Criando rotas

Para podermos, de fato, fazer com que os templates sejam renderizados, precisamos utilizar a função `http.HandleFunc` que é o equivalente a ter um handler do Express no Node.js.

```go
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
```

Veja que estamos passando o caminho que queremos que essa requisição responda e também estamos passando uma função de handler que tem a assinatura `func index(w http.ResponseWritter, r *http.Request)`. Esta será como se fosse a função `function (req, res)`. O que estamos essencialmente falando aqui é para que o Go execute essa função sempre que a rota `/` for chamada.

Dentro da função `index` vamos fazer o processo de renderização.

### Criando o template

Se você executar o código, vai perceber que nada está sendo renderizado na tela, isto porque todo o template Go precisa de um código Go no início do mesmo para que este seja interpretado como um template.

Vamos alterar o nosso `index.html` para que ele seja compreendido como um template do Go.

```html
{{ define "Index" }}
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Loja</title>
</head>

<body>

</body>

</html>
{{end}}
```

Agora vamos poder servir o nosso conteúdo via Web.

## Criando uma Struct de produtos

Sempre que quisermos criar um produto novo, temos que editar o nosso HTML e incluir novas TDs e outras partes da tabela, um jeito mais simples de fazer isso é criar uma estrutura. Esta estrutura se assemelha a interfaces ou classes de outras linguagens. Para criar uma nova estrutura no Go, vamos simplesmente usar a palavra chave `struct`:

```go
type Product struct {
	Name        string
	Description string
	Price       float64
	Quantity    int
}
```

Agora vamos poder criar um modelo de produto a partir dessa struct, instanciando uma nova struct.

```go
func index(w http.ResponseWriter, r *http.Request) {
	products := []Product{
		{Name: "Camiseta", Description: "Camiseta Azul", Price: 18.95, Quantity: 10},
		{"Tênis", "Confortável", 25.50, 30},
		{"Fone", "Redução de ruído", 59, 2},
	}
	templates.ExecuteTemplate(w, "Index", products)
}
```

Veja que podemos instanciar uma struct de duas formas diferentes, a primeira delas é passando todos os campos com as descrições e as labels do que estamos setando e a segunda é apenas passando os valores na ordem que a Struct é formada.

Depois disso vamos ao nosso `index.html` e vamos criar uma estrutura de repetição para que possamos renderizar todos os produtos dinamicamente.

```html
<tbody>
  {{range .}}
  <tr>
    <td>{{.Name}}</td>
    <td>{{.Description}}</td>
    <td>{{.Price}}</td>
    <td>{{.Quantity}}</td>
  </tr>
  {{end}}
</tbody>
```

Veja que estamos usando a notação `range .` isto porque o `.` é o caminho do objeto ou da struct que estamos passando para o template que está sendo renderizado.

## Banco de dados

Nossos dados estão fixos no nosso sistema. Precisamos instalar um novo banco de dados e puxar estes dados a partir do nosso banco. Neste caso vamos utilizar o PostgreSQL, instalaremos o PGSQL normalmente como uma versão simples e instalar na nossa máquina.

Vamos criar uma tabela `products` e vamos ter a seguinte estrutura:

- name: string
- description: string
- price: float
- quantity: integer
- id: integer auto gerado

### Conectando o banco com nossa aplicação

O que vamos fazer é instalar um pacote para o driver do PGSQL, vamos entrar em https://godoc.org para achar um pacote do PGSQL que possamos utilizar. Vamos utilizar o pacote [PQ](https://godoc.org/github.com/lib/pq). Vamos entrar na página da lib e veremos que precisamos digitar `go get github.com/lib/pq` para podermos instalar o pacote. Vamos executar isso no nosso terminal.

A primeira coisa que vamos ter que fazer, é importar a lib no nosso projeto:

```go
import (
	"html/template"
	"net/http"

	_ "github.com/lib/pq"
)
```

> O `_` significa que vamos utilizar a biblioteca durante o tempo de execução da nossa aplicação

Agora vamos escrever a função que vai conectar com o nosso banco e retornar o ponteiro para a instância do banco de dados:

```go
func connectDatabase() *sql.DB {
	connection := "user=postgres dbname=store password=mysecretpass host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connection)
	if err != nil {
		panic(err.Error)
	}

	return db
}
```

Assim, podemos conectar no nosso banco de dados pela função principal com a seguinte chamada:

```go
func main() {
  db := connectDatabase()
  defer db.Close()
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}
```

> A keyword `defer` faz com que a instrução após ela seja executada **após** todas as outras instruções da função serem executadas, ou seja, estamos deferindo uma execução para o final da função

### Exibindo os dados do banco

Vamos conectar e trazer os dados que estão na nossa tabela no banco:

```go
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
```

Veja que estamos usando a própria função que renderiza a nossa página `index`, o que fazemos é basicamente uma query no banco de dados buscando todos os produtos, depois criamos duas variáveis, uma delas é a instância de um produto individual, a outra é a lista de todos os produtos do nosso banco de dados.

Vamos iterar pela lista de linhas trazidas pelo banco e montar um produto de cada vez na memória, depois vamos inserir este produto no nosso array de produtos e mandar para o nosso template.

## Modularizando o código

Nosso arquivo `main.go` faz muita coisa, precisamos começar a modularizar esse nosso código para manter de forma mais simples. A primeira coisa que vamos fazer é criar uma nova pasta chamada `db`, nela vamos criar um arquivo chamado `db.go` e vamos passar a nossa função de conexão com o banco e colocar lá dentro, nosso arquivo `db.go` ficaria assim:

```go
package db

import (
	"database/sql"
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
```

O próximo passo é passar a nossa struct para uma pasta chamada `models`, dentro dela vamos criar um arquivo chamado `products.go`, nesse arquivo vamos passar a nossa struct e vamos criar uma nova função que vai abstrair a busca de produtos do banco de dados:

```go
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
		product.ID = id
		product.Description = description
		product.Price = price
		product.Quantity = quantity

		products = append(products, product)
	}

	return products
}
```

Veja duas coisas:

1. Temos que primeiro renomear a nossa função para `ConnectDatabase` para que ela seja pública
2. Temos que importar o nosso package `db` de dentro do nosso projeto, para isso vamos dar um `go mod init` para criar a pasta do projeto e do módulo depois podemos importar como `project-2/db`
3. Tivemos que nomear nosso import para `localDB` pois a extensão `pq` já exporta um namespace com o mesmo nome

Agora no nosso arquivo `main.go` vamos importar os nossos models e então retornar a lista dos produtos:

```go
package main

import (
	"html/template"
	"net/http"
	"project-2/models"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func main() {
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	products := models.ListAll()

	templates.ExecuteTemplate(w, "Index", products)
}
```

Vamos modularizar ainda mais, extraindo a função de handling do nosso template para outra pasta chamada `routes`, mas antes vamos passar a lógica de carregamento dos nossos templates para uma pasta `controllers` em um arquivo `products.go`:

```go
package controllers

import (
	"html/template"
	"net/http"
	"project-2/models"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func Index(w http.ResponseWriter, r *http.Request) {
	products := models.ListAll()

	templates.ExecuteTemplate(w, "Index", products)
}
```

Depois vamos para a pasta `routes` no arquivo `routes.go` e vamos passar a lógica de execução das nossas rotas:

```go
package routes

import (
	"net/http"
	"project-2/controllers"
)

// LoadRoutes loads all routes
func LoadRoutes() {
	http.HandleFunc("/", controllers.Index)
}
```

Nosso arquivo `main.go` agora está assim:

```go
package main

import (
	"net/http"
	"package-2/routes"
)

func main() {
	routes.LoadRoutes()
	http.ListenAndServe(":8000", nil)
}
```

Modularizamos o código em um formato MVC.

## Criando novos produtos na loja

Sempre que queremos criar um novo produto na nossa loja temos que ir no banco de dados e criar um produto diretamente no banco. Vamos criar um botão embaixo do nosso site onde possamos preencher um formulário e ele vai criar o conteúdo no banco de dados.

Vamos criar uma página HTML nova chamada `new.html` e colocar na nossa pasta `templates`. Ela vai ter um formulário de cadastro de novos produtos. Vamos fazer uma pequena alteração na nossa tela `index.html` para criar um novo botão que nos leva para o caminho `/new`.

```html
{{ define "NewProduct" }}
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
    <title>Alura loja</title>
</head>
<nav class="navbar navbar-light bg-light mb-4">
    <a class="navbar-brand" href="/">Alura Loja</a>
</nav>
<div class="container">

    <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-5">Novo produto</h1>
                <p class="lead">Insira os detalhes</p>
            </div>
        </div>
        <form method="POST" action="insert">
            <div class="row">
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input type="text" name="nome" class="form-control">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="descricao">Descrição:</label>
                        <input type="text" name="descricao" class="form-control">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label for="preco">Preço:</label>
                        <input type="number" name="preco" class="form-control" step="0.01">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label for="quantidade">Quantidade:</label>
                        <input type="number" name="quantidade" class="form-control">
                    </div>
                </div>
            </div>
            <button type="submit" value="salvar" class="btn btn-success">Salvar</button>
            <a class="btn btn-info" href="/">Voltar</a>
        </form>
    </body>

</html>
</div>
</body>

</html>
{{end}}
```

Para podermos registrar nossa nova rota vamos precisar de um comando no arquivo `routes.go` que vai registrar nosso template para a nossa nova rota:

```go
package routes

import (
	"net/http"
	"project-2/controllers"
)

// LoadRoutes loads all routes
func LoadRoutes() {
	http.HandleFunc("/", controllers.Index)
	http.HandleFunc("/new", controllers.NewProduct)
}
```

E ai vamos adicionar o controller no nosso `products.go`:

```go
package controllers

import (
	"html/template"
	"net/http"
	"project-2/models"
)

var templates = template.Must(template.ParseGlob("templates/**/*.html"))

func Index(w http.ResponseWriter, r *http.Request) {
	products := models.ListAll()

	templates.ExecuteTemplate(w, "Index", products)
}

func NewProduct(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "NewProduct", nil)
}
```

Agora devemos ter uma nova tela funcionando.

### Buscando dados da Página

No nosso formulário, vamos ter um POST com action `insert` que vai nos levar para `/insert`. Mas não estamos tratando esses dados quando recebemos na página `/insert`. Vamos no nosso arquivo `products.go` e vamos criar uma nova função chamada `InsertNewProduct` que vai levar os mesmos parâmetros dos demais:

```go
func InsertNew(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" { return }

	name := r.FormValue("nome")
	description := r.FormValue("descricao")
	price := r.FormValue("preco")
	quantity := r.FormValue("quantidade")

}
```

Vamos utilizar um early return para poder voltar caso o método da chamada não seja POST, então vamos pegar os dados dos nossos campos do formulário, porém todos os campos que vem do formulário através da nossa request vão ser do formato String, então temos que converter o preço e a quantidade para os tipos do nosso struct. Para isso vamos utilizar a função da biblioteca `strconv`:

```go
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
	http.Redirect(w, r, "/", 301) // Damos um redirect para a página principal
}
```

Agora que temos os nossos dados convertidos, vamos mandar essas informações para o nosso Model criar o produto, para isso vamos fazer uma nova função no arquivo `products.go` na pasta `models`:

```go
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
```

Veja que na nossa função, nós estamos utilizando o statement de `Prepare` do mbanco de dados para preparar uma query de inserção onde passamos nossos parâmetros, ao executar `Exec` passamos os dados que queremos inserir no banco, esta inserção nos gera um resultado e um erro, vamos ignorar o erro e pegar o último ID inserido, já que nosso banco gera os IDs automaticamente, então vamos montar um novo `Product` e retornar este produto.

Agora a única coisa que falta é rotearmos o nosso caminho `/insert` para a nossa função de inserção. Vamos editar o nosso `routes.go` e criar essa rota:

```go

package routes

import (
	"net/http"
	"project-2/controllers"
)

// LoadRoutes loads all routes
func LoadRoutes() {
	http.HandleFunc("/", controllers.Index)
	http.HandleFunc("/new", controllers.NewProduct)
	http.HandleFunc("/insert", controllers.InsertNew)
}
```
