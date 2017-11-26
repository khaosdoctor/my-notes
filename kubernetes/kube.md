# Kubernetes

> Plataforma de desenvolvimento e execução de aplicações baseada em containers

<!-- TOC -->

- [Kubernetes](#kubernetes)
  - [O que é o Kubernetes](#o-que-é-o-kubernetes)
  - [Kubernetes Components](#kubernetes-components)
    - [Master Components](#master-components)
      - [Kube-apiserver](#kube-apiserver)
      - [etcd](#etcd)
      - [Kube-controller-manager](#kube-controller-manager)
      - [Cloud-controller-manager](#cloud-controller-manager)
      - [Kube-scheduler](#kube-scheduler)
      - [Addons](#addons)
        - [DNS](#dns)
        - [Interface gráfica](#interface-gráfica)
    - [Node Components](#node-components)
      - [Kubelet](#kubelet)
      - [Kube-proxy](#kube-proxy)
  - [Trabalhando com objetos do kubernetes](#trabalhando-com-objetos-do-kubernetes)

<!-- /TOC -->

## O que é o Kubernetes

O Kubernetes é uma plataforma desenvolvida pela Google para facilitar o desenvolvimento das
chamadas _container-cetered infrastructure_. Onde o foco principal gira em manter uma série
de aplicações em containeres Docker rodando dentro de um ambiente único (uma VM)
controlados por componentes master.

A vantagem do kubernetes é que você pode utilizar todas as vantagens dos containeres
Docker com API's e microserviços.

## Kubernetes Components

> Componentes necessários para manter um cluster Kubernetes funcionando

### Master Components

Os componentes master são os que provém um plano de controle para todo o cluster de
containers. Eles realizam as decisões globais (como agendamento) e também são responsáveis
por responder a eventos que acontecem em cada cluster como, por exemplo, iniciar um novo pod
quando as réplicas do mesmo estão abaixo do mínimo definido nos _replication controllers_.

#### Kube-apiserver

Expõe as funcionalidades da API do kubernetes. Toda a plataforma é construída sobre API's de
forma que é possível estender ou utilizar melhor as funcionalidades através de SDK's.

Este componente é desenhado para ser escalado horizontalmente, de forma que é possível
replicá-lo criando várias cópias do mesmo serviço.

#### etcd

É o gerenciador de armazenamento dos clusters. Todos os dados dos clusters ficam armazenados
neste componente. De forma que é sempre bom manter um backup deste componente.

#### Kube-controller-manager

Roda os controladores, que são as _threads_ que rodam em background garantindo a execução das
tarefas de rotina do cluster. Todos os controladores são executados em processos
separados, mas, para facilitar e diminuis a complexidade, todos são compilados em um único
binário.

São parte destes controladores:

- __Node Controller__: Responsável por perceber e responder a quedas de Nodes
- __Replication Controller__: Responsável por manter o número correto de pods para cada
  controle de replicação do sistema
- __Endpoints Controller__: Popula os objetos de endpoint (Serviços conjuntos e Pods)
- __Service Account & Token Controllers__: Criam as contas e processos de API para novos
  namespaces

#### Cloud-controller-manager

Este componente roda os controladores que são responsáveis por interagir com os serviços
cloud de cada provedora.

Cada controlador cloud roda os loops específicos de cada provedor cloud apenas.
Você precisa desabilitar este controlador quando você está utilizando controladores
externos. Faça isso setando `--cloud-provider` para `external` quando iniciar o
`kube-controller-manager`.

#### Kube-scheduler

Fica continuamente observando pela criação de novos pods que ainda não tem nenhum _node_
atribuído e atribui um para ele.

#### Addons

_Addons_ são pods e serviços que implementam features de cluster. Os pods podem ser
gerenciados por _Deployments_, controladores de replicação e etc.

##### DNS

DNS é um tipo de _addon_. Enquanto todos os outros addons não são explicitamente
obrigatórios, o DNS __deve__ estar presente em todos os clusters do kubernetes devem ter o
cluster DNS.

O `cluster DNS` é um servidor DNS que, juntamente com outros servidores DNS no seu
ambiente, servem os registros de nome para os serviços expostos do kubernetes.

##### Interface gráfica

A chamada `kube-ui` provê uma funcionalidade de leitura do estado do cluster.

### Node Components

Os Node components rodam em todos os Nós (Nodes) do cluster, mantendo os pods em
execução e gerenciando o runtime do kubernetes.

#### Kubelet

O agente primário de cada nó é chamado de Kubelet. Ele observa e busca por pods que
foram atribuídos ao seu nó (pelo apiserver ou pelo arquivo de configuração) e então:

- Monta os volumes de dados requeridos pelo pod
- Baixa as chaves secretas do pod
- Executa os containers do pod via Docker
- Periodicamente executa uma checagem de _liveness_, que é uma checagem para saber se o
  pod está em pé
- Reporta o status do pod para o resto do sistema, criando um "espelho" se necessário
- Reporta o status do nó para o resto do sistema

#### Kube-proxy

Permite que o Kubernetes abstraia regras de rede e port forwarding de forma transparente.

## Trabalhando com objetos do kubernetes

> Uma explicação báse de como os objetos do Kubernetes são representados na API, e como
> podemos exprimí-los na representação `yaml`

_Kubernetes Objects_ são entidades persistentes no sistema do Kubernetes. São utilizadas
para representar o estado do cluster. Especificamente, eles podem descrever:

- Quais aplicações estão rodando (e em quais nós)
- Os recursos disponíveis para essas aplicações
- As políticas sobre as quais estas aplicações se comportam, como políticas de restart,
  upgrades e tolerância a erros

Um objeto do kubernetes é um "registro de intenção", uma vez que esse objeto é criado,
o sistema do Kubernetes vai constantemente trabalhar para garantir que este objeto sempre
exista. Criando este objeto você está efetivamente dizendo ao Kubernetes como você
quer que seu cluster funcione; este será o __estado desejado__ do seu cluster.

Para trabalhar com estes objetos (seja criando, modificando ou removendo) será necessário
utilizar a API do kubernetes. Quando você utiliza o comando `kubectl` no CLI, por
exemplo, a linha de comando faz as chamadas necessárias à API do sistema, abstraindo esta
funcionalidade para o usuário. Você também pode utilizar a API do kubernetes diretamente nos
seus próprio programas. Atualmente há uma biblioteca client escrita em `golang`.
