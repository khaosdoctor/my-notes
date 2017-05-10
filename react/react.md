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
  - [JSX e User Inputs](#jsx-e-user-inputs)
    - [User Inputs](#user-inputs)
  - [Componentização](#componentização)
  - [Consumindo a API do GitHub Usando Axios](#consumindo-a-api-do-github-usando-axios)
  - [Comunicação entre componentes](#comunicação-entre-componentes)
  - [Stateless Components](#stateless-components)
  - [PropTypes](#proptypes)
  - [Loops](#loops)
  - [Component LifeCycle](#component-lifecycle)

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

## JSX e User Inputs

Agora temos nosso Hello World, vamos ir um pouco mais além e criar alguns componentes.

Primeiramente vamos ao nosso arquivo principal e chamar este novo componente:

```js
var React = require('react');
var ReactDOM = require('react-dom');
var GitHub = require('./components/github.js'); //Este será nosso componente

//Iniciamos com nosso componente
ReactDOM.render(<GitHub />, document.getElementById('app'));
```

Os componentes React geralmente seguem um padrão base:

```js
var React = require('react'); //Importamos o framework

var GitHub = React.createClass({ //Criamos uma classe do react

});

module.exports = GitHub;
```

Vamos ter de criar uma função `render`, que retorna o JSX em si, isto que será renderizado do lado do site.

```js
var React = require('react'); //Importamos o framework

var GitHub = React.createClass({ //Criamos uma classe do react
  render: function() {
    return (
      <h1>Teste</h1>
    );
  }
});

module.exports = GitHub;
```

Dentro do módulo podemos colocar nosso JSX normalmente, com uma ressalva apenas:

Se vamos renderizar um html, uma hora ou outra vamos precisar usar um `class` em algum lugar, esse class é uma palavra reservada do javascript, então não há como utilizar desta forma, de modo que, no React, vamos utilizar `className` ao invés de class:

```js
var React = require('react'); //Importamos o framework

var GitHub = React.createClass({ //Criamos uma classe do react
  render: function() {
    return (
      <h1 className="jumbotron">Teste</h1>
    );
  }
});

module.exports = GitHub;
```

Isto será substituído pelo class que conhecemos.

### User Inputs

Existem várias formas de se buscar um input de usuário, uma delas é adicionar uma referência com o atributo `ref` e dar um nome qualquer, como por exemplo:

```js
var React = require('react');

var GitHub = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>GitHub Info</h1>
          <div className="row">
            <form >
              <div className="form-group">
                <label>Username:</label>
                <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username" />
              </div>
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GitHub;
```

Note no input nossa referencia para o campo. Também vamos precisar adicionar um evento no form (um listener) chamado de `onSubmit` e vamos apontar este listener para uma função do nosso componente.

```js
var React = require('react');

var GitHub = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>GitHub Info</h1>
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username" />
              </div>
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GitHub;
```

Então precisaremos criar essa função `handleSubmit` dentro do nosso componente

```js
var React = require('react');

var GitHub = React.createClass({

  handleSubmit: function() {
    console.log(this.refs.username);
  },

  render: function () {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>GitHub Info</h1>
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username" />
              </div>
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GitHub;
```

Veja que estamos basicamente verificando as referencias em um array de referencias que vamos criando. O primeiro problema que temos aqui é que o browser, por padrão, tem uma ação de recarregar a página quando recebe o submit de um form, temos que usar o nosso antigo `e.preventDefault()` para impedir que isso aconteça.

```js
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.refs.username);
  },
```

Esta é uma das formas que temos de obter o valor que um usuário colocou em um campo. Agora perceba que estamos retornando o objeto todo no `console.log`, como queremos apenas o valor, vamos colocar um `.value` que poderá resolver:

```js
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.refs.username.value);
  },
```

## Componentização

Este componente que criamos na verdade não está muito correto, pois o componente `<github />` deveria ser a aplicação completa, enquanto apenas a parte de cima do site (a busca de usuários) é um componente por si só. Então vamos importar um novo componente que vamos criar chamado `SearchUser`:

```js
var React = require('react');
var SearchUser = require('./searchUser');

var GitHub = React.createClass({

  handleSubmit: function (e) {
    e.preventDefault();
    console.log(this.refs.username.value);
  },
  render: function () {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>GitHub Info</h1>
          <div className="row">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username"/>
              </div>
              <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GitHub;
```

Agora dentro do arquivo `searchUser`.

```js
var React = require('react');

var searchUser = React.createClass({

});

module.exports = searchUser;
```

Perceba que este componente é que, na verdade, é o que criamos anteriormente.

então vamos passar toda a classe do React para dentro dele.

```js
var React = require('react');

var searchUser = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    console.log(this.refs.username.value);
  },
  render: function () {
    return (
      <div className="jumbotron">
        <h1>GitHub Info</h1>
        <div className="row">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = searchUser;
```

Portanto componentizamos a aplicação. Perceba que tiramos o container deste novo componente. Isto porque o nosso componente principal do github vai importar esta parte.

```js
var React = require('react');
var SearchUser = require('./searchUser');

var GitHub = React.createClass({
  render: function () {
    return (
      <div className="container">
        <SearchUser />
      </div>
    );
  }
});

module.exports = GitHub;
```

## Consumindo a API do GitHub Usando Axios

A comunidade React utiliza muito o Axios como lib externa para poder realizar chamadas HTTP, ele se compara muito ao `$http` do Angular. Que é baseado em promises

Primeiramente vamos rodar `npm i --save axios` para colocar a dependencia.

Depois vamos criar uma nova pasta chamada `services` que serão os responsáveis por conectar com API's externas. Dentro da pasta vamos criar um arquivo `gitHubUser.js` com o conteúdo:

```js
var axios = require('axios');

var GITHOST = 'https://api.github.com/users/';

var GitHubUserService = {
  getUserByName: function (username) {
    return axios.get(GITHOST + username);
  },
  getReposByUser: function (username) {
    return axios.get(GITHOST + username + '/repos');
  }
}

module.exports = GitHubUserService;
```

Agora precisamos consumir o nosso componente dentro do componente de usuário:

```js
var React = require('react');
var GitHubUserService = require('../services/gitHubUser.js'); //Nosso serviço

var searchUser = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    console.log(this.refs.username.value);
  },
  render: function () {
    return (
      <div className="jumbotron">
        <h1>GitHub Info</h1>
        <div className="row">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = searchUser;
```

Então vamos chamar o método `getByUser` (que retorna uma promise) e vamos logar o resultado:

```js
var React = require('react');
var GitHubUserService = require('../services/gitHubUser.js');

var searchUser = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    GitHubUserService.getUserByName(this.refs.username.value)
      .then(function (response) {
        console.log(response);
      });
  },
  render: function () {
    return (
      <div className="jumbotron">
        <h1>GitHub Info</h1>
        <div className="row">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = searchUser;
```

Vamos agora requisitar os repositórios:

```js
var React = require('react');
var GitHubUserService = require('../services/gitHubUser.js');

var searchUser = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    GitHubUserService.getUserByName(this.refs.username.value)
      .then(function (response) {
        console.log(response);
      }); //Request 1
      
    GitHubUserService.getReposByUser(this.refs.username.value)
      .then(function (response) {
        console.log(response);
      }); //Request 2
  },
  render: function () {
    return (
      <div className="jumbotron">
        <h1>GitHub Info</h1>
        <div className="row">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = searchUser;
```

## Comunicação entre componentes

Temos as duas respostas do servidor, porém precisamos passar essa resposta para o componente superior (o geral chamado GitHub), que será o _watcher_ que se comunicará com todos os outros componentes.

Primeiramente vamos chamar uma função chamada `getInitialState` dentro do nosso componente principal, esta função vai setar um estado padrão do componente. Como vamos precisar de informações de usuário e repositório, vamos setar estas duas informações iniciais.

```js
var React = require('react');
var SearchUser = require('./searchUser');

var GitHub = React.createClass({
  getInitialState: function () {
    return { //Estado inicial do componente
      user: null,
      repos: []
    };
  },
  render: function () {
    return (
      <div className="container">
        <SearchUser />
      </div>
    );
  }
});

module.exports = GitHub;
```

Esta função é a __primeira coisa executada pelo componente__ quando ele é inicializado. Juntamente com isso, vamos criar um setter para o usuário e outro para os repositórios.

No React, como todos os componentes são baseados em states, vamos utilizar a função `setState` para poder setar o novo estado do componente.

```js
var React = require('react');
var SearchUser = require('./searchUser');

var GitHub = React.createClass({
  getInitialState: function () {
    return {
      user: null,
      repos: []
    };
  },

  updateUser: function (user) { //Seta o estado de usuário
    this.setState({user: user});
  },

  updateRepo: function (repos) { //Seta o estado dos repos
    this.setState({ repos: repos });
  },
  
  render: function () {
    return (
      <div className="container">
        <SearchUser />
      </div>
    );
  }
});

module.exports = GitHub;
```

Note que estas funções não serão consumidas pelo próprio componente, mas sim pelos outros componentes que vão se comunicar com ele. A forma que vamos passar estas funções para o próximo componente, vamos fazer algo semelhante ao Angular com as diretivas, ou seja, vamos criar um atributo e dar a ele o valor de uma função:

```js
var React = require('react');
var SearchUser = require('./searchUser');

var GitHub = React.createClass({
  getInitialState: function () {
    return {
      user: null,
      repos: []
    };
  },

  updateUser: function (user) {
    this.setState({user: user});
  },

  updateRepo: function (repos) {
    this.setState({ repos: repos });
  },

  render: function () {
    return (
      <div className="container">
        <SearchUser
          updateUser={this.updateUser}
          updateRepo={this.updateRepo}
        />
      </div>
    );
  }
});

module.exports = GitHub;
```

Agora dentro do nosso componente `searchUser` vamos ter estas duas funções disponíveis. Então vamos mudar as nossas chamadas:

```js
GitHubUserService.getUserByName(this.refs.username.value)
  .then(function (response) {
    this.props.updateUser(response);
  }
  .bind(this) //Utilizamos o bind pois, dentro do then, o this tem outro escopo (que é o escopo da promise) então temos que passar o this de fora para dentro
  );

GitHubUserService.getReposByUser(this.refs.username.value)
  .then(function (response) {
    this.props.updateRepo(response.data);
  }
  .bind(this) //Utilizamos o bind pois, dentro do then, o this tem outro escopo (que é o escopo da promise) então temos que passar o this de fora para dentro
  );
```

Note que utilizamos `this.props.<propriedade>` isto faz com que todas as propriedades passadas para o componente pelo componente anterior sejam acessadas.

## Stateless Components

Primeiramente vamos criar um novo componente, que será a seção aonde vamos exibir as informações do usuário:

```js
var React = require('react');

var userInfo = React.createClass({
  render: function () {
    
  }
});

module.exports = userInfo;
```

É um componente normal como todos os outros. Vamos inserir algum HTML dentro:

```js
var React = require('react');

var userInfo = React.createClass({
  render: function () {
    <div className="row">
      <div className="col-lg-4">
        <img src={this.props.user.avatar_url} alt="avatar" className="img-circle" width="140" height="140"/>
        <h2>{this.props.user.login}</h2>
        <p>{this.props.user.name}</p>
        <p>Followers: {this.props.user.followers} / Following: {this.props.user.following}</p>
        <p>
          <a href={this.props.user.html_url} className="btn btn-default" role="button">View Details</a>
        </p>
      </div>
    </div>
  }
});

module.exports = userInfo;
```

O `props` serão as propriedades que vamos passar para este componente, que ainda não estamos passando, mas podemos passar desta forma no nosso componente principal (após incluí-lo na nossa render):

```js
var React = require('react');
var SearchUser = require('./searchUser');
var UserInfo = require('./userInfo');

var GitHub = React.createClass({
  getInitialState: function () {
    return {
      user: null,
      repos: []
    };
  },

  updateUser: function (user) {
    this.setState({user: user});
  },

  updateRepo: function (repos) {
    this.setState({ repos: repos });
  },

  render: function () {
    return (
      <div className="container">
        <SearchUser
          updateUser={this.updateUser} //Neste caso não utilizamos state porque a função é sempre constante
          updateRepo={this.updateRepo}
        />
        <UserInfo
          user={this.state.user} //Propriedade do estado do componente atual para o próximo (utilizamos state aqui porque ela é uma propriedade mutável)
          repos={this.state.repos}
        />
      </div>
    );
  }
});

module.exports = GitHub;
```

Vamos obter um erro de `avatar.url is null.` isto acontece porque temos que definir um condicional que retorna apenas o valor se a propriedade está setada.

```js
var React = require('react');

var userInfo = React.createClass({
  render: function () {
    if (this.props.user) {
      return (
        <div className="row">
          <div className="col-lg-4">
            <img src={this.props.user.avatar_url} alt="avatar" className="img-circle" width="140" height="140" />
            <h2>{this.props.user.login}</h2>
            <p>{this.props.user.name}</p>
            <p>Followers: {this.props.user.followers} / Following: {this.props.user.following}</p>
            <p>
              <a href={this.props.user.html_url} className="btn btn-default" role="button">View Details</a>
            </p>
          </div>
        </div>
      );
    }

    return (null);
  }
});

module.exports = userInfo;
```

Uma outra forma melhor de se fazer isto é criar uma variável de controle, apenas para organização de código:

```js
var React = require('react');

var userInfo = React.createClass({
  render: function () {

    var userInfo = (this.props.user) ? (
      <div className="row">
        <div className="col-lg-4">
          <img src={this.props.user.data.avatar_url} alt="avatar" className="img-circle" width="140" height="140" />
          <h2>{this.props.user.data.login}</h2>
          <p>{this.props.user.data.name}</p>
          <p>Followers: {this.props.user.data.followers} / Following: {this.props.user.data.following}</p>
          <p>
            <a href={this.props.user.data.html_url} className="btn btn-default" role="button">View Details</a>
          </p>
        </div>
      </div>
    ) : null;

    return (userInfo);
  }
});

module.exports = userInfo;
```

Stateless components são componentes simples que retornam apenas uma função simples sem nenhuma parte do render ou do objeto componente do react:

```js
var React = require('react');

function userInfo(props) {
   var userInfo = (props.user) ? (
      <div className="row">
        <div className="col-lg-4">
          <img src={props.user.data.avatar_url} alt="avatar" className="img-circle" width="140" height="140" />
          <h2>{props.user.data.login}</h2>
          <p>{props.user.data.name}</p>
          <p>Followers: {props.user.data.followers} / Following: {props.user.data.following}</p>
          <p>
            <a href={props.user.data.html_url} className="btn btn-default" role="button">View Details</a>
          </p>
        </div>
      </div>
    ) : null;

    return userInfo;

}

module.exports = userInfo;
```

Desta forma criamos componentes mais simples e fáceis de trabalhar, e também podemos abstrair as props, porque agora não será mais `this.props`, e sim um parâmetro da função que será passado para a mesma e o React vai se encarregar desta parte para nós, bastando que chamemos como `props`

## PropTypes

Como o React trabalha muito com o conceito de components e suas propriedades, uma das coisas que acontece muito em aplicações grandes é que as propriedades mudam e os componentes acabam quebrando sem sabermos o por quê.

Um exemplo é o componente `searchUser`, este componente __precisa__ das props `updateUser` e `updateRepo` para funcionar da forma esperada, se não o mesmo não irá ter o comportamento que queremos.

Para isso existem as `propTypes` que definem o funcionamento das props em um componente.

```js
var React = require('react');
var GitHubUserService = require('../services/gitHubUser.js');

var searchUser = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    GitHubUserService.getUserByName(this.refs.username.value)
      .then(function (response) {
        console.log(response);
      }); //Request 1
      
    GitHubUserService.getReposByUser(this.refs.username.value)
      .then(function (response) {
        console.log(response);
      }); //Request 2
  },
  render: function () {
    return (
      <div className="jumbotron">
        <h1>GitHub Info</h1>
        <div className="row">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input name="username" type="text" placeholder="Ex: khaosdoctor" className="form-control" ref="username"/>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
    );
  }
});

//PropTypes
searchUser.propTypes = {
  updateUser: React.PropTypes.func.isRequired,
  updateRepo: React.PropTypes.func.isRequired
};

module.exports = searchUser;
```

O que fazemos aqui é que estamos definindo que as duas props do `searchUser` __precisa__ ser uma função e __precisa__ ser passada, ou seja, é obrigatória.

Podemos fazer o mesmo no nosso outro módulo `userInfo`:

```js
userInfo.propTypes = {
  user: React.PropTypes.object,
  repos: React.PropTypes.array
}
```

## Loops

Veja que dentro do nosso componente `userInfo`, recebemos os repositórios, mas não fazemos nada com eles. Isto porque vamos fazer a iteração e os loops de repositórios dentro deste próprio componente.

> Note também que podemos ter um outro componente dentro deste mesmo componente, porque temos duas partes, o perfil e os repositórios, que são coisas separadas.

Vamos primeiramente adicionar ao `userInfo` o componente que iremos criar:

```js
var React = require('react');

function userInfo(props) {
   var userInfo = (props.user) ? (
      <div className="row">
        <div className="col-lg-4">
          <img src={props.user.data.avatar_url} alt="avatar" className="img-circle" width="140" height="140" />
          <h2>{props.user.data.login}</h2>
          <p>{props.user.data.name}</p>
          <p>Followers: {props.user.data.followers} / Following: {props.user.data.following}</p>
          <p>
            <a href={props.user.data.html_url} className="btn btn-default" role="button">View Details</a>
          </p>
        </div>
        <div className="col-lg-8">
         <UserRepos repos={props.repos}/>
       </div>
      </div>
    ) : null;

    return userInfo;
}

userInfo.propTypes = {
  user: React.PropTypes.object,
  repos: React.PropTypes.array
}

module.exports = userInfo;
```

Adicionamos o, ainda não criado, componente `userRepos`. Vamos criá-lo

```js
var React = require('react');

var UserRepos = React.createClass({
  render: function () {
    return (
      <div className="thumbnail">
        <div className="caption">
          <h3>{repo.name}
            <span className="badge">{repo.stargazers_count} Stars</span>
          </h3>
          <p>{repo.description}</p>
          <p>
            <a href={repo.html_url} role="button" className="btn btn-primary">Repository</a>
            <a href={repo.html_url+'/issues'} role="button" className="btn btn-default">Issues ({repo.open_issues})</a>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = userRepos;
```

Mas perceba que estamos buscando informações de apenas __um__ repositório. Precisamos iterar por todos os repositórios.

Vamos utilizar o método `map` para pegar o array atual e transformar em um novo array:

```js
var React = require('react');

var UserRepos = React.createClass({
  render: function () {
    var repos = this.props.repos.map(function(repo, key) {
      return (
        <div key={key} className="thumbnail">
          <div className="caption">
            <h3>{repo.name}
              <span className="badge">{repo.stargazers_count} Stars</span>
            </h3>
            <p>{repo.description}</p>
            <p>
              <span>
                <a href={repo.html_url} role="button" className="btn btn-primary">Repository</a>
              </span>
              <span>
                <a href={repo.html_url+'/issues'} role="button" className="btn btn-default">Issues ({repo.open_issues})</a>
             </span>
            </p>
          </div>
       </div>
      );
    });

    return (
      <div>
        {repos}
      </div>
    );

  }
});

module.exports = UserRepos;
```

Basta realizarmos a iteração por puro JS.

## Component LifeCycle

Imagine que queremos trazer agora o total de repositórios pelo html simples, como o github só traz 30 repositórios por vez, vamos fixar isto:

```js
var React = require('react');

var UserRepos = React.createClass({
  render: function () {
    var repos = this.props.repos.map(function(repo, key) {
      return (
        <div key={key} className="thumbnail">
          <div className="caption">
            <h3>{repo.name}
              <span className="badge">{repo.stargazers_count} Stars</span>
            </h3>
            <p>{repo.description}</p>
            <p>
              <span>
                <a target="_blank" href={repo.html_url} role="button" className="btn btn-primary">Repository</a>
              </span>
              <span>
                <a target="_blank" href={repo.html_url+'/issues'} role="button" className="btn btn-default">Issues ({repo.open_issues})</a>
             </span>
            </p>
          </div>
       </div>
      );
    }); 

    return (
      <div>
        <h1>30 repositories</h1>
        {repos}
      </div>
    );

  }
});

module.exports = UserRepos;
```

Uma das formas é inicializar um initialState como antes:

```js
var React = require('react');

var UserRepos = React.createClass({
  getInitialState: function() {
    return {
      reposCount: 0
    };
  },
  render: function () {
    var repos = this.props.repos.map(function(repo, key) {
      return (
        <div key={key} className="thumbnail">
          <div className="caption">
            <h3>{repo.name}
              <span className="badge">{repo.stargazers_count} Stars</span>
            </h3>
            <p>{repo.description}</p>
            <p>
              <span>
                <a target="_blank" href={repo.html_url} role="button" className="btn btn-primary">Repository</a>
              </span>
              <span>
                <a target="_blank" href={repo.html_url+'/issues'} role="button" className="btn btn-default">Issues ({repo.open_issues})</a>
             </span>
            </p>
          </div>
       </div>
      );
    }); 

    return (
      <div>
        <h1>{this.state.reposCount} repositories</h1>
        {repos}
      </div>
    );

  }
});

module.exports = UserRepos;
```

Agora temos fixo "0 repositories", como podemos buscar estes repositórios e atualizar o state?

Podemos utilizar o [lifeCycle](https://facebook.github.io/react/docs/react-component.html) do react, temos diversos tipos de ciclos e diversas fases da vida de um componente. Para este componente em específico vamos utilizar o `componentWillReceiveProps`, que será executado quando o componente receber novas props, basta criar um novo item no objeto:

```js
  componentWillReceiveProps: function(props) {
    this.setState({reposCount: props.repos.length});
  },
```

Ficando assim:

```js
var React = require('react');

var UserRepos = React.createClass({
  getInitialState: function() {
    return {
      reposCount: 0
    };
  },
  componentWillReceiveProps: function(props) {
    this.setState({reposCount: props.repos.length});
  },
  render: function () {
    var repos = this.props.repos.map(function(repo, key) {
      return (
        <div key={key} className="thumbnail">
          <div className="caption">
            <h3>{repo.name}
              <span className="badge">{repo.stargazers_count} Stars</span>
            </h3>
            <p>{repo.description}</p>
            <p>
              <span>
                <a target="_blank" href={repo.html_url} role="button" className="btn btn-primary">Repository</a>
              </span>
              <span>
                <a target="_blank" href={repo.html_url+'/issues'} role="button" className="btn btn-default">Issues ({repo.open_issues})</a>
             </span>
            </p>
          </div>
       </div>
      );
    }); 

    return (
      <div>
        <h1>{this.state.reposCount} repositories</h1>
        {repos}
      </div>
    );

  }
});

module.exports = UserRepos;
```

Veja outras explicações sobre lifeCycle [aqui](http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/)

