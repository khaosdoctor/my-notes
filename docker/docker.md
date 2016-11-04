# Docker

Docker é uma ferramenta de criação de container de forma que a execução de aplicações dentro destes containers de forma isolada e completamente separada de toda a infraestrutura do computador. Em outras palavras, o Docker cria pequenas "caixas" que permitem que uma aplicação encontre tudo que ela precisa para rodar.

O docker serve para prepararmos ambientes de execução (ubuntu,mysql,wordpress) de forma rápida e prática, a grande vantagem disso é que em uma máquina física podemos simular diversos ambientes isolados que ficam isolados no que chamamos de containers, que compartilham o mesmo sistema operacional.

Isso garante uma funcionalidade igual em produção e em desenvolvimento, assim como em qualquer ambiente.

## Iniciando uma máquina

Para iniciar um novo container docker podemos executar:

`docker run <container> <comando>`

Por exemplo:

`docker run ubuntu bin/echo "Olá Mundo!"`

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_1_1.png)

Irá baixar a imagem do ubuntu no computador e irá rodar o comando `echo "Olá Mundo!"`.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_1_2.png)

## Baixando imagens

Para baixar uma imagem usamos o comando `docker pull <imagem>`, por exemplo `docker pull mysql` irá baixar a imagem do banco mySQL.

### Listar todas as imagens

Para listarmos todas as imagens, podemos rodar `docker images`.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_1_4.png)

### Listar containers em execução

Execute o comando `docker ps` para as imagens em execução e `docker ps -a` para todas as imagens.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_1_5.png)

## Criando containers nomeados

O Docker cria um nome aleatório sempre que iniciamos um container com o comando `run`, para podermos dar nomes aos nossos próprios containers, vamos usar a expressão `--name` como em: `docker run --name database`.

### Rodando em background

Para rodar um container em segundo plano basta adicionarmos a flag `-d` no comando abaixo.

### Variáveis de ambiente

Para passar um valor de uma variável de ambiente para o Docker usamos o `-e`: `docker run --name database -e MYSQL_ROOT_PASSWORD=root <imagem>`.

Podemos rodar `docker run --name database -e MYSQL_ROOT_PASSWORD=root -d mysql` para iniciar uma nova instancia de um container mySQL em background com o nome de "database".

## Instalando o Wordpress

Para instalar o Wordpress podemos executar o seguinte comando: `docker run --name blog --link database:mysql -e WORDPRESS_DB_PASSWORD -p 80:80 -d wordpress`

> Note que o comando `--link` leva um parametro separado por um `:`, isto significa `container:alias` de forma que o `container` seria o nome que demos ao container, e o `alias` seria o nome fantasia

> O comando `-p` leva como parâmetros `porta local:porta container` de forma que podemos informar que a porta local estará redirecionando a uma porta interna do container. Se colocássemos `8080:80` teriamos que acessar localmente para a porta 8080 direcionando para o 80 do container.

Feito isto podemos iniciar a porta local 80 para testar:

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_1_8.png)

## Helpers

### Teste de isolamento

Como saber se seu container está realmente isolado?

Podemos rodar `ps aux` para listar todos os processos da máquina e contar todos com o `ps aux | wc -l`.

Se entrarmos dentro do container, poderemos verificar que o mesmo comando roda com uma série de processos separados.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_2_3.png)

### Entrando em um container

Para entrar em um container em execução executamos o comando `docker exec -it <nome do container> bash` para iniciar um terminal bash com a interatividade do `-i` e um tty do `-t`.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_2_2.png)

> O mesmo comando pode ser executado através do `docker run -it <imagem> <app>`. Como em `docker run -it ubuntu bash` que abrirá o terminal de uma máquina ubuntu.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_2_4.png)

## Removendo containers

Utilizando `docker rm` podemos excluir um __container__, mas lembre-se que o container precisa de uma imagem para ser executado. Este comando __não__ exclui a imagem, só o container.

> É possível passar uma lista de containers para remover mais de um de uma vez só.

