# Sumário


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Sumário](#sumário)
- [Protobuf](#protobuf)
  - [Utilizando protobufs](#utilizando-protobufs)
    - [Utilizando protobufs com JS e TS](#utilizando-protobufs-com-js-e-ts)

<!-- /code_chunk_output -->


# Protobuf

Os *protocol buffers*, ou simplesmente, *protobuf*, são mecanismos para serializar dados estruturados. No gRPC eles são o modelo de serialização padrão, embora eles não precisem ser utilizados somente com o gRPC.

## Utilizando protobufs

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

### Utilizando protobufs com JS e TS

Além disso, podemos utilizar uma biblioteca própria para manipulação de protobuf em Node.js chamada [protobufjs](https://www.npmjs.com/package/protobufjs). Ela facilita bastante a comunicação entre um cliente e um servidor utilizando protobuf.

Com ele podemos utilizar uma série de formatos para poder criar nossos arquivos de _protobuf_, por exemplo, podemos criar e ler o arquivo `.proto` diretamente do arquivo `.js` através de sua API:

```js
// Veja o arquivo ./examples/protobuf-js/proto.js
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
// ./examples/protobuf-js/module.js
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

> **Ideia**: Explicação de protobuf com injeção de dependências usando TypeScript para gerar os tipos do mesmo e criar um sistema de mensageria que utiliza o protobuf como mecanismo principal de contratos
