# 1º ABC Dev 2016

## Organizando UX Tool Boxes

Tudo é baseado em micromoments, ou seja, micromomentos que são pequenas facilitações que proporcionam uma boa experiência para um usuário a qualquer momento.

> Definição UX: Tudo aquilo que transforma uma experiência ruim do usuário em uma experiência boa.

UX Nasceu de um conceito aonde o designer erao principal ator para o desenvolvimento de uma boa UX, mas na verdade essa responsibilidade é do time.

### Processos ágeis para UX

Com o passar do tempo foram criados outros tipos de métodos para desenvolvimentos de UX como:

- Lean UX
- Agile UX
- Kanbam
- Etc.

### Conceitos

- Persona: Pessoa que vai utilizar o sistema
- MVP: _Minimum viable product_, é o produto mais simples que pode ser enviado para produção
- Draft: Rascunho

### ToolBoxes

- UX Strategy: Parte abstrata do produto
  - Pesquisa
  - Proto-Persona
  - Persona
  - História
  - UX Canvas
- UX Usability: Como deixar fácil de usar
  - 10 Heurísticas
  - Lei de Fitts
  - Crazy Eights
  - Teoria das Cores
  - Affordance: Quanto o objeto é simples de usar e simples de entender quando vc começa a usar
- UX Analysis: Validar se o produto está no caminho certo
  - Teste de usabilidade
  - Pesquisa
  - Teste A/B
  - 10 Heurísticas
  - Heatmap

### O que é MVP

É o mínimo que você pode entregar para o usuário que vá entregar valor pra ele.

O mínimo produto viável é, geralmente, um produto abstrato. Nasce de uma ideia que pode ser um novo produto.

### O que é microinteraction

Microinterações são pequenas animações que adicionam uma melhor experiência para o usuário, ou persona. Por exemplo, quando passamos o mouse em um botão e ele anima o fundo para trocar de cor.

Um bom exemplo disso são as animações de botões que são totalmente desnecessárias ao produto mas proporcionam uma ótima experiência

## Offline First em 2016

A questão de ser offline first em 2016 é uma situação complicada, porque temos que ter em mente que manter o sistema offline agora é uma questão de User Experience, porque temos que passar a ideia de que o sistema é rápido, mesmo quando ele está offline.

Isso é importante porque a ideia de um sistema que mantém o usuário informado de tudo que está sendo feito no sistema. Ou seja, desta forma o usuário pode sempre ter a noção de que o sistema está trabalhando e está conhecendo o estado da máquina atual.

### Opções para trabalho offline

#### Application Cache

O Application Cache é um modelo de Cache que utiliza um arquivo de manifesto, geralmente usando um `manifest.appcache` que contém a lista de todos os arquivos que serão cacheados pelo sistema.

#### Service Workers

