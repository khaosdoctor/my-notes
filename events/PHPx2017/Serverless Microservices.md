# Serverless Microservices

## Microservices

Microserviços são o inverso da *approach* monolítica, ele separa todas as aplicações e todas as funcionalidades em serviços individuais.

**Aplicações monolíticas**

- Um módulo faz várias coisas
- Escalabilidade é um problema
- Agilidade operacional é complicada na hora do deploy
- É limitada a uma única tecnologia
- Gerencia de dados centralizada

Além disso fica difícil de entender e difícil de modificar, o que significa menos mudanças e menos features na plataforma, ou seja, o produto para de ser desenvolvido ativamente.

Também temos o problema de ter de publicar a aplicação toda para cada recurso novo que for adicionado.

**Microservices**

- Cada componente é independente
  - Assim como os times, cada time cuida de um serviço especifico, então cada time pode trabalhar separadamente sem nenhum tipo de interação
- Não é ligado a uma única tecnologia
- Um banco de dados por serviço
- Mais fácil de escalar e publicar
- Comunicação através de API's e MQ's
- Tolerancia a falhas
- Podem poupar dinheiro, a longo prazo…

Os grandes problemas de lidar com microservices é o fato de que temos que cuidar de diversas partes diferentes, cada time tem uma carga de trabalho maior, pois é necessário comunicar os serviços de forma 100% perfeita, uma vez que para notificar um serviço de que outro dado ou serviço mudou, é necessário que cada serviço notifique os serviços pertinentes de que os dados estão sendo alterados.

> Considerar usar um *API Gateway* para centralizar todo o tráfego em um único lugar.

## Serverless Deployment

Nos isola da parte que não nos diz respeito (infraestrutura), o modo que podemos realizar isto é utilizando o **AWS Lambda**

O Lambda roda códigos a partir de eventos:

- S3
- RDS
- CloudWatch
- SQS
- SES
- CloudTrail

O Lambda é um tipo de serviço que existe em um "limbo de servidores" pois eles são publicados automaticamente, em diversas regiões e em diversas instancias, são feitos especialmente para **pequenos workloads** e roda geralmente em milissegundos.

É importante que o CloudWatch e o CloudTrail estejam ativados para que as métricas da sua função lambda sejam enviadas para seus servidores de monitoramento.

## AWS API Gateway

É um serviço completo de monitoramento e gerencia de serviços ReSTful.

- Gerencia fácil de apis
- Expões endpoints em HTTP ou funções lambda
- Gera SDK baseado nos seus recursos
- Gera documentação dinamicamente

Este serviço, tanto quanto o lambda, são pagos por execuções, de forma que podem ser um *drawback* na hora de escolher o serviço.

