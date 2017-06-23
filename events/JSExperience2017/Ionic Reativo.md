# Programação Reativa com Ionic

## O que é

A [Programação Reativa](reactivemanifesto.org/pt-BR) vem do manifesto reativo e é um tipo de
programação que reage a dados que são transmitidos ao longo do tempo (_streams_), desta forma é
possível reagir a:

- Usuários
- Eventos
- Erros

A programação reativa basicamente segue de um padrão que utiliza streams de dados e trabalham sobre
estes dados obtidos ao longo do tempo para poder realizar operações sobre estes dados continuamente
recebidos de forma que o sistema vai reagir aos mesmos.

### Extensões reativas

- [Reactivex](reactivex.io)

Há dois tipos de padrões de projetos, o Observer e o Iterator, que foram unidos juntamente a
programação funcional para formar a programação reativa.

### Streams

A ideia deste tipo de programação são as streams de dados, ou seja, são de modo grosseiro, um tipo
de promise que ficam recebendo dados de forma contínua, este tipo de promise implementa o padrão
observer. Em suma, o observer tem um objeto _observable_ que ficam olhando os dados recebidos pelas
streams.

### Operadores

A ferramenta de operação basica sobre os arrays e as streams, métodos como:

- Filter
- Map
- Reduce

Já são padrões no Ecma, mas são a caixa de ferramentas de qualquer desenvolvedor para poder
trabalhar com programação funcional.

## Padrões reativos

### Redux

O redux é um padrão de desenvolvimento que prega o fluxo de dados em um único sentido. Geralmente
temos uma ação, que na maioria dos casos é constante, esta ação vai ser enviada para um reducer, que
é o responsável por analisar o tipo de ação e descobrir qual é a parte do estado que deve ser
alterado.

Estas alterações são enviados para a view que podem despachar novamente ações.
