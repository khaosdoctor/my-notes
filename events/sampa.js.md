<!-- TOC -->

- [Offline First](#offline-first)
  - [App Cache](#app-cache)
  - [Service Workers](#service-workers)
  - [Armazenamento de informações](#armazenamento-de-informações)
    - [Para Frameworks](#para-frameworks)
    - [PouchDB](#pouchdb)
  - [Offline-first](#offline-first)
- [Tretas de streaming de vídeo](#tretas-de-streaming-de-vídeo)
  - [A diferença de Video on demand para live Video](#a-diferença-de-video-on-demand-para-live-video)
    - [Do lado Front](#do-lado-front)
      - [WebRTC](#webrtc)
    - [Do lado do back](#do-lado-do-back)
    - [Plugin de vídeos](#plugin-de-vídeos)
- [Ionic 2](#ionic-2)
  - [Bases Ionic 1](#bases-ionic-1)
  - [O novo Ionic 2](#o-novo-ionic-2)
    - [Stack do Ionic](#stack-do-ionic)
      - [TypeScript](#typescript)
      - [Angular 2](#angular-2)
    - [Ionic Native](#ionic-native)
    - [Instalação e uso](#instalação-e-uso)
- [Programação funcional e Reativa com JS](#programação-funcional-e-reativa-com-js)
  - [Functors](#functors)
  - [Monads](#monads)
  - [Programação Reativa](#programação-reativa)

<!-- /TOC -->

# Offline First

< Slides aqui >

## App Cache

Palestra sobre offline-first:
- http://sergiolopes.org/palestra-appcache-html5-offline

AppCache github repo:
- https://github.com/gr2m/appcache-nanny

## Service Workers

O futuro do cache no browser. Antes de chegar no browser existe um serviço que intecepta o request e você pode tratar essa
requisição da maneira como você quiser.

Desta forma é possível fazer uma inteligencia que gerencie cache e responda diretamente para o cliente.

## Armazenamento de informações

Existem diversas formas de armazenamento de imagens:

- Cookies: Biblioteca de cookies https://github.com/js-cookie/js-cookie
  - Simples de implementar
  - Suporte amplo
  - Ótimo para informações curtas
  - Sem biblioteca o controle fica complexo
  - Problemas de segurança
  - Limite de 4k
- WebSQL: Banco de dados online. 
  - Banco de dados no browser
  - Performance razoável
  - Depreciado
  - Não aguenta muitos dados
  - Pouco suporte por browsers
- IndexDB: Mongo online (mais ou menos)
  - Trabalha com documentos
  - Mais programático
  - Muito novo ainda não tem tanto supote
  - Se o usuário fecha no meio de uma transaction, ja era os dados
  - Mais complexo
- LocalStorage: Armazenameno Chave/Valor. Biblioteca https://github.com/addyosmani/basket.js  ou https://github.com/marcuswestin/store.js
  - Facil implementação
  - Amplo Suporte
  - Melhor segurança
  - Sincrono
  - 5Mb
  - Dados são para sempre

### Para Frameworks

- https://github.com/webcss/angular-indexedDB
- https://github.com/paulocaldeira17/angular-websql
- https://github.com/marcj/angular2-localstorage

Simplificação: Mozilla localForage armazena informação da melhor forma possível

- https://github.com/mozilla/localForage

Ele se encarrega dos fallbacks para cada browser e se encarrega de armazenar no melhor modelo.

### PouchDB

- https://pouchdb.com/

Armazena a informação local e pode sincronizar através da rede mantendo online ou offline os dados.

Alternativa: http://lokijs.org/#/

## Offline-first

Site zica: http://offlinefirst.org

# Tretas de streaming de vídeo

< Slides aqui >

## A diferença de Video on demand para live Video

VOD:

- Video e audio HD
- Roda em pcs e smartphones
- Roda suave em qualquer banda
- Mais economico

Live Vídeo:

- Sem delay
- Possibilidade de chat
- Responder questões
- Requer mais hardware, software e internet

### Do lado Front

Temos dois pontos:

#### WebRTC

Cria dataChannel entre browsers como serverless application, ou seja, você pode criar uma conexão entre dois pcs só pelo browser

- [WebRTCEverywhere](https://github.com/sarandogou/webrtc-everywhere): Permite que o WebRTC seja suportado em qualquer browser.

(Pesquisar o webRTC no google para saber a implementação)

- [Samples para web](https://webrtc.github.io/samples/)
- [Tutoriais](http://www.html5rocks.com/en/tutorials/webrtc/basics/?redirect_from_locale=pt)

### Do lado do back

Todos os dados podem ser enviados a um media server  e de lá transmitidos para todos os usuários finais. Ele pode ser uma aplicação rodando em um servidor externo ou qualquer outro tipo de aplicação rodando um framework como o [Kurento](https://www.kurento.org/)

### Plugin de vídeos

- Videogular: Plugin de vídeo para angularjs

# Ionic 2

## Bases Ionic 1

Criado em 2013 substituindo o Sencha Mobile e o jQuery Mobile.

- O projeto base Cordova: Acesso nativo através de pluginx e geração de executável para app stores.

## O novo Ionic 2

Os componentes do Ionic 1 ainda existem, porém o sistema foi todo reescrito para a utilização do angular 2.

- Experiência mais próxima do nativo.
- Melhoria de Performance
- Suporta iOS, Android e Windows Phone
- Plugins nativos usam o Ionic Native
- ES6 / ES7
- Não tem roteamento
- Navegação por pilha
- Tudo que era classe virou propriedades

```html
<!-- ionic1 -->
<button class='button button-primary'></button>

<!-- ionic2 -->
<button primary></button>
```

### Stack do Ionic

1. Angular2
2. TypeScript
3. Sass
4. Cordova
5. Gulp.js

#### TypeScript

Usado pelo angular2 e o Ionic2, criado pela MS, como superset do javascript.

#### Angular 2

- Baseado em componentes
- Decorators
- Usa imports do ES2015
- TypeScript
- Morreu controllers, scope e etc
- Todos os componentes são diretivas
- O two-way-data-binding ainda existe mais é mais complicado

Ou seja, no geral isso ficou tudo muito complicado.

### Ionic Native

Os plugins populares do cordova viraram nativos do ionic como:

- Camera
- Bluetooth
- SqLite
- Facebook
- Push
- Etc...

### Instalação e uso

Se não usar o `--v2` vai criar no 1.

`ionic start app --v2`

Para instalar ficou a mesma coisa do primeiro.

Toda a estrutura será criada.

# Programação funcional e Reativa com JS

Programação funcional é em grande parte declarativa, ou seja, são declaradas funções que recebem parâmetros de entrada e realizam uma saída.

Se os parâmetros forem passados da mesma forma então o output será sempre o mesmo.

Programação funcional não possuem efeitos colaterais, ou seja, ela encapsula todo o código de uma funcionalidade e sempre retornam o mesmo resultado.

- Funções são imutáveis por padrão: Não podem ser editadas diretamente, precisam manter uma cópia da versão anterior.
- Funções são tipos primitivos
- Sempre trabalham dentro do seu próprio escopo: Uma função não pode ter acesso a objetos externos

## Functors

Pattern de transformação de objetos através de funções:

- São objetos que tem uma ou mais funções de alta classe: Uma função de alta classe recebe uma função como parâmetro
- Recebe uma função como parâmetro para gerar uma nova versão de si mesmo
- A função final é sempre condizente com a versão anterior do resultado

Um exemplo é a função `array.map` que recebe uma função como parâmetro, no final ele gera uma nova versão de si mesmo retornando um array que é condizente com o array que foi colocado como entrada.

Como fazer:

```js 
class OlaMundo {
  construtor(val) {
    this.val = val;
  }
  
  bind () {
    return new OlaMundo(this.val);
  }
}
```

Essa função irá trazer uma nova versão dela mesma que é condizente com o resultado anterior.

## Monads

Pesquisar...

## Programação Reativa

- Paradigma de programação baseado em fluxos assíncronos de dados, também conhecidos como streams
- Mantem um fluxo unidirecional entre os dados
- Facil entendimento, de forma declarativa, facil de ler
- Facilitando a implementação de estados imutáveis

Streams são implementações de um pattern conhecido como _PubSub_ ou _Observer_ que mantém um fluxo de dados contínuo dentro da aplicação fluindo em um unico sentido.
