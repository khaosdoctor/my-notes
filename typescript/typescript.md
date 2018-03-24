# Typescript

<!-- TOC -->

- [Typescript](#typescript)
  - [O que é Typescript](#o-que-é-typescript)
  - [Iniciando com o projeto](#iniciando-com-o-projeto)
  - [Modelando uma classe](#modelando-uma-classe)
    - [Testando para erros](#testando-para-erros)
  - [Configurando o Typescript](#configurando-o-typescript)
    - [Configurando o compilador](#configurando-o-compilador)
  - [Utilizando Typescript](#utilizando-typescript)
    - [Propriedades privadas](#propriedades-privadas)
    - [Evitando JS com erros de compilação](#evitando-js-com-erros-de-compilação)
  - [Watch](#watch)

<!-- /TOC -->

## O que é Typescript

É uma linguagem criada pela Microsoft que foi definida como um Superset do ES2015, ou seja, ela contém tudo que o ES2015 contém e adiciona algumas outras características a mais.

Um dos exemplos que você pode ter são:

- Decorators
- Tipagem estática

## Iniciando com o projeto

Nesta pasta você vai encontrar um arquivo [projeto.zip](./projeto.zip) que contém a seguinte estrutura:

- _App_: pasta raiz
  - _css_: Usamos o Bootstrap para ter um visual bacana com custo 0
  - _js_: Nosso Javascript
    - _controllers_
    - _views_
    - _models_
    - _helpers_
  - _lib_: Bibliotecas externas
  - `index.html`: Arquivo inicial

Vamos utilizar este projeto ao longo do curso para poder incluir nossos códigos.

## Modelando uma classe

Para podermos incluir uma nova negociação no nosso banco, vamos primeiro precisar modelá-la em uma classe. Vamos utilizar ES2015, criando o arquivo `models/Negociacao.js`.

Para modelarmos temos algumas regras, primeiro, temos que receber `data`, `quantidade` e `valor` logo quando criamos uma negociação, essas propriedades __não podem ser alteradas depois de criadas__ e __são obrigatórias em todas as negociações__.

A outra regra é que a classe deve saber calcular o seu volume, então precisaremos de um método `volume`:

```js
class Negociacao {
  // Estamos "forçando" uma negociação a receber esses tres parâmetros
  constructor (data, quantidade, valor) {
    this._data = data
    this._quantidade = quantidade
    this._valor = valor
  }

  get data () {
    return this._data
  }

  get quantidade () {
    return this._quantidade
  }

  get valor () {
    return this._valor
  }

  get volume () {
    return this._quantidade * this._valor
  }
}

```

Pontos importantes:

- Veja que estamos usando `_nome` para definir propriedades "privadas" que não podem ser acessadas nem alteradas por outros métodos que não sejam os da própria classe
- Criamos getters para pegar esses valores

### Testando para erros

Incluimos nosso script de negociação no nosso `index.html`:

```html
  <script src="js/models/Negociacao.js"></script>
  <script src="js/app.js"></script>
```

Veja que adicionamos um arquivo `app.js`, este arquivo é o nosso arquivo responsável por permitir que testemos nossas classes. Ele está criado dentro da pasta `js` e tem essa estrutura:

```js
const negociacao = new Negociacao(new Date(), 1, 100)

console.log(negociacao)
```

Será que estamos garantindo que nossas regras estão sendo seguidas?

O primeiro problema é que podemos criar uma classe sem nenhum dos parâmetros do construtor, podemos criar um tratamento de erros desta forma no construtor da classe:

```js
if (!data) throw new Error('data deve ser preenchida')
if (!quantidade) throw new Error('quantidade deve ser preenchida')
if (!valor) throw new Error('valor deve ser preenchida')
```

O outro problema é que o programador ainda pode usar `new Negociacao()` no código, porque só vamos ter erros em _runtime_... Ou seja, vamos saber disso só em tempo de execução.

Da mesma forma podemos alterar as nossas propriedades com `_` sem problemas.

## Configurando o Typescript

O Typescript entra neste ponto. Demoraríamos muito tempo para descobrir que alguma coisa está errada, pois só teríamos erros sendo exibidos em tempo de execução, e não antes disso.

Antes que possamos fazer qualquer coisa, temos que instalar o compilador do typescript. Primeiramente precisamos entrar na nossa pasta do projeto e executar `npm init`. E depois executar `npm i typescript@2.3.2 --save-dev`, estaremos fixando a versão para não termos erros de execução provenientes de versões que possam quebrar (No momento deste texto a versão mais recente é 2.7.2):

```json
{
  "name": "alurabank",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "typescript": "2.3.2"
  }
}
```

Agora vamos renomear nossa pasta `js` para `ts`, faremos a mesma coisa renomeando o arquivo `app.js` para `app.ts` e também `Negociacao.js` para `Negociacao.ts`. Temos agora a nossa pasta typescript com todos os nossos códigos na linguagem.

### Configurando o compilador

Vamos criar um novo arquivo no projeto chamado `tsconfig.json`, nele vamos colar o texto seguinte:

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "app/js"
  },
  "include": [
    "app/ts/**/*"
  ]
}
```

> Este texto pode ser obtido nas explicações básicas do TS

Basicamente o que estamos dizendo aqui é que vamos compilar o nosso código em ES6 e colocado na pasta `app/js` e vamos fazer isso só com os arquivos que estão na chave `include`, ou seja, todas as coisas dentro da pasta `app/ts` e suas subpastas.

Agora vamos adicionar um script `compile` no `package.json` que vai chamar o compilador `tsc` do Typescript:

```json
{
  "name": "alurabank",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "compile": "tsc"
  },
  "devDependencies": {
    "typescript": "2.3.2"
  }
}
```

Se rodarmos `yarn compile` vamos ter vários erros no nosso arquivo `Negociacao.ts`. Isto porque nossa sintaxe é inválida para o Typescript.

## Utilizando Typescript

O primeiro erro que tivemos é que _"propriedade `data` não existe no tipo `Negociacao`"_, ou seja, temos que declarar propriedades de classe usando a sintaxe Typescript:

```ts
class Negociacao {
  _data;
  _quantidade;
  _valor;

  // Estamos "forçando" uma negociação a receber esses tres parâmetros
  constructor (data, quantidade, valor) {
    this._data = data
    this._quantidade = quantidade
    this._valor = valor
  }

  get data () {
    return this._data
  }

  get quantidade () {
    return this._quantidade
  }

  get valor () {
    return this._valor
  }

  get volume () {
    return this._quantidade * this._valor
  }
}
```

Ou seja, temos que mudar nossa classe para conter nossas propriedades dentro do escopo da classe inicialmente, não dentro do constructor.

### Propriedades privadas

Como no JS não temos como definir propriedades privadas, usamos o TS para poder definir essas propriedades e evitar que o programador possa alterar a propriedade. Então na nossa classe `Negociacao` vamos alterar o seguinte:

```ts
class Negociacao {
  private _data;
  private _quantidade;
  private _valor;

  // Estamos "forçando" uma negociação a receber esses tres parâmetros
  constructor (data, quantidade, valor) {
    this._data = data
    this._quantidade = quantidade
    this._valor = valor
  }

  get data () {
    return this._data
  }

  get quantidade () {
    return this._quantidade
  }

  get valor () {
    return this._valor
  }

  get volume () {
    return this._quantidade * this._valor
  }
}
```

### Evitando JS com erros de compilação

Se rodarmos nosso compilador com o nosso `app.ts` alterando a propriedade privada, então receberemos um erro em tempo de compilação, mas o problema é que ele vai gerar o arquivo compilado mesmo com este erro acontecendo, vamos atualizar o nosso `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "app/js",
    "noEmitOnError": true
  },
  "include": [
    "app/ts/**/*"
  ]
}
```

A opção `noEmitOnError` faz com que o compilador __não gere a pasta final__ enquanto estivermos tendo erros de compilação.

## Watch

Compilar toda hora é bastante chato, então podemos fazer um watch nos arquivos TS para rodar o compilador sempre que salvarmos um arquivo TS, para isto vamos criar um novo script no `package.json`:

```json
{
  "name": "alurabank",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "compile": "tsc",
    "watch": "tsc -w"
  },
  "devDependencies": {
    "typescript": "2.3.2"
  }
}
```

Nosso script watch vai executar o `tsc` no modo _watch_, de forma que ele vai ficar ouvindo nossas alterações. Desta forma não vamos precisar ficar recompilando tudo a toda hora.