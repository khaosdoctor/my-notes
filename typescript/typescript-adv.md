# Typescript Avançado: Parte 2

<!-- TOC -->

- [Typescript Avançado: Parte 2](#typescript-avançado-parte-2)
  - [Organização via namespaces](#organização-via-namespaces)
    - [O problema](#o-problema)
  - [ES6 Modules](#es6-modules)
    - [Melhorando o desenvolvimento](#melhorando-o-desenvolvimento)
  - [Organização de módulos em barrels](#organização-de-módulos-em-barrels)
  - [Propriedades ReadOnly](#propriedades-readonly)
  - [Parâmetros Opicionais](#parâmetros-opicionais)
  - [Strict null checks](#strict-null-checks)
  - [Typecasting](#typecasting)
    - [O tipo `never`](#o-tipo-never)
  - [Enums](#enums)
  - [Decorators de métodos](#decorators-de-métodos)
  - [DOM Injector e Lazy Loading utilizando Decorators de propriedades](#dom-injector-e-lazy-loading-utilizando-decorators-de-propriedades)
  - [Decorators de classe](#decorators-de-classe)
  - [API Externa](#api-externa)
    - [Fetch API](#fetch-api)
    - [Interfaces de API](#interfaces-de-api)
  - [Aplicando o pattern throttle](#aplicando-o-pattern-throttle)
  - [Organizando o código de acesso de APIs em serviços](#organizando-o-código-de-acesso-de-apis-em-serviços)
    - [Interfaces de funções](#interfaces-de-funções)
  - [Isolando o `console.log`](#isolando-o-consolelog)
  - [Polimorfismo](#polimorfismo)
  - [Interfaces para métodos](#interfaces-para-métodos)
    - [Estendendo interfaces](#estendendo-interfaces)
  - [Type Alias](#type-alias)

<!-- /TOC -->

## Organização via namespaces

Podemos organizar melhor nosso código se, ao invés de termos que buscar o nome dos arquivos na nossa estrutura de pastas, colocarmos eles em **namespaces**. Os Namespaces são módulos que agrupam classes ou outras entidades dentro de um único pacote.

```ts
abstract class View<T> {
  protected _el: JQuery

  constructor (selector: string) {
    this._el = $(selector)
  }

  update(model: T) {
    this._el.html(this.template(model))
  }

  abstract template (model: T): string
}
```

Imagine que queremos buscar nossas views, teremos que olhar nos arquivos pelos nomes? Vamos colocar em um namespace:

```ts
namespace Views {
  export abstract class View<T> {
    protected _el: JQuery

    constructor (selector: string) {
      this._el = $(selector)
    }

    update(model: T) {
      this._el.html(this.template(model))
    }

    abstract template (model: T): string
  }
}
```

Agora podemos acessar `View` por todo o código ao digitar `Views.`, o intellisense do VSCode deverá verificar o namespace e ver que temos estas estruturas dentro.

> Namespaces só vão mostrar entidades que possuem `export`

Agora, vamos precisar alterar as nossas importações para essas entidades, pois todas as nossas importações não estão mais no escopo global, vamos precisar **sempre** acessar esses objetos por `Views.<entidade>`, ou então importar através de `import View from Views.View` e utilizar apenas como `View`.

### O problema

O problema é que o sistema de módulos do TS não resolve o problema da ordem de carregamento, apenas organiza os módulos internamente, então não é muito bom utilizar isso em um ambiente web para browsers.

## ES6 Modules

Para podermos aplicar os módulos do ES6, vamos primeiro precisar adequar os módulos do sistema ao modelo so Javascript.

A Ideia dos módulos é que **todo** o arquivo `.js` criado é, por definição, um módulo. Então todos os módulos precisam estar exportando alguma coisa, vamos utilizar com o `View`:

```ts
export abstract class View<T> {
  protected _el: JQuery

  constructor (selector: string) {
    this._el = $(selector)
  }

  update(model: T) {
    this._el.html(this.template(model))
  }

  abstract template (model: T): string
}
```

E depois vamos importar esta informação no nosso arquivo que vai utilizar essas Views como `import { View } from '../classes/View'`.

O grande problema é que (até o momento que este arquivo foi escrito) não há um consenso sobre como podemos fazer um carregamento destes módulos no navegador. Então precisamos de um *Module Loader*, vamos utilizar um Loader chamado `System.js` e incluí-lo no nosso `index.html`:

```html
<script src='./lib/system.js'></script>
```

Vamos agora trocar a chave `module` dentro de `compilerOptions` para `system`. Agora só precisamos indicar qual será o primeiro módulo que ele vai precisar carregar, no nosso arquivo `index.html` vamos atualizar nossas configurações do system:

```html
<script>
  System.defaultJSExtensions = true // Identifica que todos os arquivos que vamos colocar são JS, podemos omitir as extensões
  System.import('js/app.js').catch(console.error)
</script>
```

Vamos ter um problema, pois nossa aplicação não está sendo executado em um servidor, então vamos ter um problema com o carregamento do System.js e do servidor, pois todos os módulos vão ser carregados via AJAX, ou seja, em um sistema de arquivos normal não vamos ter essa possibilidade, vamos precisar de um servidor do Node.

### Melhorando o desenvolvimento

Vamos utilizar o `lite-server` do Node, utilizando o comando `npm i lite-server@2.3.0 -D` pois ele tem um LiveReload. Agora vamos atualizar o nosso `scripts` dentro de `package.json`:

```json
{
  "scripts": {
    "server": "lite-server --baseDir=app"
  }
}
```

Então podemos utilizar `npm run server` e em outra aba o `npm start`. Podemos atualizar este script para que possamos simplesmente rodar os dois comandos ao mesmo tempo, instalando o módulo `concurrently` através do `npm i concurrently@3.4.0 -D` e ai vamos atualizar nossos scripts:

```json
{
  "scripts": {
    "test": "exit 0",
    "compile": "tsc",
    "watch": "tsc -w",
    "server": "lite-server --baseDir=app",
    "start": "concurrently \"npm run watch\" \"npm run server\""
  }
}
```

Agora vamos poder utilizar o comando de uma vez só.

## Organização de módulos em barrels

Podemos otimizar a nossa importação de módulos, ao invés de ter que importar diversos módulos separados como em:

```ts
import { a } from 'b'
import { b } from 'b'
import { c } from 'd'
import { d } from 'd'
import { e } from 'f'
import { f } from 'g'
```

Poderíamos fazer:

```ts
import { a, b } from 'b/index'
import { c, d } from 'd/index'
import { e } from 'f'
import { f } from 'g'
```

O que precisamos fazer é criar um arquivo `index.ts` dentro da pasta `Views`, por exemplo, e nele colocar:

```ts
export * from './View'
export * from './MensagemView'
export * from './NegociacoesView'
```

E então importar este arquivo como:

```ts
import { View, MensagemView } from './Views'
```

## Propriedades ReadOnly

Podemos criar uma propriedade que seja possível apenas a leitura e não mais a escrita, criando o que chamamos de propriedades `readOnly`.

```ts
class Negociacao {
  readonly data: Date
  readonly quantidade: number
  readonly valor: number

  constructor (data: Date, quantidade: number, valor: number) {
    this.data = data
    this.quantidade = quantidade
    this.valor = valor
  }
}
```

Então ao fazermos:

```ts
const N = new Negociacao(new Date(), 1, 1)
console.log(N.quantidade) // 1
```

Vamos conseguir ler, mas:

```ts
const N = new Negociacao(new Date(), 1, 1)
N.quantidade = 1 // Error
```

Vai nos dar um erro de compilação porque não vamos poder alterar a propriedade a partir de outro escopo.

## Parâmetros Opicionais

Podemos passar parâmetros opcionais em Javascript da forma:

```js
function foo (bar=null) {
  //
}
```

Neste caso podemos ou não mandar o parâmetro `bar`, no caso de não enviarmos ele vai obter o valro padrão. No Typescript podemos fazer da seguinte maneira:

```ts
function foo (bar?: string|null): void {
  //
}
```

Neste caso não vamos ter um inicializador, pois não podemos ter um parâmetro opcional e também um inicializador na mesma função. Podemos deixar vazio e o valor, quando não suprido, será `undefined`. Lembrando também que os parâmetros opcionais deverão vir sempre após os parâmetros obrigatórios na ordem da assinatura da função.

Se quisermos setar um valor padrão diferente de `undefined` então vamos ter que setar um valor padrão conforme o ES6:

```ts
function foo (bar: string = 'abc'): void {
  //
}
```

## Strict null checks

Quando temos uma função de um tipo que pode ser nulável, ou seja, que pode obter o valor nulo em algum momento de sua vida. No nosso arquivo `tsconfig.json` vamos ter uma chave chamada `strictNullCheck`, que vamos setar como `true`. Isto vai fazer com que não possamos mais atribuir nenhum valor `null` ou `undefined` para qualquer variável, pois o compilador vai reclamar em tempo de desenvolvimento.

O único caso que podemos setar um tipo como nulo é quando o tipo da própria variável é nulável, por exemplo:

```ts
function () {
  let foo: string|null
  foo = null
}
```

Neste caso vamos poder setar o tipo nulo sem problemas.

## Typecasting

Podemos transformar um tipo em outro de N formas:

```ts
const a = <string>foo
const b = foo as string
```

Isto é particularmente util quando estamos utilizando o `strictNullCheck` e temos algo como `const a = [].concat(b)`, o TS não sabe o que é `[]` e irá assumir como algo nulável. Então podemos fazer `const a = ([] as number).concat(b)` assumindo assim um `Array<number>`.

### O tipo `never`

TypeScript possui um tipo curioso, o tipo `never`. Este tipo é aplicável à métodos ou funções que por algum motivo, planejado ou não, podem não terminar sua execução de seu bloco.

Exemplos clássicos são os de métodos que caem em um loop infinito ou de métodos que sempre retornam exceções. Exceções fazem com que o método não execute até o fim.

Não confundir o tipo `never` com o tipo `void`. O segundo, apesar de indicar que a função ou método nada retorna, indica que a função ou método executará até o fim, mesmo que não retorne nada.

Geralmente não usamos esse tipo em nosso código, mas ele pode aparecer como aviso do compilador. Quando aparecer, você já saberá que a execução do seu método nunca chegará até o fim, sendo um forte indicativo de um bug em seu código.

## Enums

Podemos criar um enunciado informando o que é uma série de valores, por exemplo, vamos checar se um dia da semana é sábado ou domingo:

```ts
const date = new Date()

if ([0,6].includes(date.getDay())) {
  console.log('é fds')
}
```

Mas o código fica um pouco complicaddo de se entender, por que 6? Por que 0? Vamos então enumerar os dias:

```ts
const date = new Date()

enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

if ([WeekDay.Sunday, WeekDay.Saturday].includes(date.getDay())) {
  console.log('é fds')
}
```

É importante entender que, os códigos de enumeração do TS começarão sempre no 0, mas se quisermos forçar um valor específico podemos fazer:

```ts
enum WeekDay {
  Sunday = 1,
  Monday, // 2
  Tuesday // 3
  ...
}
```

Veja que a linguagem pega o primeiro valor e os demais memrbros são incrementos do valor inicial. Agora vamos supor que o primeiro precisa ser 0 e os demais precisam começar em 4:

```ts
enum WeekDay {
  Sunday, // 0
  Monday = 4, // 4
  Tuesday // 5
  ...
}
```

Podemos igualar o enum a qualquer tipo que quisermos:

```ts
enum foo {
  bar = true,
  baz = 'string',
  fooz = 1,
  daz = null
}
```

## Decorators de métodos

Imagine que queremos executar um teste de tempo, incluindo `performance.now()` antes e depois do método, e depois logar o tempo no console. Para não ter que ficar repetindo o código em todos os lugares no início e no fim de cada método que queiramos testar. Para isso podemos criar um decorator.

O TS, até o momento, suporta a criação de decorators de forma experimental, ou seja, temos que ativar uma flag no `tsconfig.json` chamada `experimentalDecorators` para podermos usa-los.

Vamos agora criar nosso decorator; um *method decorator*, que permite incluir um código antes e depois do método. Vamos criar um novo arquivo com um nome qualquer, vamos chamar de `debugTime.ts`:

```ts
export function debugTime () {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {}
}
```

Veja que o decorator é uma função que exporta outra função, que é aonde vamos colocar a lógica do nosso decorator. Ela leva tres parâmetros:

- `target`: A instancia no qual o decorator foi colocado
- `propertykey`: Nome do método no qual o decorator foi colocado
- `descriptor`: Sabe tudo sobre o método que está sendo chamado, inclusive permite sobrescrever o método

Agora vamos continuar:

```ts
export function debugTime () {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value // Método original

    descriptor.value = function(...args: any[]) { // Sobrescrevemos a função original com uma nova função
      const returnValue = originalMethod.apply(this, args) // Executamos a função original passando os mesmos argumentos
      return returnValue // Retornamos o resultado
    }

    return descriptor // Retornamos o método final
  }
}
```

Até aqui não fizemos nada de mais, se incluirmos nosso arquivo e chamarmos nosso decorator vamos ter o mesmo resultado:

```ts
import { debugTime } from './debugTime'

@debugTime()
function method (a: string, b: number) {
  // do something
}
```

Decorators também podem receber parâmetros, basta colocarmos na função que vamos exportar:

```ts
export function debugTime (format: string = '') {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    //
  }
}
```

O que queremos fazer agora é sobrescrever o método com nosso próprio método:

```ts
export function debugTime () {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value // Método original

    descriptor.value = function(...args: any[]) { // Sobrescrevemos a função original com uma nova função
      console.log('--- DEBUG ---')
      console.log(`Method "${propertyKey}" params: ${JSON.stringify(args)}`)

      const t1 = performance.now() // Obtém o tempo inicial
      const returnValue = originalMethod.apply(this, args) // Executamos a função original passando os mesmos argumentos
      const t2 = performance.now() // Tempo final

      console.log(`Method "${propertyKey}" return is: ${JSON.stringify(returnValue)}`)
      console.log(`Method "${propertyKey}" took ${t2-t1}ms`))
      console.log('--- DEBUG END ---')

      return returnValue // Retornamos o resultado
    }

    return descriptor // Retornamos o método final
  }
}
```

## DOM Injector e Lazy Loading utilizando Decorators de propriedades

No nosso arquivo `NegociacaoController.ts` temos propriedades que estão sempre buscando elementos do DOM, o que queremos é criar um Lazy Loading para que ele só busque estas propriedades quando acessarmos pela primeira vez. Temos algo assim:

```ts
import NegociacoesView from "../views/NegociacoesView"

class NegociacaoController {
  private _inputData: JQuery
  private _inputQuantidade: JQuery
  private _inputValor: JQuery
  private _negociacoes = new Negociacoes()
  private _negociacoesView = new NegociacoesView('#negociacoesView')
  private _mensagemView = new MensagemView('#mensagemView')

  constructor () {
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')
    this._negociacoesView.update(this._negociacoes)
  }

  adiciona (evento: Event): void {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.val().replace(/-/g, ',')),
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    )

    this._negociacoes.adiciona(negociacao)

    this._negociacoesView.update(this._negociacoes)
    this._mensagemView.update('Negociação adicionada com sucesso!')
  }
}
```

Queremos algo assim:

```ts
import NegociacoesView from "../views/NegociacoesView"

class NegociacaoController {

  @DOMInject('#data')
  private _inputData: JQuery
  @DOMInject('#quantidade')
  private _inputQuantidade: JQuery
  @DOMInject('#valor')
  private _inputValor: JQuery

  private _negociacoes = new Negociacoes()
  private _negociacoesView = new NegociacoesView('#negociacoesView')
  private _mensagemView = new MensagemView('#mensagemView')

  constructor () {
    this._negociacoesView.update(this._negociacoes)
  }

  adiciona (evento: Event): void {
    evento.preventDefault()
    const negociacao = new Negociacao(
      new Date(this._inputData.val().replace(/-/g, ',')),
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    )

    this._negociacoes.adiciona(negociacao)

    this._negociacoesView.update(this._negociacoes)
    this._mensagemView.update('Negociação adicionada com sucesso!')
  }
}
```

Vamos construir um decorator que vai transformar essas propriedades em `getters` com uma função com a lógica de buscar no DOM somente pela primeira execução, vamos criar nosso arquivo `DOMInject.ts`:

```ts
export function DOMInject (selector: string) {
  return (classInstance: any, propertyName: string) => {
    let element: JQuery // Declaramos o elemento que vamos salvar

    const getter = () => { // Criamos uma função getter que vai checar se o elemento já está preenchido
      if (!element) { // Se não estiver então preenche
        element = $(selector)
      }

      return element // Retorna o elemento
    }

    // Vamos até a classe e definimos a propriedade dela como um getter
    Object.defineProperty(classInstance, propertyName, { get: getter })
  }
}
```

Veja que o elemento é salvo entre chamadas, pois o decorator exportará a mesma função se receber o mesmo parâmetro, então podemos utilizar estas funções como caches de chamada. Estamos utilizando também o `Object.defineProperty` que nos permite alterar uma propriedade de um objeto, como uma classe é um objeto, estamos enviando a instancia desta classe através de `classInstance` e dizendo que `propertyName` é um getter com a função que criamos.

## Decorators de classe

Em TypeScript também podemos criar decoradores de classes. Um decorador de classe nos dá acesso ao constructor da class que estamos decorando. Vejamos um exemplo:

```ts
export function meuDecoratorDeClasse() {

    return function(constructor: any) {

       // guarda o constructor original, pois iremos definir um novo
        const original = constructor;

       // cria um novo constructor. Como ele pode receber nenhum ou mais parâmetros, usamos ...args: any[]
        const novo: any = function (...args: any[]) {
            console.log("Criando uma instância com New: " + original.name);
            // cria a instância da classe quando for chamado
            return new original(...args);
        }

       // importante! O prototype do novo constructor deve ser o mesmo do original
        novo.prototype = original.prototype;

        // retorna o novo constructor
        return novo;
    }
}
```

Nosso decorator exibirá apenas uma mensagem no console indicando que chamará o constructor da classe.

```ts
// código anterior omitido

@meuDecoratorDeClasse()
export class NegociacaoController {
   // código omitido
}
```

Este é outro tipo de decorator possível dentro da linguagem.

## API Externa

Vamos fazer com que nossa aplicacão consuma uma API de terceiros. Estaremos usando um servidor feito em Node com a base de uma API simples; esta api vai rodar no endereço `localhost:8080` e trará um JSON de resposta para o caminho `/dados` com o seguinte conteúdo:

```json
[
  {"montante": 200.5, "vezes": 2},
  {"montante": 100.2, "vezes": 5},
  {"montante": 50.5, "vezes": 1},
  {"montante": 70.5, "vezes": 2},
]
```

Veja que não temos as datas, isto porque vamos utilizar a própria data de importação.

Primeiramente vamos incluir um botão novo no nosso HTML, com o tipo `button` e vamos atribuir a ele a ação de importar dados do nosso controller:

```html
<button id="botao-importa" type="button">Importar</button>
```

Este botão vai chamar um método `importaDados` do nosso `NegociacaoController`:

```ts
class NegociacaoController {
  // Código omitido

  importaDados () {
    alert('olá')
  }

}
```

Agora vamos associar este botão ao controller no `app.ts`:

```ts
import { NegociacaoController } from './controllers/NegociacaoController'

$('#botao-importa').click(controller.importaDados.bind(controller))
```

Até ai só temos um botão no HTML.

### Fetch API

Vamos utilizar a *fetch api*, que é um recurso mais novo do Javascript para fazer requisições XHR. Vamos atualizar nosso método `importaDados` no controller:

```ts
class NegociacaoController {
  // Código omitido

  importaDados () {
    const isOk = (res: any) => {
      if (res.ok) return res
      throw new Error(res.statusText)
    }

    fetch('http://localhost:8080/dados')
      .then(isOk)
      .then((res) => res.json())
      .then((dados: any[]) => {
          dados
            .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
            .forEach((negociacao) => this._negociacoes.adiciona(negociacao))
          this._negociacoesView.update(this._negociacoes)
      })
      .catch(console.error)
  }
}
```

### Interfaces de API

Quando estamos trabalhando com APIs externas, é uma boa prática definir uma interface para APIs externas para prevenir que façamos alguma chamada errada de método. Vamos então definir uma interface `INegociacaoParcial` que será o retorno da nossa API e utiliza-la no código anterior:

```ts
import { INegociacaoParcial } from './INegociacaoParcial'

class NegociacaoController {
  // Código omitido

  importaDados () {
    const isOk = (res: any) => {
      if (res.ok) return res
      throw new Error(res.statusText)
    }

    fetch('http://localhost:8080/dados')
      .then(isOk)
      .then((res) => res.json())
      .then((dados: INegociacaoParcial[]) => {
          dados
            .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
            .forEach((negociacao) => this._negociacoes.adiciona(negociacao))
          this._negociacoesView.update(this._negociacoes)
      })
      .catch(console.error)
  }
}
```

Agora vamos criar o arquivo `INegociacaoParcial`:

```ts
export interface INegociacaoParcial {
  vezes: number
  montante: number
}
```

## Aplicando o pattern throttle

Se clicarmos milhares de vezes, então vamos bombardear nosso back-end com requisições desnecessárias, para resolver esse problema, vamos realizar a aplicação do que é chamado *throttling*, ou *debounce*. Que consiste em agendar a execução do evento para o futuro e ignorar todos os eventos que ocorrem no meio deste intervalo. Vamos usar decorators.

Primeiramente vamos no arquivo `NegociacaoController` e incluiremos um timer.


```ts
import { INegociacaoParcial } from './INegociacaoParcial'
let timer = 0

class NegociacaoController {
  // Código omitido

  importaDados () {
    const isOk = (res: any) => {
      if (res.ok) return res
      throw new Error(res.statusText)
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      fetch('http://localhost:8080/dados')
        .then(isOk)
        .then((res) => res.json())
        .then((dados: INegociacaoParcial[]) => {
            dados
              .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
              .forEach((negociacao) => this._negociacoes.adiciona(negociacao))
            this._negociacoesView.update(this._negociacoes)
        })
        .catch(console.error)
    }, 500)
  }
}
```

Veja que estamos limpando o timeout e depois setando ele novamente com todo o código de importação dentro dele. Mas, se tivermos outros métodos, vamos precisar copiar tudo isso novamente. Vamos criar um decorator para isso:


```ts
import { INegociacaoParcial } from './INegociacaoParcial'

class NegociacaoController {
  // Código omitido

  @throttle()
  importaDados () {
    const isOk = (res: any) => {
      if (res.ok) return res
      throw new Error(res.statusText)
    }

    fetch('http://localhost:8080/dados')
      .then(isOk)
      .then((res) => res.json())
      .then((dados: INegociacaoParcial[]) => {
          dados
            .map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))
            .forEach((negociacao) => this._negociacoes.adiciona(negociacao))
          this._negociacoesView.update(this._negociacoes)
      })
      .catch(console.error)
  }
}
```

Vamos criar nosso arquivo `throttle.ts`:

```ts
export function throttle (ms: number = 500) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    let timer = 0

    descriptor.value = function (...args: any[]) {
      clearInterval(timer)
      timer = setTimeout(() => original.apply(this, args), ms)
    }
  }
}
```

Ao testar veremos que está tudo funcionando. Um problema que podemos ter é quando temos um objeto `Event`, nestes casos, como é o caso do método `adiciona`, a linha `event.preventDefault()` irá ser também postergada quando a execução do método todo for postergada, para resolver esse problema e podermos adicionar o nosso decorator no método `adiciona` vamos precisar remover o evento do método e passar ele para dentro do decorator:

```ts
export function throttle (ms: number = 500) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (event) event.preventDefault()

    const original = descriptor.value
    let timer = 0

    descriptor.value = function (...args: any[]) {
      clearInterval(timer)
      timer = setTimeout(() => original.apply(this, args), ms)
    }
  }
}
```

## Organizando o código de acesso de APIs em serviços

Para podermos reutilizar os códigos de acessos para APIs externas, chamadas e tudo o que criamos para poder chamar nossas APIs de negociação, vamos precisar encapsular sua lógica em um *service*.

Vamos criar uma pasta `services` e vamos colocar nosso arquivo `NegociacaoService.ts` dentro dela:

```ts
import {Negociacao, NegociacaoParcial} from '../models'

export class NegociacaoService {
  obterNegociacoes (handler: Function): Promise<Negociacao[]> {
    fetch('http://localhost:8080/dados')
      .then((res) => handler(res))
      .then((res) => res.json())
      .then((dados: NegociacaoParcial[] => {dados.map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))}))
      .catch((err) => console.error(err))
  }
}
```

> O método handler será a função de validação da resposta

Vamos criar um arquivo `index.ts` que será nosso *barrel* e exportará a nossa classe criada acima. Então no nosso controller poderemos substituir nossas chamadas puras pelo `fetch` pelo nosso service uma vez que inicializarmos ele com `this._service = new NegociacaoService()`:

```ts
this._service.obterNegociacoes(isOk)
  .then((negociacoes) => { /.../ })
```

### Interfaces de funções

No nosso código de service temos um ponto de falha: O programador poderá passar qualquer função para o handler, inclusive uma função vazia, isto fará com que o nosso método dê um erro porque sua assinatura não é a função que estamos esperando, no nosso caso, estamos esperando uma função que receba um parâmetro `response` e retorne um `response`.

Vamos definir uma interface de função:

```ts
export interface handlerFuncion {
  (res: Response): Response
}
```

Quando fazemos isto estamos dizendo que o handler precisa ter essa assinatura:

```ts
import {Negociacao, NegociacaoParcial} from '../models'

export class NegociacaoService {
  obterNegociacoes (handler: handlerFunction): Promise<Negociacao[]> {
    fetch('http://localhost:8080/dados')
      .then((res) => handler(res))
      .then((res) => res.json())
      .then((dados: NegociacaoParcial[] => {dados.map((dado) => new Negociacao(new Date(), dado.vezes, dado.montante))}))
      .catch((err) => console.error(err))
  }
}
```

## Isolando o `console.log`

Quando estamos programando, constantemente temos a necessidade de imprimir algum dado na tela com o `console.log` a fins de debug. Mas sempre que fazemos isto, temos que nos contentar com o formato que o `console` nos dá. Quando queremos fazer algo diferente, temos que recorrer a template strings ou algo do genero. Porém, temos que ficar replicando toda essa lógica, por exemplo:

```ts
console.log(`
  Data: ${negociacao.data}
  Quantidade: ${negociacao.quantidade}
`)
```

Podemos encapsular essa lógica dentro da nossa entidade de `Negociacao` na forma de um `toString()`:

```ts
export class Negociacao {
  // ... //

  paraTexto (): void {
    console.log(`
      Data: ${this.data}
      Quantidade: ${this.quantidade}
    `)
  }
}
```

E agora podemos utilizar o `negociacao.paraTexto()`. Podemos estender essa funcionalidade para as demais entidades (como `Negociacoes`).

## Polimorfismo

Podemos ter um método que recebe várias instancias diferentes e chama o método `paraTexto()` de todas elas, ele teria uma assinatura mais ou menos deste tipo:

```ts
export function imprime (...obj: any[]) {
  objetos.forEach(objeto => objeto.paraTexto())
}
```

Temos dois problemas aqui:

1. Não vamos ter o intellisense para o `paraTexto()`
2. Podemos receber qualquer tipo de objeto já que nosso tipo é `any`

Como podemos nos certificar que todos os objetos possuem o método `paraTexto`? Com classes abstratas e polimorfismo, vamos primeiramente criar um arquivo `Imprimivel.ts` que será nossa classe abstrata:

```ts
export abstract class Imprimivel {
  abstract paraTexto (): void
}
```

E agora todas as classes filhas devem implementar o método `paraTexto` desde que estendam a classe `Imprimivel`, desta forma todas as classes deverão receber o método, se ele não for implementado então o TS não vai compilar. Agora na nossa função `imprime` podemos atualizar nosso método:

```ts
export function imprime (...obj: Imprimivel[]) {
  objetos.forEach(objeto => objeto.paraTexto())
}
```

Agora nos certificamos que todos os objetos contém o método que queremos.

## Interfaces para métodos

Geralmente, classes abstratas são utilizadas para quando temos algum código pronto, mas também temos obrigações para implementar alguns métodos. No nosso caso anterior, não temos nenhum método, então não é necessário ter uma classe, vamos transformar em uma interface:

```ts
export interface Imprimivel {
  paraTexto (): void
}
```

E agora vamos alterar nossa classe que estendia nossa classe `Imprimivel` para que implemente a interface:

```ts
export class Negociacao implements Imprimivel {

}
```

Isso fará com que tenhamos a obrigação de implementar o método `paraTexto` mas não precisemos herdar uma classe. Porque no TS e no JS só podemos herdar de um único pai. Dessa forma liberamos o espaço da herança para classes que realmente importam. Uma vez que uma classe pode implementar quantas interfaces forem necessárias:

```ts
export class Negociacao implements Imprimivel, Igualavel, Calculavel {

}
```

### Estendendo interfaces

Uma interface pode estender outras interfaces, então, ao invés de termos uma única interface que possui um método e outra que possui outro método, vamos criar uma terceira interface que estende ambas:

```ts
export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {}
```

Agora esta interface vai ter todos os métodos de `Imprimivel` e também todos os métodos de `Igualavel`.

## Type Alias

É possível criar aliases de nomes para tipos para que não precisemos importar ou criar novas interfaces dentro do Typescrip, por exemplo:

```ts
function tokenize (token: string | number) {
  if(typeof(token) === 'string') return token.replace(/2/g,'X')
  return token.toFixed().replace(/2/g,'X')
}
```

Podemos reduzir isto com um alias para o tipo `string | number`:

```ts
type TokenType = string | number

function tokenize (token: TokenType) {
  if(typeof(token) === 'string') return token.replace(/2/g,'X')
  return token.toFixed().replace(/2/g,'X')
}
```
