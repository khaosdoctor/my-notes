# Vue.js

- [Vue.js](#vuejs)
  - [O que é Vue?](#o-que-é-vue)
  - [Iniciando](#iniciando)
  - [Estrutura de pastas](#estrutura-de-pastas)
    - [Onde está o conteúdo?](#onde-está-o-conteúdo)
  - [Global View Object](#global-view-object)
  - [Interpolação e Data Binding](#interpolação-e-data-binding)

## O que é Vue?

Framework para desenvolvimento de aplicacões SPA que busca o melhor de outros frameworks como o Angular e o React.

- Mais rápido
- Menor
- Mais simples

## Iniciando

Primeiramente precisamos instalar o CLI do vue para começar um projeto:

```sh
$ npm install -g vue-cli
```

Depois podemos utilizar o comando `vue init <template>` para criar nosso projeto do 0. Por exemplo:

```sh
$ vue init webpack-simple
```

> Note que existem vários templates de Vue presentes [no website oficial](https://github.com/vuejs-templates).

Podemos então simplesmente executar `npm run dev` para ter nossa primeira página VueJS no ar.

## Estrutura de pastas

Ao abrirmos a pasta do nosso projeto (neste documento como `vuejs-test`), vamos ver que temos um arquivo `index.html` na raiz que não contém **absolutamente nada**. Isto porque todo o conteúdo é parseado e compilado dentro de um arquivo chamado `build.js` que é então carregado para o navegador. Ele que vai conter todo o conteúdo da página e todo o conteúdo da pasta `src`.

Se abrirmos o nosso arquivo `package.json` vamos ver que temos uma série de dependências:

```json
{
  "name": "vuejs-test",
  "description": "Vue JS test project",
  "version": "1.0.0",
  "author": "Lucas Santos <lhs.santoss@gmail.com>",
  "license": "MIT",
  "private": true,
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "dependencies": {
    "vue": "^2.5.11"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "babel-preset-stage-3": "^6.24.1",
    "cross-env": "^5.0.5",
    "css-loader": "^0.28.7",
    "file-loader": "^1.1.4",
    "node-sass": "^4.5.3",
    "sass-loader": "^6.0.6",
    "vue-loader": "^13.0.5",
    "vue-template-compiler": "^2.4.4",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1"
  }
}
```

Temos o babel instalado juntamente com plugins, além disso temos o webpack que vai criar o bundle que vai empacotar nosso bundle para o arquivo `build.js`.

### Onde está o conteúdo?

O conteúdo da nossa página está presente dentro da pasta `src` no arquivo `app.vue`:

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
```

Este arquivo é o que é chamado de *single file template*. Ou seja, é um módulo de um único arquivo com um template interno. Dentro deste arquivo temos um componente chamado `app` declarado. Todo arquivo Vue é baseado em três seções importantes:

- Template: É aonde vamos ter a estrutura do nosso componente, seria onde o HTML irá ficar
- Script: É onde vamos definir o comportamento do nosso componente
- Style: É onde vamos definir o estilo do nosso componente

## Global View Object

Vemos que em nosso arquivo `main.js` temos um conteúdo bastante simples: Ele só contém o código de inicialização que vai indicar aonde nosso componente será renderizado:

```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

Veja que estamos renderizando o componente `App` dentro do elemento com ID `app`, veja que, para podermos fazer isso tudo funcionar, precisamos do que é chamado de *Global View Object*, que é o módulo `vue` importado na primeira linha. Depois uma nova instância do Vue é criada através de uma *Vue Instance*, passando um objeto de configuração para este objeto.

Este objeto de configuração é bastante simples, temos um `el` que será o seletor CSS que vai indicar aonde vamos renderizar nosso componente e também temos um método `render` que leva um argumento `h` que é o renderizador recebendo o componente que vai ser rederizado.

## Interpolação e Data Binding

A tag `<template>` é onde vamos criar a nossa visualização. Se observarmos bem o nosso arquivo `App.vue` vamos ver que temos um placeholder `{{ msg }}`. É desta forma que fazemos a interpolação de dados no Vue, colocando nossa variável dentro de `{{ }}`.

O conteúdo desta variável pode vir de outro componente externo, ou então pode vir do próprio componente, como é o nosso caso. Quando a variável está dentro do próprio componente, temos uma função especial chamada `data` que fica na seção `scripts` que permite que exportemos um objeto com todos os dados que desejamos que nosso componente tenha acesso:

```vue
<script>
export default {
  name: 'app',
  data () {
    return {
      variavel: 'valor'
    }
  }
}
</script>
```

Essa função `data` precisa sempre retornar um objeto JS e **todas as interpolações são *data bindings***, ou seja, quando estamos interpolando um valor, na verdade, estamos criando um *data binding* unidirecional que flui sempre da **origem do dado** para o **destino do dado** e não ao contrário como tínhamos no Angular 1.