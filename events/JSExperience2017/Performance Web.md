# Performance Web além do carregamento

O carregamento é um dos pontos de performance que um usuário nota em uma aplicação web.

Por exemplo, em uma SPA, a performance para o usuário está muito mais ligado na aplicação que
continua rodando do que no carregamento da página. Neste caso o carregamento não é importante, mas o
uso da aplicação como um todo.

A performance pode ser dividida em tres fatores:

- Execução
- Interação
- Animação

Com esses três pontos, também temos problemas principais:

- Main thread ocupada
- Muito layout / paint

## Main thread

O Browser, apesar de antigo, não foi inventado para ser uma aplicação multi-thread, pois não era a
intenção do browser abrir várias abas ao mesmo tempo, mas sim janelas diferentes. Então não adianta
nada termos um processador de vários núcleos se nosso browser só executa em uma única thread...

Esta thread principal é chamada de __main thread__. O grande problema disto é que todos os processos
são executados nesta thread, ou seja, tanto os processos de paint e renderização do browser quanto
os eventos disparados pela interação do usuário (e também os scripts javascript) estão rodando no
mesmo lugar. Desta forma uma interação, uma animação e uma execução de código estão competindo pelo
poder de processamento que está rodando na mesma thread de processamento.

> Toda linha de javascript trava o navegador por algum instante, a ideia não é sumir com os
> travamentos, mas sim travar o menos possível

__Como resolver o problema da thread?__

### Blocos menores

Ao invés de rodar um bloco gigante de código, quebre o código em vários blocos pequenos de
microcódigos que podem parar o browser por pedaços extremamente pequenos. É de suma importancia
evitar grandes blocos de javascript ocupando a main thread.

Podemos agendar essas execuções grandes usando `setTimeout`, `requestAnimationFrame` ou outras
funções (um exemplo mais novo é o `requestIdleCallback`, que busca por um momento livre do browser
para poder executar o código em uma janela de ociosidade).

- O `setTimeout` posterga a execução do bloco para um futuro (que pode ser imediato)
- O `requestAnimationFrame` é quase um equivalente a um `setTimeout` de 16ms, mas que executam uma
  função entre os frames de animação e paint do browser.

### Não usar a main thread

Existe uma API chamada _web workers_. Esta API é uma boa prática para poder executar código
javascript de forma concorrente, ele executa em uma thread paralela e suporta pasagem de mensagens
entre a thread principal e o worker, mas as duas threads __não compartilham o estado__, ou seja, não
é possível acessar objetos da main thread como o DOM através do worker.

1. Crie um arquivo separado

```js
new Worker('arquivo.js')
```

> Pesquise: Web Worker

### Paint / Layout concorrente

Mas existe uma outra forma de não usar a main thread, podemos utilizar a thread da GPU. Esta thread
é executada fora do browser, através do processamento da GPU (que não é o processador principal da
máquina).

Animações CSS são executadas na thread da CPU, mas essas animações estão rodando na main thread pois
o browser deve recalcular todas as posições novas do elemento da animação na tela. Então caímos no
mesmo problema anterior, porém não temos mais um javascript (podemos até ter, mas o problema não é
ele, o problema é o JS concorrendo com o paint e a animação).

Como podemos tirar o paint da main thread?

Vamos passar todo esse trabalho de cálculo e pintura do browser para a GPU. 

```css
@keyframes anima {
    to { left: 200px; width: 250px; }
}

@keyframes animaGPU {
    to { transform: translateX(200px scale(1.7); }
}
```

Veja o código acima, na primeira animação estamos utilizando animações somente do CSS, mas na
segunda estamos utilizando somente a GPU. Existem apenas duas propriedades do CSS que executam
somente na GPU em todos os browsers: O transform e o paste.

### Debugging

Podemos utilizar a aba performance do Chrome para poder ver os perfis de memória e debugar as
execuções e os processos da nossa main thread.
