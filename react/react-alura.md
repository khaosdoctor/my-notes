# React - Alura

<!-- TOC -->

- [React - Alura](#react---alura)
  - [Iniciando um projeto](#iniciando-um-projeto)
    - [Create React App](#create-react-app)
      - [Estrutura de pastas](#estrutura-de-pastas)
      - [Transpilers](#transpilers)
  - [Importando CSS](#importando-css)
  - [Criando componentes](#criando-componentes)
  - [Estados](#estados)
    - [Alterando estados](#alterando-estados)
      - [Ciclos de vida](#ciclos-de-vida)

<!-- /TOC -->

## Iniciando um projeto

O React é uma biblioteca front-end que foca em construções de telas de forma muito mais fácil. Especialmente quando existem muitas informações sendo exibidas ou sendo tratadas na mesma tela.

Grande parte das aplicações React são SPA's.

### Create React App

Para iniciar um projeto, vamos fazer a instalção do `create-react-app`, que está disponível [neste link](https://github.com/facebookincubator/create-react-app). Basicamente o que esse pacote faz é criar todas configurações e pacotes de testes automaticamente, dessa forma não precisamos nos preocupar com essas configurações mais complexas.

Essa ferramenta __não é customizável__, de forma que você precisará trabalhar como que o Facebook e a comunidade React acredita que seja a melhor maneira de desenvolvimento para aplicações usando a lib do React.

Isso significa algumas coisas:

- As configurações de build, tanto do Babel quanto do WebPack __não são expostas__
- É necessário ter um entrypoint HTML e um entrypoint Javascript, que serão `index.html` e `index.js` localizados na pasta `public` (em outras versões estes arquivos podem estar fora desta pasta)
- Existem 4 scripts criados por padrão:
  - `yarn test`: Roda os testes da aplicação usando o [Jest](https://facebook.github.io/jest/)
  - `yarn build`: Compila os arquivos e roda os bundlers para transpilar
  - `yarn start`: Inicia o servidor de testes
  - `yarn eject`: Ejeta toda a configuracão pré pronta e expoõe todas os parâmetros que o `create-react-app` oculta por padrão em arquivos de configurações externos.

#### Estrutura de pastas

- `public`: Pasta que contém os pontos de entrada para o HTML, juntamente com os arquivos de identidade.
  - `manifest.json`: Arquivo de manifesto para gerenciamento de PWA (a documentação completa pode ser encontrada [aqui](https://developers.google.com/web/fundamentals/web-app-manifest/))
  - `index.html`: Ponto de entrada da aplicação, é aonde ela vai começar
  - `favicon.ico`: Auto explicativo
- `src`: Pasta aonde os arquivos de desenvolvimento do React ficam. É aqui que todos os arquivos relacionados a aplicação, como `css` e outras coisas devem ficar porque é o único lugar que o WebPack tem visão. Novas pastas podem ser criadas dentro dela mas não fora
  - `registerServiceWorker.js`: Arquivo que faz o registro dos service workers para funcionamento em produção independente do estado da conexão do usuário. Isto está melhor explicado [aqui](https://goo.gl/KwvDNy)

#### Transpilers

O uso do JSX é muito util, mas ele não é suportado pelo Javascript padrão. Utiliza-se o Babel para transpilar o JSX para código Javascript útil e depois utilizamos o Webpack para gerar um bundle (apenas para podermos ter o `require` e `import`).

O Webpack nos permite importar CSS, SVGs e outras coisas que, naturalmente, o NodeJS não nos permite fazer. Então um arquivo do tipo:

```js
import React, { Component } from 'react';
import logo from 'logo.svg';
import './app.css';
```

Estes `imports` não são em grande parte suportados (exceto o primeiro), portanto não podemos realizar importações de SVG ou CSS dentro de um arquivo JS.

## Importando CSS

Para podermos importar bibliotecas e outras coisas que são externas ao código, como o [Pure CSS](http://purecss.io), ou Bootstrap ou qualquer outra lib CSS que não seja uma dependencia direta do React.

> Todas as coisas que forem relacionadas a código fonte __devem ser colocadas na pasta `src`__

Então podemos baixar qualquer lib CSS e salvar dentro da nossa pasta `src`. Então podemos importar nosso arquivo CSS dentro do próprio arquivo `.js` no nosso projeto.

```js
import './css/pure.min.css';
```

Desta forma teremos nosso HTML, CSS e JS dentro do mesmo arquivo.

## Criando componentes

Para podermos criar nossos próprios componentes do React, vamos utilizar a sintaxe mais recente, extendendo da classe `Component` as informações que precisamos.

```js
class MeuComponente extends Component {

}

export default MeuComponente;
```

Dentro do componente, temos uma sequencia de métodos que identificam fases da vida do mesmo, por exemplo, `render` é um método que é chamado sempre que o componente for renderizado.

```js
class MeuComponente extends Component {
  render() {
    // Nosso código
  }
}

export default MeuComponente;
```

Lembrando que o Render deve retornar um JSX para montar um HTML:

```js
class MeuComponente extends Component {
  render() {
    return <div className='minha-classe'>Uma div</div>
  }
}

export default MeuComponente;
```

E então podemos chamar este componente da seguinte forma:

```js
import MeuComponente from './meu-componente'
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<MeuComponente />, document.getElementById('root'));
```

De forma que vamos criar o nosso componente inteiro dentro da tag com o ID `root`.

## Estados

Estamos são partes importantes da aplicação, eles vão definir um objeto global que vai ser o estado atual do nosso componente. Sempre que nosso estado for alterado, o nosso componente vai ser renderizado novamente.

Para criarmos um estado, vamos até nosso aquivo `App.js` e declaramos um construtor:

```js
import React, { Component } from 'react'
import './css/pure-min.css'
import './css/side-menu.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      lista: []
    }
  }

  render () {
    return ( ) // Nosso JSX aqui
  }
}
```

Aqui estamos criando um estado com uma chave chamada `lista` que está associada a um array vazio. O que queremos é gerar um conteúdo dinâmico para a nossa lista, então vamos utilizar as propriedades dinâmicas do JSX utilizando `{}` no nosso HTML.

```js
// ...

render () {
  return (
    // Aqui vai o conteúdo anterior
    <tbody>
    {
      this.state.lista.map((autor) => {
        return (
        <tr>
          <td>{autor.nome}</td>
          <td>{autor.email}</td>
        </tr>
        )
      })
    }
    </tbody>
  )
}
```

Podemos colocar um estado estático, do tipo `this.state = { lista: [{nome: 'Lucas', email: 'email@gmail.com'}] }`, assim teríamos a lista de autores definida no nosso estado do componente, mas queremos carregar o estado dinâmicamente.

### Alterando estados

Para popularmos o estado, vamos fazer uma chamada AJAX para uma API, esta chamada vai retornar todos os nossos autores. Como estamos utilizando o React, podemos importar o jQuery usando `yarn add jquery` e depois `import $ from 'jquery'` dentro do nosso arquivo:

```js
import React, { Component } from 'react'
import './css/pure-min.css'
import './css/side-menu.css'
import $ from 'jquery'

class App extends Component {
  constructor () {
    super()
    this.state = {
      lista: []
    }
  }

  render () {
    return ( ) // Nosso JSX aqui
  }
}
```

#### Ciclos de vida

Como estamos falando de carregar uma informação antes de renderizarmos o componente, o ideal seria que esta chamada AJAX ficasse dentro do nosso `constructor` correto? Não, pois lá é aonde vamos apenas fazer chamadas simples e inicializar variáveis, não podemos fazer nenhuma chamada ou algo mais complexo no construtor.

Temos então uma API do React que define os __ciclos de vida de um componente__. Estes ciclos são métodos que incluímos dentro do nosso componente e são chamados em determinadas partes do mesmo. Vamos ver dois deles:

- `componentWillMount`: Chamado antes do `render`
- `componentDidMount`: Chamado depois do `render`

Vamos utilizar o `componentWillMount` para realizar as nossas chamadas e carregar a tabela:

```js
componentWillMount()
  $.ajax({
      url:"http://localhost:8080/api/autores",
      dataType: 'json',
      success: (resposta) => {
        this.setState({ lista: resposta })
      }
    }
  )
}
```

Precisamos chamar o `setState` pois esta função delega ao React a execução do `render` novamente, se nós estivessemos apenas executando um `this.state = { estado novo }` teríamos que renderizar novamente usando o `this.forceUpdate()`, esta é uma das grandes vantagens. Mas veja que nosso código não funcionará porque dentro do escopo do `$.ajax`, a função tem a keyword `this` definida para o próprio jQuery. Então temos que fazer uma alteração imnportante:

```js
componentWillMount()
  $.ajax({
      url:"http://localhost:8080/api/autores",
      dataType: 'json',
      success: (resposta) => {
        this.setState({ lista: resposta })
      }.bind(this)
    }
  )
}
```

Isto é importante porque sem o `bind`, nosso `this` não encontraria a classe `Component` que estendemos, mas sim o próprio jQuery.

> Isto também é válido para funções definidas fora do componente, como controllers e serviços que podem estender alguma classe do React mas não usam especificamente seu `this`