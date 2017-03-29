# Elastic: ELK stack

> Analise de logs com o Stack, Elastic, Logstash e Kibana

O Elastic é uma plataforma de busca *Full Text* com multifaces (termo, histograma, intervalo, etc), com API's de alta disponibilidade.

A facilidade do Elastic para analises de *big data* é o principal meio de negócio da empresa.

Após um tempo, outros produtos se juntaram ao Stack, complementando o Elastic Search.

## Beats

> Lightweight Data Shipper

Ferramenta para retirar dados de um servidor, ou seja, extrair informação de um servidor ou de um cliente. Ele possui 5 tipos de suporte:

- FileBeat: Coleta de arquivos de log
- WinlogBeat: Coleta de logs do windows
- HeartBeat: Coleta pacotes de tempo em tempo
- MetricBeat: Coleta métricas como CPU, disco e etc
- PacketBeat: Coleta pacotes de rede

Isto é tudo implementado sobre uma biblioteca em GOLang chamada *libbeat* que pode ser estendida.

O objetivo é enviar estes arquivos de dados e logs para algumas saídas, como Redis, Kafka e etc

## LogStash

> Pipeline de processamento de dados

Recebe a informação do beats, arquivos, kafka ou qualquer outros dos mais de 50 plugins de entrada. Depois pode processar essa informação com mais de 50 plugins de analise e processamento e depois enviar estes dados para outros mais de 50 outputs.

## Kibana

É o componente gráfico disso tudo, montam gráficos para melhor visualização em tempo real e etc.

## Arquiteturas

### Simples

Atualmente é possível utilizar apenas o Beats, ElasticSearch e o Kibana como um Stack simples:

```
Beats -> ElasticSearch <- Kibana
```

Com as versões mais novas existem alguns plugins internos no ElasticSearch que visam tratar os dados crus que vem do beats (que seria o trabalho do LogStash).

### Completa

A arquitetura completa seria:

```
Beats ---> LogStash ----> ElasticSearch <---- Kibana
```

Utilizando o LogStash para tratar os dados.

## Resiliencia

O problema com este stack é que se algum serviço como, o LogStash ou o ElasticSearch, cair, então todo o stack vai parar até que o sistema volte. Para isso é bem importante colocar um MessageBroker no meio, como o Redis ou o Kafka.

```
Beats ---> Redis/Kafka ---> LogStash ---> ElasticSearch <--- Kibana
```

