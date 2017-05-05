# ReactJS

> Lib Front end para manipulação do DOM reativo

<!-- TOC -->

- [ReactJS](#reactjs)
  - [Iniciando um projeto](#iniciando-um-projeto)
    - [Iniciando o repositório](#iniciando-o-repositório)
    - [Instalando o react](#instalando-o-react)
    - [Instalando o webpack](#instalando-o-webpack)
    - [Criando a estrutura de pastas](#criando-a-estrutura-de-pastas)
  - [Executando a aplicação](#executando-a-aplicação)

<!-- /TOC -->

## Iniciando um projeto

### Iniciando o repositório

Para iniciar um projeto com react basta que criemos uma pasta (pode ser vazia) para conter nossos arquivos, depois vamos utilizar o `npm init` para que possamos inicializar nosso `package.json`.

### Instalando o react

Após isto vamos instalar duas dependencias usando o `npm i --save`, o `react` e o `react-dom`.

> Antigamente ambas eram uma única lib, mas foram separadas pela equipe de desenvolvimento

### Instalando o webpack

Para podermos fazer um setup rápido, vamos instalar o webpack utilizando `npm i --save-dev webpack`. E também as suas dependências de loaders, que são `babel-core`, `babel-loader`, `babel-preset-react`.

### Criando a estrutura de pastas

Vamos utilizar uma estrutura básica de pastas:

- `public`: que conterá nosso `index.html` que será a raiz da página, e também a aplicação quase completa, que segue mais ou menos o modelo básico que é:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GitHub Username Finder</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

A `div` com o id `app` terá o link entre o dom e o react.

- Arquivo `webpack.config.js`: que vai conter as configurações do webpack

```js
module.exports = {
  entry: "./app/App.js", //Arquivo de entrada do react
  output: {
    filename: "public/bundle.js" //Arquivo de saída
  },
  module: {
    loaders: [ //Modelo baseado em Loaders
      {
        test: /\.js$/, //Vai testar todos os arquivos que terminam com *.js
        exclude: /node_modules/, //Exclusão da pasta node
        loader: 'babel-loader', //Vamos utilizar o babel pra transpilar o bundle
        query: {
          presets: ['react']
        }
      }
    ]
  }
}
```

- Pasta `app`: que conterá os arquivos da aplicação react em si, no caso um `app.js`

```js
var React = require('react');
var ReactDOM = require('react-dom');

//O RDOM é uma lib que vai renderizar um componente (ou um JSX como abaixo)
//Em um elemento cujo ID será passado no segundo argumento
ReactDOM.render(<h1>Teste</h1>, document.getElementById('app'));
```

## Executando a aplicação

Primeiramente vamos executar o comando `webpack` no terminal para gerar o bundle final.

> Note que se o comando não funcionar é porque é necessário instalar o webpack globalmente, se você não quiser fazer isso basta rodar `./node_modules/.bin/webpack`

Lembrando que vamos ter que recompilar o webpack sempre que alterarmos o app. Desta forma é mais simples se fizermos `webpack -w` para dar o watch.
