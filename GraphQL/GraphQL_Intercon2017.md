# GraphQL

> Palestra sobre GraphQL no evento Intercon iMasters 2017

## O que é GraphQL?

GraphQL é um padrão desenvolvido sobre o padrão ReST pensando nos modelos de negócio _atuais_. Isso acontece porque, durante o desenvolvimento da sua
tese de PhD, Roy Fielding (criador do ReST) desenvolveu um padrão de projeto voltado para a realidade da época (dos anos 2000), porém esse mesmo
protocolo não foi pensado para os problemas atuais e para o mundo atual.

Uma API é uma parte integrante do produto, de forma que ela também se desenvolve com o resto do produto e não é estática. As maiores motivações para o
desenvolvimento do GraphQL foram:

- Versionamento da aplicação: Hoje é muito complicado versionar uma API desenvolvida em ReST, temos que adicionar algumas técnicas (como adicionar um
  `v1` na URL) para podermos diferenciar as API's entre clientes.
- Muitos endpoints para resolver uma coisa específica: Precisamos bater em diversos locais e em diversas API's para podermos obter todas as
  informações para a exibição final para o usuário.
- Endpoints expões mais dados do que o necessário: Por request, uma API expõe muito mais informação do que provavelmente um cliente precisa para uma
  chamada. O ideal é que pudéssemos consumir tudo que vem na resposta da API.

### Conceitos chave

O GraphQL é uma Spec, não uma lib, ele está mais para um padrão de desenvolvimento que mostra como podemos estruturar uma API utilizando o protocolo
HTTP. As ideias chaves são:

- Um único endpoint: Uma API GraphQL só possui um endpoint
- Contratos bem definidos: Uma API ReST geralmente opera sem um Schema bem definido, de forma que é possível que o cliente e o servidor podem tratar
  os dados de forma diferente. Em uma API GraphQL tanto o servidor quando o cliente devem respeitar o Schema.
- Queries concisas: Uma API GraphQL só traz o que é __estritamente__ necessário e o que foi __exatamente__ pedido pelo cliente, nada mais. Desta forma
  podemos resolver o problema do _overfetching_ e do _underfetching_ onde temos que, respectivamente, receber mais informação do que o necessário e
  chamar várias API's em diversos endpoints para obter o resultado que queremos.

## Exemplos

Vamos utilizar como exemplo o endpoint `api.graphloc.com` que é uma API de exemplo para geolocalização. Todas as API's possuem uma chamada de
introspecção, que mostram seu próprio schema, se utilizarmos esta chamada vamos obter como resposta um JSON com todo o schema da API.

Podemos obter as respostas de uma API com uma query como:

```js
{
    getLocation(ip: "172.156.43.23") {
        country {
            names {
                en
            }
        }
        geoname_id
        iso_code
    }
    location {
        latitude
        longitude
    }
}
```

Isso significa que estamos buscando a função `getLocation` com o parâmetro `ip` setado, e precisamos de uma resposta que contenha os tipos `country` e
`location`, desses tipos queremos algumas coisas específicas, por exemplo, do `country` queremos o parâmetro `names` em inglês, além disso queremos o
tipo `geoname_id` e `iso_code` da forma que eles venham, de `location` queremos apenas a `latitude` e `longitude`.

Isto mostra que podemos ter apenas uma consulta dinâmica que pode ser modificada de acordo com os dados que queremos obter.

- Todos os tipos retornados e toda a hierarquia são espelhos do Schema
- Todos os tipos de dados para qualquer tipo de query ou mutations precisam ser definidos em variáveis
- Você pode adicionar ou remover variáveis

### Chamadas

Em uma chamada ReST, temos diversos verbos HTTP que podem ser chamados, por exemplo, se queremos __ler__ algum dado, usamos `GET`, mas se quisermos
deletar podemos usar `DELETE`. Quando falamos sobre GraphQL, temos apenas `POST`, o que muda é a intenção do _client_, essa intenção pode ser definida
como uma `QUERY`, que é uma consulta que não altera um estado, e uma `MUTATION`, que é o oposto, é algo que modifica o estado de uma aplicação, seja
ela para adicionar, editar ou remover um objeto.

## Problemas em relação a licenciamento

Houveram muitos problemas em relação à licença do uso dos projetos como as patentes do React e GraphQL (utilizando as licenças BSD3). Depois de muita
atenção na mídia, o Facebook afinal acabou modificando as licenças dos seus projetos para um modelo mais aberto. (Ler noticias sobre isso no Medium).

