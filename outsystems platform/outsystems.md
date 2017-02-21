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

