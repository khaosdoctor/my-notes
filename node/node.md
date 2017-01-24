# Node.js

<!-- TOC -->

- [Node.js](#nodejs)
  - [O que é](#o-que-é)
  - [O que não é](#o-que-não-é)
  - [Blocking code e Non Blocking code](#blocking-code-e-non-blocking-code)
- [Hello World](#hello-world)
  - [Event Loop](#event-loop)
- [Eventos](#eventos)
  - [Emissores personalizados](#emissores-personalizados)
- [Streams](#streams)
  - [Lendo a Request](#lendo-a-request)
  - [Lendo um arquivo](#lendo-um-arquivo)
- [Módulos](#módulos)
  - [Criando um módulo](#criando-um-módulo)
    - [Exportando funções diretas](#exportando-funções-diretas)
  - [Detalhes sobre módulos](#detalhes-sobre-módulos)
- [Package.json](#packagejson)
  - [Definições de versões no arquivo](#definições-de-versões-no-arquivo)
- [Semantic Versioning](#semantic-versioning)
- [Express](#express)
  - [Iniciando](#iniciando)
  - [Parâmetros](#parâmetros)
  - [Templates](#templates)
    - [Ejs](#ejs)
- [Socket.io](#socketio)
  - [Instalação](#instalação)
  - [Utilização](#utilização)
    - [Back-end](#back-end)
    - [Front-end](#front-end)
- [Persistencia de dados](#persistencia-de-dados)
  - [Bancos de dados](#bancos-de-dados)
    - [Mostrando usuários do chat](#mostrando-usuários-do-chat)

<!-- /TOC -->

## O que é
Permite construir aplicações escaláveis usando javascript no server-side. Usando um wrapper ao redor do runtime V8 do Chrome, escrito em C
permite que seja um ambiente extremamente rápido e não blockante.

## O que não é

- Não é um framework para web: Estamos falando de comunicação de rede de baixo nível em tempo real
- Não é multi thread: Pelo mesmo motivo anterior. Pense como um webserver de uma unica thread

## Blocking code e Non Blocking code
Um código blockante é executado em sequencia esperando o que a função anterior irá enviar para a próxima linha a fim de alterar o estado
programa.

Já um código não blockante é feito de maneira "assíncrona", ou seja, quando uma função completa sua execução, é possível definir um
callback de completude, desta forma o programa não precisa esperar a função terminar, uma vez que a própria função já sabe que ao final
da tarefa atual ela deverá executar outra função. É mais ou menos como "Faça isso, e quando você acabar faça aquilo".

# Hello World

A aplicação base em node seria (em um arquivo app.j):

```js
var http = require('http'); //Incluindo uma nova biblioteca

http.createServer(function(request, response) {

  response.writeHead(200); //Retorna o status 200 OK a Sintaxe aqui é rs.writeHead(<status>, {"header":"value"})
  response.write("Hello World"); //Retorna o body text/plain com o texto "Hello World"
  response.end(); //Finaliza a resposta

}).listen(8080); //Listen na porta 8080

console.log("Listening on port 8080");
```

## Event Loop
O event loop é uma das bases do Node, isso significa que ele estará sempre verificando eventos como request, connection, close e etc.
Todos os eventos que são chamados entram em uma fila que são executados um a um.

# Eventos
Assim como num DOM normal, que emite eventos como click, hover e etc. O node possui algumas instancias de emissores que disparam eventos que podem ser capturados e tratados.

Todos os emissores herdam um objeto principal chamado `EventEmitter`, como o `net.Server` que emite um evento `request`.

## Emissores personalizados
Para criarmos um emissor de eventos personalizados, primeiramente teremos que herdar o EventEmitter.

```js
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter(); //Novo emissor

logger.on('<evento>', function(parametro) { ... }); //Listener de um evento emitido
logger.emit('<evento>', '<dado>'); //Emite um evento
```

Podemos ter diversas funções ouvindo um mesmo evento ou podemos ter diferentes eventos para a mesma função. No Node.js isso não importa.
Tipicamente, como adicionamos listeners nos eventos seria assim:

```js
var http = require('http');
var server = http.createServer(); //Cria um objeto server, este objeto emite vários eventos, um deles é o request que é emitido sempre que alguém dá um GET na página

server.on('request', function(request, response){...}); //Ouvimos o evento request, que retorna dois parâmetros e fazemos algo
```

> O método `emit()` pode devolver N parâmetros, sendo eles strings, objetos ou qualquer outra coisa

# Streams
Streams são fluxos de dados que permitem que o node gerencie arquivos, textos ou qualquer outro tipo de objeto pedaço por pedaço ao invés de ter de esperar até o fim da requisição. Na verdade, é ai que o Node.js realmente se destaca.

Existem dois tipos de streams:
- Readable Stream: Apenas permite leitura
- Writeable stream: Apenas permite escrita

Os parâmetros `request` e `response` do server html que iniciamos no inicio, são bons exemplos de streams. Que são canais abertos de informação constante.

## Lendo a Request
A request herda o objeto eventEmitter, que por sua vez emite dois eventos: `readable` e `end`. 

- Readable: Os dados estão prontos para serem consumidos
- End: O client acabou de enviar os dados

Exemplo:
```js
var http = require('http');
http.createServer(function(request, response) {

  response.writeHead(200);
  request.on('readable', function() { //Ouve o evento readable, quando os dados estão prontos para serem consumidos
    var chunk = null;
    
    while(null !== (chunk = request.read())) { //Lê os dados que estão chegando da request, se não for nulo então
      console.log(chunk.toString());
    }
  });
  
  request.on('end', function() { //Ouve o final do request
    response.end();
  });
  
}).listen(8080);
```

Do modo como estamos fazendo acima, pegamos o que o client manda para nós e logamos no console. Porém e se quisermos mandar de volta para ele? Neste caso basta substituir a linha `console.log(chunk.toString());` por `response.write(chunk);`. Note que não precisamos do `toString()` no segundo caso, pois o método write aceita buffers como parâmetro. Que são exatamente o que as chunks são.

Mas, há um jeito mais fácil de se transmitir todos os dados de uma request de volta para uma response, ou seja, enviar de volta para o cliente o que ele te mandou. Esse método é chamado `pipe()`. Utilizamos então:

```js
var http = require('http');
http.createServer(function(request, response) {

  response.writeHead(200);
  request.pipe(response); //Pega o que chegou e devolve
  
}).listen(8080);
```

## Lendo um arquivo
Agora vamos ler o conteúdo de um arquivo para outro arquivo.

```js
var fs = require('fs');
var file = fs.createReadStream('readme.md');
var newFile = fs.createWriteStream('readme_copy.md');
file.pipe(newFile);
```

E se quisermos ler uma request e escrever em um arquivo:

```js
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  var newFile = fs.createWriteStream('requestSent.md');
  request.pipe(newFile); //Pega o conteúdo da request e escreve no arquivo
  
  request.on('end', function() { response.end('uploaded'); }); //Quando a request terminar, responde ao usuário
}).listen(8080);
```

Se quisermos reportar o progresso do envio, podemos fazer o seguinte:

```js
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  var newFile = fs.createWriteStream('requestSent.md');
  var fileSizeTotal = request.headers['content-length']; //Le o header pra pegar o tamanho total do arquivo
  var uploadedBytes = 0; //Bytes enviados
  
  request.on('readable', function() {
    var chunk = null;
    while(null !== (chunk = request.read())) { 
      uploadedBytes += chunk.length; //Incrementa o tamanho de upload com o tamanho da chunk
      var progress = (uploadedBytes / fileSizeTotal) * 100; //Faz a regra de 3
      response.write("Progress: " + parseInt(progress,10) +"%\n"); //Responde o progresso
    }
  
  request.pipe(newFile); //Pega o conteúdo da request e escreve no arquivo EM TEMPO REAL, separadamento do while
  
  request.on('end', function() { response.end('uploaded'); }); //Quando a request terminar, responde ao usuário
}).listen(8080);
```

# Módulos
Módulos como o http e o fs que usamos anteriormente, na verdade são arquivos javascript que são lidos pelo node e importados no seu sistema. Como as DLL's são em outras linguagens.

## Criando um módulo
Temos que criar um novo arquivo .js com o nome desejado. Então criamos um arquivo exemplo `custom_hello.js`:
```js
var hello = function() {
  console.log("hello!");
}
```

Para expor ele a outras aplicações, temos que usar a palavra chave `exports`. Que define o que o `require` irá pegar quando requerer nosso módulo. Então adicionamos `module.exports = hello;` então a variável hello será exportada para fora do módulo.

Enquanto isso no nosso sistema padrão usamos `var hello = require('./custom_hello');` que nos dará acesso a nossa função hello. Quando chamarmos `hello()` ele irá printar "hello!" no console.

### Exportando funções diretas
Para exportar diretamente um método ou um objeto usamos `exports.<nome> = <valor>`, por exemplo, `exports.goodbye = function() { console.log('bye');` irá exportar diretamente o método goodbye para publico.

> Note que com o `module.exports` podemos apenas exportar um unico valor ou objeto para fora por vez, enquanto o exports permite a exportação de vários

*Exemplo:* Vamos refatorar uma requisição http em um módulo:
```js
var http = require('http');

var message = "Here's looking at you, kid.";
var options = { host: "localhost", port: 8080, path: "/", method: "POST" };

var request = http.request(options, function(response) { //Inicia a requisição e cria um callback para quando a response voltar
  response.on('data', function(data) { //Adiciona um listener no evento data do node para quando os dados chegarem ir exibindo no console
    console.log(data);
  });
});

request.write(message);
request.end();
```

Primeiramente vamos encapsular tudo em uma função, definindo que poderemos setar uma mensagem de resposta

```js
var http = require('http');

var makeRequest = function(message) {
  var options = { host: "localhost", port: 8080, path: "/", method: "POST" };
  
  var request = http.request(options, function(response) { //Inicia a requisição e cria um callback para quando a response voltar
    response.on('data', function(data) { //Adiciona um listener no evento data do node para quando os dados chegarem ir exibindo no console
      console.log(data);
    });
  });
  
  request.write(message);
  request.end();
}

module.exports = makeRequest; //Já estamos exportando
```

## Detalhes sobre módulos
Quando requeremos um módulo com `require(./<modulo>)` estamos dizendo ao node para olhar na pasta atual um arquivo com aquele nome e a extensão .js.

Se fosse `../<nome>` o node estaria verificando um diretório atrás.

Agora, se não colocarmos nada e deixarmos apenas o nome do arquivo, o node irá procurar dentro de uma pasta chamada `node_modules` por um arquivo com aquele nome dentro do nosso diretório, se não houve nada lá então ele irá procurar na home, depois no caminho geral do sistema e por fim no root.

Os pacotes são instalados pelo npm, desta forma é possível instalar um módulo específico para uma aplicação com o `npm i <modulo>` que instalará um pacote (ou módulo) dentro de um diretório dentro da pasta node_modules, e ai você será capaz de requerer este módulo para utilização.

> O NPM também instala pacotes globais com `npm i -g <nome>`, que estão acessíveis por todo os sistema (geralmente são ferramentas CLI, como gulp, Grunt, CoffeScript, Jade e etc). Estes módulos não podem ser requeridos e precisam ser instalados localmente para tal

# Package.json
É o arquivo base do Node, aonde estão específicadas as dependencias, versões, nomes, descrições e etc. O comando `npm install` irá olhar dentro deste arquivo para instalar os módulos específicos.

## Definições de versões no arquivo
- `~1`: Versões entre 1.0.0 e 2.0.0, sempre a mais recente (Perigoso)
- `~1.8`: Versões maiores que 1.8.0 e menores que 1.9.0 (Menos perigoso)
- `~1.8.7`: Versões maiores que 1.8.7 e menores que 1.9.0 (Seguro)

# Semantic Versioning
Sistema de versionamento padrão de desenvolvimento de software (http://semver.org)

*Exemplo:* `1.7.5`
- 1: Major Version (Mudará os nomes das funções da API com quase certeza. É geralmente usado quando a versão atual não é compatível com nada da versão anterior, assemelha a um novo sistema, como o angular2 não é compatível com angular1)
- 7: Minor Version (Provavelmente não irá alterar os nomes das funções da API, porém é possível que se alterem. Geralmente usado quando a versão atual é compatível com a versão anterior, neste caso 1.7.5 seria compatível com a 1.6.5 e assim por diante)
- 5: Patch version (Não muda os nomes das funções da API, ou seja, as funções que serão chamadas por você ou que são publicas do projeto terão sempre os mesmos nomes)

# Express
Framework web baseado no Sinatra (Ruby) criado sobre o node para atribuir melhores funcionalidades.

Possui algumas facilidades como
- Rotas
- Direcionamento
- Middleware
- File upload

## Iniciando
Iniciamos com basicamente:
`var express = require('express');`

Express precisa ser instanciado, então iremos chamar:
`var app = express();`

E então podemos definir os endpoints:
```js
var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.listen(8080);
```

## Parâmetros
Para definirmos parâmetros podemos adicionar um `:param` no endpoint, como no exemplo a seguir, que receberá um usuário do twitter e buscará os ultimos 10 tweets:
```js
var request = require('request');
var url = require('url');

app.get('/tweets/:username', function(req, response) {
  var username = req.params.username; //pega o username nos parâmetros
  
  var options = { protocol: "http:", host: "api.twitter.com", pathname: "/1/statuses/user_timeline.json", query: {screen_name: username, count:10}};
  
  var twitterUrl = url.format(options);
  request(twitterUrl).pipe(response);
});
```

## Templates
Templates são uma forma de renderizar modelos html com variáveis.

Para deixar a nossa saída dos tweets mais bonita, vamos renderizar o json de uma forma aceitável.
```js
var request = require('request');
var url = require('url');

app.get('/tweets/:username', function(req, response) {
  var username = req.params.username; //pega o username nos parâmetros
  
  var options = { protocol: "http:", host: "api.twitter.com", pathname: "/1/statuses/user_timeline.json", query: {screen_name: username, count:10}};
  
  var twitterUrl = url.format(options);
  request(twitterUrl, function(err, res, body) {
    var tweets = JSON.parse(body);
    response.locals = {tweets: tweets, name: username}; //Seta as variáveis locais do template
    response.render('tweets.ejs'); //Renderiza o template
  })
});
```

### Ejs
EJS significa Embedded Javascript, e pode ser instalado com `npm i --save ejs`, nosso template ficará:
```ejs
<h1>Tweets for @<%= name %></h1> <!-- Interpolação, estamos indicando a variável "name" do locals para ser renderizada aqui -->
<ul>
  <% tweets.forEach(function(tweet){ %> <!-- Loop pelos tweets -->
    <li><%= tweet.text %></li>
  <% }); %>
</ul>
```

# Socket.io
Socket.io é uma ferramenta do node para desenvolvimento de websockets que permitem portas que continuem abertas e a transmissão de informação seja continua.

## Instalação
Para instalar o Socket.io é bem simples, basta que utilizemos o npm: `npm i --save socket.io`

## Utilização
Para demonstrar o uso do Socket.io vamos construir um aplicativo de chat.

### Back-end
Primeiramente vamos requerer os módulos Express.js, HTTP e o próprio Socket.io:

```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
```

Desta forma o Socket.io e o express estarão ouvindo o mesmo servidor HTTP e compartilhando a conexão.

```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('conenction', function(client) { //No evento de uma nova conexão, vamos logar no console quem se conectou
  console.log('Client connected...');

  client.on('messages', function(data) { //Ouve o evento messages por mensagens digitadas no client
    console.log(data); //Loga no console
    client.broadcast.emit('messages', client.nickname + ": " + data); //Envia a mensagem para todos os clients conectados mas não para o que enviou a mensagem
    client.emit('messages', client.nickname + ": " + data); //Envia a mensagem para o client que também mandou a mensagem
  }

  client.on('join', function(name) { //Ouve um evento join, que o client irá mandar, com o nome do usuário que foi conectado
    client.nickname = name; //Nickname é uma propriedade de client que permite que o alias do client esteja disponível tanto no servidor quanto no client do outro lado
    client.broadcast.emit('chat', name + ' joined the chat');
  });

  client.emit('messages', { hello: 'world' }); //Emite um evento no client (browser) com a mensagem selecionada
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/indes.html');
});

server.listen(8080);
```

### Front-end
No nosso arquivo index.html que foi enviado acima pela rota `/` no método GET encontraremos:

```html
<script src='/socket.io/socket.io.js'></script>
<script>
  var socket = io.connect('http://localhost:8080');
  socket.on('messages', function(data) { //Ao receber uma mensagem
    alert(data.hello);
    $('#chat_box').append(data); //Adiciona mensagem na caixa de mensagens
  });

  socket.on('connect', function(data) { //Ao conectar
    $('#status').html('Connected...');
    nickname = prompt("What is your name?"); //Pergunta o nome do usuário
    server.emit('join', nickname); //Emite o evento join que passa o nome do usuário para o server, dessa forma ele pode saber quem é quem
  });

  $('#chat_form').submit(function(e){
    var message = $('#char_input').val();
    socket.emit('messages', message);
  });
</script>
```

Perceba que o que fizemos acima foi, basicamente, conectar ao nosso localhost na porta selecionada e ouvir ao evento messages que emitimos a partir do node (veja que no evento `messages` que estamos emitindo acima, o server envia um objeto com a propriedade `hello` setada com uma string "world"), desta forma quando o server emitir um evento do tipo `messages` o client irá ouvir este evento e capturar o que ele está enviando (no parâmetro data da função) e printar com um alert.

Em seguida iremos fazer com que o server também ouça o evento messages para que o usuário possa digitar uma mensagem e enviar uma mensagem ao servidor (no caso estamos usando jQuery simples para pegar o valor do hipotético campo de mensagens do formulário e enviar para o nosso socket emitindo um evento messages que estará sendo escutado no servidor), essa mensagem será escrita no log.

Como estamos utilizando uma sala de chat, precisaremos que todas as mensagens enviadas ao nosso servidor sejam automaticamente transmitidas para os outros clientes conectados, podemos usar o método `broadcast` do socket.io para fazer isso, este método transmite dados para todos os clientes conectados, mas ele não manda para o client que mandou a mensagem originalmente, então desta forma se quisermos também responder de volta para a pessoa que enviou a mensagem originalmente teremos que chamar o tradicional `server.emit(event, data)`.

# Persistencia de dados
Usando o mesmo sistema de mensagens de anteriormente, vamos fazer com que as mensagens anteriores ao usuário entrar no chat também sejam mostradas na janela de chat quando um novo usuário entrar, assim ele sabe tudo o que aconteceu na janela no periodo que ele ficou fora.

Primeiramente no servidor teremos isto: 
```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('conenction', function(client) { //No evento de uma nova conexão, vamos logar no console quem se conectou
  console.log('Client connected...');

  client.on('messages', function(data) { //Ouve o evento messages por mensagens digitadas no client
    console.log(data); //Loga no console
    client.broadcast.emit('messages', client.nickname + ": " + data); //Envia a mensagem para todos os clients conectados mas não para o que enviou a mensagem
    client.emit('messages', client.nickname + ": " + data); //Envia a mensagem para o client que também mandou a mensagem
  }

  client.on('join', function(name) { //Ouve um evento join, que o client irá mandar, com o nome do usuário que foi conectado
    client.nickname = name; //Nickname é uma propriedade de client que permite que o alias do client esteja disponível tanto no servidor quanto no client do outro lado
    client.broadcast.emit('chat', name + ' joined the chat');
  });

  client.emit('messages', { hello: 'world' }); //Emite um evento no client (browser) com a mensagem selecionada
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/indes.html');
});

server.listen(8080);
```

Para podermos armazenar as mensagens será o seguinte. Criamos um array de mensagens no server e iremos adicionar todas as mensagens neste array, depois criaremos uma função de armazenamento de mensagens que será responsável por guardar esta mensagem no array, depois, quando um client novo logar, vamos iterar por todas estas mensagens e enviar *somente* para ele:
```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = []; //Array de mensagens
var storeMessage = function(name, data) {
  messages.push({name: name, data: data});
  if(messages.length > 10) { //Se nosso array tiver mais que 10 mensagens
    messages.shift(); //Removemos a primeira
  }
}; //Adiciona uma nova mensagem ao array

io.on('conenction', function(client) { //No evento de uma nova conexão, vamos logar no console quem se conectou
  console.log('Client connected...');

  client.on('messages', function(data) { //Ouve o evento messages por mensagens digitadas no client
    client.get('nickname', function(error, name) { //Função para pegar o nome do client
      client.broadcast.emit('messages', name + ": " + data); //Envia a mensagem para todos os clients conectados mas não para o que enviou a mensagem
      client.emit('messages', name + ": " + data); //Envia a mensagem para o client que também mandou a mensagem
      storeMessage(name, message); //Armazena a mensagem
    });
  }

  client.on('join', function(name) { //Ouve um evento join, que o client irá mandar, com o nome do usuário que foi conectado
    client.nickname = name; //Nickname é uma propriedade de client que permite que o alias do client esteja disponível tanto no servidor quanto no client do outro lado
    client.broadcast.emit('chat', name + ' joined the chat');

    messages.forEach(function(message) { //Itera pelo array de mensagens para cada novo client que logar e emite as mensagens apenas para ele
      client.emit('messages', message.name + ": " + message.data);
    });
  });

  client.emit('messages', { hello: 'world' }); //Emite um evento no client (browser) com a mensagem selecionada
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/indes.html');
});

server.listen(8080);
```

Isto salva as mensagens temporariamente, pois estamos usando uma estrutura de dados interna do JS para armazenar nossas mensagens, o que significa que, se o servidor for reiniciado, todo o array será apagado e a mensagem será perdida. Para solucionar este problema podemos usar um serviço de banco de dados.

## Bancos de dados
Em Node, temos diversos drivers de bancos de dados, desde os menos famosos até os mais comuns como o Redis e MongoDB. Vamos usar o Redis. Para conectar o Node com o redis usaremos a biblioteca Node_Redis instalando com o comando `npm i --save redis`. Então requerimos ela e criamos um client.
```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redis_client = redis.createClient(); //Cria um client redis

var storeMessage = function(name, data) {
  redis_client.lpush('messages', JSON.stringify({name: name, data: data}), function(err, response) { //Adicionamos a mensagem ao Redis na lista "messages"
    redis_client.ltrim("messages", 0, 9); //Remove todos os elementos da lista depois do index 9 (ficam só 10)
  });
}; //Adiciona uma nova mensagem ao Redis

io.on('conenction', function(client) { //No evento de uma nova conexão, vamos logar no console quem se conectou
  console.log('Client connected...');

  client.on('messages', function(data) { //Ouve o evento messages por mensagens digitadas no client
    client.get('nickname', function(error, name) { //Função para pegar o nome do client
      client.broadcast.emit('messages', name + ": " + data); //Envia a mensagem para todos os clients conectados mas não para o que enviou a mensagem
      client.emit('messages', name + ": " + data); //Envia a mensagem para o client que também mandou a mensagem
      storeMessage(name, message); //Armazena a mensagem
    });
  }

  client.on('join', function(name) { //Ouve um evento join, que o client irá mandar, com o nome do usuário que foi conectado
    client.nickname = name; //Nickname é uma propriedade de client que permite que o alias do client esteja disponível tanto no servidor quanto no client do outro lado
    client.broadcast.emit('chat', name + ' joined the chat');

    redis_client.lrange("messages", 0, -1, function(err, messages) {
      messages = messages.reverse(); //Revertemos a ordem das mensagens assim as mais novas ficam por ultimo

      messages.forEach(function(message) { //Itera pelo objeto de mensagens para cada novo client que logar e emite as mensagens apenas para ele
        message = JSON.parse(message); //Transforma em JSON de novo
        client.emit('messages', message.name + ": " + message.data);
      });

    });
  });

  client.emit('messages', { hello: 'world' }); //Emite um evento no client (browser) com a mensagem selecionada
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/indes.html');
});

server.listen(8080);
```

A partir de agora todas as nossas mensagens estarão guardadas no nosso banco de dados Redis e estarão persistidas.

### Mostrando usuários do chat
Também usaremos o redis para mostrar uma lista de usuários que estão atualmente conectados no chat. Desta forma podemos armazenar todos os usuários em um set, que é uma lista de valores que não pode se repetir.

```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redis_client = redis.createClient(); //Cria um client redis

var storeMessage = function(name, data) {
  redis_client.lpush('messages', JSON.stringify({name: name, data: data}), function(err, response) { //Adicionamos a mensagem ao Redis na lista "messages"
    redis_client.ltrim("messages", 0, 9); //Remove todos os elementos da lista depois do index 9 (ficam só 10)
  });
}; //Adiciona uma nova mensagem ao Redis

io.on('conenction', function(client) { //No evento de uma nova conexão, vamos logar no console quem se conectou
  console.log('Client connected...');

  client.on('messages', function(data) { //Ouve o evento messages por mensagens digitadas no client
    client.get('nickname', function(error, name) { //Função para pegar o nome do client
      client.broadcast.emit('messages', name + ": " + data); //Envia a mensagem para todos os clients conectados mas não para o que enviou a mensagem
      client.emit('messages', name + ": " + data); //Envia a mensagem para o client que também mandou a mensagem
      storeMessage(name, message); //Armazena a mensagem
    });
  }

  client.on('join', function(name) { //Ouve um evento join, que o client irá mandar, com o nome do usuário que foi conectado
    client.nickname = name; //Nickname é uma propriedade de client que permite que o alias do client esteja disponível tanto no servidor quanto no client do outro lado
    client.broadcast.emit('chat', name + ' joined the chat');

    client.broadcast.emit('add chatter', name); //Emite que um novo usuário entrou para todos os usuários
    redis_client.smembers('names', function(err, names) { //Quando um novo usuário entrar emite para ele todos os usuários do redis que estão logados
      names.forEach(function(name) { //Itera pelo resultado da busca no redis e emite o evento add chatter para o client logado
        client.emit('add chatter', name);
      });
    });
    redis_client.sadd('chatters', name); //Adiciona ao set do Redis o usuário que entrou

    redis_client.lrange("messages", 0, -1, function(err, messages) {
      messages = messages.reverse(); //Revertemos a ordem das mensagens assim as mais novas ficam por ultimo

      messages.forEach(function(message) { //Itera pelo objeto de mensagens para cada novo client que logar e emite as mensagens apenas para ele
        message = JSON.parse(message); //Transforma em JSON de novo
        client.emit('messages', message.name + ": " + message.data);
      });
    });

  });

  client.on('disconnect', function(name) { //Ouve um evento de desconexão
    client.get('nickname', function(err, name) { //Pega o nome de usuário
      client.broadcast.emit('remove chatter', name); //Emite um evento de remoção de usuário
      redis_client.srem('chatters', name); //Remove do set
    });
  });

  client.emit('messages', { hello: 'world' }); //Emite um evento no client (browser) com a mensagem selecionada
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/indes.html');
});

server.listen(8080);
```

Então no nosso front usamos:

```js
socket.on('add chatter', function(name) {
  var chatter = $('<li>'+name+'</li>').data('name', name);
  $('#cjhatters').append(chatter);
}

socket.on('remove chatter', function(name) {
  $('#chatters li[data-name='+name+']').remove();
});
```


