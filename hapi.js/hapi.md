# Hapi.js

> Framework para desenvolvimento de API's escaláveis

<!-- TOC -->

- [Hapi.js](#hapijs)
  - [O que é o Hapi](#o-que-é-o-hapi)
  - [Exemplo de alpicação](#exemplo-de-alpicação)
  - [Plugins](#plugins)
  - [Testes](#testes)
  - [Plugins recomendados](#plugins-recomendados)

<!-- /TOC -->

## O que é o Hapi

O Hapi.js é um framework criado pela Wal-Mart labs para cenários com número de requisições extremos. O principal motivo para que ele ser criado foi a _Black Friday_, mantendo as configurações principais como a CPU e a memória bastante estáveis.

- Link [oficial](hapijs.com)

O principal do Hapi é a criação de plugins para seu melhor uso. De forma que estes plugins sejam reutilizáveis e removendo a necessidade de perder tempo construindo infraestrutura.

## Exemplo de alpicação

Vamos construir uma aplicação de exemplo para mostrar como este código funciona em uma app hello world.

```js
'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({ //Configurações do servidor Hapi
  port: 8080, //Porta de conexão
  host: '0.0.0.0' //Vai rodar em todas as interfaces de rede
})

//Rotas//
server.route({ //Primeira rota em '/'
  method: 'GET', //Métodos aceitos
  path: '/', //Caminho da rota
  handler: (request, reply) => reply({ //Função que vai receber a nossa request, neste caso vai apenas responder um objeto json
    hello: 'world'
  })
})

server.start(err=> { //Inicia o servidor
  if(err) throw err //Se houver um erro manda o erro

  console.log('Servidor iniciado em %s', server.info.uri)
})
```

O Hapi já faz a compressão automaticamente para nós e também já especifica alguns headers como o `cache-control`.

Ele também possui um gerenciamento automático de validações dentro das rotas que são chamadas. Em muitos dos casos precisamos validar que o dado enviado pelo usuário é realmente verdade, para isso vamos utilizar um outro módulo chamado [Joi](http://github.com/hapijs/joi).

```js
'use strict'

const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()

server.connection({ //Configurações do servidor Hapi
  port: 8080, //Porta de conexão
  host: '0.0.0.0' //Vai rodar em todas as interfaces de rede
})

//Rotas//
// ..Rota Hello.. //

server.route({
  method: 'POST',
  path: '/api/v1/hello-world/{name}', //Parâmetro de rota {name}
  handler: (request, reply) => reply({ //Mesma função
    hello: `${request.params.name} ${request.payload.surname}`
  }),
  config: { //Objeto de configuração do Hapi
    validate: { //Diz que precisamos validar algo em nossa rota
      params: { //Vamos validar nossos parâmetros
        name: Joi.string().required() //O parâmetro name precisa ser uma string e ser obrigatório
      },
      payload: Joi.object({ // Vamos validar o body da request, ele precisa ser um objeto json
        surname: Joi.string().min(3).max(60).required() //Precisa conter uma propriedade surname com no mínimo 3 letras e no máximo 60 e também precisa ser obrigatório
      })
    }
  }
})

server.start(err=> { //Inicia o servidor
  if(err) throw err //Se houver um erro manda o erro

  console.log('Servidor iniciado em %s', server.info.uri)
})
```

Com estas rotas definimos que os objetos __precisam__ ser validados, como o Hapi e o Joi são muito bem integrados, o servidor nem vai chamar a handler se as configurações do Joi não forem corretas.

As mensagens de resposta e os códigos de erros são muito específicos e bem definidos.

Nós também podemos definir e validar nossa resposta:

```js
server.route({
  method: 'POST',
  path: '/api/v1/hello-world/{name}', 
  handler: (request, reply) => reply({ 
    hello: `${request.params.name} ${request.payload.surname}`
  }),
  config: {
    validate: {
        //Objeto de validação
      })
    },
    response: {
      schema: Joi.object({ //Valida o schema da resposta
        hello: Joi.string().required(), //O retorno Hello deve ser string e obrigatório
        password: Joi.forbidden() //Não Poderá haver nenhum campo Password na resposta
      })
    }
  }
})
```

## Plugins

Para podermos utilizar os plugins, vamos primeiramente transformar nosso servidor em algo modular, criando duas pastas: users e sessions dentro de uma pasta resources.

Para registrarmos plugins vamos ter que utilizar o método `register`

```js
'use strict'

const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()

server.connection({ //Configurações do servidor Hapi
  port: 8080, //Porta de conexão
  host: '0.0.0.0' //Vai rodar em todas as interfaces de rede
})

//Registra Plugins//
server.register({ //Registra um plugin
  register: require('hapi-router'), //Nome do plugin
  options: { //Opções específicas do plugin
    routes: 'resources/**/routes.js' //Nome do arquivo de rotas (com globs)
  }
})

server.start(err=> { //Inicia o servidor
  if(err) throw err //Se houver um erro manda o erro

  console.log('Servidor iniciado em %s', server.info.uri)
})
```

No arquivo `routes.js` agora vamos fazer o seguinte:

```js
'use strict'

const Joi = require('joi')
const handlers = require('./handlers') //Funções de retorno

module.exports = [{ //Exporta um array com as rotas
  method: 'POST',
  path: '/api/v1/users', //Rota de criação
  handlers: handlers.create, //Função que vai receber no arquivo handler.js
  config: { //Validações de prache
    validate: {
      payload: Joi.object({
        username: Joi.string.required(),
        password: Joi.string.required()
      })
    }
  }
}]
```

No arquivo `handlers.js` vamos criar o seguinte, utilizando o pacote [Boom](http://npmjs.com/package/boom):

```js
'use strict'

const Boom = require('boom') //Módulo para wraps padrões de erro

exports.create = (request, reply) => { //Exporta a função create
  const { username } = request.payload //extraindo o user do payload
  let response;
  if(username === 'alan') { //Se o usuário for igual a Alan
    response = Boom.badData('Este usuário já existe') //Manda um erro de badData do Boom
  } else {
    response = {success: true} //Se não reply success true
  }

  reply(response);
}
```

## Testes

Para realizar os testes, temos primeiro que fazer um alteração:

```js
'use strict'

const Hapi = require('hapi')
const Joi = require('joi')
const server = new Hapi.Server()

server.connection({ //Configurações do servidor Hapi
  port: 8080, //Porta de conexão
  host: '0.0.0.0' //Vai rodar em todas as interfaces de rede
})

//Registra Plugins//
// ... //

if(require.main === module) { //Verifica se abrimos como um módulo ou como um cli, neste caso: se abrimos no terminal
  server.start(err=> { //Inicia o servidor normalmente como um programa
    if(err) throw err //Se houver um erro manda o erro

    console.log('Servidor iniciado em %s', server.info.uri)
  })
}
else { //Se não, ele foi requerido por require em outra parte do programa
  module.exports = server //retornamos apenas a instancia do servidor
}
```

Isto vai evitar que nos testes que criemos, nós executemos os servidor quando formos incluir os serviços dentro dos mesmos.

Agora na pasta `tests` que criamos, vamos utilizar outros dois módulos da equipe do Hapi, o [lab](https://github.com/hapijs/lab) e o [code](https://github.com/hapijs/code)

```js
'use strict'

const lab = exports.lab = require('lab').scripts()
const { expect } = require('code')

const server = require('../index.js')

lab.describe('teste do resource users', () => {
  lab.test('deve retornar com sucesso', () => {
    return server.inject({ //O Hapi possui um método nativo para a injeção de novas rotas dentro do servidor que estamos configurando
      method: 'POST',
      url: '/api/v1/users',
      payload: {
        username: 'alan2',
        password: 'senha'
      }
    })
    .then(res => { //Desta forma executamos a request acima e realizamos o expect sobre a resposta
      expect(res.statusCode).to.equal(200) //Esperamos que seja igual a 200
      expect(res.result).to.equal({ success: true }) //Esperamos que o resultado seja o objeto que definimos
    })
  })

  lab.test('deve retornar com erro de usuário existente', async () => { //Funções async/await só estão disponíveis no node 7.10+ mas ambos funcionam (talvez demore mais do que a promise)
     const rest = await server.inject({ //Funções async/await só estão disponíveis no node 7.10+ mas ambos funcionam (talvez demore mais do que a promise)
      method: 'POST',
      url: '/api/v1/users',
      payload: {
        username: 'alan',
        password: 'senha'
      }
    })

    expect(res.statusCode).to.equal(422) //Esperamos que seja igual a 422
    expect(res.result).to.equal('Este usuário já existe') //Esperamos que o resultado seja o objeto que definimos
  })
})
```

Para testar vamos rodar `lab --verbose --colors --assert code --coverage` (ou definir isso dentro do nosso `npm test`).

## Plugins recomendados

- Hapi auth: plugins de autenticação
  - JWT
  - Basic
  - Digest
  - Cookie
  - Session
  - Mongo
- Plugins de sessão
- Logging