> Podemos passar uma função em shellscript para o comando `rm` para passar o resultado para dentro do comando `rm`, neste caso se quisermos excluir todos os containers podemos executar `docker rm $(docker ps -qa)`

_Obs_: Toda a instrução dentro do `$()` é um shell script

## Removendo imagens

Para remover imagens podemos executar o comando:

`docker rmi <imagem>`

## Rodando comandos em tempo de execução

O comando `docker exec` executa um comando dentro de um container em tempo de execução dentro de um container.

A estrutura do comando seria: `docker exec -it <nome do container> <comando>`. Portanto o comando `docker exec -it container bash` abriria um bash dentro do container atual.

Porém se quisermos executar a saída apenas sem entrar na máquina, podemos simplesmente executar qualquer comando interno que o output será passado para o `stdout`.

## Matando containers

Para parar um conteiner forçadamente, podemos utilizar `docker kill <container>`.

É possível criar um container descartáveis através do comando `docker run --rm -it <imagem> <comando>`, por exemplo, `docker run --rm -it ubuntu bash` vai criar um container ubuntu, abrir o bash e assim que for fechado vai ser removido automaticamente.

## Criando imagens

Podemos criar imagens personalizadas nossas a partir de um estado específico, assim a imagem que criarmos sempre será criada no estado atual e poderá ser replicada.

Todos os comandos que executarmos dentro de um container não serão armazenados no mesmo depois que removermos ou destruimos o mesmo. Desta forma a imagem é o modelo para criar uma persistencia maior.

`docker commit -m "mensagem" <container> <nome da imagem>`

Se executarmos um container novo e depois instalarmos o apache neste container, podemos executar um comando do tipo `docker commit -m "Instalado Apache" cont-apache ubuntu/apache`, isto irá criar uma imagem baseada no nosso container chamado `cont-apache` em uma "nova" imagem chamada `ubuntu/apache`.

> Utilizamos a barra `/` para que o Docker entenda que esta imagem é um fork de uma outra imagem pré existente. Desta forma o tamanho não é duplicado no disco, e uma nova camada é apenas criada sobre a nossa imagem local do ubuntu.

__Obs__: Esta imagem será apenas local

## Mapeamento de portas

Sempre que rodamos um comando `run`, podemos definir uma porta local e uma porta do container com a flag `-p`, exemplo: `docker run -it -p 8080:80 ubuntu` vai criar um container ubuntu com a porta 8080 local mapeada para a porta 80 do container

## Dockerfile

O Dockerfile é uma forma mais simples de criar um container e executar automaticamente comandos nele, ao invés de termos de ficar executando o container manualmente e criando uma imagem para cada coisa que instalamos.

Para isso o dockerfile existe, ele automatiza o processo de criação de containers com várias instruções pré definidas que o Docker pode ler.

Uma exemplo de dockerfile:

```Dockerfile
FROM <imagem original>

RUN <comandos>
```

Ficaria

```Dockerfile
FROM ubuntu

RUN apt-get update && apt-get install mysql
```

Para podermos criar uma imagem a partir de uma instrução no dockerfile, podemos usar `docker build -t <nome da nova imagem> <caminho do dockerfile>`.

Se quisermos criar uma imagem chamada `ubuntu/mysql` podemos executar, a partir do dockerfile acima, o comando: `docker build -t ubuntu/mysql .`.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_5_1.png)

Podemos também executar comandos para iniciar o container, isto é, rodar comandos no próprio docker para inicializar ou pausar o container e interagir com o host dentro do Dockerfile.

Por exemplo, o serviço do apache pode ser executado diretamente de dentro de um comando run usando `docker run -itd -p 80:80 ubuntu/apache /usr/sbin/apache2ctl -D FOREGROUND`, podemos automatizar isso simplesmente no dockerfile.

```Dockerfile
FROM ubuntu

RUN apt-get update && apt-get install -y apache2

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
```

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_5_2.png)

- Comando `EXPOSE` expõe uma porta (o equivalente ao `-p 80`)
- O comando `CMD` leva um array de comandos, aonde cada espaço no comando seria uma nova posição no vetor (`CMD ["apachectl","start"]` seria o equivalente a `apachectl start`)