Service Workers são threads separadas que rodam em um outro processo do navegador. Esses service workers são responsáveis por capturar todas as requisições que são feitas pelo navegador para a web, e então entre uma requisição e outra é possível realizar algumas lógicas, como verificar se já existe no cache (os SW's possuem uma interface exclusiva para o cache interno).

```js
this.addEventListener('fetch', function(event) { //Para cada requisição que o browser fizer, antes de ela chegar na núvem vai passar por aqui
  var response; //Resposta que daremos ao browser
  event.respondWith( //Entramos no evento do browser e dizemos o que responder
    caches.match(event.request) //Se tivermos no cache o conteúdo da request
      .catch(function() { //Caso de erro então continuamos a request
        return fetch(event.request) //Fetch é uma API nova no browser que substitui o XHttpWebRequest e continua a requisição
      })
      .then(function(r) { //Se existe o cache da request
        response = r; //Igualamos o valor do cache (r) à response
        caches.open('v1') //Abrimos uma versão 1 do cache
          .then(function(cache) { //Se conseguirmos abrir
            cache.put(event.request, response); //Adicionamos à request o valor do cache que buscamos anteriormente
          });
        return response.clone(); //Retornamos um clone do objeto do cache porque o método put consome o body da request
      })
      .catch(function() {
        return caches.match('/images/gallery/js/img1.jpg');
      });
  );
});
```

#### Cookies

Cookies são o básico da armazenagem de informações do browser, possui uma larga facilidade de utilização porque funciona em qualquer browser, mas em contrapartida existe um limite de tamanho de 4KB.

Existem também uns problemas de segurança com os cookies.

#### LocalStorage

Armazenagem de informações pelo uso do storage interno do browser, existem diversas possibilidades aonde é possível armazenar 5Mb de informação sincronizadamente.

Uma funcionalidade legal é que a API é implementada facilmente e é muito simples de trabalhar com este tipo de sistema, mas os dados continuam lá eternamente até o usuário limpar o cache do browser.

#### WebSQL

SQL no seu browser.

```js
var db = openDatabase("dinos", "1", "todo list example db", 2*1024*1024); //Abre uma database

//Executa o SQL
db.transaction( //Executa uma transação
  function(tx) {
    tx.executeSQL( //SQL
      "CREATE TABLE IF NOT EXISTIS dinos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",
      [],
      function(tx, results) {
        console.log("ok"); //DEU CERTO
      },
      function(err) {
        console.log("error!", err); //ERRO
      }
    );
  }
);
```

É possível realizar selects, inserts, deletes e qualquer coisa de SQL dentro dessas bases.

```js
db.transaction(
  function(tx) {
    tx.executeSql("SELECT * FROM dinos WHERE id > ?",
      ["1"],
      function(tx, results) {
        let row = "";
        for (var i=0; i < results.rows.length; i++) {
          console.log("Dino name:", results.rows.item(i).name);
        }
      },
      function (err) {
        console.log("query problems...", err);
      }
    );
  },
  function (err) {
    console.log("Transaction problems...", err);
  }
);
```

```js
db.transaction(
  function(tx) {
    tx.executeSql("INSERT INTO dinos(name) VALUES(?)",
      ["Megalosaurus"],
      function(tx, results) {
        console.log("ok, inserted");
      },
      function (err) {
        console.log("query problems...", err);
      }
    );
  },
  function (err) {
    console.log("inserting problems...", err);
  },
  function () {
    console.log("Transaction completed");
  }
);
```
Contras:

- Não tem quase suporte de nenhum browser
- Não suporta o SQL completamente
- Com muitos dados apresenta lentidão

#### IndexedDB

Quase igual ao LocalStorage mas tem um conceito de objetos que é um pouco diferente dos conceitos de objetos e cursores.

É um pouco mais difícil de se trabalhar, porém é mais completo que o LocalStorage e o WebSQL.

Contras:

- Ele não é tão suportado, mas tem mais suporte que o WebSQL
- Voltou recentemente para a análise da W3C
- Mais complexo que as outras formas de armazenamento

Prós:

- Armazena Blobs
- Tem indices
- Pode trabalhar com workers
- Trabalha com uma quantidade maior de dados
- Mais evoluido que o LocalStorage

### LocalForage

Encapsula todas as formas de armazenamento em um unico lugar, não sabemos aonde e nem que tipo de banco de dados que ele usou, desta forma todos os armazenamentos são realizados pelo próprio script e ele cuida de tudo.

### PouchDB

Igual ao Meteor.js, sincroniza os bancos de dados locais com bancos de dados remotos.

Cria um banco de dados local e pode ir inserindo os valores, mas assim que é comandado pode mandar os valores para uma réplica em uma URL.

[Offline First Oficial](http://offlinefirst.org) << Site Oficial do conceito

## Contruindo uma API do jeito certo

Uma API é um jeito de fazer com que dois sistemas simples se comuniquem de maneira rápida e sem complicações, tanto para o programador ou pra outro usuário.

### Interface

> É um elemento que proporciona uma ligação fisica ou lógica entre dois sistema ou partes de um sistema que não poderiam ser conectados diretamente.

### API's Rest

- Cada recurso tem seu próprio URI
- Os verbos HTTP (GET, POST, PUT, PATCH, DELETE)
- Não possuem estado

Facilita a comunicação entre Processos

### Como documentar sua API

Utilizar o Swagger para a documentação.

Simples:

- Um unico arquivo JSON (_swagger.json_ mas não precisa necessariamente chamar "swagger")

Ferramentas como o Swagger UI ou o ReDoc para facilitar a documentação com uma GUI.

- DRY: _Don't repeat yourself_, se você tem alguma coisa pré definida em algum arquivo de configuração não escreva de novo, simplesmente busque deste arquivo.
- _Documentation First_: Escrever primeiro a documentação e depois escrever a API em si

### Como desenhar sua API

#### Versionamento

- Só exponha a versão cheia (v1, v2)
- Evite ao máximo _breaking changes_ (alterações que quebram a API)

> Mas o que causa um breaking change?

__Não Causa__:

- Adicionar um novo campo
- Adicionar recursos novos em novas URI's
- Adicionar endpoints
- Corrigir bugs (Isso depende se a correção não vai impactar os demais)

__Causa__:

- Remover campos
- Renomear campos
- Remover recursos
- Remover endpoints

#### Mutators

- Representam os recursos da API
- Criam uma barreira entre seus Models e sua API
- Typecasting e Relacionamentos

Transformers ou mutators são criados implementando interfaces de código entre a API e o servidor.

#### Negociação de conteúdo

- JSON, XML, CSV?
  - Lembrar de que JSON é JavaScript (Usar camelCase)
- Relacionamentos / Recursos Incorporados: Trazer ou não? (campos extras)
- Metadados: Voltar a URI completa, Página atual, contagem total
- Use cabeçalhos HTTP quando relevante
- Verbo HTTP: Override com _method (Quando usamos forms, por exemplo, só temos GET e POST então temos que converter)

#### Respostas

- Padronize os campos de datas, floats, moedas (voltar o mesmo tipo que ele enviou)
- Padronize códigos HTTP de Resposta
- Padronize os Metadados
- Não reinventar a roda!!
- Faça um wrap da Resposta

```JSON
{
  data: {
    nome: "foo",
    bar: "Foo"
  }
}
```

- Retornar os códigos de erros e o array com as descrições de erros e não tudo em um campo só
- __Nunca__ exponha exceções para os usuários

#### Autorização e autenticação

Como identificar os usuários e as permissões?

- Baseados em sessão: __NÃO__ use sessões
  - API's devem ser sem estados (todas as rotas devem funcionar independentemente)
  - Implementação em mobile é custosa
- Baseados em Token: __SIM__
- Oauth? OAuth2? JWT? HTTP-Basic?

##### Autenticação != Autorização

> Autenticação é quando estamos tentando descobrir quem é a Pessoa

> Autorização é quando tentamos descobrir se o usuário pode ou não pode passar

##### OAuth vs JWT

- Não são concorrentes diretos
- É possível utilizar os dois em conjunto
- OAuth: concebido para Autorização
- JWT: Concebido para autenticação

#### Segurança

- Evite expor IDs sequenciais (HashID's por exemplo)
- Limite as requisições (throttling) de forma configurável
- Não utilize logins por senha (exceto em apps próprios)
- API somente em HTTPS
- Responda rápido a vulnerabilidades (0-days, etc)

### Dicas e Recursos

- Livro: Build API's you won't hate (Phill Sturgeon)
- HTTP API Design Guide (By Heroku)
- Open API Initiative
- Petstore (Swagger UI)
- Pesquisa: 2 Legged OAuth
- Site: API Evangelist

Ferramentas:

- ngrok
- Apigee
- Postman
- Paw
- Slack do livro acima


## MVP

> Uma versão de um produto que permite que você coloque o máximo de valor com o mínimo de esforço.

Valor significaria algo como aprendizado validado, porém uma boa definição na verdade seria:

> Algo que permite que você colete o máximo de aprendizado validado

Ele serve para:

- Descobrir se seu produto é realmente viável
- Testar novas ferramentas
- Testar se sua visão bate realmente com a realidade

### Como construir

Build -> Measure -> Learn -> Build

#### Build

- Entrevista com o cliente: Descobrir as dificuldades do produto por meio de uma entrevista
- Validação do problema: Criar situações reais e apresentar para pessoas sem que elas saibam, e analisar os resultados.
  - Utilizar ferramentas que existem para colocar as situações reais para poder Testar
  - Desenvolvimento sob medida: Desenvolver uma funcionalidade e esperar para ver se o resultado é esperado

### Measure / Learn

- Entrevista com o cliente
- Feedback do cliente
- Analytics e métricas
- Teste A/B

Medir os resultados do seu produto ou feature através de testes.
