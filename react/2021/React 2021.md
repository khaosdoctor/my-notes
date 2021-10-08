# React (versão 2021)

## Índice

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [React (versão 2021)](#react-versão-2021)
  - [Índice](#índice)
  - [Estrutura de pastas](#estrutura-de-pastas)
  - [Configurando o babel](#configurando-o-babel)
  - [Configurando o Webpack](#configurando-o-webpack)
  - [Utilizando o React](#utilizando-o-react)
  - [Melhorando o webpack](#melhorando-o-webpack)
    - [Injetando o script](#injetando-o-script)
    - [Dev Server](#dev-server)
    - [Source maps](#source-maps)
    - [Ambientes do Webpack](#ambientes-do-webpack)
    - [Importar arquivos CSS](#importar-arquivos-css)
    - [Sass](#sass)
  - [Iniciando a aplicação](#iniciando-a-aplicação)
    - [Componentes](#componentes)

<!-- /code_chunk_output -->

## Estrutura de pastas

Iniciando uma nova pasta com o nome do nosso projeto (a pasta está em [project](./project) com o número da classe).

Iniciamos criando um `package.json` com `npm i -y`, instalamos o `react` como dependencia inicial usando `npm i react`. Além disso vamos instalar o `react-dom` para poder fazer o React se comunicar com o DOM do browser.

O `react-dom` é a parte genérica de acesso ao DOM do browser, como estamos usando o browser, precisamos instalar essa dependencia. Se estivermos trabalhando com uma aplicação mobile, ou para TV instalaríamos outras dependências.

Vamos criar uma pasta `src`, uma pasta `public`. A pasta `public` contém todos os arquivos que podem ser acessados diretamente do browser sem nenhuma interferência externa, geralmente arquivos como `index.html`, `robots.txt`, favicons, assets e etc.

## Configurando o babel

O babel é uma biblioteca que transpila o código do JavaScript que não é suportado pelos browsers ainda, a própria sintaxe de JSX do React é um desses exemplos, para um código que é suportado.

Vamos começar instalando `npm i @babel/core @babel/cli @babel/preset-env -D`. Vamos criar um arquivo `babel.config.js` com os presets:

```js
module.exports = {
  presets: [
    '@babel/preset-env'
  ]
}
```

O `@babel/preset-env` vai entender qual é o tipo de ambiente que temos e vai configurar e transpilar automaticamente da melhor maneira possível.

Para podermos escrever código React, vamos instalar o `@babel/preset-react`. Vamos então incluir o `@babel/preset-react` no arquivo `babel.config.js`:

```js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ]
}
```

Agora podemos pegar um arquivo simples como um `index.js` na pasta `src` e colocar o código React:

```js
import React from 'react'

function App () {
  return <h1>Hello World</h1>
}
```

E rodar `npx babel src/index.js -o dist/bundle.js` para transpilar o código. Podemos também converter o tipo de arquivo de `.js` para `.jsx` apenas para poder deixar o icone do React no VSCode e ficar mais fácil.

## Configurando o Webpack

O Webpack é um bundler que pode ser usado para importar arquivos de diferentes tipos e converter todos os arquivos em um formato específico. Dessa forma podemos importar uma imagem, um CSS ou uma página inteira HTML diretamente dentro do `.jsx`.

Vamos instalar o `webpack` e o `webpack-cli` e criar o arquivo `webpack.config.js`:

```javascript
const path = require('path')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

Podemos agora utilizar o comando `npx webpack` para ver o bundler funcionando.

Vamos criar um arquivo `App.jsx` dentro de `src` junto com o `index.jsx`, e colocar o código que estava em `index` nele:

```jsx
import React from 'react'

export function App () {
  return <h1>Hello World</h1>
}
```

No `index.jsx` vamos importar o arquivo:

```jsx
import React from 'react'
import { App } from './App'
```

Ao rodar o `npx webpack` vamos ter a saída correta.

## Utilizando o React

O React é uma lib que cria todas as interfaces do site utilizando o JS. Essa aplicação é geralmente colocada dentro de um `<div>` que tem um ID `root` ou qualquer outro ID que você queira colocar no arquivo `index.html` na pasta `public`.

No arquivo `index.jsx` podemos fazer o teste usando o `ReactDOM.render`:

```jsx
import { render } from 'react-dom'
import { App } from './App'

render(<App />, document.getElementById('root'))
```

Agora podemos importar o arquivo `bundle` que estamos gerando pelo webpack através de um script.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Explorer</title>
</head>
<body>
<div id="root"></div>

<script src="../dist/bundle.js"></script>
</body>
</html>
```

Agora vamos ver que teremos um erro, isto porque no nosso arquivo `index` não estamos importando o React, por padrão o React deve ser importado em todas as páginas que o JSX está sendo usado.

```jsx
import React from 'react'
import { render } from 'react-dom'
import { App } from './App'

render(<App />, document.getElementById('root'))
```

Porém, nas versões 17 pra cima, não é mais obrigatório que passemos o React para todos os arquivos. Basta adicionarmos uma configuração no bundler do babel:

```js
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ]
}
```

Agora podemos executar o webpack novamente para ver tudo rodando sem o React importado:

```jsx
import { render } from 'react-dom'
import { App } from './App'

render(<App />, document.getElementById('root'))
```

## Melhorando o webpack

### Injetando o script

Para melhorar um pouco a funcionalidade do nosso webpack, podemos injetar o script diretamente no `index.html`, dessa forma não temos que nos preocupar com o nome do arquivo ou coisas do tipo. Vamos instalar o pacote `html-webpack-plugin` e importar ele dentro do arquivo `webpack.config.js`:

```javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html') // caminho do index
    })
  ],
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

Agora, quando rodamos o webpack, o arquivo index é compilado junto com o bundle na mesma pasta `dist`.

### Dev Server

Vamos instalar o `webpack-dev-server` para poder rodar o webpack automaticamente quando mudarmos os arquivos JS. E modificar a configuração do webpack para incluir a chave `devServer`:

```javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

Vamos agora rodar `webpack serve` para iniciar um servidor na porta `8080`, este servidor não só roda o bundle automaticamente, mas também atualiza a página quando o arquivo JSX for alterado.

### Source maps

Source maps faz com que os erros consigam ser visualizados no código original e não no código bundle. Vamos modificar o config do webpack. Existem várias opções de source maps, para desenvolvimento vamos utilizar o `eval-source-map`:

```js
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

### Ambientes do Webpack

Para diferenciar os ambientes de produção e dev, vamos adicionar um ternário no arquivo config do Webpack:

```javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

Agora para podermos setar essas variáveis, vamos adicionar um pacote chamado `cross-env` com `npm i -D cross-env` e definir alguns scripts do NPM no `package.json`:

```json
{
  "name": "1",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "bundle": "cross-env NODE_ENV=production webpack",
    "dev": "webpack serve"
  },
  "keywords": [],
  "author": "Lucas Santos <hello@lsantos.dev> (https://lsantos.dev/)",
  "license": "GPL-3.0",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.8",
    "@babel/preset-env": "^7.15.8",
    "@babel/preset-react": "^7.14.5",
    "babel-loader": "^8.2.2",
    "html-webpack-plugin": "^5.3.2",
    "webpack": "^5.58.1",
    "webpack-cli": "^4.9.0",
    "webpack-dev-server": "^4.3.1"
  }
}
```

### Importar arquivos CSS

Para poder importar arquivos de CSS dentro de um JSX, vamos ter que adicionar um loader no Webpack. Vamos instalar os módulos `css-loader` e `style-loader` como dependencias de desenvolvimento e adicionar uma nova regra no config:

```javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      },
      {
        test: /\.css$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: ['style-loader', 'css-loader'] // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

E então podemos criar um arquivo qualquer na pasta `src/css` e importar como uma string:

```jsx
import { render } from 'react-dom'
import { App } from './App'
import './css/global.css'

render(<App />, document.getElementById('root'))
```

### Sass

Para podermos trocar o pré-processador de CSS para o Sass, vamos adicionar o pacote `sass-loader` e o `node-sass` com `npm i -D sass-loader node-sass` e adicionar a nova regra no config:

```javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // Arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de sáida
    filename: 'bundle.js' // nome do arquivo
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'] // extensões que o webpack vai procurar
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: { // configurações do webpack
    rules: [ // regras para cada extensão de arquivo
      {
        test: /\.(js|jsx)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: 'babel-loader' // usar o loader, que é a integração do babel com o webpack
      },
      {
        test: /\.(scss|sass)$/, // regex para saber qual arquivo vai ser lido
        exclude: /node_modules/, // excluir tudo que tiver node_modules
        use: ['style-loader', 'css-loader', 'sass-loader'] // usar o loader, que é a integração do babel com o webpack
      }
    ]
  }
}
```

## Iniciando a aplicação

Tudo isso foi apenas para configurar o React, vamos agora começar a desenvolver a nossa app.

### Componentes

O recurso principal do React são os componentes, um componente é uma função que retorna um elemento HTML. Uma convenção é sempre criar um componente com a primeira letra maiúscula e sempre um componente por arquivo.

Outra boa prática é sempre criar uma pasta `components` para colocar os componentes dentro. Para começar, vamos criar um componente chamado `RepositoryList`:

```jsx
export function RepositoryList() {
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        <li>
          <strong>form</strong>
        </li>
      </ul>
    </section>
  )
}
```

Agora podemos somente retornar ele no nosso componente `App`:

```jsx
import { RepositoryList } from './components/RepositoryList'

export function App () {
  return <RepositoryList />
}
```
