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
