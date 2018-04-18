# Istio Service Mesh

[TOC]

## Info

- Twitter: @meteatamel
- Palestra: https://drive.google.com/file/d/1lbLWTIpQp8h6mzFsKlEq96aWgad2KyT-/view

## The need

Containers não são os suficientes, precisamos orquestrar com Kubernetes, mas até o Kubernetes não é o suficiente. Precisamos de logs, métricas, tracing e muitas coisas que o Kubernetes não provê.

## What is

*Istio*, é uma plataforma de gerenciamento de microsserviços, significa "Velas" em grego. Os principais objetivos do Istio é ter um wrapper em volta de uma série de ferramentas para que estas ferramentas possam ser desacopladas em favor de um framework de alto nível

O Istio tem:

- Metricas
- Logs
- Traces
- Visualização de dependencias
- Identificação e segurança
- Gerenciamento de trafego
- Gerenciamento de políticas

Quando instalamos o Istio no Kubernetes (ele pode ser utilizado com outras plataformas como o Mesos), ele gera um Ingress na frente de nossos serviços, e também criamos proxies que rodam **junto com os containers do pod**, com estes pods. Desta forma é possível que ele gerencie tudo de uma vez.

> Um detalhe importante é que, depois de instalar no cluster, nenhum serviço externo poderá ser chamado a não ser que exista uma regra no Ingress

### Instalando o Istio

Baixar o istio de https://istio.io/, você terá uma pasta Istio que tem diversas configurações. Basicamente o que precisamos é instalar o `istio-auth.yml`

## Building Blocks

A arquitetura do Istio é basicamente dividida em tres partes:

- Pilot: Descoberta e serviços de rede, configuração de proxies, abstração de todos os serviços (aonde as coisas são configuradas)
- Mixer: Telemetria
- Istio-Auth: TLS e certificados

Estes tres componentes são ajudantes do chamado **envoy**, um proxy que veio da *Lift*. Ele é um proxy de alta performance que tem várias coisas (ler mais em https://www.envoyproxy.io/)

## Add ons

- Prometheus: Query de métricas
- Grafana: Visualização de métricas
- Zipkin: Trace de HTTP

## Traffic Management

- Podemos fazer testes A/B com rotas dinamicas
- Bloqueios
- etc

> Uma coisa legal é que podemos filtrar por serviços, headers e etc. Assim podemos fazer requests para servidores específicos se o client tem algum tipo de header específico e etc.

```bash
istioctl create -f /samples/bookinfo/kube/route-rule-all-v1.yaml
```

Por exemplo este código vai forçar todos os microsserviços a entrar na mesma rota (o `samples` vem junto com o Istio).

## Failure Recovery

- Checagem de timeouts
- HTTP Error Codes
- Fault Injection (identificação de falhas)
