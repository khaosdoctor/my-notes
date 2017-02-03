# OutSystems

<!-- TOC -->

- [OutSystems](#outsystems)
  - [Service Studio](#service-studio)
    - [Layers](#layers)
  - [Publicando para um servidor](#publicando-para-um-servidor)
    - [Compare e Merge - Desenvolvimento em times](#compare-e-merge---desenvolvimento-em-times)
  - [Ciclo de vida de uma aplicação](#ciclo-de-vida-de-uma-aplicação)
    - [Ações](#ações)
  - [Modelando dados](#modelando-dados)
    - [Entity](#entity)
      - [Atributos](#atributos)
      - [System Actions](#system-actions)
    - [Static Entity](#static-entity)
    - [Structure](#structure)
  - [Variáveis](#variáveis)
    - [Listas](#listas)
  - [Noções básicas de arquitetura](#noções-básicas-de-arquitetura)
    - [Programação Modular](#programação-modular)
      - [O que pode se tornar publico em um módulo](#o-que-pode-se-tornar-publico-em-um-módulo)
    - [Consumindo dependências](#consumindo-dependências)
      - [Atualização de dependentes](#atualização-de-dependentes)
    - [Padrões comuns](#padrões-comuns)
      - [Agrupamento de telas](#agrupamento-de-telas)
      - [Abstração de integração](#abstração-de-integração)
      - [Encapsulamento de negócio](#encapsulamento-de-negócio)
      - [Alto uso](#alto-uso)
  - [Widgets I](#widgets-i)
    - [Criando um widget](#criando-um-widget)
    - [Widgets de exibição](#widgets-de-exibição)
      - [Expression Widget](#expression-widget)
      - [Text Widget](#text-widget)
      - [Labels](#labels)
    - [Widgets de input](#widgets-de-input)
      - [Input](#input)
    - [Widgets de Navegação](#widgets-de-navegação)
    - [Widgets de construção](#widgets-de-construção)
      - [Container](#container)
      - [Table](#table)
    - [Widgets de gravação](#widgets-de-gravação)
      - [Form](#form)
      - [Table Records](#table-records)

<!-- /TOC -->

## Service Studio

O service studio é o IDE da plataforma, aonde estaremos passando a maior parte do tempo com desenvolvendo o código e a lógica do sistema.

Ele é dividido em algumas partes:

- Toolbox: Possui todos os widgets que existem para determinado modelo de desenvolvimento (por exemplo, se estamos desenvolvendo a UI, então teremos componentes de UI)
![](https://i.imgur.com/H1uJPTA.png)
- Canvas: Aonde estará a nossa aplicação (Seja a lógica ou o UI)
![](https://i.imgur.com/55wEMlf.png)
- No topo temos:
  - Visualização de devices: Permite mudar o tamanho das telas para vários tipos de dispositivos
  ![](https://i.imgur.com/FkzE7o1.png)
  - Syles: Permite editar os estilos de textos
  ![](https://i.imgur.com/a3K6eHQ.png)
  - BreadCrumb de formulários: Permite visualizar todo o caminho do formulário atual, aqui é possível saber aonde estamos localizados dentro da aplicação
  ![](https://i.imgur.com/7eDvSRa.png)
- No canto direito:
  - Temos o painel de navegação
  ![](https://i.imgur.com/LVg1r1L.png)
  - Painel de propriedades
  ![](https://i.imgur.com/yY4dGYv.png)

Dependendo do modelo lógico selecionado no topo direito, teremos uma visualização diferente no canvas:

![Visualização Lógica](https://i.imgur.com/tgX23gr.png)

Assim como os objetos que aparecem no toolbox:

![](https://i.imgur.com/NZu1nUx.png)

Entre o menu do topo e os objetos do canvas, temos o menu de layers:

![](https://i.imgur.com/Oo5mv4g.png)

### Layers

Os layers são as diferentes camadas da aplicação

- Data: Camada de dados, aonde poderemos acessar os dados do nosso módulo
![](https://i.imgur.com/Q16X9Vy.png)
- Lógico: Aqui poderemos criar lógicas que serão chamadas em qualquer parte do módulo, como também webservices que serão criados e consumidos, todas as exceptions e tratamentos também são definidos aqui
![](https://i.imgur.com/L5XC2UD.png)
- Interface: Camada de visualização, todas as imagens e o que o usuário verá ficarão aqui
![](https://i.imgur.com/Loyyxpj.png)
- Processos: Processos que são chamados de assícronos, como processos em background ou qualquer outro processo não linear
![](https://i.imgur.com/ffW0DNQ.png)

## Publicando para um servidor

Primeiramente teremos que verificar que nossa aplicação está completamente perfeita para que possamos enviar para o servidor.

Ao longo do desenvolvimento o _service studio_ vai fazer constantes verificações de sintaxe e erros que vão garantir que a aplicação está ok.

### Compare e Merge - Desenvolvimento em times

O suporte colaborativo é permitido quando um ou mais programadores estão desenvolvendo o mesmo módulo, o sistema irá perguntar se você deseja subir a sua versão atual ou mesclar as alterações, assim teremos uma tela que mostrará no lado esquerdo a __sua versão__ e no lado direito __a versão existente no servidor__ que foi publicada por outra pessoa.

![](https://i.imgur.com/QURxPpC.png)

Este menu pode ser acessado pelo menu:

![](https://i.imgur.com/Q8gbkK9.png)

## Ciclo de vida de uma aplicação

Como qualquer aplicação web o ciclo de vida de um sistema inicia-se pelo clique no link de uma página na web.

O computador local envia uma requisição que é respondida por um servidor.

Até ai todas as aplicações web são iguais. Porém é possível que cada requisição, que sejam devolvidos dois tipos de documentos: Estáticos e dinâmicos.

Conteúdos estáticos são imagens, pdf's e etc, enquanto conteúdos dinâmicos são geralmente páginas HTML.

Conteúdos dinâmicos necessitam de um processamento por parte do servidor

![](https://i.imgur.com/jxr8yex.png)

Neste processamento é que nascem as variáveis no Outsystems:

![](https://i.imgur.com/BK6Msm2.png)

- Input Parameters: São parametros via GET, só existem durante a renderização da tela.

Todas as variáveis de aplicação são inicializadas durante o processo de renderização de tela e existem nesta parte apenas.

### Ações

Todas as ações de preparações são realizadas na etapa de preparação que está localizada no _service studio_ na nossa layer interface

![](https://i.imgur.com/ssmlv2n.png)

A etapa de preparação carrega todos os dados necessários para passar para os widgets que serão carregados para a tela.

## Modelando dados

O OutSystems trabalha com dados __fortemente tipado__, ou seja, todas as variáveis são tipadas e precisam seguir este tipo até o fim de sua vida:

![](https://i.imgur.com/vGtI7af.png)

O processo de modelamento de dados é mapear os conceitos principais da aplicação em modelos de dados e variáveis.

Muitas vezes essa modelagem se torna complexa demais para um tipo de dados primário, portanto é possível separar em três tipos de dados compostos

### Entity

É o mais comum de todos os tipos. Representa uma "Classe", como um cliente, uma ordem ou um pedido.

- Uma entity é persistida no banco de dados através de uma tabela, cada nova instancia é uma linha nesta tabela

A plataforma cria automaticamente essas tabelas quando usando entities.

Uma _entity_ é definida por um número arbitrário de campos chamados __atributos__ e suporta uma coleção de métodos CRUD.

Para criar uma entidade basta seguirmos os passos abaixo:

![](https://i.imgur.com/A1hcAnr.png)

#### Atributos

Um atributo é uma coluna de uma _entity_ que representa um tipo básico como visto antes.

Toda _entity_ possui um atributo ID que é criado automaticamente

PAra criar um novo atributo basta seguirmos os passoa abaixo:

![](https://i.imgur.com/Ekpnhf5.png)

#### System Actions

A cada _entity_ criada, uma série de ações é criada sobre a mesma. Estas ações são passos lógicos que podem ser utilizados em qualquer parte da lógica da aplicação.

É o CRUD básico:

![](https://i.imgur.com/ryYLRq5.png)

![](https://i.imgur.com/WaFR03N.png)

### Static Entity

É basicamente uma _entity_ estática, ela é criada dentro do _service studio_ de forma estática e não pode ser modificada após isso.

Em outras palavras, essas entidades são fixas e não podem ser modificadas após a criação.

![](https://i.imgur.com/YAiUiYq.png)

Uma boa utilidade para entidades estáticas, é para definir listas de valores que não se alteram, como uma lista de países:

![](https://i.imgur.com/rtC7aku.png)

Usamos o acesso a estas entidades desta forma:

![](https://i.imgur.com/JtS2kKj.png)

### Structure

É o ultimo tipo de tipo composto, é muito similar a uma entidade, mas ela não referencia uma tabela, ou seja, ela existe apenas na memória e não existe na persistencia de dados.

Muito utilizadas para dados temporários.

Como não é necessário seguir os padrões do banco de dados, é possivel então ter entidades dentro de estruturas ou até outras estruturas dentro de estruturas.

Para criar podemos usar:

![](https://i.imgur.com/hsbp4rO.png)

> Veja que temos três campos, um deles é uma entidade customer, o outro é uma entidade estática de países e o terceiro é um atributo simples de data.

## Variáveis

Variáveis são locais de armazenamento nomeados que contém dados de um certo tipo. No OutSystems, variáveis são geralmente compostas de tipos básicos (mas não só) e ficam localizadas na memória.

Todas as variáveis __só existem dentro de um escopo particular__, aonde a aplicação pode acessa-la e modificar seus valores. Quando o código sai deste escopo, a variável é destruída.

Dependendo de como esses valores chegam ou saem de um escopo, a variável pode ser definida como: Input, Output ou Local.

- Input: Parâmetros de entrada de uma ação
- Output: Parâmetros de saída após a ação, e está disponível para o contexto que a chamou
- Local: Parâmetro só existe dentro da ação

![](https://i.imgur.com/2kc9zj0.png)

### Listas

Uma lista é um array de variáveis de um determinado tipo. É possível ter uma lista de um tipo único ou vários tipos combinados.

Um exemplo, possuimos um _aggregate_ (que é uma query) e buscamos todos os usuários chamados Michael, este retorno nos dará uma lista de resultados que podemos iterar:

![](https://i.imgur.com/dAzD4UT.png)

Veja que na variável de saída temos `GetCustomersNamedMichael.List.Current.Customer.LastName`, ou seja, estamos buscando o atributo `LastName` do valor atual contido na lista retornada por `GetCustomersNamedMichael`.

## Noções básicas de arquitetura 

> [Exercicios](Exercicios/Ex 1 - Modelando Dados.zip)

Uma boa arquitetura de sistemas vai melhorar a forma de desenvolvimento, permitindo que mudanças sejam aplicadas mais rápidas, melhoras na complexidade da aplicação e muitas outras vantagens.

### Programação Modular

Uma técnica de design que consiste em dividir a aplicação em módulos com uma __única responsabilidade__, permitindo que uma aplicação seja simples o suficiente para resolver o único problema que ele se propõe a resolver enquanto expõe dados pertinentes a aplicações externas, desta forma (através de encapsulamentos) é possível expor apenas o necessário para a aplicação externa.

Uma aplicação completa no OutSystems é composta de vários módulos.

> Um módulo pode compartilhar elementos com outros módulos. Estes elementos são chamados de __públicos__

- Um módulo que compartilha uma funcionalidade com outro módulo é chamado de **_Producer_**
- Um módulo que usa uma funcionalidade exposta por outro módulo é chamado de **_Consumer_**

#### O que pode se tornar publico em um módulo

Entre os tipos de dados mais comuns de publicação em um módulo temos:

- Dados:
  - Entities
  - Structures
- Lógico:
  - Actions
  - Roles
- Interface
  - Web Blocks
  - Web Screens

### Consumindo dependências

Para podermos de fato acessar o que é exposto em um módulo vamos utilizar a tela de __Gerenciamento de dependências__ localizada neste menu:

![](https://i.imgur.com/HE74w7w.png)

Esta tela irá exibir as dependências publicas do sistema. Para consumir esta dependencia basta checar o box ao lado da mesma que ela vai ficar disponível em seu módulo como qualquer outro.

#### Atualização de dependentes

Quando uma atualização é feita em um producer, é necessário que outros consumers também sejam atualizados, desta forma quando um produtor é atualizado temos uma dependencia externa que precisa ser atualizada para que as novas mudanças entrem em vigor.

> É extremamente importante lembrar que __referencias circulares__ devem ser evitadas, uma vez que uma aplicação é o _consumer_ de si mesmo geraria um loop eterno de dependencias

### Padrões comuns

#### Agrupamento de telas

Agrupar todas as telas que preenchem um determinado processo de negócio em um unico local.

#### Abstração de integração

Abstrair todas as funções de uma integração externa e expor apenas a lógica básica, o conceito de encapsulamento e API se aplica em grande parte aqui, pois desta forma é possível esconder toda a complexidade e deixar a usabilidade simples.

#### Encapsulamento de negócio

Encapsular todos os dados e lógica pertinentes a modelos e regras de negócio próximas em um unico módulo ou objeto.

__Exemplo__: Agrupar tudo relativo a usuários em um módulo, Agrupar todas as funções de ordens de compra em um unico módulo

#### Alto uso

Agrupar todas as funções que são muito utilizadas em uma "biblioteca" unica que expõe estas funcionalidades de forma concisa e única.

## Widgets I 

> [Exercício](Exercicios/Ex 2 - Widgets.zip)

Um widget é um bloco de visualização ou interação entre o usuário e a aplicação.

> Todos os elementos visuais que compõe uma aplicação são chamados de widgets

Um widget pode permitir input ou exibição de dados em diversos formatos, ele também permite que o usuário interaja com o mesmo de forma fluida.

- Widgets básicos de exibição
  - Static Text
  - Dynamic Expressions
  - Labels
- Widgets básicos de input
  - Inputs
- Widgets básicos de navegação
  - Botões
  - Links

### Criando um widget

Para criar um widget temos que entrar na visualização de tela e arrasatar o widget da barra de ferramentas para a posição que queremos.

![](https://i.imgur.com/5fGiRg8.png)

### Widgets de exibição

#### Expression Widget

Usado para exibir dados calculados na tela. Se você especificar um exemplo, ele será usado para exibição no modo design

![](https://i.imgur.com/pnnavee.png)

#### Text Widget

Exibição de um texto estático

![](https://i.imgur.com/zE9UOw6.png)

#### Labels

Labels são apenas textos estáticos assim como os texts, porém podem ser atrelados a um dos widgets de input abaixo, desta forma se um input for obrigatório ou tiver um tipo de dado específico, a label possuirá uma indicação visual para tal

![](https://i.imgur.com/8U1mVuU.png)

Clicar em uma label associada a um input vai mover o cursor para o input associado.

### Widgets de input

#### Input

O input é o modelo básico de inserção de dados pelo usuário, ele mostra uma caixa de texto para digitação simples.

Todo o input está atrelado a uma variável que irá obter o valor que será digitado

![](https://i.imgur.com/w7M8sUv.png)

Podemos ditar qual é o tipo de dados que queremos receber neste widget, bem como podemos também configurar se é obrigatório ou não e também assinalar um _Null Value_, que será o valor que a variável vai obter se o input for nulo.

O prompt também pode ser digitado e agirá como um placeholder

### Widgets de Navegação

Todos os widgets de navegação necessitam de um destino com uma tela para navegarem ou uma ação para ser executada.

![](https://i.imgur.com/eOdpQI2.png)

O método de navegação ou _submit_ é especificado na sessão _Method_.

Links e botões funcionam basicamente da mesma forma, com a diferença de que os links são mais flexíveis a alterações, uma vez que você pode injetar icones e textos mais diversos que não são disponíveis em botões.

### Widgets de construção

#### Container

Agrupa widgets e permite que você aplique um estilo comum a todos eles. É basicamente uma div.

![](https://i.imgur.com/Uo8xwrZ.png)

Todo conteúdo dentro do container vai receber o mesmo estilo.

um dos exemplos é esconder todos os elementos dentro deste container através da propriedade _display_.

#### Table

A table é basicamente uma tabela, exibindo seus conteúdos de forma tabular, ou seja, o container de forma fixa com linhas e colunas.

### Widgets de gravação

Um widget de gravação opera sobre um unico registro, ou seja, eles estão ligados a um unico registro com vários widgets internamente.

#### Form

O Form permite que você mostre e edite um unico registro, pode conter widgets de input dentro e uma propriedade local para armazenar os dados inseridos.

![](https://i.imgur.com/TLkTZWc.png)

Ele é atrelado a um _source record_, que é um registro na tabela que define o tipo de dados das propriedades locais e também carrega a variável interna com os dados iniciais. O _source record_ é o ponteiro que vai definir qual registro o form está editando.

Um form pode conter não só Inputs, mas pode também conter qualquer coisa, não existe restrição de layout, desta forma é possível incluir containers, labels ou qualquer outro tipo de widget

#### Table Records

O mesmo que o formulário, porém ao invés de estar ligado a um unico registro, ele exibe todos os dados de uma entidade de forma tabular, como um grid de relatório.

![](https://i.imgur.com/lQaPAtx.png)

Uma tabela está ligada a um _source record_ da mesma forma como o formulário, porém esta propriedade pode ser uma outra entidade publica que está sendo chamada.

Cada linha da tabela será a iteração do _source record_ para cada linha. Você pode incluir qualquer tipo de widgets dentro de uma tabela. Assim como no formulário, você não é limitado a layouts, mas lembre-se que isto é traduzido para uma tabela HTML.
