# Amazon AWS

<!-- TOC -->

- [Amazon AWS](#amazon-aws)
  - [Criando VPC's](#criando-vpcs)
    - [Subnets](#subnets)
  - [Internet Gateway](#internet-gateway)
    - [Roteando a internet para as subnets](#roteando-a-internet-para-as-subnets)
    - [Auto atribuicao de ips](#auto-atribuicao-de-ips)
  - [EC2](#ec2)
    - [Secutiry Groups](#secutiry-groups)
  - [RDS](#rds)
  - [Webserver](#webserver)
    - [Instalando apache e php](#instalando-apache-e-php)
    - [MySQL](#mysql)
      - [Configurando o banco de dados](#configurando-o-banco-de-dados)
  - [NodeJs](#nodejs)
  - [AMI](#ami)
  - [ELB - Elastic Load Balancer](#elb---elastic-load-balancer)
    - [Health check](#health-check)
  - [Auto Scalling Groups](#auto-scalling-groups)
    - [Policies](#policies)

<!-- /TOC -->

## Criando VPC's

VPC's são acessos privados de rede dentro de uma cloud, ou seja, é possível criar compartimentos de computadores que podem ou não estar conectados à rede, bem como restringir ou permitir um acesso a mesma.

![](http://i.imgur.com/qfRrVju.png)

Uma VPC só dá acesso a nós e a determinadas máquinas que usamos.

Ao iniciar uma VPC podemos criar uma tag, que será o nome de identificação da VPC no console, e também o que é chamado CIDR Block, que é o Range de endereços de IP que a VPC vai cobrir. Por exemplo `10.0.0.0/16` vai cobrir desde o `10.0.0.0` ao `10.0.0.16`.

![](http://i.imgur.com/rZP8cFr.png)

Podemos setar algumas opções no painel Actions:

- Edit DNS Hostnames: Dá a possibilidade de editarmos os endereços DNS da VPC
- Edit DNS Resolution: Dá a possibilidade de ativar ou desativar a resolução de nomes DNS

![](http://i.imgur.com/0bsOwxY.png)

![](http://i.imgur.com/Shbufgg.png) ![](http://i.imgur.com/IVrxFqC.png)

> O que fizemos aqui foi basicamente criar uma rede global com um nome que quisermos abrangendo um endereço de IP específico.

### Subnets

São SubRedes que fazem parte da rede principal que criamos anteriormente. Uma boa prática é criar a seguinte arquitetura:

- Uma subnet pública
- Uma ou mais subnets privadas

> Não podemos esquecer de que a AWS tem diversas zonas de disponibilidade, desta forma é importante criar uma subnet para cada zona específica.

![](http://i.imgur.com/gHxtBoj.png)

Podemos, por exemplo, uma série de 4 subnets para uma região de 3 zonas:

- Uma subnet publica (A) para a zona A com o IP 10.0.1.0/24 -> Com Acesso à Internet
- Uma subnet privada (A) para a zona A com o IP 10.0.3.0/24 -> Sem acesso à Internet

- Uma subnet publica (B) para a zona B com o IP 10.0.2.0/24 -> Com Acesso à Internet
- Uma subnet privada (B) para a zona B com o IP 10.0.4.0/24 -> Sem acesso à Internet

![](http://i.imgur.com/ViYV4xY.png)

## Internet Gateway

É uma forma de disponibilizar internet para as VPC's e subnets criadas. Cada IG pode ser anexada a uma VPC, mas a mesma não será anexa a suas subnets, sendo assim essa configuração deve ser feita manualmente

Através do menu "Internet Gateways" criamos uma nova IG e perceberemos que ela estará como _detached_, isso significa que precisamos anexar esta IG a uma VPC, temos um botão para isso no topo `Attach to VPC`.

![Creating IG](http://i.imgur.com/H1AzUNo.png)

### Roteando a internet para as subnets

Para podermos disponibilizar essa internet criada anteriormente para as subnets usaremos as `Route Tables`.

Cada RT é criada para uma VPC e possui diversas subnets dentro, ficando com a seguinte hierarquia:

- VPC
  - Route Tables
    - Subnets

Ao criar uma VPC, automaticamente uma RT já será criada, porém é uma boa prática (na verdade obrigatória), criar outra route table para podermos alocar somente as redes públicas ou privadas.

Para isso podemos criar uma nova RT através do botão `Create route Table` 

![Create route tables](http://i.imgur.com/ROOugEw.png)

Então precisamos associar a cada RT as subnets que queremos, vamos supor que criamos duas RT's, uma publica e uma privada, conforme o [capitulo anterior](#subnets).

Para isto iremos nas configurações da RT na parte de baixo da tela, em `Subnet Associations`:

![](http://i.imgur.com/BmrqlxB.png)

Clicamos em editar e associamos as subnets correspondentes:

![](http://i.imgur.com/1OC7W5L.png)

Após realizar essa alteração, vamos informar ao console que todas as máquinas terão acesso à internet dentro deste RT.

Na aba Routes ao lado de Subnet Associations, vamos definir todos os IP's da RT para obter internet. Adicionando uma nova rota e informando os campos:

![](http://i.imgur.com/5BLGRG6.png)

> O campo Target é aonde colocaremos o nosso IG, o site já proporciona um autocomplete com o nome do IG para colocarmos.

Estamos definindo que as máquinas dentro da área publica da VPC **terão** acesso a internet.

### Auto atribuicao de ips

Queremos que todos os IP's sejam gerados automaticamente para cada computador que seja gerado para a internet.

Podemos voltar ao menu "Subnets" e clicar em nossa subnet publica, modificando a configuração de atribuição de ips:

![](http://i.imgur.com/jUzWRCT.png) ![](http://i.imgur.com/lil3t1g.png)

## EC2

Vamos criar a nossa primeira máquina para a criação de nossas aplicações.

Entrando no painel "EC2", vamos criar um esqueleto para todas as outras máquinas que vamos subir como novas instancias.

Clicamos no botão launch instance:

![](http://i.imgur.com/OlXs4jX.png)

No painel seguinte escolheremos o tipo de instancia que será lançada e o SO que estaremos rodando.

Na tela seguinte, estaremos configurando a máquina, esta é a parte __mais importante__ da configuração, pois iremos definir as redes:

![](http://i.imgur.com/69yDCiY.png)

Note que temos as redes criadas anteriormente:

![](http://i.imgur.com/Gj2fcBc.png) ![](http://i.imgur.com/w8nZN5h.png)

Clicamos em `Review and Launch`

### Secutiry Groups

Para podermos definir algumas politicas de segurança como: Abertura de portas internas e externas, liberação de firewall e etc, precisaremos definir um novo security group na tela de revisão da máquina.

Clicamos no link para a defirmos um novo security group ("Edit Security Groups"):

![](http://i.imgur.com/lvezVoq.png) ![](http://i.imgur.com/PpzBYpZ.png)

Seremos lançados em uma nova tela de edição:

![](http://i.imgur.com/7GB0cMj.png)

Vamos adicionar a liberação externa para a porta 80 clicando em Add Rule e definindo os parâmetros:

![](http://i.imgur.com/gfYsTmX.png)

Clicamos em "Launch" e baixamos a chave RSA para podermos logar:

> __Importante__: A chave só pode ser baixada uma única vez, então precisamos guardar em um lugar seguro.

## RDS

RDS é o serviço de banco de dados relacional da AWS. Vamos subir uma nova instancia de banco de dados para testes:

![](http://i.imgur.com/9TM9T8G.png)

Após isto seremos levados para a tela de seleção de banco de dados. Vamos selecionar o MySQL e devemos selecionar a instancia Dev/Test (porque não tem cobrança), que não é indicada para produção. Deveremos ser levados a esta tela:

![](http://i.imgur.com/YqfAP1Y.png)

Vamos usar a versão 5.6.23 em uma instancia t2.micro

> __Multi-AZ Deployment__: Modelo de arquitetura que garante um SLA extremamente alto (cobrado)

Configurações:

- Storage Types:
  - SSD: Uso comum de SSD para uma larga banda de DB's
  - IOPS: Para bancos com muito IO
  - Magnetic: Para bancos pequenos que não utilizam tanta máquina _<- Estaremos usando este_

Abaixo poderemos definir senhas e usuários da máquina do banco de dados, assim como o nome da mesms.

Seremos levados para a configuração de privacidade do servidor, aonde selecionaremos as redes e também as configurações de acesso externo.

![](http://i.imgur.com/H0AfXTC.png)

Vamos precisar configurar nossa máquina EC2 criada anteriormente para podermos acessar este servidor de banco de dados.

Voltando ao serviço EC2, vamos as configurações da instancia e clicamos nos grupos de segurança:

![](http://i.imgur.com/G2sCL2r.png) ![](http://i.imgur.com/OKeusMI.png)

E veremos o nome do nosso grupo:

![](http://i.imgur.com/BpvJbUj.png)

Voltamos ao RDS e alteramos o security group:

![](http://i.imgur.com/onWMMZc.png)

Clicando no link, seremos redirecionados para a página de grupos de segurança do RDS:

![](http://i.imgur.com/nBqKcfm.png)

Abaixo, vamos em inbound:

![](http://i.imgur.com/trQaNhI.png)

Na tela de edição, vamos apagar o IP pré colocado e selecionar nosso security group:

1º: ![](http://i.imgur.com/3ndBcXa.png)
2º: ![](http://i.imgur.com/zOnyTCR.png)
3º: ![](http://i.imgur.com/lx6uqkG.png)

Agora isso significa que estamos no mesmo grupo de segurança do mySQL e do EC2. Sendo assim ninguém de fora poderá ter acesso a esta máquina.

## Webserver

Para instalar o webserver precisamos primeiro logar na máquina usando o comando `ssh -i [caminho da chave .pem] ec2-user@ip-publico`.

Isso fará com que loguemos na máquina virtual:

![](https://i.imgur.com/TGK0E4i.png)

Vamos atualizar os pacotes com o `yum update`

![](https://i.imgur.com/96RTV73.png)

Vamos instalar o git usando `yum install -y git`

### Instalando apache e php

Utilizamos `yum install -y php56`, que já vai instalar o apache automaticamente.

Usamos `service httpd start` para iniciar o apache e podemos entrar no ip publico da nossa máquina para poder ver se está tudo ok:

![](https://i.imgur.com/9a9nKmW.png)

### MySQL

Utilizando `yum install mysql` podemos instalar o mysql client na máquina.

#### Configurando o banco de dados

Paa podermos instalar o nosso banco de dados, vamos precisar dos dados do RDS, que serão disponibilizados pelo próprio console:

![](https://i.imgur.com/QOLX6zo.png)

![](https://i.imgur.com/ZMYniHy.png)

Este será nosso host. E podemos usar a nossa senha definida no banco de dados anteriormente.

No nosso caso o usuário será `admin` e a senha `00000000`.

Vamos usar o comando:

```bash
mysql -u admin -h db-codeeducation.cpkyhw6vufsb.us-east-1.rds.amazonaws.com -p
```

Para podermos acessar o banco:

![](https://i.imgur.com/BlzToaz.png)

> Lembrando, só podemos acessar esse banco de dados através de máquinas que estão no mesmo secutiry group do RDS, caso contrário não vai dar certo.

- No EC2:

![](https://i.imgur.com/eZalgeZ.png)

- No RDS:

![](https://i.imgur.com/s7dt8qU.png)

Veja que:

![](https://i.imgur.com/ij5x3Vc.png)

O source é apenas para máquinas que estão no mesmo security group, no caso o EC2.

## NodeJs

Para instalar o node usamos:

`yum install -y nodejs npm --enablerepo=epel`

Assim podemos instalar o gulp e todas as outras ferramentas que precisamos.

## AMI

Vamos criar uma Amazon Machine Image, ou AMI. Para podermos escalar a partir dela uma nova instancia sempre que quisermos.

Ela serve apenas para que, baseado nessa imagem possamos criar nossas outras máquinas automaticamente.

Para isso, na instancia do EC2, podemos ir em Actions e clicar em image:

![](https://i.imgur.com/dBKRZSN.png)

Preenchendo as informações de acordo com os valores pedidos.

## ELB - Elastic Load Balancer

Ele vai balancear a carga entre todas as máquinas do scalling group selecionado, dentro de uma série de máquinas que serão criadas a partir da AMI.

Para isso vamos ao menu lateral de criação de load balancers e seguimos os passos determinados. Setando a VPC que criamos anteriormente, bem como definindo a porta que será balanceada e as subnets disponíveis:

![](https://i.imgur.com/EiLOqS7.png)

![](https://i.imgur.com/6vgcYMw.png)

Criaremos um novo security group para ele:

![](https://i.imgur.com/LWxxoom.png)

### Health check

Podemos checar se máquina está no ar com as configurações do Health Check:

![](https://i.imgur.com/Rq6kvYe.png)

Podemos dar o create para criar o nosso load balancer.

## Auto Scalling Groups

Para criar um ASG podemos simplesmente usar o menu lateral e depois em Launch Configurations

![](https://i.imgur.com/3P6N9Zy.png)

Seguindo as configurações, podemos criar um ASC, que é uma configuração de grupos, usando a mesma AMI que criamos anteriormente.

Nas configurações subsequentes podemos configurar o ASG:

![](https://i.imgur.com/cBtU0Rq.png)

Veja que aqui definimos o ELB:

![](https://i.imgur.com/1UyVRJl.png)

### Policies

Podemos configurar politicas de escalabilidade para aumentar ou diminuir o scalling group de acordo com o que desejamos.