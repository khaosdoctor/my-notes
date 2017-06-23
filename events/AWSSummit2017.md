# AWS Summit 2017

<!-- TOC -->

- [AWS Summit 2017](#aws-summit-2017)
  - [Serverless com AWS](#serverless-com-aws)
    - [Modelos de configuração](#modelos-de-configuração)
    - [Fontes de dados](#fontes-de-dados)
    - [Entradas de dados (endpoints)](#entradas-de-dados-endpoints)
    - [Repositórios de configuração](#repositórios-de-configuração)
    - [Orquestração de API's Serverless](#orquestração-de-apis-serverless)
  - [Deep Dive com microserviços e Docker](#deep-dive-com-microserviços-e-docker)
    - [Organização](#organização)
    - [Distribuição](#distribuição)
    - [Twelve Factor](#twelve-factor)
  - [Melhorando o processo de desenvolvimento com ferramentas de auxilio AWS](#melhorando-o-processo-de-desenvolvimento-com-ferramentas-de-auxilio-aws)
    - [AWS CodeBuild](#aws-codebuild)
    - [AWS CodeDeploy](#aws-codedeploy)
    - [AWS CodePipeline](#aws-codepipeline)

<!-- /TOC -->

## Serverless com AWS

Os serviços serverless da AWS incluem vários modelos. O mais utilizado é o Lambda, sistema de
execução de códigos sob demanda.

O AWS Lambda utiliza um sistema de eventos para executar código em resposta a eles. É possível
incluir integrações com qualquer serviço da AWS, transformando uma função lambda em algo muito mais
complexo do que somente funções.

As vantagens da AWS lambda são muitas, mas em suma:

- Não existem servidores para serem configurados
- Escalam com a necessidade
- Limites quase infinitos
- Free tier ilimitado (utiliza 1MM de requisições e 400.000Gb de computação)
- Paga apenas a execução da função, contado em lotes de 100ms

Funciona com as linguagens C#, Java, Python, Node.js.

Não é necessário realizar nenhum tipo de alteração no código, o mesmo funcionaria normalmente sem
nenhuma alteração.

### Modelos de configuração

O Lambda possui um diretório virtual `/tmp` com 500mb que permite que downloads sejam feitos para
armazenar arquivos locais, _threads_, _sockets_, processos e outros SDK's estão disponíveis também.

Ele é _stateless_, ou seja, todas as persistências são feitas externamente, como o DynamoDB, RDS,
Aurora ou qualquer outro storage da AWS.

O sistema de monitoramento do Lambda armazena as chamadas e as durações da mesma utilizando o
CloudWatch.

### Fontes de dados

> O que pode gerar um evento?

- Amazon S3: Envio, remoção ou alteração de arquivos
- DynamoDB: Para cada CRUD é possível executar um evento
- Kynesis: Lambdas plugados nos streams de dados podem executar chamadas em tempo real

### Entradas de dados (endpoints)

> Por onde entram os dados

- API Gateway
- IoT
- Step Functions
- Alexa (Echo dots)

### Repositórios de configuração

- CloudFormation: Orquestrador de configurações de infraestrutura da AWS permite que o lambda possa
  executar deploys de infra
- Repositórios de versionamento e etc

### Orquestração de API's Serverless

Sempre que precisamos orquestrar algum tipo de função ou api no modelo serverless, por exemplo, para
podermos utilizar várias funções Lambda de forma contínua. Para isso temos o __Step Functions__. Com
ele é possível montar workflows e pipelines de execução, abstraindo toda a funcionalidade de
chamadas entre funções.

Por exemplo, podemos diferenciar os branches do código através de um simples json que define nosso
workflow, assim podemos criar várias funções lambda individuais sem nos preocupar qual é o passo
seguinte, orquestrando toda a funcionalidade de chamadas através da própria interface.

Step functions conseguem gerenciar todas as suas chamadas e montar um mapa de execução de forma que
é possível criar uma topologia de para onde o dado está indo e de onde ele vem. Também o número de
sucessos e erros, assim quando temos algum erro no nosso pipeline podemos saber exatamente em qual
passo o mesmo foi capturado.

## Deep Dive com microserviços e Docker

Microserviços é a separação das preocupações através de modularidade ou encapsulamento, desta forma
conseguimos uma escalabilidade horizontal muito facilmente, assim também conseguimos estabelecier
hardwares semelhantes de forma melhor arquitetada.

Atualmente é difícil utilizar esse tipo de arquitetura em um modelo manual, em infraestrutura _bare
metal_. Isto porque temos algumas propriedades em microserviços que os tornam um pouco peculiares:

- Sua arquitetura é decentralizada
- Poliglota: Possível ser escrito em várias linguagens, mas se comunicam com uma linguagem comum
- Independente: Nenhum microserviço pode conter dependências com outro microserviço, por isso é bom
  que todos tenham a mesma linguagem de comunicação (o mais utilizado é o REST)

Em _mindset_ de funcionários, temos como atribuir um microserviço para uma equipe ser a "dona" de
forma que a organização da empresa é muito mais fácil.

### Organização

Por não possuirem uma organização concreta, os microservices se assemelham a uma caixa preta, pois
terão apenas um ponto de entrada e um contrato de comunicação comum. A orquestração de serviços é um
dos maiores desafios atuais, por isso a Netflix criou dois orquestradores:

- [Conductor](https://github.com/netflix/conductor) -> Orquestração de tarefas (Serviços que rodam
  sob demanda)
- [Hystrix](https://github.com/netflix/hystrix) -> Orquestração de workflows persistentes (serviços
  que ficam sempre online)

Estas duas tarefas são resolvidas pelo AWS ECS, tanto as execuções em lotes (tarefas) quanto as
execuções persistentes, suprimindo o Hystrix e o Conductor.

O AWS ECS funciona basicamente abaixo de um ALB (Application Load Balancer), este ALB é responsável
por estar na camada 7 (aplicação), ou seja, ele roda na nossa URL, de forma que ele pode rotear
todas as chamadas a uma URL para determinado conjunto de containers.

> O ALB funciona como um proxy reverso, parseando as URL's e mandando para o microserviço
> correspondente

### Distribuição

O __Espalhamento entre AZ's__ é o correspondente à poder espalhar as aplicações e os serviços entre as
máquinas que possuem a menor quantidade possível destes serviços rodando. Desta forma vamos espalhar
nossos serviços sempre por todas as zonas de disponibilidade mas sempre utilizando a máquina que
possui a menor quantidade deles.

A __Distribuição por tipo__ permite que o ECS faça o deploy de serviços em instancias de um tipo
específico ou então que possuem um determinado tipo de tag, ou seja, podemos dividir os serviços por
labels ou tags.

A __Distribuição por cluster__ define que os serviços deverão ser agrupados (binpacked) em uma única
instancia enquanto houver um espaço definido pelo usuário (pode ser a memória, cpu, por exemplo) ou
então separados (spreaded) em diversas categorias que podem ser definidas pelo usuário (por exemplo,
uma AZ). No primeiro caso vamos ter o máximo possível do mesmo tipo em uma máquina até não houver
mais espaço, no segundo, vamos ter o máximo possível de serviços distribuídos no máximo possível da
especificação do usuário.

Por fim, o __Espalhamento Distinto__ vai ter _apenas um serviço de cada tipo por máquina_, de forma
que, se tivermos 2 instancias vazias, uma delas pode receber um serviço A, a outra um serviço B, mas
se tivermos outro serviço A, o ECS vai criar uma nova máquina, pois só é possível ter um de cada
tipo em cada instância.

### Twelve Factor

Prove uma definicão de aplicativo que mantem segurança e qualidade em 12 passos:

- Base de código: Deve possuir um sistema de versão
- Dependencias: Todas as dependências (envs) não podem estar no código
- Configuração: Configuração deve ser abstraída
- Serviço de backup: Deve haver backups
- Build, release, run: Deploy fácil e simples
- Processos: Devem existir processos de governança
- Mapeamento de portas: As portas devem poder ser mapeadas de forma simples
- Concorrencia: Devem poder ser concorrentes
- Descartabilidade: Todo o serviço é descartável pra ser escalável
- Paridade (dev/prod)
- Logs: Gestão de logs externos
- Processos admin

## Melhorando o processo de desenvolvimento com ferramentas de auxilio AWS

Existem 3 tipos de processos de release:

- Integração contínua: Abrange o fonte e o build de um projeto
- Entrega Contínua: Abrange todo o processo, mas há um responsável por dar o Ok final para a build
- Deploy contínuo: Assim que há commit no master então já passa por todo o pipeline e faz o deploy

### AWS CodeBuild

Serviço gerenciado para compilar, testar e empacotar software. Processa builds em paralelo e escala
automaticamente, fazendo builds de imagens docker.

O code build é uma ferramenta de CI, criando uma estrutura para rodar builds e testes necessários.

### AWS CodeDeploy

Automatiza o deploy para qualquer servidor, mesmo que on-premises. Instalação e atualização de
aplicações sem downtime e com rollback automático em caso de falhas.

Com ele é possível fazer um deploy para qualquer tecnologia em qualquer OS. Tanto o CodeDeploy
quanto o CodeBuild utilizam manifestos em yaml para poder definir declarativamente o que deve ser
feito.

### AWS CodePipeline

É uma ferramenta que serve para visibilidade e orquestração, sozinha esta ferramenta não faz muita
coisa. É necessário que seja integrada com outras ferramentas como o Deploy ou o Build, ou ambos.

O pipeline tem diversas integrações com ferramentas que não são da AWS, de forma que é possível
executar testes e2e e de UI (que não existem na AWS) para cobrir todo o modelo de testes.

Também é possível criar a aprovação manual, assim como um _gatekeeper_ faria no final da entrega
contínua.
