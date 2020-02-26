# gRPC e protobuf

## Sumário

- [gRPC](#grpc)
  - [Sumário](#sumário)
  - [O que é](#o-que-é)

## O Que é?

gRPC é um framework para construção de APIs criado como alternativa ao JSON e XML. Originalmente criado pelo Google como um protocolo de comunicação, agora parte da CNCF. Seu objetivo principal era ser completamente *cross-platform* e completamente agnóstico de linguagem.

O gRPC é construído sobre o HTTP/2 e suporta tanto comunicação unária quanto streams de entrada e saída.

No geral, o gRPC pode ser entendido como uma plataforma open source universal de alta performance. Isso pode ser visto no [site oficial do gRPC](https://grpc.io).

Primeiro, antes de entrar no ambito do que o gRPC é, vamos dizer qual é o tipo de problema que ele resolve. Para ficar mais simples, vamos exemplificar com duas pessoas conversando em uma sala, ambas falam o mesmo idioma e a comunicação só acontece de um dos lados por vez. Neste caso é bastante simples:

1. O *remetente* envia uma mensagem (request) para o *receptor*, e espera uma resposta do mesmo
2. O *receptor* recebe a mensagem do *remetente* e retorna uma resposta como uma nova mensagem

Como estamos falando de duas pessoas na mesma sala, com o mesmo meio de comunicação, falando a mesma língua, temos uma situação bem simples. Os três principais pontos que fazem com que uma comunicação seja eficiente é:

- Mesma linguagem
- Mesmo meio
- Mesmo espaço

![](https://res.cloudinary.com/practicaldev/image/fetch/s--BgByOOYY--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/33935506/73964490-28a41800-4977-11ea-877b-26542bb2f27f.png)

Agora, para complicar um pouco mais, vamos separar as pessoas em duas salas diferentes, e fazer com que elas falem idiomas diferentes em países diferentes. Agora temos a seguinte lista de atributos da nossa conversa:

- Linguagem diferente
- Espaço diferente (estamos em um espaço distribuído)
- Meio de comunicação diferente

Para que estas duas pessoas possam se comunicar com sucesso precisaremos de um tipo de mecanismo ou ferramenta que permita que a nossa comunicação seja distribuída. Esta ferramenta vai ter que definir algum tipo de protocolo – que possui regras definidas e acordadas por ambas as partes – e também alguma forma de codificar ou decodificar a mensagem.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--SifvqIU9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/33935506/73964489-280b8180-4977-11ea-8691-bdfac793247d.png)

Agora o resultado é simples, basta que mudemos as duas pessoas por dois sistemas diferentes (completamente diferentes), por exemplo, vamos ter um client em python e Node.js e um servidor escrito em dotNetCore. Estas partes podem estar sendo executadas em lugares diferentes, em datacenters diferentes por sistemas completamente diferentes, mas o que garante que tenhamos um bom aproveitamento e uma comunicação eficiente é justament o protocolo que definimos. Por isso a combinação de *protobuf* e *gRPC* funciona tão bem.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--BgNFiThI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/33935506/74091899-f2ef6280-4b21-11ea-9b3f-17588e5c8ae0.png)

> A documentação online pode ser encontrada no [site oficial do gRPC](https://grpc.io) e também na [documentação do Google sobre Protobuf](https://developers.google.com/protocol-buffers/docs/overview)

## Protobuf

Os *protocol buffers*, ou simplesmente, *protobuf*, são mecanismos para serializar dados estruturados. No gRPC eles são o modelo de serialização padrão, embora eles não precisem ser utilizados somente com o gRPC.

### Utilizando protobufs

Como o protobuf é utilizado para serializar dados, vamos ter que definir uma estrutura que vai representar a informação que queremos serializar. Para isso vamos definir em um arquivo `.proto`.

```proto
message User {
  string firstName = 1;
  string lastName = 2;
  string email = 3;

  enum AddressType {
    HOME = 0;
    POSTAL = 1;
    WORK = 2;
  }

  message Address {
    string line1 = 1;
    string line2 = 2;
    string region = 3;
    string city = 4;
    string suburb = 5;
    string code = 6;
    AddressType type = 7;
  }

  repeated Address addresses = 4;
}
```

Para utilizar este arquivo, que vamos chamar de `meetings.proto`, vamos ter que instalar o `protoc`, que é o compilador do protobuf para diversas linguagens de programação.

> Os links e guias para instalação do protoc podem ser encontrados [no repositório oficial](https://github.com/protocolbuffers/protobuf)

> Para instalação no MacOS, você pode executar `brew install protobuf`

Então, após termos o compilador instalado, podemos utilizar o serializador através do comando: `protoc --js_out=import_style=commonjs,binary:. meetings.proto`.

> **Nota**: Isto é válido __somente__ para JavaScript

Assim que o processo terminar, vamos ter um arquivo `meetings_pb.js` criado na mesma pasta.

#### Utilizando protobufs com JS e TS

Além disso, podemos utilizar uma biblioteca própria para manipulação de protobuf em Node.js chamada [protobufjs](https://www.npmjs.com/package/protobufjs). Ela facilita bastante a comunicação entre um cliente e um servidor utilizando protobuf.

Com ele podemos utilizar uma série de formatos para poder criar nossos arquivos de _protobuf_, por exemplo, podemos criar e ler o arquivo `.proto` diretamente do arquivo `.js` através de sua API:

```js
// Veja o arquivo ./examples/protobuf-js/index.js
const protobuf = require('protobufjs')
const path = require('path')

protobuf.load(path.resolve('../protobuf/meetings.proto'))
  .then(start)
  .catch(console.error)

function start (root) {
  const User = root.lookupType('meetings.User')
  const payload = {
    firstName: 'Lucas',
    lastName: 'Santos',
    addresses: [
      {
        line1: 'Rua X',
        line2: 3540,
        type: 0
      }
    ]
  }

  const message = User.fromObject(payload)
  const buffer = User.encode(message).finish()
  console.log(buffer, message)

  const decoded = User.decode(buffer)
  const obj = User.toObject(decoded)
  console.log(decoded, obj)
}
```

Ou então podemos rodar o comando `pbjs`, já incluso no pacote, na linha de comando da seguinte forma: `pbjs -t static-module -w commonjs -o compiledUser.js ../protobuf/meetings.proto`

Isto criará um arquivo chamado `compiledUser.js` que vamos importar como importamos um módulo JS normalmente.

```js
const { meetings: { User } } = require('./compiledUser')

const user = new User({
  firstName: 'Lucas',
  addresses: [new User.Address({ line1: 'Rua X' })]
}
)
const err = User.verify(user)
if (err) console.error(err)
console.log(`Created user: ${user.firstName}`)

const encoded = User.encode(user).finish()
console.log(encoded)

const decoded = User.decode(encoded)
console.log(decoded)
```

Todas as funcionalidades tem sua contraparte em TypeScript, a vantagem é que podemos utilizar o sistema de tipos que é gerado no final para poder tipar os nossos próprios envios e retornos.

## gRPC

o gRPC é um framework RPC grátis e open-source
