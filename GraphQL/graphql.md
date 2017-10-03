# GraphQL

<!-- TOC -->

- [GraphQL](#graphql)
  - [O que é o graphQL?](#o-que-é-o-graphql)
  - [Exemplo de uso](#exemplo-de-uso)
  - [Tipos](#tipos)
  - [Resolvers](#resolvers)
  - [Mutations](#mutations)

<!-- /TOC -->

## O que é o graphQL?

É uma query language para API's. É uma forma de desenvolver API's de forma que suas chamadas sejam orientadas a tipos e não a dados, assim podemos ter um melhor controle sobre os dados que serão trazidos.

É como se fosse um SQL.

Primeiramente precisamos entender que estaremos subindo _servidores_ GraphQL, ou seja, não vamos estar utilizando o método HTTP puro, pois a requisição vai passar antes pelo servidor.

## Exemplo de uso

O pessoal do Training Center se organizou para disponibilizar publicamente e de forma organizada, os pupilos e mentores do projeto, bem como suas características. Assim, contratam a empresa Ordem Jedi para desenvolver a API. A empresa Ordem Jedi é conhecida por desenvolver projetos que são de fácil manutenção, escalabilidade e entendimento. Eles utilizam, para tanto, soluções JavaScript, tanto para servidor quanto para o client.

Como é o Training Center? Bem, o Training Center é um espaço em que pessoas se disponibilizam a ajudar outras a conseguirem dominar skills de desenvolvimento. Este relacionamento ocorre entre o que eles chamam de Pupilo e Mentor. O Pupilo, no início, procura escolher um mentor de acordo com a área de desenvolvimento que ele queira conhecer e dominar, conceito formulado como Carreira. As carreiras disponíveis são: backend, frontend, infraestrutura e fullstack. Taís áreas possuem um corpo de skills que um profissional precisa ter. Cada mentor escolhe uma área para atuar e aceita o pupilo que vai “mentorar”.

## Tipos

Se fossemos enumerar este problema, primeiramente precisamos saber como tudo se __relaciona__, para podermos criar uma linguagem fácil de buscar. Então poderemos criar alguns campos do tipo: nome, data, email e etc

Tudo em GraphQL é um __tipo__, um tipo é uma entidade no seu banco de dados (seja ele relacional ou não relacional), podemos ter então um pupilo assim:

```js
type Pupil {
  uuid: String!
  name: String!
  email: String!
  skills: [ String! ]!
}
```

Ele possui dois tipos padrões: _RootQuery_ e _RootMutation_. Cada um desses tipos é uma instância mãe de todos os outros daquele mesmo tipo. Assim, o _RootQuery_ é a mãe de todos os tipos _query_ e o _RootMutation_ é a mãe de todos os tipos _mutation_.

## Resolvers

O _Resolver_ é outro conceito importante de GraphQL. Ele já sabe que você possui um pupilo, um mentor e uma carreira, mas como retornaos esses dados na API? O resolver faz essa função. Ele basicamente é uma função que recebe três argumentos: _root, argumentos e contexto_.

```js
const pupils = (root, args, { db }) => db('pupils').orderBy('name', 'desc')

const singlePupil = (root, { uuid }, { db }) => db('pupils').where({ uuid })

module.exports = {
  pupils,
  singlePupil
}
```

O atributo __Root__ em _resolver_ seria o pai daquele mesmo _resolver_ no momento da query. Isso significa que o GraphQL possui uma árvore de resoluções de Query, podemos imaginar assim nossa RootQuery:

```js
type RootQuery {
  pupil(uid: String!): Pupil!
  pupils: [ Pupil ]!
  mentor(uid: String!): Mentor!
  mentors: [ Mentor ]!
  career(uid: String!): Career!
  careers: [ Career ]!
}
```

Temos nosso pupilo que queremos em nossa query:

```js
{
  pupils {
    uuid
    name
    emails
    mentor {
      uuid
      name
      email
    }
    career {
      name
    }
  }
}
```

Esta query retornaria algo assim:

```json
{
  "data": [{
    "uuid": "34352636547334&",
    "name": "Anakin Skywalker",
    "email": "ex@ex.com",
    "mentor": {
      "uuid": "647674526752366234",
      "name": "Obi-Wan Kenobi",
      "email": "ex2@ex2.com"
    },
    "career": {
      "name": "Fullstack"
    }
  }]
}
```

É importante perceber que, na query acima, o root é sempre o pai na hora da _query_, então neste caso o pai de `mentor` é `pupil`, isso permite que criemos o seguinte resolver para `mentor` e também para `career`:

```js
const mentor = (pupil, args, { db }) => db('mentors').where({ uuid: pupil.mentor_uuid })
const career = (pupil, args, { db }) => db('career').where({ uuid: pupil.career_uuid })

module.exports = { mentor, career }
```

O próximo argumento que vamos estudar é o __args__. Ele é bem simples, são todos os parâmetros que passamos na query. Voltando a esta query:

```js
type RootQuery {
  pupil(uid: String!): Pupil!
  pupils: [ Pupil ]!
  mentor(uid: String!): Mentor!
  mentors: [ Mentor ]!
  career(uid: String!): Career!
  careers: [ Career ]!
}
```

Viu os parâmetros com `()` e um nome dentro, como em `pupil(uid: String!): Pupil!`? Estes são os args.

Por fim temos o contexto. O contexto que utilizamos como `{ db }` é uma dependencia injetada na construção do server GraphQL. É possível colocar o que quisermos que ele estará disponível para todos os resolvers.

```js
const { graphqlHapi, graphqlHapi } = require('graphql-server-hapi')
const graphqlOptions = require('./options')

exports.register = (server, options, next) => {
  server.register([{
    register: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions
    }
  }])

  return next()
}

exports.register.attributes = { name: 'graphql-middleware' }
```

Agora o arquivo options:

```js
const schema = require('./schema')
const db = require('../../db')
const { $loadUser } = require('../helpers/auth')
const { isFunction } = require('lodash')

module.exports = (request) => {
  return new Promise((resolve, reject) => {
    const token = request.headers['authorization']
    return resolve({
      schema,
      context: {
        db,
        $loadUser: (fn) => {
          const result = $loadUser(token)
          if (isFunction(fn)) return result.then(fn)
          return result
        }
      }
    })
  })
}
```

O primeiro arquivo é a construção da aplicação, ela vai ser o server do GraphQL. O Options é o objeto com o Schema, que é o schema da aplicação e um contexto.

## Mutations

Mutations são modos de atualizar e modificar dados no sistema, e não apenas trazer estes dados. Todo caso de uso vai precisar de uma query para pegar os dados e outra para alterá-los.

Mutations também são um tipo (como qualquer coisa) e possuem uma mãe que é a _RootMutation_. As Mutations são queries com poderes especiais, então todo o sistema de tipos apresentado não será diferente nessa parte, mas como podemos enviar os dados ao servidor? Por parâmetros.

Enviamos os dados que queremos atualizar por um parâmetro na chamada da _mutation_, então por fim ela nos retorna um tipo. Vamos ver uma query para resolver que cria um pupilo:

```js
// Mutation mãe
type RootMutation {
  createPupil(data: InputPupil!): Pupil!
}

// Dados de entrada para o pupilo
input InputPupil {
  name: String!
  email: String!
  skills: [ String! ]!,
  uuid_mentor: String!
}

// Query
mutation createPupil {
  createPupil(data: {
    name: "R2-D2",
    email: "ex3@ex3.com",
    skills: [ "Sagacidade", "Proatividade" ]
    mentor_uuid: "23516533462376547"
  }) {
    name
  }
}
```

Vamos para o resolver do pupilo:

```js
const generator = require('node-uuid')
const createPupil = (root, { data }, { db }) => {
  data.uuid = generator()
  const fields = Object.keys(data)
  return db('pupils').insert(data).returning(fields)
}

module.exports = { RootMutation: { createPupil } }
```