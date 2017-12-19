# React - Alura

<!-- TOC -->

- [React - Alura](#react---alura)
  - [Iniciando um projeto](#iniciando-um-projeto)
    - [Create React App](#create-react-app)
      - [Estrutura de pastas](#estrutura-de-pastas)
      - [Transpilers](#transpilers)
  - [Importando CSS](#importando-css)
  - [Criando componentes](#criando-componentes)

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