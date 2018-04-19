# Como o Javascript funciona

@viniciuskneves (twitter, gh, etc)

## Engine

O V8 é a principal engine do JS.

Dividido em dois pedaços, o Memory Heap (gerencia memória) e o Call Stack (que sabe aonde nosso código está)

### Memory Heap

1. A memória é alocada, no Javascript é feito de forma automática (diferente do C, com os `malloc`)
2. Depois de alocada, a memória é utilizada no código
3. Por fim a memória deve ser liberada (no JS é automático, no C tinhamos o `free`)

O passo 3 é um passo crítico, pois se você não desalocar a memória você terá um overflow e seu computador ficará inutilizável.

#### Garbage Collector

Gerencia se quando a memória deve ser desalocada.

```js
var obj1 = { valor: 1 }

var obj2 = obj1

obj1 = 'Hello'
obj2 = 'World'
```

Quando desalocamos o Objeto 2 e alocamos diretamente para a String, perdemos a referencia do objeto 1 e ele é removido da memória

Quando temos referencias cíclicas (quando um objeto referencia uma outra propriedade do outro objeto), utilizamos algorítmos como o _mark and sweep_
que estão implementados no garbage collector, ele basicamente verifica quais objetos estão acessíveis no seu escopo e os que não estão são removidos

### Memory Leak

Principais causas:

- Variáveis globais: GC não consegue remover ela pelo M&S
- Apagar elementos do DOM (quando uma variável referencia um elemento, mas ele é removido da página)
- Closures (uma função dentro da outra com acesso acesso ao escopo da função anterior), quando as variáveis tem acesso ao escopo anterior e o GC não
  pode limpar

### Call Stack

O Call Stack só identifica chamadas de funções. O comando `return` basicamente diz para o Call Stack fazer um shift da pilha e retornar o valor para o
último bloco da Stack.

Quando executamos um código, o Javascript usa o Call Stack para saber em qual código estamos executando

O problema mais clássico com isso é quando usamos uma função recursiva sem parada. Criando o famoso __Stack Overflow__.

- Tail call optimization: Quando o retorno de uma função seja a chamada para outra função removemos a função atual do topo da pilha. Desta forma
  removemos funçõs desnecessárias da pilha.

## Runtime

Combinação da engine (Memory Heap + Call Stack), com as APIs (Browser/Node) e as Queues e EventLoop.

> O Engine utiliza as APIs para gerar filas de execução para o Eventloop.

O Eventloop basicamente se faz a pergunta: "Existe alguém no callStack sendo executado no momento?", se sim, então ele vai esperar para executar o
próximo callback, mas se o call stack estiver vazio então o próximo callback será executado.

O grande problema de travamento de pilha, é que se você coloca código síncrono, ele será executado somente depois da execução da fila principal, então
todo o código síncrono trava o _EventLoop_.

> Um exemplo para isso é utilizar `setImmediate` para criar conteúdo assíncrono e colocar o callback direto na fila

> `process.nextTick` faz com que o próximo da fila seja o primeiro

Se a gente floodar a fila, criando muitos callbacks, iremos travar a execução principal.

### Callbacks e promises

Ambos usam filas diferentes. A Promise utiliza a _Job Queue_, enquanto os callbacks são colocados na _CallBack Queue_, e a Job queue __sempre__ tem
preferencia para a execução, então se você utilizar somente Promises os callbacks nunca serão executados.

Quando colocamos uma Promise e utilizamos apenas o `resolve`, isto diz que a Promise está pronta mas ele não irá enfileirar até o próximo `then`,
então, se você colocar um `promise.then` dentro de outra Promise, seja ela depois ou antes do `resolve`, este callback do Then será colocado antes do
`resolve`.

