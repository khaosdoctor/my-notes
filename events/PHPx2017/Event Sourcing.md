# Event Sourcing

Geralmente, uma aplicação segue uma sequencia de estados, mas o próximo estado não sabe o que aconteceu no estado anterior.

A proposta do Event Sourcing é propor que a aplicação deve ser uma série de eventos, que passam de um lado para o outro. Desta forma todas as aplicações, todos os estados da sua aplicação, vão ser logados

> Event Sourcing maps: Um brainstorming que define tudo que pode acontecer na sua aplicação inclusive eventos que não podem ser previstos (em uma loja, a televisão caiu da prateleira)
>
> Veja: CQRS

Desta forma temos que cada evento segue uma sequencia lógica de passos e é possível saber o que acontece antes ou depois.

O EventSourcing é baseado em uma classe que recebe uma série de parâmetros, o que é chamado de *AggregateRoot* é a entidade única que recebe um stack de eventos, ou seja, temos uma classe gigante que será chamada sempre que um evento ocorrer e ela **não pode ser alterada**, desta forma todas as propriedades são imutáveis e atômicas.

>  *Quem chama o aggregate e interage com os eventos?*

Neste caso a aplicação chama a sequencia de funções.

No geral é possível iterar pela sequencia de eventos e por todos os estados que geraram esses dados.

**No geral é possível criar um eventloop igual a Node.js**

