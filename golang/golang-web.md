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
