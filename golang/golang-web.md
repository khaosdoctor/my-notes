# Golang para web

> Continuação do curso de Golang aplicando conceitos MVC

## Sumário

- [Golang para web](#golang-para-web)
  - [Sumário](#sumário)
  - [Criando um servidor web](#criando-um-servidor-web)
    - [Templates](#templates)
    - [Criando rotas](#criando-rotas)
    - [Criando o template](#criando-o-template)

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
