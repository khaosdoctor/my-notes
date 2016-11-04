# Prototypes

## Objetos

Todos os objetos no Javascript são derivados de um outro objeto pai universal, chamado de `object`.

Todo objeto vem definido a partir de um `__proto__` que seria um protótipo de um objeto, do qual o nosso objeto deriva (ou é herdado).

Todas as propriedades e todos os métodos ficam inclusos dentro deste prototype.

### Subníveis

É possível criar objetos dentro de objetos a partir de protótipos de anteriores. Para isto temos o seguinte código:

```js
var obj = {
  name: "SON",
};

var objlvl1 = Object.create(obj);

console.log(obj);
console.log(objlvl1);
```

Repare que `obj` é um objeto simples, enquanto `objlvl1` é um objeto criado a partir do objeto original simples. quando printamos o log temos a resposta:

```
Object {name: "SON"}
              name: "SON"
              __proto__: Object
Object {}
        __proto__: Object
```

Este objeto inicial é o nosso `obj`, repare que temos a propriedade name bem setada no inicio.

```
Object {}
        __proto__: Object
          name: "SON"
          __proto__: Object
```

Repare que neste segundo objeto temos um objeto vazio inicial, e então temos um protótipo com a propriedade `name`, pois este objeto veio a partir de um outro objeto que criamos previamente.

### Herança

Isto significa que um objeto é dependente do outro e compartilha características em comum uns com os outros. Um exemplo é tentar printar a propriedade name a partir dos 3 níveis que criamos:

```js
var obj = {
  name: "SON",
};

var objlvl1 = Object.create(obj);
var objlvl2 = Object.create(objlvl1);

console.log(obj.name);
console.log(objlvl1.name);
console.log(objlvl2.name);
```

O resultado será em todos os casos:

```
SON
SON
SON
```

Pois o JS vai continuar iterando pelos prototypes até encontrar uma propriedade de valor igual.

Mas veja, se modificarmos a propriedade de um objeto específico, teremos o valor desta propriedade alterado apenas nele, e não refletido nos demais.

```js
var obj = {
  name: "SON",
};

var objlvl1 = Object.create(obj);
var objlvl2 = Object.create(objlvl1);

objlvl2.name = "World";

console.log(objlvl2.name);
console.log(obj.name);
```

Os logs ficariam, respectivamente: "World" e "SON". Isto ocorre porque a primeira propriedade que será encontrada para este objeto será o name que alteramos.

Em outras palavras, criamos uma propriedade nova, com um novo endereço, ao invés de `obj.name` ou `objlvl1.name`, criamos um `objlvl2.name`

## This

Se tivermos uma função interna a um objeto:

```js
var obj = {
  name: "SON",
  showName: function () { console.log(this.name); }
};
```

E chamarmos a nossa função:

```js
var objlvl1 = Object.create(obj);
var objlvl2 = Object.create(objlvl1);

objlvl2.name = "Lucas";

console.log(obj);
console.log(objlvl1);
console.log(objlvl2);
objlvl2.showName();
```

A linha `objlvl2.showName();` estará referenciando o `this` como sendo o objeto atual, ou seja, o objeto 2 e não ao objeto anterior.

## Classes e Objetos

Se instanciarmos uma função base desta forma:

```js
function Person() {
  this.name = "Foo McBar";
}
```

E printarmos o valor com `console.log(Person);`, teremos apenas a descrição da função no final. Porém, veja que temos uma propriedade interna da função chamada `name`, mas não conseguimos chama-la diretamente.

Podemos criar um objeto externo e instanciar uma função como uma nova instancia de um objeto, ou seja, uma classe:

```js
function Person() {
  this.name = "Foo McBar";
}

var obj = new Person();
```

Assim quando dermos `console.log(obj)` obteremos `Person {name: "Foo McBar"}`, isto significa que estamos obtendo um objeto novo que tem um construtor igual a uma função pré definida. Como informado no resto do print:

```json
Person {name: "Foo McBar"}
  name: "Foo McBar"
  __proto__: Object //Protótipo do OBJETO
    constructor: Person() //construtor a partir da função
    arguments: null
    caller: null
    length: 0 //tamanho
    name: "Person" //propriedades
    prototype: Object //prototipo do objeto interno
    __proto__: function() //protótipo da função
```

### Reflexão

Podemos criar novos métodos e novas propriedades em uma função/classe a partir dos prototypes:

```js
function Person() {
  this.name = "Foo McBar";
}

Person.prototype.email = "foo@domain.com";
```

Assim estamos definindo uma outra propriedade em tempo de execução:

Podemos acessar os dados apenas com: `obj.email`

### Construtores

Podemos simplesmente criar um construtor em uma função, que é basicamente um parâmetro inicial:

```js
function Person(name) {
  this.name = name;
}
```

E criamos normalmente: `var obj = new Person("Foo McBar");`.

Podemos definir também funções:

```js
Person.prototype.getName = function() {
  return this.name;
};
```

E então chamamos `console.log(obj.getName());`.

Desta forma é possível criar N objetos diferentes usando a mesma estrutura e o mesmo código.