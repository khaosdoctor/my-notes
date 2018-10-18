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