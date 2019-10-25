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
  - [Monitorando diversos sites de uma única vez](#monitorando-diversos-sites-de-uma-única-vez)
    - [Slices](#slices)
      - [Capacidade e Tamanho](#capacidade-e-tamanho)
    - [Percorrendo slices](#percorrendo-slices)
    - [Ranges](#ranges)
  - [Sleep](#sleep)
  - [Constantes](#constantes)
  - [Arquivos em Go](#arquivos-em-go)
    - [Tratando erros](#tratando-erros)
    - [Lendo arquivos](#lendo-arquivos)
      - [Lendo linha a linha](#lendo-linha-a-linha)
  - [Escrevendo em arquivos](#escrevendo-em-arquivos)
  - [Trabalhando com tempo](#trabalhando-com-tempo)

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

## Monitorando diversos sites de uma única vez

Para podermos trabalhar com vários sites, podemos criar **arrays**.

```go
var sites [4]string
sites[0] = "https://random-status-code.herokuapp.com"
sites[1] = "https://alura.com.br"
sites[2] = "https://caelum.com.br"

fmt.Println(sites)
```

Essa função printaria diversos sites. Como você percebeu, o array em Go precisa ter um tamanho fixo, por isso, muitas vezes deixamos de utilizar o **array** para utilizar o **slice**, que é uma abstração do array porém tem tamanho variável.

### Slices

O slice possui um tamanho indeterminado, vamos imaginar uma função de exibição de nomes.

```go
func exibeNomes() {
  nomes := []string{"site1", "site2", "site3"}
  fmt.Println(nomes)
}
```

Veja que os slices não possuem nenhum tipo de declaração de tamanho, portanto é uma das estruturas mais ideais para fazer operações com listas de itens.

> A exibição de um slice é identica à exibição de um array

A única diferença que vamos ter entre um array e um slice é que, quando utilizarmos o pacote `reflect` para buscar o tipo da variávei, vamos ter a diferença básica:

```go
nomes := []string{"1", "2"}
var sites [2]string

fmt.Println(reflect.TypeOf(nomes)) // []string
fmt.Println(reflect.TypeOf(sites)) // [2]string
```

Porém a grande verdade é que **tudo é um array em Go**. Por mais que os slices sejam uma definição utilizada *acima* do array, o slice também possui os mesmos métodos do array, mas também possui métodos de coleção como o `Append`, que vai adicionar um novo item no final do slice.

```go
func exibeNomes() {
  nomes := []string{"site1", "site2", "site3"}
  fmt.Println(nomes)
  nomes = append(nomes, "site3")
}
```

Agora um novo item foi criado no slice.

#### Capacidade e Tamanho

O array possui uma função `len` que mostra o tamanho do array, baseado na quantidade de posições que estão ocupadas nele.

Existe uma outra função chamada `cap`, que mostra a capacidade de um array ou de uma coleção, ou seja, o tamanho total daquela coleção incluindo os itens que não estão preenchidos, por exemplo:

Vamos pegar a nossa função de nomes:

```go
func exibeNomes() {
  nomes := []string{"site1", "site2", "site3"}
  fmt.Println(len(nomes), cap(nomes)) // 3 3
  nomes = append(nomes, "site4")
  fmt.Println(len(nomes), cap(nomes)) // 4 6
}
```

Isto acontece porque, quando adicionamos um novo item no sice, ele vai dobrar o tamanho do array, porém só temos 4 posições preenchidas, por isso o valor de `len` é 4 mas o de `cap` é 6.

Isto é o Go cuidando dos arrays para nós, de forma que a gente não precise tratar totalmente os nomes e tamanhos de arrays.

### Percorrendo slices

Vamos percorrer nosso slice com uma instrução `for`:

```go
sites := []string{"site1", "site2", "site3"}

for i := 0; i < len(sites); i++ {
  fmt.Println(sites[i])
}
```

### Ranges

Além do `for` tradicional, podemos percorrer coleções completas utilizando o `range` juntamente com o `for`. O `range` é uma instrução que nos retorna um iterador de tuplas do tipo `[index, value]` para nosso laço de repetição.

```go
sites := []string{"site1", "site2", "site3"}

for index, site := range sites {
  fmt.Println("Posição", index, "com valor", site)
}
```

## Sleep

O Go possui um pacote chamado `time` que possui uma função `sleep`, essa função é responsável por dar um pause no código para que seja possível que nosso site possa voltar ao ar, vamos supor que queremos executar uma verificação ou uma função a cada 5 segundos:

```go
for _, site := range sites {
  testaSite(site)
  time.sleep(5 = time.Second)
}
```

Esse laço vai esperar 5 segundos para poder rodar entre cada execução.

## Constantes

Podemos declarar valores constantes no Go usando a palavra `const`.

```go
const MONITORAMENTOS = 3
```

## Arquivos em Go

Vamos alterar o nosso programa de monitoramento de site para que, ao invés de perguntar qual é o site que o usuário quer monitorar, ler de um arquivo de texto com um site por linha.

Podemos fazer isso através do pacote `os`.

```go
func readFile() []string {
  var slice []string
  file, _ := os.Open("sites.txt")

  fmt.Println(file)
  return slice
}
```

### Tratando erros

É uma ótima prática – e até uma regra – tratar um erro no Go. Podemos fazer isso através de um `if` simples.

```go
func readFile() []string {
  var slice []string
  file, err := os.Open("sites.txt")

  if err != nil {
    panic(err)
  }

  fmt.Println(file)
  return slice
}
```

Agora sabemos que o erro aconteceu, no caso de não tratarmos o erro, vamos simplesmente ter a nossa variável `file` como `nil`

> `nil` é o equivalente do `null`

### Lendo arquivos

Se formos imprimir de fato o arquivo que foi lido pelo Go, vamos ter um endereço de memória. Existem diversas formas de abrir arquivos no Go. Uma das mais simples é utilizando o pacote `io/ioutil`.

```go
func readFile() []string {
  var slice []string
  file, err := ioutil.ReadFile("sites.txt")

  if err != nil {
    panic(err)
  }

  fmt.Println(string(file))
  return slice
}
```

A função `ReadFile` retorna um array de bytes, e esse array de bytes é muito mais fácil de ser convertido do que um ponteiro de arquivo. Podemos simplesmente realizar a conversão utilizando a palavra `string` ao redor do array de bytes.

Porém isso só é útil quando temos que ler um arquivo inteiro e printar ele em nossa tela. Quando queremos fazer alguma coisa com essa string, temos um outro pacote chamado `bufio` que é o escolhido para que possamos utilizar.

Primeiramente podemos importar o pacote:

```Go
import (
  "os"
  "bufio"
)
```

> Note que vamos utilizar a biblioteca `os` mas juntamente com o `bufio`

```go
func readFile() []string {
  var slice []string
  file, err := os.Open("sites.txt")

  if err != nil {
    panic(err)
  }

  reader := bufio.NewReader(file)
  line, err := reader.ReadString('\n')

  if err != nil {
    panic(err)
  }

  fmt.Println(line)
  return slice
}
```

Note duas coisas:

1. O `reader` lê uma string até um byte delimitador e nos retorna o texto lido e o erro
2. Precisamos usar aspas simples ao invés de aspas duplas, pois as aspas simples representam bytes enquanto aspas duplas representam strings.

> Veja que estamos lendo até o byte delimitador do `\n`, que é a quebra de linha

#### Lendo linha a linha

Veja que a função `ReadString` só executa uma vez, então precisamos colocar ela dentro de um `for` para que ela consiga ser executada e lida mais de uma vez.

Para identificar a última linha de um arquivo, podemos utilizar a saída de erro para identificar o erro `EOF` que identifica a última linha do arquivo.

```go
func readFile() []string {
  var slice []string
  file, err := os.Open("sites.txt")

  if err != nil {
    panic(err)
  }
  reader := bufio.NewReader(file)

  for {
    line, err := reader.ReadString('\n')
    if err == io.EOF {
      break
    }
    fmt.Println(line)
  }

  return slice
}
```

Porém, o `ReadString` é literal, ele vai ler até o byte identificado e **irá colocá-lo** no final da string. Vamos usar a função `strings.TrimSpace` para tirá-lo:

```go
func readFile() []string {
  var slice []string
  file, err := os.Open("sites.txt")

  if err != nil {
    panic(err)
  }
  reader := bufio.NewReader(file)

  for {
    line, err := strings.TrimSpace(reader.ReadString('\n'))
    if err == io.EOF {
      break
    }
    fmt.Println(line)
  }

  return slice
}
```

Se quisermos adicionar a linha lida no noso slice de sites podemos utilizar a função `append`.

```go
func readFile() []string {
  var slice []string
  file, err := os.Open("sites.txt")

  if err != nil {
    panic(err)
  }
  reader := bufio.NewReader(file)

  for {
    line, err := strings.TrimSpace(reader.ReadString('\n'))
    if err == io.EOF {
      break
    }
    slice = append(slice, line)
  }

  return slice
}
```

Sempre que abrimos um arquivo, precisamos encerrar essa leitura fechando o arquivo:


```go
func readFile() []string {
  var slice []string
  file, err := os.Open("sites.txt")

  if err != nil {
    panic(err)
  }
  reader := bufio.NewReader(file)

  for {
    line, err := strings.TrimSpace(reader.ReadString('\n'))
    if err == io.EOF {
      break
    }
    slice = append(slice, line)
  }

  file.Close()

  return slice
}
```

## Escrevendo em arquivos

Vamos salvar um log dos nossos sites, mostrando o horário, o site e o status que aquele site estava exibindo no momento daquele log.

```go
func registerLog(site string, status bool) {
  file, err := os.OpenFile("log.txt", os.O_RDWR | os.O_CREATE, 0666)

  if err != nil {
    panic(err)
  }

  file.Close()
}
```

A função `OpenFile` é uma função similar ao `fopen` do C, podemos passar, além do nome do arquivo, um conjunto de flags e uma permissão. Como queremos que possamos abrir para ler, se o arquivo não existir queremos criá-lo, vamos concatenar duas flags, a de leitura e escrita `O_RDWR` e a de criação `O_CREATE` com o operador binário `|`.

> As flags do Go podem ser checadas na [documentação oficial](https://golang.org/pkg/os)

Agora vamos escrever no nosso arquivo:

```go
func registerLog(site string, status bool) {
  file, err := os.OpenFile("log.txt", os.O_RDWR | os.O_CREATE, 0666)

  if err != nil {
    panic(err)
  }

  file.WriteString(site + "- online: " + strconv.FormatBool(status))

  file.Close()
}
```

> Veja que estamos utilizando um novo pacote chamado `strconv` que é o pacote responsável por converter diversos tipos para string.

Uma outra coisa que precisamos notar é que estamos sempre escrevendo no início do arquivo, porque nossa flag é sempre `O_RDWR`. Mas, se quisermos escrever no final do arquivo, precismaos usar a flag `O_APPEND`.

```go
func registerLog(site string, status bool) {
  file, err := os.OpenFile("log.txt", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)

  if err != nil {
    panic(err)
  }

  file.WriteString(site + "- online: " + strconv.FormatBool(status) + "\n")

  file.Close()
}
```

## Trabalhando com tempo

O Go possui um pacote chamado `time`, que vamos utilizar para pegar a hora atual.

```go
func registerLog(site string, status bool) {
  file, err := os.OpenFile("log.txt", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)

  if err != nil {
    panic(err)
  }

  file.WriteString(time.Now().Format("02/01/2006 15:04:05") + site + "- online: " + strconv.FormatBool(status) + "\n")

  file.Close()
}
```

> Algo bastante estranho com Go é que ele tem seu próprio [estilo de formatação de código](https://golang.org/src/time/format.go) que é baseado em constantes numéricas, o formato que usamos aqui é o equivalente a utilizar "dd/mm/yyyy HH:mm:ss"


