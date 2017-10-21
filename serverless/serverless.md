# Arquitetura Serverless

- [Serverless.com](https://serverless.com)

Uma arquitetura Serverless refere-se a uma aplicação que dependem muito de serviços externos como Back-end as a Service (BaaS).

- Funções são a unidade básica de escalabilidade
- Sem máquinas, VM's ou containers
- Não depende de nenhum armazenamento externo

As vantagens das aplicações serverless é que elas podem somente existir enquanto estão sendo executadas, ou seja, se elas não forem executadas, as
funções não vão fazer nada e não vão cobrar.

## Command Pattern

O padrão de projeto chamado Command é muito utilizado para este tipo de arquitetura, este padrão diz que podemos ter uma única função que é um ponto
de entrada que é um orquestrador, e esta função (chamada de `dispatcher`) é a função que vai jogar a responsabilidade para todas as demais.

Dentro deste padrão, temos diversas formas de utilizar as funções, podemos utilizar o recebimento de dados utilizando um gatilho de arquivos, como o
S3, ou então podemos também enviar arquivos via filas de messageria como SQS e Kinesis.
