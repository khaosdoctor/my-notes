# PHP Distribuído, Fault-tolerant e assíncrono

> Microserviços vs Monolito

## Microserviços

Vantagens:

- Não depende de tecnologia
- Isolamento de falhas
- Publicação parcial

Desvantagens:

- Desenvolvimento trabalhoso
- Complexidade Operacional
- Orquestração de serviços
- Chamadas remotas lentas

## O melhor dos dois mundos

A maioria das pessoas pensa que não existe nada entre os microserviços e as unidades monolíticas, mas o fato é que temos vários modelos no meio.

### Mono Repo Microservices

Podemos colocar todos os nossos microserviços em um único repositório, isso mata o problema da complexidade de desenvolvimento e manutenção, mas continuamos tendo as mesmas desvantagens que tínhamos antes.

## Arquitetura distribuida

> Verificar o Upswarm

A ideia dos microserviços e do UpSwarm é que você pode configurar cada serviço individualmente e todos os estados, crashes e tudo mais é tratado de forma separada. Se você levantar outro servidor, o UpSwarm vai poder se comunicar com este outro servidor e balancear as requisições (o framework usa o ZeroMQ, que é um modelo de MessageQueue sem servidor central que atua como um *message broker*, desta forma não temos um ponto de falha no meio dos servidores).

O problema é que a facilidade de desenvolvimento é o preço a se pagar para ter um microserviço rodando com o UpSwarm, mas em compensação perdemos as desvantagens de ter que nos preocupar com orquestração de serviços e etc, pois o framework vai tratar disso para o desenvolvedor.