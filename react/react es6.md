# React ES6

> Transformando a aplicação React ([neste arquivo](react.md)) com ECMAScript6

<!-- TOC -->

- [React ES6](#react-es6)
  - [Configurações necessárias](#configurações-necessárias)
  - [Adicionando recursos do ES6](#adicionando-recursos-do-es6)
    - [Import de packages](#import-de-packages)
    - [Export de packages](#export-de-packages)
  - [Variáveis](#variáveis)
    - [Let](#let)
  - [Template Strings](#template-strings)
  - [Funções](#funções)
    - [Funções nomeadas](#funções-nomeadas)
    - [Arrow Functions](#arrow-functions)
  - [Destructuring](#destructuring)
  - [Classes](#classes)

<!-- /TOC -->


## Configurações necessárias

O ES6 não roda naturalmente em todos os browsers, então temos que adicionar uma configuração extra no nosso arquivo `webpack.config.js`, ficando assim:

```js
module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
```

Mas isto por si só não funcionará, temos que adicionar o nosso plugin do Babel para o es2015, que é o plugin `babel-preset-es2015`, a aplicação deve continuar funcionando.

## Adicionando recursos do ES6

### Import de packages

A primeira coisa que temos que adicionar no ES6 é o `import`, vamos ter que modificar nosso código para ficar assim:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import GitHub from './components/gitHub';

//O RDOM é uma lib que vai renderizar um componente (ou um JSX como abaixo)
//Em um elemento cujo ID será passado no segundo argumento
ReactDOM.render(<GitHub />, document.getElementById('app'));
```

### Export de packages

Para exportar, vamos ter que fazer uma coisa diferente, primeiramente vamos ter que utilizar a ferramenta _built in_ do ES6:

```js
import React from 'react';
import SearchUser from './searchUser';
import UserInfo from './userInfo';

// Código do meio

export default GitHub;
```

Note o `export default`, a keyword `default` define que este vai ser o nome padrão do objeto exportado, de forma que poderemos chamar ele como `import GitHub from 'GitHub'`, se tivéssemos, por exemplo, uma outra função após o export, como neste caso:

```js
import React from 'react';
import SearchUser from './searchUser';
import UserInfo from './userInfo';

// Código do meio

export default GitHub;

export function sum (x,y) {
  return x+y
}
```

Poderíamos não só importar o objeto GitHub do arquivo, mas também a função pelo seu próprio nome utilizando `import GitHub, { sum } from 'GitHub'`.

## Variáveis

Agora é possível utilizar, além do `var`, o `let` e o `const` para poder declarar variáveis.

### Let

O `let` é exatamente o mesmo do `var` porém com o problema do vazamento de escopo corrigido, de forma que o escopo do let é apenas restrito a sua função local.

Já o `const` não permite que atribuímos um outro valor a uma variável uma vez que ela foi definida, de forma que ela se torna uma constante.

> De forma geral, evitamos o `var` de todas as maneiras possívels, utilizamos `const` em primeira instancia, se isto não for possível, vamos utilizar o `let`

## Template Strings

Torna possível a concatenação dentro de uma única string, utilizando um _backtick_ no final e sumimos com o sinal `+` e utilizamos o `${}` no lugar da string:

Antes:

```js
import axios from 'axios';

var GITHOST = 'https://api.github.com/users/';

var GitHubUserService = {
  getUserByName: function (username) {
    return axios.get(GITHOST + username);
  },
  getReposByUser: function (username) {
    return axios.get(GITHOST + username + '/repos');
  }
}

export default GitHubUserService;
```

Depois:

```js
import axios from 'axios';

var GITHOST = 'https://api.github.com/users';

var GitHubUserService = {
  getUserByName: function (username) {
    return axios.get(`${GITHOST}/${username}`);
  },
  getReposByUser: function (username) {
    return axios.get(`${GITHOST}/${username}/repos`);
  }
}

export default GitHubUserService;
```

## Funções

Uma nova forma de se declarar uma função é utilizar uma _arrow function_ utilizando dois casos.

### Funções nomeadas

No primeiro caso, podemos criar funções nomeadas apenas om o seu nome e parâmetros, sem precisar da keyword `function`:

Isto:

```js
import axios from 'axios';

var GITHOST = 'https://api.github.com/users';

var GitHubUserService = {
  getUserByName: function (username) {
    return axios.get(`${GITHOST}/${username}`);
  },
  getReposByUser: function (username) {
    return axios.get(`${GITHOST}/${username}/repos`);
  }
}

export default GitHubUserService;
```

Vira isto:

```js
import axios from 'axios';

var GITHOST = 'https://api.github.com/users';

var GitHubUserService = {
  getUserByName(username) {
    return axios.get(`${GITHOST}/${username}`);
  },
  getReposByUser(username) {
    return axios.get(`${GITHOST}/${username}/repos`);
  }
}

export default GitHubUserService;
```

### Arrow Functions

Uma função anonima pode ser substituída por uma arrow function da seguinte forma:

```js
let sum = function(x,y) {
  return x+y
}
```

Virando:

```js
let sum = (x,y) => x + y; // Quando a função tem uma unica linha, podemos omitir o return

let sum2 = (x,y) => { return x+y } // Também é válido
```

Vamos fazer isto no arquivo `UserInfo`:

```js
import React from 'react';
import UserRepos from './userRepos.js';

const userInfo = (props) => {
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
         <UserRepos repos={props.repos} />
       </div>
      </div>
    ) : null;
    return userInfo;
}

userInfo.propTypes = {
  user: React.PropTypes.object,
  repos: React.PropTypes.array
}

export default userInfo;
```

Uma outra vantagem da _arrow function_ é o problema do `bind`. Com ela não precisamos utilizar o `.bind(this)` para que a função entre no contexto do objeto, vejamos o exemplo do arquivo `searchUser`:

```js
  handleSubmit: function (e) {
    e.preventDefault();

    GitHubUserService.getUserByName(this.refs.username.value)
      .then((response) => {
        this.props.updateUser(response);
      });

    GitHubUserService.getReposByUser(this.refs.username.value)
      .then((response) => {
        this.props.updateRepo(response.data);
      });
  }
```

Note que removemos o `.bind(this)` da função `then` no retorno da promise:

```js
  handleSubmit: function (e) {
    e.preventDefault();

    GitHubUserService.getUserByName(this.refs.username.value)
      .then(function (response) {
        this.props.updateUser(response);
      }.bind(this));

    GitHubUserService.getReposByUser(this.refs.username.value)
      .then(function (response) {
        this.props.updateRepo(response.data);
      }.bind(this));
  },
```

## Destructuring

Basicamente, o que isto faz é extrair dados do objetos para valores específicos de um array, vamos supor o seguinte caso. Temos um objeto:

```js
const obj = {a: 1, b: 2}
```

Vamos supor que queremos extrair o valor de `a` para uma variável chamada `a` e o de `b` para uma chamada `b`. Podemos fazer o seguinte:

```js
const { a, b } = { a: 1, b: 2}
```

> Note que isto é feito pelo nome, então temos que ter os nomes do objeto exatamente iguais aos nomes das variáveis que queremos atribuir

Vamos ao arquivo `userInfo`:

```js
const userInfo = (props) => {
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
         <UserRepos repos={props.repos} />
       </div>
      </div>
    ) : null;
    return userInfo;
}
```

Substituimos por:

```js
const userInfo = ({ user, repos }) => {
   var userInfo = (user) ? (
      <div className="row">
        <div className="col-lg-4">
          <img src={user.data.avatar_url} alt="avatar" className="img-circle" width="140" height="140" />
          <h2>{user.data.login}</h2>
          <p>{user.data.name}</p>
          <p>Followers: {user.data.followers} / Following: {user.data.following}</p>
          <p>
            <a href={user.data.html_url} className="btn btn-default" role="button">View Details</a>
          </p>
        </div>
        <div className="col-lg-8">
         <UserRepos repos={repos} />
       </div>
      </div>
    ) : null;
    return userInfo;
}
```

> Note a passagem do parâmetro já com o destructuring

## Classes

Uma classe é uma das features mais polêmicas da atual release, vamos refatorar o `userRepos` para ser uma classe:

Original:

```js
import React from 'react';

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
    const { repos } = this.props
    const reposList = repos.map(function(repo, key) {
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
        {reposList}
      </div>
    );

  }
});

export default UserRepos;
```

Depois:

```js
import React from 'react';

class UserRepos extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      reposCount: 0
    };
  }

  componentWillReceiveProps (props) {
    this.setState({reposCount: props.repos.length});
  }

  render () {
    const { repos } = this.props
    const reposList = repos.map(function(repo, key) {
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
        {reposList}
      </div>
    );

  }

};

export default UserRepos;
```

Não mais usamos `React.createComponent` mas agora nosso componente todo virou uma classe que estende `React.Component`. Desta forma não precisamos mais de nenhuma `function` no meio, pois podemos simplesmente omitir este simbolo em favor do nome da função.

Também veja que o método `getInitialState` foi substituido por um `constructor` que recebe `props` como parâmetro, este parâmetro são as propriedades que vão ser passadas ao componente quando ele for renderizado. Por isto chamamos o `super` para invocar a função pai e criar o objeto `state` utilizando o `this.state` ao invés de `return`.

Vamos utilizar um outro arquivo agora para poder explicar o `bind` do `this`.

Neste arquivo estamos utilizando a função `handleSubmit` dentro de um de nossos métodos:

```js
  render () {
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
    )
  }
```

Mas neste contexto de classe, o `this` não é linkado automaticamente, tendo que ser referenciado. A forma que podemos fazer isto é basicamente adicionando um `.bind(this)` no final da função, __mas é menos performático do que criar um construtor__. Portanto vamos criar um construtor no topo da classe com as seguintes declarações:

```js
class searchUser extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
}
```

Desta forma vamos estar já linkando o `this` dentro da função em runtime uma única vez.

Vamos fazer isto mais uma vez no arquivo principal que é o `github`:

```js
import React from 'react'
import SearchUser from './searchUser'
import UserInfo from './userInfo'

class GitHub extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      repos: []
    }

    this.updateUser = this.updateUser.bind(this)
    this.updateRepo = this.updateRepo.bind(this)
  }

  updateUser (user) {
    this.setState({user: user})
  }

  updateRepo (repos) {
    this.setState({ repos: repos })
  }

  render () {
    return (
      <div className='container'>
        <SearchUser
          updateUser={this.updateUser}
          updateRepo={this.updateRepo}
        />
        <UserInfo
          user={this.state.user}
          repos={this.state.repos}
        />
      </div>
    )
  }

}

export default GitHub
```

Com isto finalizamos a refatoração da aplicação para ES6.
