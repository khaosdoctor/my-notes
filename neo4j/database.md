# Neo4J

> Detalhes sobre a implementação do banco de dados

## Sumário

- [Neo4J](#Neo4J)
  - [Sumário](#Sumário)
  - [Bancos de dados orientados a grafos](#Bancos-de-dados-orientados-a-grafos)
    - [Comparações com bancos relacionais](#Comparações-com-bancos-relacionais)
  - [Modelagem de grafos](#Modelagem-de-grafos)
  - [Por que precisamos de bancos NoSQL](#Por-que-precisamos-de-bancos-NoSQL)
  - [Tecnologia de armazenamento em grafos](#Tecnologia-de-armazenamento-em-grafos)

## Bancos de dados orientados a grafos

Algo que todos temos que aceitar é que os nossos dados vão crescer com o passar do tempo, isso é um fato, todo o banco de dados que se preze precisa lidar com esse aumento de dados natural de uma aplicação. Porém o que cresce mais rápido que os dados são os relacionamentos entre eles.

Neste ponto, bancos de dados tradicionais não são uma boa escolha, já que eles focam nos dados e no que sabemos deles, mas não nos relacionamentos entre estes dados. Já os bancos de dados orientados a grafos são totalmente o oposto, com foco total nas relações entre os dados.

**Vantagens de bancos de dados orientados a grafos**

- **Flexibilidade**: A equipe não precisa modelar os dados extensivamente, pois o modelo de grafos é muito mais flexível e permite uma remodelagem sem afetar os dados existentes
- **Agilidade**: A agilidade de um banco de grafos é superior, devido a seu modo de armazenar os dados e relacionamentos, permite uma maior escalabilidade

Estes bancos são muito úteis para modelar situações do dia a dia como logística, sistemas de sugestão de lojas online, detecção de fraudes e monitoramento de redes sociais.

### Comparações com bancos relacionais

Bancos de dados relacionais tem um problema, seus schemas são muito inflexíveis. Com as regras de negócio mudando constantemente, os bancos relacionais não se comportam muito bem com variáveis dinâmicas. As gambiarras que fazemos para corrigir seriam colocar colunas vazias para poder compensar as variáveis não sabidas. Mas, além de ser uma gambiarra, isto aumenta a quantidade de colunas e, consequentemente, a complexidade do banco.

Muitas vezes usamos NoSQL para combater estes problemas de bancos de dados tradicionais, por conta de seu modelo schemaless, mas ai temos de criar FKs em bancos não relacionais, que eles não são feitos para ter e, se tivermos, temos que controlar essas constraints na nossa aplicação, o que é absurdamente complexo.

## Modelagem de grafos

Existe todo um oberhead cognitivo para modelar um banco relacional e não relacional, uma vez que não pensamos em termos de tabelas. Porém, bancos de grafos removem esse overhead pois a relação entre os dados em forma de grafos é a forma padrão que nosso cérebro pensa.

Uma atividade de modelagem de dados não é uma atividade que é feita uma única vez. Na verdade, a app vai precisar mudar significativamente no meio do desenvolvimento, várias vezes... Bancos relacionais tem um schema muito rígido e complexo, portanto não servem para essas mudanças rápidas.

## Por que precisamos de bancos NoSQL

O NoSQL é uma classe de bancos de dados que permite que armazenemos dados de forma diferente do modelo relacional. O movimento NoSQL visa resolver 3 principais problemas:

- **Volume**: O volume de dados se tornou impeditivo para bancos de dados relacionais devido ao seu modelo de dados e de relacionamentos
- **Velocidade:** A velocidade que os dados mudam se tornou um grande problema, pois os bancos relacionais não conseguem acompanhar a mudança, tanto em volume, quanto também em termos de operações por segundo. Além da mudança física dos dados, também existe a mudança de modelo.
- **Variedade:** Dados podem se comportar de formas diversas. Conectados, desconectados, densos ou esparsos. Por isso que muitos bancos possuem NULLs dentro das tabelas para se ajustar ao futuro.

## Tecnologia de armazenamento em grafos

Existem duas principais propriedades importantes em um banco de grafos:

- **Graph storage**: Alguns gerenciadores usam armazenamento nativo de grafos, enquanto outros usam modelos não relacionais para expressar grafos
- **Graph processing Engine**: O modelo nativo de grafos é mais rápido, pois os nós e relacionamentos estão fisicamente apontando uns para os outros, isto é chamado de *adjacência livre de índices*