Ao criar a imagem, vamos agora rodar em background um container com `docker run -d -p 98:80 ubuntu/apache` para iniciar.

### Dockerfile: Adicionando arquivos

Quando criamos um container, geralmente teremos vários arquivos que suportam nossa aplicação rodando neste container.

> Como podemos adicionar a aplicação existente em nosso computador local para dentro do container?

Podemos utilizar a instrução add

```Dockerfile
ADD <origem no computador local> <destino dentro do container>
```

Podemos inserir uma pasta toda ou um arquivo específico.

```Dockerfile
ADD app/ /var/www/html
```

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_6_1.png)

Se passarmos uma pasta, todo o conteúdo da pasta será enviado, mas apenas os arquivos.

Se quisermos copiar a estrutura também (contendo a pasta) utilizamos a instrução `COPY`.

```Dockerfile
COPY <origem> <destino>
```

Não podemos esquecer de adicionar o caminho __COMPLETO__

```Dockerfile
COPY app/teste /var/www/html/teste
```

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_6_3.png)

## Docker Compose

Quando criamos containers complementares (como o mysql e o wordpress), temos que rodar vários comandos, ou seja, temos que escrever bastante para colocar ambos no ar.

> Como podemos resumir estes comandos usando apenas o Dockerfile?

Podemos criar um arquivo __docker-compose.yml__, um manifesto para o composer do Docker.

Este arquivo é um YAML que diz o que o composer terá de realizar para poder compor uma série de containers.

Por exemplo, vamos criar um blog Wordpress utilizando o MySQL. Anteriormente tivemos que rodar vários comandos como o `docker run` com uma série de flags e parâmetros de configuração que podem dar errado muitas vezes. Vamos criar uma pasta chamada `blog` e, dentro dela, criar um arquivo `docker-compose.yml` com o conteúdo:

```yml
db: # Nome do primeiro container (o do mysql, equivalente ao --name do docker)
  image: mysql # Imagem que será usada para a criação deste container
  environment: # Variáveis de ambiente que iremos passar (o equivalente ao --e)
    - MYSQL_ROOT_PASSWORD=root123 # Este parâmetro "environment" aceita uma lista de variáveis com seus respectivos valores, estamos passando a senha do banco de dados

blog: # Criamos outro container chamado "blog", que será o container do wordpress
  image: wordpress # Com a imagem do wordpress
  environment:
    - WORDPRESS_DB_PASSWORD=root123 # Passamos a senha do mysql para o WP
  links: # Criamos uma lista de links (equivalente ao --link do docker)
    - db:mysql # Aqui temos que passar o NOME do container que queremos linkar, o mesmo nome que colocamos na primeira linha
  ports: # Aqui definimos as portas que serão expostas, também é uma lista (equivalente ao --p)
    - 80:80 # E aqui definimos o comando com a porta local:porta container
```

Para podermos executar esse arquivo, executamos (na pasta que criamos) o comando `docker-compose up`.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_7_2.png)

Isso irá nos dar várias saídas de log. Para resolver isso podemos usar a flag `-d` para não travar nossa máquina e executar os containers em background

## IP fixos para containers

Quando criamos links e conexões com containers, o Docker gerencia isso tudo automaticamente, podemos tentar realizar esses passos manualmente também.

O problema ao realizar desta forma é que não temos os endereços de IP e nenhuma informação sobre o container no momento da criação do mesmo.

> Como podemos pegar as informações internas do container?

Através do comando `docker inspect <nome>`, então podemos, por exemplo, instalar os clients do mysql em um container ubuntu e conectar a um outro container docker buscando seu ip manualmente.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_8_1.png)

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_8_2.png)

O problema com esta abordagem é que o IP dos containers é volátil, ou seja, a cada reinicialização do container no Docker, o IP seria alterado.

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_8_4.png)

Para contornar este problema, podemos criar um IP fixo, ou um link ao próprio container, que seria o equivalente ao comando `--link`.

Então, ao rodar um container volátil (com o `--rm`) podemos passar a instrução `--link`:

