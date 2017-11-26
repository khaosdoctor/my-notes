# OutSystems

> Plataforma low-code de desenvolvimento RAD com backend em ASP ou Java

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
  - [Modelando Relacionamentos](#modelando-relacionamentos)
    - [Relações comuns](#relações-comuns)
      - [1 para 1](#1-para-1)
      - [1 para N](#1-para-n)
      - [N para N](#n-para-n)
    - [Integridade Referencial](#integridade-referencial)
    - [Indices](#indices)
    - [Diagrama de entidades](#diagrama-de-entidades)
      - [Criando um modelo MER](#criando-um-modelo-mer)
  - [Interação de ciclo de vida](#interação-de-ciclo-de-vida)
    - [Navegação no client-side](#navegação-no-client-side)
    - [Navegação server-Side (submit)](#navegação-server-side-submit)
    - [Screen actions](#screen-actions)
      - [Criando Screen Actions](#criando-screen-actions)
  - [Debugging e Monitoramento](#debugging-e-monitoramento)
    - [Personal area](#personal-area)
  - [Exception](#exception)
  - [Monitoramento de logs](#monitoramento-de-logs)
  - [Queries de dados](#queries-de-dados)
    - [Resultados de saída](#resultados-de-saída)
    - [Aggregates](#aggregates)
      - [Joins](#joins)
        - [Ad Hoc Attributes](#ad-hoc-attributes)
      - [Group by](#group-by)
      - [Filtros](#filtros)
        - [Test Values](#test-values)
      - [Ordenação](#ordenação)
        - [Ordenação dinâmica](#ordenação-dinâmica)
    - [SQL Queries](#sql-queries)
      - [Parâmetros](#parâmetros)
      - [Outros usos](#outros-usos)
    - [Registros de muitas entidades](#registros-de-muitas-entidades)
  - [Widgets II](#widgets-ii)
    - [If](#if)
    - [Widgets de escolha](#widgets-de-escolha)
      - [Checkbox](#checkbox)
      - [Radio Buttons](#radio-buttons)
      - [Combo Box](#combo-box)
        - [Todo o conteúdo](#todo-o-conteúdo)
        - [Uma query personalizada](#uma-query-personalizada)
        - [Valores específicos](#valores-específicos)
        - [Mesclas](#mesclas)
    - [List records](#list-records)
  - [Actions e reusabilidade de código](#actions-e-reusabilidade-de-código)
    - [O que é uma action](#o-que-é-uma-action)
    - [Assign Statement](#assign-statement)
    - [If](#if-1)
    - [Switch](#switch)
    - [For Each](#for-each)
    - [Loops](#loops)
    - [Saídas](#saídas)
  - [Validação de Inputs](#validação-de-inputs)
    - [Opções de validação](#opções-de-validação)
    - [Validação do tipo Server](#validação-do-tipo-server)
      - [Escrevendo validações personalizadas](#escrevendo-validações-personalizadas)
    - [Como exibir mensagens de validação para o usuário](#como-exibir-mensagens-de-validação-para-o-usuário)
  - [Interações AJAX](#interações-ajax)
    - [Recarregando dados](#recarregando-dados)
    - [Widgets Ajax](#widgets-ajax)
  - [Web Blocks e Reusabilidade](#web-blocks-e-reusabilidade)
    - [Como criar um novo web Block](#como-criar-um-novo-web-block)
    - [Notificações](#notificações)
    - [Placeholders](#placeholders)
  - [Segurança](#segurança)
    - [Controle de acesso](#controle-de-acesso)
    - [Usuários e grupos](#usuários-e-grupos)
    - [Basicos de perfis](#basicos-de-perfis)
      - [Checando permissões de perfil](#checando-permissões-de-perfil)
  - [Sessões](#sessões)
    - [Escopo de dados em sessão](#escopo-de-dados-em-sessão)
    - [Ciclo de vida de uma sessão](#ciclo-de-vida-de-uma-sessão)
    - [Criando variáveis de sessão](#criando-variáveis-de-sessão)
    - [Criando Cros-Session Properties](#criando-cros-session-properties)
  - [Web Services](#web-services)
    - [SOAP](#soap)
    - [REST](#rest)
    - [Criando Web Services SOAP](#criando-web-services-soap)
      - [Consumer](#consumer)
      - [Producer](#producer)
    - [Criando serviços ReST](#criando-serviços-rest)
      - [Consumidor](#consumidor)
      - [Expondo API's ReST](#expondo-apis-rest)
  - [Temas e estilos](#temas-e-estilos)
    - [Escrevendo CSS](#escrevendo-css)
    - [Templates](#templates)
    - [O Web Block do Menu](#o-web-block-do-menu)
  - [Scaffolding e RichWidgets](#scaffolding-e-richwidgets)
    - [Scaffolding](#scaffolding)
      - [Scaffolds disponíveis](#scaffolds-disponíveis)
        - [Telas de listagem](#telas-de-listagem)
        - [Telas de detalhamento](#telas-de-detalhamento)
    - [RichWidgets](#richwidgets)
      - [Popup Editor](#popup-editor)
      - [List Navigation](#list-navigation)
      - [List Sort Column](#list-sort-column)
  - [Silk UI](#silk-ui)
    - [Instalando o SilkUI](#instalando-o-silkui)

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

> [Exercicios - Modelagem](Exercicios/Ex_1_Modelando Dados.zip)

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

> [Exercício - Widgets I](Exercicios/Ex_2_Widgets.zip)

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

## Modelando Relacionamentos

Relações entre dados é uma questão muito comum em sistemas integrados, o dado raramente está sozinho em uma tabela.

Para fazer a ligação entre a chave primária e estrangeira basta que as duas chaves sejam ligadas entre as entidades.

Uma tabela possui sempre um Id que é auto inserido ao criar, esse ID é um número auto gerado, mas é possível mudar para qualquer outro tipo.

> Não existem chaves compostas no OutSystems

Para implementar uma chave estrangeira no OutSystems, inserimos outra coluna na segunda tabela com o nome da primeira tabela + Id (como em `PersonId`) vai criar uma relação entre uma tabela e outra por este campo.

### Relações comuns

> [Exercicios - Relações](Exercicios/Ex_3_Relações.zip)

#### 1 para 1

Neste caso a tabela base compartilha o seu identificador com a outra e apenas isto.


![](https://i.imgur.com/Eb9iluf.png)

Nestes casos a primeira tabela é dependencia da segunda, você não poderia ter uma biografia sem um autor, bem como não podemos ter mais de uma biografia por autor.

#### 1 para N

Quanto a entidade de detalhe referencia mais de uma vez a tabela mestre. Por exemplo, um livro e um publicador

![](https://i.imgur.com/ZuURzlB.png)

Enquanto um livro pode ser poblicado por um unico publicador, mas um publicador pode ter vários livros publicados.

#### N para N

O chamado caso de entidade de junção.

Neste caso temos uma tabela no meio que junta outras duas tabelas.

![](https://i.imgur.com/fqLRqFN.png)

### Integridade Referencial

Para forçar a integridade referencial nas relações podemos especificar uma regra de delete:

![](https://i.imgur.com/i806CAM.png)

- Protect: Não deixa que a instancia pai seja removida antes de remover o filho
- Delete: Deleta em cascata, deletando o pai, todos os filhos são automaticamente removidos
- Ignore: Não garanta integridade referencial

### Indices

É possível criar indices em atributos especificos da tabela. Todos os atributos de referencia automaticamente vão possuir um indice (uma chave primária ou estrangeira).

### Diagrama de entidades

> [Exercicios - MER](Exercicios/Ex_4_MER.zip)

É possível utilizar o _service studio_ para criar um MER que situa melhor o desenvolvedor.

![](https://i.imgur.com/GqEvfSJ.png)

#### Criando um modelo MER

Para realizar a criação de um modelo de entidades, basta abrir o módulo correspondente, ir na aba "Data" e clicar no icone _Entity Diagrams_ com o botão direito o mouse e selecionar _Add entity diagram_

![](https://i.imgur.com/gzuIDcA.png)

Após isto, arraste as tabelas para o centro do diagrama para criar sua representação visual.

Ao arrastar uma entidade sobre outra entidade do diagrama, como por exemplo MovieGenre sobre Movie, automaticamente o sistema vai criar o relacionamento entre o Id da entidade que foi arrastada para cima (neste caso MovieGenre) com o campo correspondente ao _MovieGenre Identifier_ na tabela Movie:

![](https://i.imgur.com/e1eB7Jo.png)

Perceba que na tabela _Movie_, o campo _GenreId_ é do tipo _MovieGenre Identifier_, ou seja, é o identificador de Id da tabela MovieGenre

![](https://i.imgur.com/pMSPzx4.png)

> O Outsystems dá tipos automaticamente para a tabela dependendo do nome do campo utilizado, exemplo, Amount geralmente é traduzido para double ou Integer

Ao criar entidades de relacionamento (para relacionamentos N para N) e adicionar no diagrama, automaticamente o sistema gera os relacionamentos para a entidade adicionada dependendo dos campos informados como Identifiers.

![](https://i.imgur.com/0a3dmKl.png)

## Interação de ciclo de vida

> [Exercicios - MER](Exercicios/Ex_5_Lifecycle.zip)

Na plataforma OutSystems, os usuários podem interagir com a aplicação em três maneiras:

- Seguindo links (Navegação)
- Completando campos (Inserção de dados)
- Apertando botões (Submit)

A cada interação descrita acima, o servidor vai enviar uma nova requisição.

### Navegação no client-side

Utilizando links e botões é possível criar navegações no lado do cliente, usando o browser, para navegar para outras URL's:

![](https://i.imgur.com/ydRLCSg.png)

Navegação via links utilizam o método GET, ou seja, todos os parâmetros que forem enviados serão mandados pela URL. Desta forma os dados preenchidos nos inputs de dados e campos de preenchimentos não serão enviados para a URL final.

> O Link é mais indicado quando queremos criar um set de interações completamente novo em outra tela, ou seja, queremos limpar todos os dados das requisições anteriores

### Navegação server-Side (submit)

Diferentemente do Link, o botão submit leva com ele todos os dados que o usuário incluiu pelo método POST do HTTP, desta forma, ele é mais indicado para quando queremos iniciar uma ação ou executar alguma função ou método no servidor que não é possível executar via GET.

> O método POST também não permite que o usuário veja os dados em texto plano na URL

![](https://i.imgur.com/xXiG9rc.png)

Desta forma do lado do servidor teremos uma ação que vai processar os dados enviados pelo usuário e, talvez, interagir com banco de dados ou então apenas retornar uma resposta.

### Screen actions

As screen actions são métodos pertencentes a uma aplicação, executando lógicas do lado do servidor.

Uma _screen Action_ tem acesso a todo o input digitado pelo usuário na tela, bem como todos os parâmetros de entrada e variáveis locais. Uma _action_ também pode escrever saídas de dados para a ação original.

Todo o fluxo de lógica de uma _action_ termina com um _End Node_ ![](https://i.imgur.com/dBb0QFA.png), que faz com que a navegação permaneça na mesma tela e reexecuta os scripts de preparação, reconstruindo a tela (refresh), mas todos os valores e variáveis de tela (incluindo widgets) são preservados.

Quando uma ação é finalizada com um redirecionamento, todos os dados da tela anterior são removidos em preparação para a nova requisição

![](https://i.imgur.com/a6JwZYG.png)

#### Criando Screen Actions

Criar uma screen action é bastante simples, basta adicionar um botão e usar o campo de destination para criar uma nova action:

![](https://i.imgur.com/xJrC1pn.png)

Ou então criar uma nova action clicando com o botão direito sobre a tela:

![](https://i.imgur.com/PNWtFhg.png)

A partir daí basta clica duas vezes sobre a ação para exibir a lógica:

![](https://i.imgur.com/ssXXELC.png)

## Debugging e Monitoramento

Todo o código é sujeito a erros, lógicos, sintaxe e outras exceções. Também existem problemas de performance, segurança ou conexão.

Utilizar o debug no OutSystems é bem simples, basta incluir um breakpoint em qualquer elemento que gera código durante a compilação (como actions, widgets e etc)

![](https://i.imgur.com/8Wlb1HZ.png)

Isso gerará uma marca visível:

![](https://i.imgur.com/ipXxfEF.png)

Por padrão, o debugger não vem ativado, é necessário inicializa-lo para que ele possa monitorar o que está acontecendo na aplicação.

Você pode fazer isto pelo painel abaixo do service studio:

![](https://i.imgur.com/AJto8bW.png)

Ao lado, existem diversas ações que o debugger pode tomar:

![](https://i.imgur.com/XPTTqn9.png)

Uma vez iniciado, o debugger vai mostrar diversas informações quando parar:

![](https://i.imgur.com/736W6r9.png)

- __In Use__: Esta sessão mostra o que está sendo executado e usado no código que está em execução no momento, bem como os dados da última requisição
- __Locals__: Todas as variáveis que são locais a tela
- __Widgets__: Todas as variáveis relativas a widgets na tela
- __Session e site__: Os valores globais de sessões e do site
- __Watches__: Watches é aonde você pode selecionar as variáveis que irão aparecer aqui a fim de juntar variáveis de abas diferentes na mesma área

### Personal area

Por padrão a aplicação é compilada na área publica do servidor, alternativamente é possível compilar e debugar o código na área pessoal.

- Não impacta na versão da aplicação principal
- Republicação é mais rápida uma vez que é local

![](https://i.imgur.com/H2VdGWn.png)

A área pessoal é uma área por usuário que você pode usar para testar novas features sem impactar na aplicação principal.

> __Nota:__ Se você fizer uma mudança no modelo de dados, é preciso primeiro republicar o modelo no servidor publico e depois no servidor pessoal, porque o DB é um recurso separado

## Exception

Quando algo acontece e aciona uma exceção, o código sai do fluxo normal e entra em um outro fluxo de dados chamado de _error handler_.

É possível criar fluxos de dados para exceções específicas já pré definidas, bem como definir e lançar suas próprias exceções explicitamente, também é possível definir um handler geral para capturar todas as exceções.

No tratamento de exceções a hierarquia vai do mais específico para o mais geral, então se uma exceção é compatível com um tratamento específico dela, isto será executado, caso contrário o caso geral é feito.

![](https://i.imgur.com/avxIs7w.png)

![](https://i.imgur.com/zDDaV9u.png)

Um _error handler_ tem várias opeações e atributos que podem ser setados de acordo com as preferencias do usuário:

- Abort transaction: Define se todas as transações no banco de dados devem sofrer rollback
- Log error: Define se este erro deve gerar um log na plataforma

## Monitoramento de logs

O monitoramento de logs é uma prática comum para verificar se erros ocorrem ou padrões de performance precisam de melhorias.

O monitoramento de logs é feito através do service center, na aba _monitoring_.

![](https://i.imgur.com/ykDx2VG.png)

## Queries de dados

> [Exercicios - Dataqueries e Widgets II](Exercicios/Ex_6_Queries_e_Widgets.zip)

É possível extrair dados personalizados do banco através de dois componentes, os _Aggregates_ e as _SQL queries_.

![](https://i.imgur.com/kplK6TE.png)

- Aggregates
  - Não é necessário utilizar SQL para trazer os dados
  - Fácil de criar e manter
  - Não depende de nenhum dialeto de SQL (Agnóstico a bancos)
  - Automaticamente otimizado pela plataforma
- SQL Queries
  - Feito para rodar queries personalizadas
  - Executa SQL puro
  - Acesso a features do DBMS
  - Operações em lote (INSERT, UPDATE, DELETE) possíveis

### Resultados de saída

Os resultados que tanto o _aggregate_ quanto a _SQL query_ retornam são similares:

![](https://i.imgur.com/1XdhJav.png)

- Output do Aggregate/SQL Query
  - List: É a tabela resultante da consulta
  - Count: Contagem total de linhas

- _"List.Current"_ do Aggregate/SQL Query
  - O tipo bate com a definição da query
  - O valor aponta para a primeira linha por padrão, se move por todas as linhas enquanto itera
  - Preenchido com valores padrões se nenhuma linha é retornada

### Aggregates

Permitem que você desenhe e teste suas queries antes de, de fato colocar em produção. Ele é todo baseado na interface e não necessita de nenhum SQL.

#### Joins

Temos 3 tipos de joins em aggregates.

- Join only with: Equivalente ao `INNER JOIN`, só vai trazer valores que tem correspondentes nas duas tabelas
- Join with or Without: Equivalente ao `LEFT JOIN`, vai trazer dados independente se os correspondentes existem
- Join with: É o equivalente ao `FULL OUTER JOIN`, é o join mais aberto que existe, ele vai combinar as duas tabelas independente da relação existir ou não

##### Ad Hoc Attributes

É possível adicionar atributos computados a partir de outros atributos, os chamados campos derivados, através da interface:

![](https://i.imgur.com/2WcC5bl.png)

#### Group by

É possível agrupar os dados através de expressões (como o group by faz) e utilizar as funções de agregação como sum, max, min e etc.

![](https://i.imgur.com/Ms1dCPq.png)

No exemplo acima temos a coluna Count que é uma agregação dos dados contidos na tabela, selecionada em azul.

#### Filtros

São efetivamente a clausula where do SQL:

![](https://i.imgur.com/Xf2NXjY.png)

Podemos usar qualquer variável ou atributo que esteja dentro do escopo dessa query.

##### Test Values

Por padrão todos os valores dos filtros aparecem na aba _test values_ a fim de que seja possível testar a query ao longo do desenvolvimento.

![](https://i.imgur.com/FBIVdSs.png)

#### Ordenação

Existe uma aba de ordenação no aggregate que é bem auto explicativa

![](https://i.imgur.com/nmmg3Ch.png)

##### Ordenação dinâmica

Se você precisa explicitamente de uma ordenação dinâmica, é possível adicionar uma expressão de texto no formato `{entity}.[attribute]`, por exemplo, `{client}.[id]` ou então o nome do atributo.

![](https://i.imgur.com/5jc4wUA.png)

Esta ordenação permite que uma variável com a coluna seja trazida.

### SQL Queries

É o modelo simples de query.

![](https://i.imgur.com/14jWcui.png)

O painel é bem simples e nele é possível fazer algumas coisas:

- Especificar os parâmetros de entrada
- Especificar os parâmetros de saída
  - Estruturas
  - Entidades
- Escrever o SQL manualmente
  - Atributos com nome dinâmico
  - Syntax Check para o SQL
  - Highlight

Existem abas de valores de teste para que seja possível testar os dados colocados, bem como as saídas e o resultado final da query.

![](https://i.imgur.com/jLnYDy5.png)

![](https://i.imgur.com/rQtGCiV.png)

![](https://i.imgur.com/FLLjmsT.png)


#### Parâmetros

A sintaxe de parâmetros das queries é bem específica, você deve escrever:

- Nomes de entidades como `{Entidade}`
- Nomes de atributos como `{Entidade}.[Atributo]`
- Parâmetros como `@NomeDoParametro`

![](https://i.imgur.com/kNrGf2o.png)

> É importante dizer que as SQLQueries são como "caixas pretas", elas não tem acessos a nada fora delas

#### Outros usos

Um dos usos para a SQL Query é escrever queries que não retornam valores, como DELETE, UPDATE (e não quer usar uma ação do aggregate) e TRUNCATE.

O código pode ser escrito normalmente como se fosse um código SQL normal, porém uma estrutura ainda tem que ser enviada como saída, ela pode ser uma estrutura "dummy"

![](https://i.imgur.com/iLhA4xw.png)

### Registros de muitas entidades

Quando utilizamos joins ou colunas ad hoc o resultado será uma lista de entidades lado a lado, ou seja, o aggregate vai trazer todas as entidades relacionadas, bem como todos os registros de ambas que fizerem parte da regra:

![](https://i.imgur.com/u318WKd.png)

O ponto principal é que podemos criar tipos complexos a partir de variáveis para armazenar outros tipos de atributos além das nossas linhas retornadas, no exemplo abaixo criamos um novo atributo chamado `ExtraTextAttribute` dentro da estrutura que já contem a combinação das estruturas de `Cinema`, `Movie` e `MovieSession`.

![](https://i.imgur.com/XsWT7co.png)

## Widgets II

> [Exercicios - Dataqueries e Widgets II](Exercicios/Ex_6_Queries_e_Widgets.zip)

Além dos widgets normais temos também os widgets que permitem escolhas como `ifs`, `RadioButtons` e etc.

### If

Mostra um conteúdo baseado em uma condição.

Quando criamos um elemento na tela, como uma label, por exemplo, podemos criar um _enclosing if_. Este if vai ter três "bolinhas" de seleção, cada uma delas representa um caminho da lógica de escolha, uma para a condição, outra para o caminho verdadeiro e outra para o falso:

![](https://i.imgur.com/5uoLEai.png)

A condição pode obter o nome de qualquer parâmetro ou atributo que o escopo permite acesso.

### Widgets de escolha

#### Checkbox

Todo checkbox é atrelado a uma variável que precisa, por definição, ser um boolean, já que é um tipo de resposta binário.

![](https://i.imgur.com/5Zl20Jp.png)

#### Radio Buttons

Cada RadioButton te dá uma unica opção, cada RadioButton precisa estar atrelado a uma variável, e é essa variável que vai ditar quais RadioButtons que fazem ou não parte de um mesmo grupo:

![](https://i.imgur.com/VtYimDj.png)

Quando o RadioButton é selecionado, o valor que é escrito é o atributo valor que está associado a ele:

![](https://i.imgur.com/PAw1oKu.png)

#### Combo Box

O ComboBox assim como o Radio, permite que o usuário escolha uma entre muitas alternativas. Ele possui vários modos de funcionamento.

##### Todo o conteúdo

O primeiro modo de funcionamento é mostrar todo o conteúdo de uma entidade.

![](https://i.imgur.com/foB38RL.png)

O _source attribute_ é o valor que será exibido na caixa para o usuário como display (este atributo é opcional).

O combo box precisa ser atrelado a uma variável que vai obter o valor do ID do registro selecionado baseado na entidade selecionada.

![](https://i.imgur.com/5DLUm61.png)


##### Uma query personalizada

Ocorre exatamente igual ao anterior, porém utilizando uma query personalizada, neste caso não teremos o atributo de _source entity_ mas sim o _source record list_ que vai obter a lista de registros que foram recebidos pela query.

Neste modo o _source attribute_ não será preenchido automaticamente, mas precisará ser definido. Bem como o ID.

![](https://i.imgur.com/ctCyXkc.png)

Fora isso, o resto do funcionamento é igual

##### Valores específicos

Seria o equivalente ao lookup manual, no Outsystems chamado de SpecialList. Onde são valores definidos pelo próprio programador.

![](https://i.imgur.com/Fo8Sh8A.png)

Neste caso, a opção que estamos selecionando __não__ terá seu valor selecionado em uma variável mas sim em um outro atributo chamado _special variable_, ou seja, ao invés de mandar o valor para o lugar aonde os outros dois mandavam, ele será um pouco diferente.

##### Mesclas

É possível mesclar as duas opções, onde temos valores do banco de dados e preenchidos a mão pelo programador. Quando o SpecialList e outro modo são usados simultaneamente:

- A _bound variable_ (a que é preenchida pelos outros dois modos) será setada para NullIdentifier
- Quando a opção de RecordList é selecionada, a opção de SpecialVariable será setada para 0, "", ou false

É possível selecionar para cada opção um tipo de comportamento.

### List records

Mostra múltiplos registros em um layout _free-form_. É uma propriedade local para armazenamento de dados.

![](https://i.imgur.com/Fo8Sh8A.png)

Durante a execução a ferramenta itera pela lista de registros, é possível definir o que vai separar uma row de outra row. O List Records é como se fosse um array, onde você pode definir um layout base e incluir este layout em um modelo de RecordList e depois iterar por eles.

> Um exemplo seria separar valores separados por virgulas e etc

## Actions e reusabilidade de código

> [Exercicios - Actions](Exercicios/Ex_7_Actions.zip)

A única maneira de criar um código reutilizável é através das _actions_.

- __Screen actions__: Só podem ser ligadas a widgets na mesma tela (geralmente para fluxos específicos de uma tela)
- __User actions__: Podem ser chamados em qualquer _workflow_ (para fluxos gerais que podem ser reutilizados)

Uma action pode ter multiplos parâmetros de entrada e saída.

Uma _user action_ pode ser marcada como uma função, neste caso algumas regras se aplicam:

- Só poderá ter um parâmetro de saída
- Poderá ser usada em expressões

### O que é uma action

Uma action é uma sequencia de código que é executado em uma ordem específica. Cada _Statement_ pode ser colocado após o seguinte formando um workflow de dados que será executado pela action.

### Assign Statement

O _assign_ permite que você atribua valores a uma ou mais variáveis de uma vez. Os valores são atribuidos do primeiro ao último em ordem e tem efeito imadiato.

![](https://i.imgur.com/lKlbMos.png)

A grande maioria dos tipos de dados são atribuidos por cópia/valor, isso significa que uma mudança na variável atribuida não vai alterar a original. Porém existem algumas estruturas que são atribuidas por referencia:

- Qualquer lista
- Dados binários
- Objetos

Neste caso uma alteração no objeto atribuido __será propagado para o original__.

### If

Um condicional que é rodado em tempo de execução, e separa o código em diversos branches.

### Switch

Utiliza o switch case para criar um if encadeado mais simples.

![](https://i.imgur.com/Hn7JOr2.png)

### For Each

Permite a iteração por qualquer tipo de lista (aggregates, SQL queries). 

1. O branch cycle é enviado para a action que será o registro atual
2. Este branch deverá voltar para o `for each` trazendo os dados

> O For each não é um loop como `for` ou `while`, a condição base é fixa

### Loops

Não existem actions especificas para loops genéricos como `for` e `while`, para realizar isto precisamos que haja um `if` este `if` será direcionado para uma ação, que por sua vez será direcionado novamente para o `if`.

![](https://i.imgur.com/ISsjWmN.png)

### Saídas

Os outputs das actions anteriores e em branches diferentes não são visiveis em outro branch, ou seja, quando o branch se separar, os OutputParameters de um não serão visíveis ao outro.

![](https://i.imgur.com/3SyWmeP.png)

## Validação de Inputs

> [Exercicios - Validations](Exercicios/Ex_8_Validations.zip)

A plataforma provê dois tipos de validação diretamente do padrão.

- O usuário __precisa__ preencher um input com a propriedade `mandatory` setada como `true`
- O tipo de dados do input precisa ser o mesmo do tipo de dados do widget

### Opções de validação

Existem dois tipos de validação que um link ou botão podem ter (como são widgets de navegação, então não é necessário uma validação de _submit_):

- __Client & Server__
  1. Executa as validações do lado do cliente
  2. Se válido, manda as informações para o servidor
  3. Validações personalizadas são executadas no lado do servidor
- __Server__
  1. Inputs são submetidos para o servidor sem validação prévia no client-side
  2. Validações padrão e personalizadas são executadas do lado do servidor
- __None__
  1. Nenhuma validação é executada

> Em outras palavras, é possível desligar as validações do lado do cliente para forçar as validações apenas do lado do servidor usando ScreenActions

### Validação do tipo Server

Cada tipo de input possui duas propriedades nativas:

- __Valid__: Propriedade _boolean_ que indica se o input está válido
- __ValidationMessage__: Propriedade _text_ que mostra a mensagem de erro

No modo de validação _server_, as validações _built-in_ são executadas __antes__ das Screen Actions rodarem, desta forma sempre que as validações personalizadas rodam, estes valores já estão setados.

Se qualquer input estiver invalido, logo o formulário todo terá a propriedade _valid_ como `false`.

#### Escrevendo validações personalizadas

Validações extras são uma questão de escrever lógica de usuário do lado do servidor através de chamadas explicitas.

Para que as validações sejam forçadas basta que criemos uma sequencia de checagens, estas checagens definirão a propriedade `Form.isValid` como `true` ou `false`, assim também setando a propriedade `ValidationMessage` com a _string_ apropriada.

![](https://i.imgur.com/ZC46x5H.png)

As propriedades de validação estão disponíveis para

- Input
- checkbox
- Combobox
- ListBox

### Como exibir mensagens de validação para o usuário

Automaticamente a plataforma verifica a cada renderização de tela, se as propriedades de cada input e widget (ou form) são validas ou não, caso a propriedade `isValid` seja falsa então a mensagem definida em `Validation Message é aplicada`

![](https://i.imgur.com/uvon2d7.png)

## Interações AJAX

> [Exercicios - AJAX](Exercicios/Ex_9_AJAX.zip)

Para ativar as submissões AJAX basta setar o método de envio de um link ou botão para _Ajax Submit_

![](https://i.imgur.com/7p87NzC.png)

O que isto significa:

- Quando o _End_ de uma screen action é alcançado
  - A preparação __não é reexecutada__
  - Apenas partes da tela que __foram explicitamente especificadas serão reconstruidas__

> Mas como dizemos para a tela recarregar apenas uma parte do conteúdo?

Para isto usamos o _Ajax Refresh Statement_, que é outro nó lógico na aba __Logic__:

![](https://i.imgur.com/hqp0Hgh.png)

> __Nota:__ Funciona apenas para widgets nomeados

Ações de refresh multiplas em uma call serão executadas em sequencia.

A resposta contém apenas o conteúdo do widget que será recarregado e o _statement_ será ignorado se o método não for Ajax Submit.

### Recarregando dados

As vezes apenas recarregar o widget não é suficiente, é necessário também recarregar os dados do widget. Para isto usamos o _Refresh Data Statement_ que deverá ser executado __antes__ de uma ajax refresh para que os dados fiquem atualizados.

![](https://i.imgur.com/Q8qkJey.png)

Se for necessário apenas recarregar uma linha de dados, é possível através da especificação do número da linha na propriedade RowNumber

![](https://i.imgur.com/CMGUPYI.png)

### Widgets Ajax

Alguns widgets não possuem o Ajax Mode liberado. Outros widgets podem realizar ações ajax independentemente de enviar ou não dados. Por exemplo, um clique em um container pode emitir um evento ajax.

Outros widgets como inputs também podem emitir eventos ajax quando alterados

![](https://i.imgur.com/ZEnmaCz.png)

## Web Blocks e Reusabilidade

> [Exercicios - WebBlocks](Exercicios/Ex_10_WebBlocks.zip)

Um web block permite que o desenvolvedor implemente um componente reutilizável tanto em sentido de visualização como também sua própria lógica.

Vantagens:

- O mesmo bloco pode ser reutilizado em diversas telas
- Criado uma única vez e reutilizável
- Encapsula e abstrai a própria lógica da tela
- Reduz o número de dependencias

### Como criar um novo web Block

Um web block pode ser criado em um UI Flow assim como qualquer outra tela e utilizado como se fosse um outro widget normal. Eles podem ser colocados dentro de telas ou dentro de outros webblocks, mas não podem ser colocados dentro de si mesmos, ou dentro de outros blocos que contenham eles, por exemplo, um web block `A` que contem `B`, logo `B` não pode conter `A` também.

> Um web block tem seu próprio escopo e não tem acesso implícito ao escopo do objeto pai ou da tela. O modo para buscar dados da tela ou do objeto pai seria através de parâmetros de entrada, como em qualquer outra tela

Os web blocks podem ter

- Input parameters (Parâmetros de entrada)
- Local Variables
- Preparation
- Screen Action

Assim como qualquer outra tela.

> Recarregar um web block via ajax vai rodar a _preparation_ antes de reconstruir o seu conteúdo

> Web Blocks __não__ podem ter parâmetros de saída

### Notificações

Como podemos fazer com que o pai ou a tela que contém o web block seja notificada do que está acontecendo com o elemento? Ou de qualquer interação do usuário com ele?

Para isto, usamos a Server Action chamada _Notify_.

Como Web Blocks não possuem modo de interagir com seus pais, é preciso executar uma ação de notificação, que pode mandar uma mensagem de volta para a tela que contém o web block.

> Usar a ação notify vai criar automaticamente uma propriedade _On Notify_ que será responsável por tratar a resposta enviada do Web Block

A propriedade _On Notify_ do web block é responsável por rodar um ou mais fluxos de dados na tela ou bloco pai quando a notificação for recebida.

Abaixo será possível verificar um diagrama de uso do _Notify_:

![](https://i.imgur.com/6DZ8pWU.png)

1. Um web block sofre uma ação do usuário
2. Esta ação executa uma lógica que dispara um bloco _Notify_
3. Na tela pai, a propriedade _On Notify_ está setada para uma Server Action
4. Esta Server Action será executada e rodará sua lógica após ser notificada

Existe um outro caso de uso aonde a notificação é acompanhada de uma mensagem, este parâmetro _Message_ existente no _Notify_ tem a função de prover contexto para a tela pai, ou seja, é possível enviar um texto ou um valor para o controle que está sendo notificado, este valor pode ser recuperado utilizando a ação __*NotifyGetMessage*__

![](https://i.imgur.com/HdR5i5B.png)

> Notify só está disponível dentro do contexto de um web block

### Placeholders

Utilizando web blocks é possível ter acesso a um outro tipo de elemento, o Placeholder.

O Placeholder permite que o desenvolvedor defina uma área que será desenhada depois, ou seja, é possível definir um espaço no web block para conteúdo específico de onde o controle será colocado.

![](https://i.imgur.com/yBCJxM7.png)

Desta forma o Placeholder cria um "furo" editável na tela que vira um container ao passar para a tela pai.

## Segurança

> [Exercicios - Security](Exercicios/Ex_11_Security.zip)

A segurança é um ramo muito amplo e complexo, que é necessário em todas as aplicações. A plataforma do OutSystems já possui algumas ferramentas que cuidam de grande parte da segurança de uma aplicação, incluindo as seguintes proteções:

- HTTPS e Autenticação Integrada
- Previne injeção de código e SQL Injection
- Provê configurações de deploy seletivas
- Tratamento de exceções completo

Porém não é possível determinar o controle de acesso utilizando a plataforma nativamente.

### Controle de acesso

Nativamente, a plataforma não pode determinar quais níveis de usuário cada pessoa tem dentro da aplicação, cabe a você explicitamente informar o sistema do que pode ser feito ou não.

Estes controles de acesso comprimem duas diretivas importantes, a __autenticação__ e a __autorização__:

__Autenticação__:

- Identifica quem está acessando a aplicação
- Valida credenciais de usuário

__Autorização__:

- Checa se um usuário (geralmente o atual) pode executar determinada tarefa
- Valida se o usuário tem permissões para aquela tarefa específica

Note que um é parte do outro, pois não é possível autorizar um usuário que ainda não foi autenticado.

### Usuários e grupos

Usuários e grupos são criados automaticamente pela aplicação _built-in_ chamada _Users_.

As informações principais de um usuários são:

- Username
- Senha
- Nome

Grupos são conjuntos de usuários com o mesmo nível de autorização para certas aplicações, que são dadas individualmente aos usuários (ou grupos) através de __perfis__.

### Basicos de perfis

Todos os usuários logados na plataforma assumem o perfil de _Registered_, porém esta definição é muito ampla e deve ser melhor definida pelo desenvolvedor, criando novos perfis na guia _Logic_ na pasta _Roles_.

![](https://i.imgur.com/EHHbs2K.png)

Todo Role tem ações padrão: Check, Grant e Revoke. A autorização pode ser gerenciada programaticamente usando estas ações ou estaticamente na aplicação Users.

#### Checando permissões de perfil

O modo mais simples de impedir usuários de acessarem aplicações ou plataformas é através da própria tela de aplicação, na sessão Roles:

![](https://i.imgur.com/Xc4o5W9.png)

> Neste exemplo acima, um usuário anonimo será direcionado para a tela de login se acessar esta tela

Para checar se um usuários está em um Role específico podemos usar a Action `Check<NomeDoRole>Role()`, por exemplo:

- Em um bloco if, para mostrar conteúdo diferente dependendo do usuário que está logado
- Em uma lógica if, para executar uma lógica ou um trecho específico de código dependendo do usuário que estiver logado.

![](https://i.imgur.com/bsWJkTS.png)

É importante dizer que os Roles podem ou não ser persistentes, um Role persistente será armazenado no banco de dados e será persistido através das sessões do usuário, enquanto um Role não persistente será descartado no final da sessão.

## Sessões

> [Exercicios - Sessoes](Exercicios/Ex_12_Sessoes.zip)

O conceito de sessão surgiu quando a necessidade de gerenciar multiplos usuários se tornou evidente em servidores web. Para tal, o mesmo armazena um registro que possui um identificador, o qual representa o contexto do usuário no sistema.

Como o WebServer não sabe do estado e nem do contexto de nenhuma sessão, é com o browser a tarefa de armazenar e restaurar sessões.

### Escopo de dados em sessão

O OutSystems possui dois escopos de dados:

__Session Variables__:

- Disponíveis para o usuário enquanto ele está usando a aplicação
- Valores são armazenados por usuário e expiram de acordo com o timeout da sessão

__Cross-Session(site) properties__:

- Sempre disponíveis, para todos os usuários
- Valores são compartilhados entre sessões e nunca expiram

### Ciclo de vida de uma sessão

Uma sessão inicia-se quando o usuário se loga na ferramenta:

- Automaticamente: No primeiro acesso (sessão anonima) ou depois da página de login
- Programaticamente: Na função `User_Login()` da aplicação Users

E, consequentemente, uma sessão termina quando o usuário desloga:

- Automaticamente: Timeout (geralmente 20 min)
- Programaticamente: Função `User_Logout()` da aplicação Users

A aplicação _Users_ usa os métodos de autenticação de baixo nível (presentes em _system_).

### Criando variáveis de sessão

Para criar uma variável de sessão basta que entremos na aba _Data_ e cliquemos sobre a pasta _Session Variables_.

Uma variável de sessão pode possuir os seguintes tipos básicos:

- Tipos primários
- Identificadores de entidades
- Todos os demais são permitidos, mas devem ser evitados devido a considerações de performance

O valor de uma variável de sessão:

- Pode ser alterado através do _Assign_ em qualquer ação
- Persiste através de requisições
- É resetado ao valor padrão quando a sessão inicia ou termina

O OutSystems possui algumas variáveis de sessões que provém contexto para o sistema, como na imagem abaixo (marcados em cinza):

![](https://i.imgur.com/rCBG6A9.png)

### Criando Cros-Session Properties

Da mesma forma, a criação de um site property está localizada na aba _Data_ abaixo de _Session Variables_. 

Possuem tipos válidos:

- Tipos primários
- Identificadores de entidades

O valor de uma site property:

- Pode ser alterado pelo _assign_ em qualquer ação (mas note que, como são desenhados para serem usados como constantes de aplicação, a performance na hora da execução pode ser impactada se forem trocadas constantemente)
- Pode ser alterada no Service Center
- Persiste através de requisições e sessões
- Nunca é resetada

> No geral, site properties são melhor utilizadas como configurações de aplicação como um todo, e não como armazenamento de valores.

O OutSystems já provê algumas variáveis de configuração (em cinza):

![](https://i.imgur.com/6OjMJLL.png)

## Web Services

> [Exercicios - WebServices](Exercicios/Ex_13_WebServices.zip)

O uso de webservices é muito comum para integrações de sistemas não relacionados, uma vez que é um modo de realizar chamadas remotas que são completamente agnósticas de linguagem. Desta forma sistemas que podem estar em dois lados do mundo e serem de tecnologias completamente diferentes podem se comunicar através de chamadas de funções.

A plataforma OutSystems suporta SOAP e REST como os principais modelos de webservices.

### SOAP

SOAP significa _Simple Object Access Protocol_ e é um método de disponibilização de webservice chamado de contratual, pois os dois lados do sistema possuem um contrato formalizado de API que dita quais são os layouts e modelos que serão enviados e recebidos através de uma _Web Services Description Language (WSDL)_.

- Todos os parâmetros de entrada e tipos de retorno são descritos completa e explicitamente
- O consumidor e o provedor podem validar as requisições e respostas para encontrar erros
- A maioria dos serviços SOAP possuem um contrato detalhado para as API's

> Usa XML para transportar dados

### REST

ReST significa _Representational State Transfer_, é uma alternativa mais moderna e mais leve do que o SOAP.

- Não existem contratos de API (Nenhum WSDL)
- A maioria dos serviços ReST possuem um manual comum de leitura humana que explica o serviço ao invés do contrato
- Os métodos HTTP e headers são usados para clarificar a semântica da operação

> O JSON é o modo mais comum de transferências de dados em ReST, mas o XML ou qualquer outro tipo também pode ser aceito.

### Criando Web Services SOAP

#### Consumer

Para criarmos um serviço consumidor de webservice, vamos entrar na aba _Logic_ e clicar em _Consume SOAP Web Service_:

![](https://i.imgur.com/TaYYS8b.png)

Após isto basta especificar o endereço do WSDL e o Service Studio vai automaticamente criar a estrutura do mesmo.

![](https://i.imgur.com/vu0mvq4.png)

![](https://i.imgur.com/oZd4wct.png)

Uma vez analizado, o WSDL irá gerar uma série de ações que podem ser usadas normalmente na aplicação:

![](https://i.imgur.com/VTkfJLA.png)

Basta arrastar uma nova ação:

![](https://i.imgur.com/Frbf0dq.png)

#### Producer

Para fazermos o contrário é similar, basta clicarmos em _Expose Web Service_ e depois adicionarmos um a um os métodos que queremos

![](https://i.imgur.com/Zp2wJ0P.png)

E então basta que criemos as ações escrevendo as lógicas como faríamos em qualquer outra ação.

Note que não temos que gerenciar o WSL de forma alguma, as URL's e endpoints de um WSDL podem ser encontradas no Service Center, dentro da aba Module's Integration.

### Criando serviços ReST

#### Consumidor

Para consumirmos um serviço ReST o processo é um pouco mais complicado devido a sua natureza. Porém podemos seguir similarmente como no processo anterior.

Clicamos em _Consume ReST API_, adicionamos um unico método na tela seguinte.

Então será necessário dizer a URL de chamada daquele método específico, bem como o método HTTP que será utilizado.

Como não existe nenhum tipo de contrato que permita à plataforma inferir o tipo de chamada, é necessário que o desenvolvedor coloque um modelo de resposta

![](https://i.imgur.com/IrOCB0O.png)

Uma vez que o consumidor estiver criado, é fácil utilizá-lo na plataforma como se fossem outros métodos ou estruturas lógicas comuns.

Uma vantagem do ReST sobre o SOAP na plataforma é que é possível escrever funções de callback utilizando eventos específicos _OnBeforeRequest_ e _OnAfterResponse_ que são, respectivamente, executados antes de o webservice ser chamado e depois que o mesmo recebbe a resposta.

Também é possível detectar erros através das chamadas de status do HTTP e atribuir estes erros a tratamentos de exceções do sistema.

![](https://i.imgur.com/iwRZpmB.png)

#### Expondo API's ReST

Diferentemente da criação das api's ReST, a exposição do serviço é muito mais simples, na verdade, é extamente igual ao SOAP.

![](https://i.imgur.com/qstSIcZ.png)

## Temas e estilos

> [Exercicios - Themes](Exercicios/Ex_14_Themes.zip)

Um tema provê as folhas de estilo para todas as telas que o usam. O tema:

- Pode ser compartilhado entre módulos
- Diferentes telas podem ter diferentes temas no mesmo módulo
- Define layouts comuns de tela
- Tipo de grid: Fixo, Fluido ou nenhum

Somente os módulos com telas podem usar temas, mas eles podem ser definidos em qualquer outro módulo.

### Escrevendo CSS

O Service Studio possui um editor próprio de CSS com highlighting e também auto-complete. Enquanto você edita seus estilos mudanças são vistas em tempo real.

![](https://i.imgur.com/1oD4qDX.png)

O editor possui diversas abas, uma para cada folha de estilos que é apresentada. Como o próprio nome diz, as folhas de estilos são em cascata, de forma que a aba mais a esquerda é a mais específica e, portanto, a que terá mais precedencia sobre todas as demais. Enquanto a aba mais a direita é a mais genérica e com menor prioridade.

Como cada componente tem sua própria folha de estilos, os componentes que são carregados primeiro terão seus estilos sobrescritos pelas telas que são carregadas em seguida:

![](https://i.imgur.com/0GNJZqI.png)

Para utilizar as classes que foram criadas nos editores de CSS, é possível utilizar as propriedades específicas deste componente. Caso sejam aplicados mais de um estilo, eles podem ser separados por espaço.

![](https://i.imgur.com/0jQHSPb.png)

É possível também definir estilos dinamicos que se baseiam em variáveis através das _Extended Properties_ e expressões.

Abaixo está um guia de quais objetos são traduzidos para HTML quando a aplicação é compilada e, desta forma, é possível aplicar o estilo correto:

![](https://i.imgur.com/9vemkcR.png)

### Templates

Também é possível definir um layout base para que todos os novos componentes sigam no momento que são criados. Estes templates são chamados de _Theme's web blocks_, e seguem similar a um Web block normal.

![](https://i.imgur.com/6unOpJX.png)

Definição de todos os web blocks:

- __Layout__: Usado para todas as novas telas
- __Info Balloon e Pop-up Editor__: Definem estruturas para popups
- __Email__: Define o padrão para os emails
- __Header, Menu e Footer__: Define os placeholders no web block layout, aqui é possível definir quais serão os web blocks que serão colocados nos placeholders de nome correspondente no layout padrão.

> Os accelerators usam estas propriedades para criar rapidamente as novas atividades

> Note que, estamos falando de web blocks, ou seja, não podemos apenas definir estilos nos temas, mas também a própria estrutura padrão das novas telas

![](https://i.imgur.com/iJcT0yC.png)

### O Web Block do Menu

O Menu é um web block separado que é incluso por padrão em todas as aplicações, ele já possui toda uma estrutura preparada para criar uma estrutura de até 2 níveis de menu automaticamente utilizando accelerators e já informando quais serão as telas que estão cadastradas na aplicação.

![](https://i.imgur.com/EqvVIQI.png)

## Scaffolding e RichWidgets

> [Exercicios - RichWidgets](Exercicios/Ex_15_RichWidgets.zip)

### Scaffolding

O service studio possui uma gama de automações que visam aumentar a produtividade do desenvolvedor enquanto cria a aplicação web. Isto é chamado de scaffolding, a criação de padrões de desenvolvimento pré prontos permitem que as telas, lógicas e funcionalidades sejam criadas muito mais rápido pois já constroem uma base para todo o desenvolvimento.

#### Scaffolds disponíveis

É possível criar telas de listagem e detalhamento inteiras baseado apenas nas entidades.

Listas de detalhes dentro de uma tela mestre

Popups de dialogos e balões de contexto, bem como inputs com auto-complete.

##### Telas de listagem

Se, por exemplo, temos uma entidade chamada "Cinema" e clicarmos e arrastarmos esta tela para o fluxo principal, criaremos uma outra tela com a listagem de cinemas.

![](https://i.imgur.com/v3zOV2q.png)

Ou seja, sempre que jogarmos uma entidade no fluxo, ela criará uma lista de sua origem.

##### Telas de detalhamento

Se jogarmos novamente a entidade cinema dentro do fluxo, ele nos criará uma tela de detalhamento de cinemas.

![](https://i.imgur.com/PiJ9H8G.png)

Assim teremos o scaffolding completo com links e todas as conexões:

![](https://i.imgur.com/gY70BuX.png)

### RichWidgets

Se tivermos uma outra entidade chamada "MovieSessions" com uma chave estrangeira para a entidade de cinemas, ao arrastarmos a entidade para dentro da ela em uma posição qualquer, ela gerará um formulário "mestre-detalhe" como na foto abaixo

![](https://i.imgur.com/g3rz66A.png)

Este formulário aninhado possui o que são chamados RichWidgets. Como os listados abaixo:

![](https://i.imgur.com/VuJ8s2J.png)

- Temos o popup
- Temos a lista de navegação
- Temos a ordenação de colunas

Apesar de termos usado o scaffolding para criar estes widgets, também é possível utilizar o drag n' drop para colocá-los na tela que está sendo criada.

Temos vários outros RichWidgets, como:

- Popup_Editor
- List_Navigation
- List_SortColumn
- Feedback_Message
- Input_AutoComplete

![](https://i.imgur.com/cWMn0Qs.png)

#### Popup Editor

Permite que uma outra tela seja mostrada sobre a tela original como se fosse um popup modal, permitindo edições e etc

![](https://i.imgur.com/TlBq57c.png)

Para fazer a criação de um pop editor, basta criarmos um link do tipo `navigate` na tela de origem apontando para a tela de destino que queremos, depois identificar o widget que vai enviar a ação para exibir o pop-up.

> É importante dizer que para um pop up, talvez seja melhor um layout mais simplista, sem headers ou footers.

Quando adicionamos um pop up, note que temos também as actions de notificação, estas actions servem para notificar a tela original (source screen) sobre eventos que ocorrem no pop up, assim como nas chamadas AJAX.

#### List Navigation

Implementa uma paginação em um widget do tipo Table Records.

Para fazer a criação, basta usar o drag and drop no rich widget logo abaixo da Table Records correspondente. Após isto, basta associar a lista com o ID do widget que será utilizado, setando não só o nome mas também a contagem de registros na linha e a contagem total.

![](https://i.imgur.com/acjyIkc.png)

A página que está sendo exibida fica armazenada na sessão

A ação OnNotify corresponde à seleção de uma nova página na lista, ela basicamente recarrega o data source e a lista.

Porém as configurações são de mão dupla, ou seja, também temos que configurar a lista para obedecer ao navegador. Setando a propriedade `Start Index` da lista de registros para `List_Navigation_GetStartIndex(ID, true)` estamos dizendo para que a lista exiba o primeiro indice da página selecionada.

> Pense que um offset de indices vai percorrendo a tabela, esse offset é uma janela de exibição que, a cada página, se move N registros para frente

![](https://i.imgur.com/aCLj2QX.png)

#### List Sort Column

Adiciona um ordenador de coluna na lista de registros do tipo Table Records.

Para fazer a criação de uma list sort column basta arrastar o rich widget para cima do cabeçalho da coluna que você quer ordenar. Depois selecione a propriedade `Column` do List Sort Column e defina com o nome da coluna que você quer ordenar `{Tabela}.[coluna]`.

A ação OnNotify deve receber uma Screen Action que vai recarregar o dataSource e depois recarregar o widget.

![](https://i.imgur.com/nOBdhYI.png)

Do mesmo modo, o Aggregate que está sendo ordenado precisa obedecer à ordenação do widget, para isto, abra o editor de aggregates e selecione na opção `Sorting` o `Add Dynamic Sort` e defina a expressão para `List_SortColumn_GetOrderBy(<Nome do Table Records>.coluna, DefaultOrder: "{entidade}.[atributo])"`

## Silk UI

> [Exercicios - Silk UI](Exercicios/Ex_16_SilkUI.zip)

Silk UI é um framework de desenvolvimento de estilos para o OutSystems, diferentemente de outros paradigmas, é necessário que o desenvolvedor aprenda a trabalhar com um modelo orientado a estilos ao invés de orientado a resultados em tela.

Os princípios desse paradigma começam com a definição de um __guia de estilos__:

- Regras da empresa sobre como a marca se comunica
- Um conjunto de padrões para escrever o design de documentos

Isto evolui para um documento visual, que possui toda a identidade da empresa e de suas aplicações, seguido por uma criação centralizada de padrões de UI.

### Instalando o SilkUI

Para iniciar, é necessário que no seu servidor de aplicação existe o tema base do SilkUI e um ou mais temas instalados para que seja necessário continuar.

Cada tema do silkUI é basicamente composto de dois componentes: Um tema e um template

- Os módulos chamados `Template_<algo>` (com uma descrição e icone), vão automaticamente aparecer para a seleção quando criando um novo módulo
- Novos módulos vão clinar este template para produzir o tema inicial do módulo.
