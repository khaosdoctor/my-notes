# Golang

## Sumário

- [Golang](#golang)
  - [Sumário](#sumário)
  - [História](#história)
  - [GO Workspace](#go-workspace)
  - [Executando o projeto](#executando-o-projeto)

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
