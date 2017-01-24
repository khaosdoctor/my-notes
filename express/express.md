# Express.js

<!-- TOC -->

- [Express.js](#expressjs)
  - [Instalação](#instalação)
  - [Hello World](#hello-world)
    - [Response](#response)
  - [Redirecionamentos relativos](#redirecionamentos-relativos)
  - [Midleware](#midleware)
    - [Rich Javascript applications](#rich-javascript-applications)
    - [Criação](#criação)
  - [Construindo nosso próprio middleware](#construindo-nosso-próprio-middleware)
  - [Parâmetros de URL](#parâmetros-de-url)
  - [Rotas dinâmicas](#rotas-dinâmicas)
    - [Tratando casos genéricos](#tratando-casos-genéricos)
  - [POST e DELETE](#post-e-delete)
    - [POST](#post)
    - [DELETE](#delete)
  - [Instancias de Rotas](#instancias-de-rotas)
  - [Arquivos de rotas](#arquivos-de-rotas)
  - [Conteúdos adicionais](#conteúdos-adicionais)

<!-- /TOC -->

É um framework web para Node.js minimalista e focado em API's. É importante entender que o express estende o node.js utilizando outras funções que englobam e encapsulam os objetos HTTP padrões do Node. Criando um tipo de herança entre as duas ferramentas.

## Instalação

A instalação se dá como qualquer outra instalação de um script node.

> Instalamos via NPM com `npm i express`

## Hello World

O código a seguir cria um servidor Node.js que aceita uma chamada no root `/` e responde uma string "Hello World":

```js
var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello World');
});

app.listen(3000, function() { console.log('Listening on port 3000'); });
```

### Response

Um exemplo de herança e ligação entre o Express e o Node é a linha `response.send()` que é um método do Express que realiza uma chamada unica aos dois métodos de resposta nativos do node, o `response.write()` e o `response.end()`.

Outro exemplo são as serializações em JSON para envio das API's, com o Node originalmente teríamos que utilizar o método `JSON.stringify`, antes de podermos enviar diretamente para a resposta, porém com o Express podemos simplesmente enviar pelo `send()`.

```js
app.get('/blocks', function(r, rs) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    rs.send(blocks);
}
```

Além de enviar o bloco automáticamente, o Express também já envia os headers específicos para o requisitante.

Podemos utilizar a função `response.json(object)` que funciona exatamente como o `send()` porém para objetos.

## Redirecionamentos relativos

Para redirecionar uma chamada para uma outra rota podemos usar o seguinte código:

```js
app.get('/blocks', function(r, rs) {
    rs.redirect('/ports');
});
```

Express vai automaticamente redirecionar o usuário para a rota específicada, adicionando os headers específicos.

Podemos passar um outro argumento para a função como sendo o código HTTP de resposta, uma vez que a função redirect irá enviar sempre um HTTP 302 (que significa "movido temporáriamente"), mas se quisermos que seja permanente?

```js
app.get('/blocks', function(r, rs) {
    rs.redirect(301, '/ports');
});
```

Veja que colocamos o código 301 (que significa "movido permanentemente").

## Midleware

Middleware é a essencia do express.js, com ele podemos realizar diversas requisições que podem ser facilmente consumidas por aplicações ricas em javascript.

São funções executadas **sequencialmente** que tem acesso aos parâmetros request e response da chamada. Dentro de um middleware podemos executar funções como validação, autenticação e outras coisas.

Uma request passa por todos os middlewares sequencialmente antes de chegar na nossa rota.

Um middleware é essencialmente o código abaixo:

```js
app.use(function(request, response, next) {
    ......
    next();
}
```

Aonde o parâmetro next é o próximo middleware que será executado.

> Um middleware só executará antes do response ser enviado, ou seja, se a resposta tiver sido reenviada (com o response.send por exemplo) o próximo middleware não será executado

### Rich Javascript applications

Aplicações que permitem uma experiencia mais interativa na web. As requisições são feitas pelo client que retorna a primeira página HTML, após este primeiro evento o client envia chamadas HTTP via AJAX para o servidor que responde com dados (geralmente em JSON).

Os dados recebidos são utilizados pelo client para atualizar certas partes da página, sem precisar atualizar ela por completo.

### Criação

Podemos criar uma página simples, index.html:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Building blocks</title>
    </head>
    <body>
        <h1>Blocks</h1>
    </body>
</html>
```

As partes importantes são a tag title e o h1.

Para servir este arquivo pelo express criamos o arquivo app.js:

```js
var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(8080);
```

Podemos utilizar middlewares para servir conteúdo estático para o client através do `express.static`, que é o unico Middleware que vem junto com o express:

```js
var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(8080);
```

O middleware static vai servir todo o conteúdo dentro da pasta especificada.

Porém temos um site estático ainda, vamos deixar dinâmico. Atualizamos nosso código html:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Building blocks</title>
    </head>
    <body>
        <h1>Blocks</h1>
        <ul class="block-list"></ul>

        <script src="jquery.js"></script>
        <script src="client.js"></script>
    </body>
</html>
```

Vamos colocar conteúdo do Express dentro da lista. Iremos atualizar o client.js:

```js
$(function() {
    $.get('/blocks', appendToList);

    function appendToList(blocks) {
        var list = [];
        for(var i in blocks) {
            list.push($('<li>', { text: blocks[i] }));
        }
        $('.block-list').append(list);
    }
});
```

Agora voltando ao express.js editamos ao arquivo app.js:

```js
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});

app.listen(8080);
```

## Construindo nosso próprio middleware

Como exemplo, vamos construir um moddleware de logging, que vai printar no console quanto tempo cada requisição demorou.

Para criar um middleware, primeiramente precisamos criar um arquivo próprio para ele. Vamos chamar de logger.js

```js
module.exports = function(request, response, next) {
    var start = +new Date(); //o sinal '+' converte a data em milissegundos desde 01/01/1970
    var stdout = process.stdout; //Vamos escrever isso na saída padrão
    var url = request.url;
    var method = request.method;

    response.on('finish', function() { //Ouvimos o evento finish da resposta, que determina quando uma requisição terminou de ser enviada. Isso é necessário uma vez que todos os middlewares rodam sequencialmente e fica complicado pegar exatamente quando cada um termina.
        var duration = +new Date() - start;
        var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';

        stdout.write(message); //Escrevemos a mensagem
    })

    next(); //Obrigatório para middlewares
}
```

Para chamarmos este middleware no nosso código, podemos utilizar simplesmente:

```js
var logger = require('./logger');
app.use(logger);
```

Como o evento do logger está atrelado a uma chamada de função assíncrona, pelo callback do evento finish, então ele estará sempre funcional independente do momento.

> Veja o projeto [Morgan](https://github.com/expressjs/morgan) que é uma solução mais completa de logging para express.js

## Parâmetros de URL

Para buscarmos parâmetros de query string podemos acessar o método `request.query` da chamada, que possui todos os parâmetros de URL.

No nosso código anterior:

```js
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.json(blocks);
});

app.listen(8080);
```

Faremos uma chamada com um parâmetro `?limit=x` que limitaria o número de blocos retornados:

```js
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];

    if(request.query.limit >= 0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(blocks);
    }

});

app.listen(8080);
```

Verificamos se o parâmetro está setado e então usamos o `slice` para cortar o array em pedaços.

## Rotas dinâmicas

Agora vamos criar uma rota capaz de retornar as descrições dos blocos que estamos enviando, por exemplo, se chamarmos `/blocks/Fixed` deveremos receber a descrição do bloco Fixed.

Podemos criar uma rota dinâmica desta forma:

```js
app.get('/blocks/:name', function(request, response) {

});
```

Isso vai fazer com que o Express adicione automaticamente uma propriedade chamada `name` no método `request.params`, sendo possível acessar via `request.params.name`.

Vamos reorganizar nossos blocos de um array para um objeto:

```js
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks/:name', function(request, response) {
    var description = blocks[request.params.name]; //Buscamos as descrições

    response.json(description); //Enviamos tudo
});
```

Mas, e se fizermos uma requisição para um bloco que não existe?

Para tratarmos isso vamos retornar um HTTP404 com uma descrição.

```js
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks/:name', function(request, response) {
    var description = blocks[request.params.name]; //Buscamos as descrições
    if(!description) { //O retorno `undefined` é tratado como false
        response.status(404).json('No description found for '+ request.params.name); //Retornamos uma mensagem amigável
    } else {
         response.json(description); //Enviamos tudo
    }
});
```

### Tratando casos genéricos

Para deixar o parâmetro da request normalizado, tanto em casing quanto em nome, podemos usar nosso código atual, só que refatorado:

```js
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks/:name', function(request, response) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase(); //Converte a primeira letra do nome para maiúsculo e o restante para minúsculo
    var description = blocks[block]; //Agora o nome está normalizado

    if(!description) { //O retorno `undefined` é tratado como false
        response.status(404).json('No description found for '+ request.params.name); //Retornamos uma mensagem amigável
    } else {
         response.json(description); //Enviamos tudo
    }
});
```

Desta forma toda a requisição que chega será tratada antes de ser buscada, então nosso parâmetro fica case insensitive.

Mas e se precisarmos utilizar isso novamente em multiplas rotas? Teríamos que copiar e colar o nosso código, o que não é bom.

O Express possui um método chamado `param`, que encapsula todos os parâmetros enviados pelas requests antes de eles chegarem no código final. A estrutura básica é a seguinte:

```js
app.param('nome do parâmetro', function(request, response, next) {});
```

Ou então é possível criar um middleware e passar no lugar da função (que tem a mesma assinatura de uma função middleware).

Vamos criar um "filtro":

```js
var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

app.param('name', function(request, response, next) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    request.blockName = block;// Com esta linha criamos uma propriedade dentro de request que torna o nome do bloco acessível por TODAS as rotas dentro de app

    next();
});

app.get('/blocks/:name', function(request, response) {
//Converte a primeira letra do nome para maiúsculo e o restante para minúsculo
    var description = blocks[request.blockName]; //Agora o nome está normalizado

    if(!description) { //O retorno `undefined` é tratado como false
        response.status(404).json('No description found for '+ request.params.name); //Retornamos uma mensagem amigável
    } else {
         response.json(description); //Enviamos tudo
    }
});
```

Uma última alteração na nossa rota padrão para `/blocks` para fazer com que ela retorna só as chaves e não o objeto todo:

```js
app.get('/blocks', function(request, response) {

    if(request.query.limit >= 0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(Object.keys(blocks));
    }

});
```

## POST e DELETE

Até agora criamos só rotas do tipo GET. Vamos criar umas rotas do tipo POST e DELETE:

### POST

Queremos poder criar novos blocos na nossa lista de blocos.

No nosso site principal, vamos criar um formulário que vai enviar nossas informações de nome e descrição dos blocos para uma rota POST em `/blocks`.

Para podermos ler informações enviadas por forms e parseadas com URL Encode ou qualquer outro tipo de parser, vamos ter que instalar o middleware `body-parser` pelo comando `npm i body-parser`. Então no nosso aplicativo vamos usá-lo:

```js
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended : false}); //A opção extended força o uso do parser nativo do node
```

O valor que recebemos do body parser é uma função middleware que podemos passar para o post:

```js
//O post pode receber várias funções de tratamento que são executadas sequencialmente, neste caso estamos passando o parseUrlencoded como sendo o tratador do payload que vai ser enviado para a rota, depois que ela for tratada então podemos chamar uma função anonima que vai fazer as ações internas
app.post('/blocks', parseUrlencoded, function(request, response) {
    var newBlock = request.body; //Aqui vem o payload como JSON em um objeto
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name); //Respondemos com 201 - CREATED
});
```

### DELETE

Para podermos fazer um delete, vamos usar a mesma estrutura do POSt, porém ao invés de enviarmos um POST, vamos mandar um DELETE para `/blocks/:name` e retornar 200 OK quando terminar.

```js
app.delete('/blocks/:name', function(request, response) {
    delete blocks[request.blockName]; //A propriedade blockName está sendo setada naquele app.param que definimos antes.

    response.sendStatus(200); //A função sendStatus serve quando não queremos setar uma mensagem personalizada, desta forma a mensagem é capturada de acordo com o status code do HTTP
});
```

## Instancias de Rotas

Podemos ter vários nomes de rotas repetidos, para evitar isso podemos criar instancias da nomenclatura.

Para criarmos as instancias das rotas usamos `app.route`:

```js
var blocksRoute = app.route('/blocks');
```

`app.route` vai retornar um objeto que trata todas os métodos do caminho passado, no nosso caso, `/blocks`. Daí podemos tratar da seguinte forma:

```js
blocksRoute.get(function(request, response) {.....});
blocksRoute.post(parseUrlencoded, function(request, response) {.......});
```

Já que não precisamos repetir o caminho. É uma boa prática implantar esse tipo de situação.

Podemos usar function chaining para remover a variável `blocksRoute`, já que ela é uma intermediária e não faz nada.

Como a instancia retorna um objeto, podemos ligar o get e post diretamente no retorno do app.route:

```js
var blocksRoute = app.route('/blocks')
    .get(function(request, response) {.....})
    .post(parseUrlencoded, function(request, response) {.......});
```

Isso fica ainda muito mais curto e muito mais visível.

Podemos fazer a mesma coisa para a rota `/blocks/:name`, adicionando o GET e DELETE para ela.

## Arquivos de rotas

Podemos criar arquivos para cada rota ou para cada conjunto de rotas a fim de reduzir a quantidade de código em um unico arquivo, usando o require:

```js
var app = require('express')();

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('./blocks',blocks);

app.listen(3000);
```

Vamos criar uma pasta específica para rotas:

Dentro de um arquivo `blocks.js` que vai conter todas as rotas dos blocos. O objetivo é ter tudo que é relacionado a blocos dentro deste arquivo. Vamos criar a seguinte linha de código:

```js
var express = require('express');
var router = expres.Router(); //Ele retorna um middleware como uma instancia de rota.

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

//Aqui o caminho é relativo a onde estamos montando o router, na instrução app.use('/blocks') que demos no bloco de código anterior
router.route('/')
    .get(function(request, response){ ... })
    .post(parseUrlencoded, function(request, response) { ... });

router.route('/:name')
    .all(function(request, response, next) { //Chamada por todos os métodos, fazemos a normalização do nome
        var name = reques.params.name;
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.blockName = block;
        next();
    })
    .get(function(request, response) { ... })
    .delete(function(request, response) { ... });

module.exports = router;
```

## Conteúdos adicionais

- http://expressjs.com
- http://github.com/strongloop/express
- http://github.com/expressjs/serve-static
- http://github.com/expressjs/morgan