(Suponhamos que ja tenhamos criado o container do mysql com a porta 3306 padrão)

```sh
docker run --rm -it --link mysql:db ubuntu bash
```

A instrução `mysql:db` significa que estamos definindo que queremos fazer uma conexão com o MySQL chamada de `db` (desta forma podemos chamar o computador pela rede através do alias `db`).

## Criando volumes persistentes

Podemos mapear pastas e arquivos em volumes dentro do container a partir de comandos do CLI.

Através da opção `-v` do comando `run` do Docker, podemos mapear um __diretório__ para um caminho interno do container, criando um volume localizado.

```sh
docker run -it -v <diretório local>:/<diretório no container> <imagem> <comando>
```

O `-v` cria um volume para dentro do container. Todos os arquivos que forem criados a partir dessa conexão entre nosso Host Local e o container serão persistidos. Perceba que os arquivos serão criados dentro do container:

Por exemplo, vamos mapear a pasta `Desktop` do computador para o diretório `tmp` do container criado do Ubuntu.

```sh
docker run -it -v /Desktop:/tmp ubuntu bash
```

![](https://s3.amazonaws.com/caelum-online-public/docker/dock_9_1.png)

Também podemos inserir shellscripts no comando:

```sh
docker run -it -v $(pwd):/tmp ubuntu bash
```

Isso fará com que ele adicione o local atual na máquina Docker.

> É importante dizer que esta é uma via dupla, ou seja, os arquivos criados dentro do container serão criados também no computador host.

Mesmo destruindo todos os containers, os arquivos permanecem. Podemos aplicar essa lógica, então, dentro do arquivo de compose

### Usando o comando `-v` no docker compose

Para usar o comando de criação de volumes no arquivo YML do docker compose, basta adicionar `volumes` e criar a lista de pastas que serão mapeadas.

```yml
db: # Nome do primeiro container (o do mysql, equivalente ao --name do docker)
  image: mysql # Imagem que será usada para a criação deste container
  volumes:
    - <pasta host>/:/<pasta container>
  environment: # Variáveis de ambiente que iremos passar (o equivalente ao --e)
    - MYSQL_ROOT_PASSWORD=root123 # Este parâmetro "environment" aceita uma lista de variáveis com seus respectivos valores, estamos passando a senha do banco de dados

blog: # Criamos outro container chamado "blog", que será o container do wordpress
  image: wordpress # Com a imagem do wordpress
  environment:
    - WORDPRESS_DB_PASSWORD=root123 # Passamos a senha do mysql para o WP
  links: # Criamos uma lista de links (equivalente ao --link do docker)
    - db:mysql # Aqui temos que passar o NOME do container que queremos linkar, o mesmo nome que colocamos na primeira linha
  ports: # Aqui definimos as portas que serão expostas, também é uma lista (equivalente ao --p)
    - 80:80 # E aqui definimos o comando com a porta local:porta container
```

Usando o mesmo exemplo anterior:

```yml
db: # Nome do primeiro container (o do mysql, equivalente ao --name do docker)
  image: mysql # Imagem que será usada para a criação deste container
  volumes:
    - ˜/Desktop/:/tmp
  environment: # Variáveis de ambiente que iremos passar (o equivalente ao --e)
    - MYSQL_ROOT_PASSWORD=root123 # Este parâmetro "environment" aceita uma lista de variáveis com seus respectivos valores, estamos passando a senha do banco de dados

blog: # Criamos outro container chamado "blog", que será o container do wordpress
  image: wordpress # Com a imagem do wordpress
  environment:
    - WORDPRESS_DB_PASSWORD=root123 # Passamos a senha do mysql para o WP
  links: # Criamos uma lista de links (equivalente ao --link do docker)
    - db:mysql # Aqui temos que passar o NOME do container que queremos linkar, o mesmo nome que colocamos na primeira linha
  ports: # Aqui definimos as portas que serão expostas, também é uma lista (equivalente ao --p)
    - 80:80 # E aqui definimos o comando com a porta local:porta container
```