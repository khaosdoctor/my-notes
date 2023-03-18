# Type-level programming com TypeScript

> Programação voltada a tipos do TS usando tipos avançados

## Sumário



## O que é type-level programming

Quando estamos falando de type-level programming, a ideia é que estamos escrevendo código que não tem a ver com o que vamos retornar para o usuário, em essência, é escrever códigos que vão rodar somente no compilador de tipos do TypeScript. Poucos sabem, mas o TS é, na verdade, uma linguagem [(quase) Turing-completa](https://github.com/microsoft/TypeScript/issues/14833), ou seja, podemos programar algoritmos de N complexidades usando somente os constructos dessa linguagem.

Um exemplo é o uso de generics:

```ts
function foo<I,O>(a: I, b: O): TypeLevel<I,O> {
  return typeLevel(a,b)
}

type TypeLevel<A, B> = //...
```

Quando estamos falando desse tipo de função, estamos executando algo que não vai ser mostrado aos usuários, na verdade isso nem vai existir no código final.

## Linguagem de tipos

A linguagem de tipos do TS é mínima, e focada em um uso puramente funcional, ou seja, tudo o que fazemos vai ser através de composições de funções e não manipulação de objetos. A programação funcional tem esse nome porque a menor unidade de programação são funções, enquanto no TS não temos funções, mas sim **tipos genéricos**. Esses tipos são como funções porque recebem um ou mais parâmetros chamados **type parameters** e retornam uma única saída.

```ts
//   nome      args   output
type AFunction<I,O> = [I,O]

//    nome        args      output
const aFunction = (i, o) => [i, o]
```

Mesmo que seja uma linguagem relativamente simples (afinal é só para tipar o seu código), ainda podemos fazer muitas coisas como:

- Branches de código com estruturas de controle através de ternários
- Declaração de variáveis
- Funções como acabamos de ver
- Loops através de recursão
- Checagem de igualdade

E, por simples, eu quero dizer que existem coisas que não podemos fazer, o que não é necessariamente algo ruim já que estamos falando de uma linguagem de tipos e não uma linguagem de programação que vamos escrever o nosso próximo framework:

- Mutação de estado: Não dá para fazer uma re-atribuição de variáveis, todos os valores no TS são **imutáveis**
- I/O: Como é de se esperar, não temos entrada e saída... Afinal ele **CHECA TIPOS**
- HoF (High-Order Functions): Não temos nenhum tipo de HoF no Type Checker do TS, por exemplo como fazemos com `.map(fn)`

Alguns exemplos do que podemos fazer com esses tipos de funções:

1. A função `map` do JS parte de um array, recebe uma função que recebe um elemento do array por vez e modifica esse elemento e retorna um array de outro tipo:

```ts
function map<In, Out>(array: In[], fn: (value: In) => Out): Out[] {
  return array.map(fn);
}
```

2. Funções de identidade recebem e retornam o mesmo valor:

```ts
function identity<T>(a: T): T {
  return a
}
```

