# Golang

## Sumário

- [Golang](#golang)
  - [Sumário](#sumário)
  - [História](#história)
  - [GO Workspace](#go-workspace)
  - [Executando o projeto](#executando-o-projeto)
  - [Tipos de variáveis](#tipos-de-variáveis)
    - [Descobrindo o tipo das variáveis](#descobrindo-o-tipo-das-variáveis)
    - [Declaração curta de variáveis](#declaração-curta-de-variáveis)
  - [Recebendo inputs de usuário](#recebendo-inputs-de-usuário)
  - [Controle de Fluxo](#controle-de-fluxo)
    - [If](#if)
    - [Switch](#switch)
  - [Funções](#funções)
  - [Web Requests](#web-requests)
    - [Funções com múltiplos retornos](#funções-com-múltiplos-retornos)
    - [Monitorando continuamente](#monitorando-continuamente)

## História

O Google em 2006, tinha um grande problema de buildar seus sistemas em C++ e C porque o processo todo era muito complexo e complicado, então em 2009 a Golang foi criada com o intuito de ser muito moderna e muito rápida. Fazendo com que as compilações sejam extremamente rápidas. A modularização é muito forte então podemos criar vários módulos a parte de forma muito simples.

O GO é uma linguagem com um estilo próprio e pré definido já opinionado, então você não tem mais de um linter para GO, somente o GO. Isso é muito bacana porque temos a chance de ir direto ao ponto ao invés de ficar pensando em como gerenciar nossos estilos.

## GO Workspace

O GO precisa de uma pasta padrão chamada Go Workspace, que é definida por padrão como sendo o root do seu usuário no sistema (`~/go`). Dentro desta pasta, vamos ter uma estrutura como:

```
go
├── bin
├── pkg
└── src
```

- A pasta `bin` é a pasta responsável por guardar os binários das nossas aplicações
- A pasta `pkg` é aonde irão residir os pacotes que nossa aplicação irá usar
- A pasta `src` é onde fica nosso código fonte

## Executando o projeto

Para executar o projeto podemos rodar o comando `go build pacote` ou `go run pacote`.

## Tipos de variáveis

Se quisermos definir uma variável em nosso projeto, primeiro temos que definir o tipo dela e seu nome da seguinte forma:

```go
package main

import "fmt"

func main() {
  var variavel string = "nome"
  fmt.Println("My name is", variavel)
}
```

O Go possui uma série de tipos, os primitivos mais comuns são: `float32` e `float64`, `string`, `int` (com variações 8, 16, 32 e 64) e outros.

Todas as variáveis não inicializadas no Go possuem o seu valor inicial zerado. Além disso, o Go consegue inferir o tipo da variável com o valor do lado direito da expressão, por exemplo:

```go
package main

import "fmt"

func main() {
  var variavel = "nome"
  fmt.Println("My name is", variavel)
}
```

Não é necessário colocar o `string`, porque ele vai inferir o tipo a partir do valor da variável.

### Descobrindo o tipo das variáveis

Para descobrir o tipo das variáveis podemos importar o pacote `reflect`:

```go
package main

import (
  "fmt"
  "reflect"
)

func main() {
  var variavel = "nome"
  fmt.Println("My name is", variavel)
  fmt.Println("Variable type is", reflect.TypeOf(variavel))
}
```

### Declaração curta de variáveis

Podemos declarar uma variável de forma curta através da sintaxe `:=`:


```go
package main

import "fmt"

func main() {
  variavel := "nome"
  fmt.Println("My name is", variavel)
}
```

## Recebendo inputs de usuário

Vamos criar um programa que possui um menu no qual o usuário pode escolher a opção que ele deseja:

```go
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
}
```

Para ler o input do usuário, vamos usar a função `fmt.scanf`:

```go
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
	fmt.Scanf("%d", &choice)
}
```

Veja que estamos usando o `&`. Isto indica, como no C, que vamos estar usando o **endereço de memória** da variável `choice` e não o seu valor. Isto porque a função `fmt.Scanf` recebe como primeiro parâmetro o formato que estamos esperando e, como segundo parâmetro, o ponteiro de memória para onde ele tem que mandar esse valor. Este é o chamado **ponteiro**.

Como o Go já sabe que temos um ponteiro do tipo inteiro, porque nossa variável é do tipo inteiro, podemos usar a função `fmt.Scan`, que faz a mesma coisa do `Scanf` porém não precisa receber o formato de entrada.

```go
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
```

Se colocarmos um valor inválido, por exemplo, uma string ao invés de um int, o Go **não irá alocar nada na variável `choice`**, isto porque ela está esperando um inteiro, então o valor dela será o valor padrão de todas as variáveis inteiras alocadas: 0.

## Controle de Fluxo

### If

Vamos continuar a nossa implementação usando os controles de fluxo com a keyword `if`. Vamos implementar o nosso switch de comandos:

```go
if choice == 1 {
  fmt.Println("Monitoring...")
} else if choice == 2 {
  fmt.Println("Showing logs:")
} else if choice == 0 {
  fmt.Println("Exiting...")
} else {
  fmt.Println("Invalid command")
}
```

Uma coisa interessante de notar é que, no go, todas as condições de existencia de um `if` **precisam** voltar um `boolean`, o Go não aceita nenhum tipo de condição que não seja um boolean.

### Switch

Vamos utilizar o switch para fazer a mesma coisa:

```go
switch choice {
case 1:
  fmt.Println("Monitoring...")
case 2:
  fmt.Println("Showing logs:")
case 0:
  fmt.Println("Exiting...")
default:
  fmt.Println("Invalid Command")
}
```

Algo interessante no `switch` é que o Go não possui uma keyword `break` para o `switch`, se ele entrou em uma condição, ele só vai executar aquela condição. Mas se você quiser colocar `break`, ninguém vai reclamar.

## Funções

No Go, declaramos a função com a keyword `func`:

```go
func introduction () {
	name := "Lucas"
	version := 1.0

	fmt.Println("Hello", name)
	fmt.Println("You're running version", version)
}
```

Neste exemplo, a função não retorna nada e nem leva nada como parâmetro. Uma função que retornaria um resultado precisa ter o mesmo especificado após a sua declaração:

```go
func readCommand() int {
	var choice int
	fmt.Scan(&choice)
	return choice
}
```

## Web Requests

Vamos começar a fazer a nossa função de início de monitoramento para testar se nosso site está online ou não. Para isso precisamos acessar o site e verificar se ele está respondendo.

Para isso temos um pacote específico chamado `net/http`, utilizado para acessar o protocolo HTTP usando Go. Então nosso programa seria:

```go
import "net/http"

func beginMonitoring() {
	fmt.Println("Monitoring...")
	fmt.Println("Which website do you wish to monitor? (http://...)")
	var website string
	fmt.Scan(&website)
	response, err := http.Get(website)
}
```

> Veja que a função `get` retorna mais de uma variável, a primeira delas é a resposta e a segunda é um possível erro

### Funções com múltiplos retornos

Para o Go, uma função pode retornar múltiplos valores, então podemos ter uma função assim:

```go
func hello(nome: string) string {
  return nome
}
```

Ela só está retornando um único valor. Agora, podemos ter uma função que retorna mais de um valor:

```go
func calculateData() (string, int) {
  nome := "Lucas"
  age := 24
  return name, age
}
```

A grande maioria das funções do Go retornam um possível erro que **obrigatoriamente** precisa ser tratado se for declarada.

Quando não queremos utilizar um dos valores, podemos utilizar o operador de identificador em branco `_`:

```go
func calculateData() (string, int) {
  nome := "Lucas"
  age := 24
  return name, age
}

func main() {
  _, age := calculateData()
  fmt.Println("Hello, you have", age, "years-old")
}
```

Na minha função, estou apenas pegando a idade e não estou mais interessado no nome.

### Monitorando continuamente

Para finalizar nossa função vamos fazer o seguinte:

```go
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
```

> Poderíamos também utilizar a instrução `for` sem nenhum tipo de condição, isto cria um loop infinito
