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
  - [Obtendo dados do formulário](#obtendo-dados-do-formulário)
  - [Definindo tipos](#definindo-tipos)
    - [Definindo tipos (mais rápido)](#definindo-tipos-mais-rápido)
  - [Casting](#casting)
  - [Listando negociações](#listando-negociações)
    - [Inferição de tipos](#inferição-de-tipos)
    - [Imutabilidade de valores](#imutabilidade-de-valores)
  - [Exibindo o modelo ao usuário](#exibindo-o-modelo-ao-usuário)

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

## Obtendo dados do formulário

Vamos criar um controlador de negociações na nossa pasta `controllers`. Nele vamos ter as propriedades que são os campos do formulário e os métodos de adição e outros:

```ts
class NegociacaoController {
  private _inputData;
  private _inputQuantidade;
  private _inputValor;

  constructor () {
    this._inputData = document.querySelector('#data')
    this._inputQuantidade = document.querySelector('#quantidade')
    this._inputValor = document.querySelector('#valor')
  }

  adiciona (evento) {
    // Lógica de inserção de negociação aqui
  }
}
```

Agora vamos fazer uma alteração no nosso `app.ts` criando nossa lógica de instanciamento de controllers e vamos criar os eventos HTML do formulário:

```ts
const controller = new NegociacaoController();

document.querySelector('.form').addEventListener('submit', controller.adiciona.bind(controller));
```

> Note que `controller.adiciona` está com o `.bind(controller)`, pois o método `adiciona` vai perder a referência para `this` do controller quando executarmos no `app.ts`, o `this` será dinamicamente referenciado para o `this` do `app.ts`

No nosso controller vamos criar a lógica de adição:

```ts
class NegociacaoController {
  private _inputData
  private _inputQuantidade
  private _inputValor

  constructor () {
    this._inputData = document.querySelector('#data')
    this._inputQuantidade = document.querySelector('#quantidade')
    this._inputValor = document.querySelector('#valor')
  }

  adiciona (evento) {
    evento.preventDefault()
    const negociacao = new Negociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value)
    console.log(negociacao)
  }
}
```

> Lembre-se que, quando formos importar o script no nosso `index.html` o `app.js` deve ser o __último__ script, pois ele depende de todos os demais.

## Definindo tipos

Temos um problema que vai nos dar uma dor de cabeça razoável. O tipo `any`, ele define que um valor não pode ser inferido por um tipo estático, então vamos ver a nossa classe de `Negociacao` e o nosso controller. Veja que os campos do formulário são sempre `strings`, então vamos ter erros de tipo, pois todas as variáveis serão `strings`.

Um dos pontos mais importantes do TS é que podemos tipar todas as variáveis. Quando não tivermos nenhum tipo explicito definido, ele vai adotar um tipo `any`. Para impedirmos a compilação de arquivos com este tipo implicito configurado, temos que adicionar uma nova linha no nosso `tsconfig`:

```json
{
  "compilerOptions": {
    "target": "es6",
    "outDir": "app/js",
    "noEmitOnError": true,
    "noImplicitAny": true
  },
  "include": [
    "app/ts/**/*"
  ]
}
```

> O `noImplicitAny` fará com que o compilador de erros quando encontrar qualquer um dos tipos Any implicitos
>
> O TS obtém os tipos de um tipo de arquivos chamado `ts.d`, chamado normalmente de _Typescript Definition_, estes tipos vem definidos diretamente no compilador quando instalamos o pacote

Para podermos tipar nossas variáveis, vamos adicionar `:` seguido do tipo que queremos logo depois da definição das mesmas:

```ts
class NegociacaoController {
  private _inputData: Date
  private _inputQuantidade: number
  private _inputValor: number
}
```

Podemos fazer isso na nossa classe de negociação:

```ts
class Negociacao {
  private _data: Date
  private _quantidade: number
  private _valor: number

  // Estamos "forçando" uma negociação a receber esses tres parâmetros
  constructor (data: Date, quantidade: number, valor: number) {
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

### Definindo tipos (mais rápido)

Veja que isto ficou um pouco verboso, podemos simplesmente resumir desta forma:

```ts
class Negociacao {
  // Estamos "forçando" uma negociação a receber esses tres parâmetros
  constructor (private _data: Date, private _quantidade: number, private _valor: number) {}

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

Agora estamos falando que as propriedades do construtor vão também ser propriedades da própria classe.

## Casting

Quando formos fazer a mesma coisa no `NegociacaoController` vamos ter que definir o tipo como um `Element`, visto que o tipo retornado por `document.querySelector` é sempre um elemento.

```ts
class NegociacaoController {
  private _inputData: Element
  private _inputQuantidade: Element
  private _inputValor: Element

  constructor () {
    this._inputData = document.querySelector('#data')
    this._inputQuantidade = document.querySelector('#quantidade')
    this._inputValor = document.querySelector('#valor')
  }

  adiciona (evento: Event) {
    evento.preventDefault()
    const negociacao = new Negociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value)
    console.log(negociacao)
  }
}
```

Mas agora vamos ter um outro tipo de erro, falando que o _"Elemento não tem a propriedade value"_. Isto porque o que estamos falando para o TS é que nosso tipo é um elemento genérico, ele não sabe se há ou não uma propriedade value, ou seja, temos que explicitamente falar que este tipo é um `input`, só assim podemos pegar o `value` a partir de um elemento. Para podermos definir um tipo específico que não seja um genérico, precisamos fazer um _casting_ explicito.

Para alterar no nosso controller, vamos substituir `Element` por `HTMLInputElement`:

```ts
class NegociacaoController {
  private _inputData: HTMLInputElement
  private _inputQuantidade: HTMLInputElement
  private _inputValor: HTMLInputElement

  constructor () {
    this._inputData = document.querySelector('#data')
    this._inputQuantidade = document.querySelector('#quantidade')
    this._inputValor = document.querySelector('#valor')
  }

  adiciona (evento: Event) {
    evento.preventDefault()
    const negociacao = new Negociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value)
    console.log(negociacao)
  }
}
```

Mas vamos ter erros porque o `document.querySelector` não nos retorna um `HTMLInputElement` então temos que forçar. Para fazer essa conversão explicita, vamos usar `<tipo>` na frente da chamada:

```ts
class NegociacaoController {
  private _inputData: HTMLInputElement
  private _inputQuantidade: HTMLInputElement
  private _inputValor: HTMLInputElement

  constructor () {
    this._inputData = <HTMLInputElement>document.querySelector('#data')
    this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade')
    this._inputValor = <HTMLInputElement>document.querySelector('#valor')
  }

  adiciona (evento: Event) {
    evento.preventDefault()
    const negociacao = new Negociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value)
    console.log(negociacao)
  }
}
```

Agora temos um problema nesta execução `this._inputData.value`, pois o tipo retornado é uma `string` e não um `Date`. O mesmo vale para os outros dois campos, porque são strings e não números:

```ts
class NegociacaoController {
  private _inputData: HTMLInputElement
  private _inputQuantidade: HTMLInputElement
  private _inputValor: HTMLInputElement

  constructor () {
    this._inputData = <HTMLInputElement>document.querySelector('#data')
    this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade')
    this._inputValor = <HTMLInputElement>document.querySelector('#valor')
  }

  adiciona (evento: Event) {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.value.replace(/-/g, ',')), // Temos que substituir a data com - por data com , para poder passar para o date
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )
    console.log(negociacao)
  }
}
```

Com isso removemos os erros.

## Listando negociações

Para podermos listar as nossas negociações, vamos ter que seguir algumas regras:

- Na lista, só podemos inserir
- Não podemos remover
- Não podemos alterar

Para isso, vamos criar um novo modelo chamado `Negociacoes`:

```ts
class Negociacoes {
  private _negociacoes: Array<Negociacao> = []

  adiciona (negociacao: Negociacao) {
    this._negociacoes.push(negociacao)
  }

  toArray () {
    return this._negociacoes
  }
}
```

> Veja que temos um array privado _de negociações_, ele leva o tipo negociação como parâmetro para especificar o tipo de array que estamos usando. Da mesma forma estamos criando o método adiciona com um parâmetro do tipo de negociação.
>
> Uma outra forma de escrever um array específico é `Negociacao[]` ao invés de `Array<Negociacao>`.

### Inferição de tipos

Quando formos alterar o nosso controller vamos colocar uma nova propriedade chamada de `Negociacoes`:

```ts
class NegociacaoController {
  private _inputData: HTMLInputElement
  private _inputQuantidade: HTMLInputElement
  private _inputValor: HTMLInputElement
  private _negociacoes = new Negociacoes()

  constructor () {
    this._inputData = <HTMLInputElement>document.querySelector('#data')
    this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade')
    this._inputValor = <HTMLInputElement>document.querySelector('#valor')
  }

  adiciona (evento: Event) {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.value.replace(/-/g, ',')),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )
    console.log(negociacao)
  }
}
```

> Veja que não passamos o tipo para `_negociacoes` porque ele já inferiu automaticamente que nosso tipo é `Negociacoes`

O mesmo vale para este código:

```ts
class NegociacaoController {
  private _inputData: HTMLInputElement
  private _inputQuantidade: HTMLInputElement
  private _inputValor: HTMLInputElement
  private _negociacoes = new Negociacoes()

  constructor () {
    this._inputData = <HTMLInputElement>document.querySelector('#data')
    this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade')
    this._inputValor = <HTMLInputElement>document.querySelector('#valor')
  }

  adiciona (evento: Event) {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.value.replace(/-/g, ',')),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )

    this._negociacoes.adiciona(negociacao)

    this._negociacoes.toArray().forEach((negociacao) => {
      console.log(negociacao.data, negociacao.quantidade, negociacao.valor, negociacao.volume)
    })
  }
}
```

Veja que estamos inferindo o tipo também de `negociacao` porque nosso método `toArray()` retorna um array de negociacoes.

### Imutabilidade de valores

Nosso array não pode ser alterado, ou seja, não podemos remover nem alterar nada neste array de negociações, mas se utilizarmos `this._negociacoes.toArray().length = 0`, estaremos limpando o Array da mesma forma. Então temos que retornar uma referência para este array, uma cópia:

```ts
class Negociacoes {
  private _negociacoes: Array<Negociacao> = []

  adiciona (negociacao: Negociacao) {
    this._negociacoes.push(negociacao)
  }

  toArray () {
    return [].concat(this._negociacoes)
  }
}
```

Mas agora temos um problema, o TS perdeu o intellisense sobre isso... Porque estamos retornando um array e não um tipo específico, vamos ter que tipar o retorno também:

```ts
class Negociacoes {
  private _negociacoes: Array<Negociacao> = []

  adiciona (negociacao: Negociacao): void {
    this._negociacoes.push(negociacao)
  }

  toArray (): Negociacao[] { // Tipamos o retorno
    return [].concat(this._negociacoes)
  }
}
```

Agora temos o nosso intellisense funcionando novamente.

> É uma boa prática sempre tipar os retornos porque isso evita que retornemos coisas diferentes do que nossos métodos precisam, evitando que ela quebre ao longo da aplicação.

## Exibindo o modelo ao usuário

Para podermos exibir a lista de negociações para o usuário vamos precisar manipular o DOM. Existem duas formas de fazer isso, da forma imperativa (falando como vamos alterar o DOM), ou declarativa (de forma que temos templates para fazer isso).

Em um novo arquivo `NegociacoesView.ts` dentro da pasta `views` com este conteúdo:

```ts
class NegociacoesView {

  template(): string {
    return `
      <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
      </tfoot>
    </table>`
  }
}
```

Agora vamos dentro do nosso controller de negociações e criaremos uma nova propriedade nessa classe:

```ts
private _negociacoesView = new NegociacoesView('#negociacoesView')
```

E no arquivo `index.html` vamos incluir uma nova div com o ID `negociacoesView` e, de volta na view vamos incluir o seletor e um método de update:

```ts
private _elemento: Element

constructor (seletor: string) {
  this._elemento = document.querySelector(seletor)
}

update (): void {
  this._elemento.innerHTML = this.template()
}
```

Para podermos exibir os dados da nossa negociação vamos ter que adicionar a chamada para este método dentro do nosso controller para, assim que a página for carregada, nós renderizemos a tabela.

```ts
constructor () {
  // Código
  this._negociacoesView.update()
}
```

Agora temos que passar os dados para isto vamos chamar este método tanto no construtor quanto no método `adiciona` do nosso controller. Mas agora vamos passar o modelo que vamos adicionar na tabela:

```ts
import NegociacoesView from "../views/NegociacoesView"

class NegociacaoController {
  private _inputData: HTMLInputElement
  private _inputQuantidade: HTMLInputElement
  private _inputValor: HTMLInputElement
  private _negociacoes = new Negociacoes()
  private _negociacoesView = new NegociacoesView('#negociacoesView')

  constructor () {
    this._inputData = <HTMLInputElement>document.querySelector('#data')
    this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade')
    this._inputValor = <HTMLInputElement>document.querySelector('#valor')
    this._negociacoesView.update(this._negociacoes)
  }

  adiciona (evento: Event): void {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.value.replace(/-/g, ',')),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )

    this._negociacoes.adiciona(negociacao)

    this._negociacoesView.update(this._negociacoes)
  }
}
```

Vamos refletir isso na nossa view:

```ts
export default class NegociacoesView {

  private _elemento: Element

  constructor (seletor: string) {
    this._elemento = document.querySelector(seletor)
  }

  update (model: Negociacoes): void {
    this._elemento.innerHTML = this.template(model)
  }

  template(model: Negociacoes): string {
    return `
      <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
      </tfoot>
    </table>`
  }
}
```

Agora é só completar a tabela:

```js
export default class NegociacoesView {

  private _elemento: Element

  constructor (seletor: string) {
    this._elemento = document.querySelector(seletor)
  }

  update (model: Negociacoes): void {
    this._elemento.innerHTML = this.template(model)
  }

  template(model: Negociacoes): string {
    return `
      <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
      <tbody>
        ${
          model.toArray().map((negociacao: Negociacao) => {
            return `
              <tr>
                <td>${negociacao.data.getDate()}/${negociacao.data.getMonth()+1}/${negociacao.data.getFullYear()}</td>
                <td>${negociacao.quantidade}</td>
                <td>${negociacao.valor}</td>
                <td>${negociacao.volume}</td>
              </tr>
            `
          }).join('')
        }
      </tbody>
      <tfoot>
      </tfoot>
    </table>`
  }
}
```


