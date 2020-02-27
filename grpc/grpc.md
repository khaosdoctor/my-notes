# gRPC

## Sumário


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [gRPC](#grpc)
  - [Sumário](#sumário)
  - [O Que é?](#o-que-é)
  - [Protobuf](#protobuf)
  - [gRPC](#grpc-1)
    - [Por que aprender gRPC](#por-que-aprender-grpc)
    - [Ferramentas](#ferramentas)
  - [Criando uma aplicação gRPC com Node.js](#criando-uma-aplicação-grpc-com-nodejs)

<!-- /code_chunk_output -->


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

Para saber mais sobre protobufs veja o [arquivo deste repositório](../protobuf/protobuf.md) que explica totalmente o funcionamento do mecanismo

## gRPC

O gRPC é um framework RPC grátis e open-source de RPC (**R**emote **P**rocedure **C**all). De acordo com a Wikipédia, um _RPC_ é definido da seguinte forma:

> Em computação distribuída, um RPC é quando um programa de computador faz com que uma procedure (subrotina) seja executada em um espaço de endereçamento diferente (geralmente em outro computador em uma rede compartilhada), codificado como se fosse uma chamada de rotina local dentro do próprio sistema, sem que o programador codifique os detalhes de conexão de rede ou interação remota. Essencialmente, o programador escreve o mesmo código que escreveria se estivesse chamando uma procedure localmente. Esta é uma forma de interação cliente-servidor (quem chama é o cliente e o executor é o servidor), tipicamente implementado via sistema de requisição e resposta através de mensageria.

O gRPC usa o protobuf que vimos no outro arquivo deste repositório. No resto, o gRPC pode ser sumarizado em uma série de tópicos:

- Criado pelo Google
- Se tornou open source através da CNCF, assim como o Kubernetes e o Helm
- Suporte amplo para linguagens:
  - C++
  - Java
  - Python
  - Go
  - C#
  - Node.js
  - Android
  - Dart
- O client pode executar o método na aplicação do servidor, como se fosse um objeto local, mesmo o servidor sendo outro computador da rede
- Um serviço gRPC é definido por uma interface composta de serviços (com métodos, parâmetros e tipos de retorno) e mensagens (contratos de dados com tipos especificados)
- A interface é implementada pelo servidor e executa como um serviço que aceita chamadas de clientes remotos
- O client usa um _stub_ (que é uma representação exata da interface do servidor) para fazer as chamadas remotas
- O servidores e clients são agnósticos de linguagens. Isso significa que o servidor pode ser implementado em Java e os clientes podem ser implementados em quaisquer outras linguagens suportadas
- Protobuf é utilizado como linguagem de definição principal e padrão como uma _Linguagem de definição das interfaces_ e também como o modelo de troca de mensagens

### Por que aprender gRPC

- Possui um fit natural quando construímos APIs porque temos que ter um contrato de entrada e saída e também facilita na hora de podermos construir clients que podem se comunicar remotamente com uma chamada de função
- O gRPC é reconhecido pela eficiência e baixa latência por conta de sua serialização e transferência binária

Geralmente desenvolvemos três tipos de APIs:

- Internas: Feito para uso interno ou de uma rede e aplicações bem definidas
- Parceiras: São meio publicas e meio privadas, porque são feitas para integrarem sistemas terceiros em sistemas locais
- Públicas: auto explicativo

Inicialmente, o gRPC é mais útil para APIs internas, pois temos o controle de ambas as partes do sistema. Quanto mais tempo passa, mais empresas estão desenvolvendo APIs usando gRPC, então isso acaba levando para uma adoção em massa do protocolo.

### Ferramentas

Geralmente, quando estamos testando uma API, utilizamos ferramentas de request, como o `Postman`, `Insomnia` ou `PostWoman`, porém para as chamadas gRPC algumas não oferecem suporte. Por isso utilizamos o [bloomRPC](https://github.com/uw-labs/bloomrpc)

## Criando uma aplicação gRPC com Node.js
