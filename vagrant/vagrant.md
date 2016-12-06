# Vagrant

Provisionamento DevOps é uma das áreas mais complexas do desenvolvimento de software, ainda mais quando temos relação com deploys rápidos e provisionamento instantâneo.

A cada alteração no sistema e a cada deploy temos riscos de que todos os dados sejam perdidos ou desconfigurados.

A automatização do provisionamento é uma parte importante na redução de erros, uma vez que a automatização faz com que a quantidade de erros diminua exponencialmente.

## Provisionamento de VM's

Para provisionarmos hardwares, podemos utilizar sistemas de hypervisor, como o VirtualBox.

## O que é o Vagrant?

O Vagrant é um gerenciador de máquinas virtuais que permite que baixemos imagens e máquinas pré prontas de um ambiente já preparado.

## VagrantFile

```Vagrantfile
Vagrant.configure("2") do |config|
    config.vm.box = "hashicorp/precise32" <-- Define uma máquina ubuntu 32bits
    
    config.vm.define :web do |web_config| <-- Chama a máquina de "web"
    end
    
end
```

O VagrantFile é o arquivo similar ao DockerFile que gerencia o Vagrant e todas as suas máquinas virtuais, ele é utilizado como um arquivo inicial de configuração que é rodado toda a vez que usamos o comando `vagrant up`.

### Definindo IP's

```Vagrantfile
Vagrant.configure("2") do |config|
    config.vm.box = "hashicorp/precise32" <-- Define uma máquina ubuntu 32bits
    
    config.vm.define :web do |web_config| <-- Chama a máquina de "web"
        web_config.vm.network "private_network", ip: "192.168.50.10" <-- Define um ip público
    end
    
end
```

Este comando vai definir um ip `192.168.50.10` publico que pode ser utilizado no browser da máquina local para poder acessar a máquina remotamente.

> É possível utilizar o comando `vagrant ssh` para se conectar ao ssh da máquina

## Puppet

O puppet é um provisionador de comandos da máquina virtual definido no modelo parecido como json:

```puppet
exec { "apt-update":
    command => "/usr/bin/apt-get update"
}
```

O arquivo `<nome>.pp` é o arquivo de configuração do puppet que vai estar localizado em uma pasta chamada `manifests` que está dentro da raiz do local aonde está esse arquivo VagrantFile.

### Executando o Puppet

Para executarmos os comandos do puppet podemos rodar (como root) o comando `apply`, como em `sudo apply /path/to/file.pp` que todos os comandos serão executados.

> Ao rodar o Vagrant, o mesmo cria um diretório compartilhado entre a pasta aonde se contra o vagrantFile e  o computador Guest, que vai estar localizada em `/vagrant` (em *nix)

### Pacotes

Para fazer a instalação de pacotes usando o puppet podemos simplesmente adicionar ao arquivo `pp` uma nova diretriz:

```puppet
package { ["pacote1", "pacote2"]
    ensure => installed, --> certifica-se de que o pacote foi instalado corretamente
    require => Exec("apt-update") --> apt-update é o nome que demos ao comando da sessão anterior, vai ser rodado antes
}
```

### Automatização

Até agora instalamos tudo manualmente, porque ainda iremos mostrar como executar isso tudo automaticamente sem precisar o `vagrant ssh` e nenhum outro acesso.

## Instalando a aplicação

Para podermos enviar os dados do nosso aplicativo para dentro da nossa máquina virtual vamos colocar nosso arquivo dentro da pasta `manifests` novamente.

No exemplo, vamos utilizar o TomCat para executar nossa aplicação JAVA, mas precisamos saber e ter certeza de que o servidor está rodando, se não nem adianta colocarmos o arquivo.

Para isso podemos definir no nosso arquivo `pp` um serviço:

```puppet
service { "tomcat7": 
    ensure => running,
    enable => true,
    hasstatus => true,
    hasrestart => true,
    require => Package["tomcat7"]
}
```

Neste arquivo dizemos que noss pacote "TomCat 7" possui um serviço chamado "tomcat7" que precisa estar rodando e ativo quando a máquina ligar.

### Provisionando os arquivos

Para podermos deixar a aplicação automaticamente dentro da pasta correta, vamos adicionar no nosso puppetFile:

```puppet
file { "/var/lib/tomcat7/webapps/<app>.war"
    source => "/vagrant/manifests/<app>.war",
    owner => tomcat7,
    group => tomcat7,
    mode => 0644,
    require => Package["tomcat7"],
    notify => Service["tomcat7"]
}
```

Estamos dizendo para o puppet copiar o arquivo de source para o dest, definindo o usuário de execução o tomcat7 e o grupo é o mesmo. Mas também estamos definindo dependencias, precisamos do pacote tomcat instalado e também vamos notificar o pacote do TomCat7 para restartar o serviço através do Notify.

## Instalação de bancos de dados

Assim como qualquer outro pacote, podemos adicionar naquele arquivo de pacotes a instalação do pacote `mysql-server`.

Assim como podemos adicionar o serviço do mysql no arquivo de serviço.

## Rodando puppet automaticamente

Já tenho o meu Java, já tenho o meu Tomcat. Já tenho o MySQL, tudo instalado. Copiei meu arquivo .war e, inclusive, falei pra minha aplicação usar um ambiente – de desenvolvimento ou de produção, seja qual for – isto é, mudei uma variável de ambiente, editei um arquivo de configuração, usando aquele file do Puppet.

Claro, na documentação do Puppet eu consigo ver tudo o que tem lá: exec, file, criar diretório, o user, colocar chave de autenticação de ssh etc. Tem diversas coisas que eu consigo fazer dentro do meu puppet file.

Agora, o que eu queria fazer, que eu fiz mais ou menos, foi restartar o Tomcat. Quando eu restartei o Tomcat, eu fui lá e falei: sudo service tomcat7 restart. Mas calma aí... Quando eu faço essa alteração no arquivo de configuração do Tomcat, eu já podia restartar automaticamente. E a gente já viu isso.

Basta a gente falar: quando executar isso, notify o service do Tomcat 7. Com isso, quando eu fizer a alteração desse arquivo, ele deve restartar o serviço, e aí ele relê o arquivo de configuração, fica feliz e contente. Todo mundo feliz e contente.

Dou um vagrant destroy, agora que eu já fiz esse notify e, de novo, não preciso ser mão de vaca com o vagrant destroys e vagrant ups. Posso dar à vontade.

Agora tem uma sacada ainda importante: até agora, a gente ficou nessa história de “dá um vagrant up e roda o puppet, dá um vagrant up e roda o puppet.” Só que eu queria só dar o vagrant up! E automaticamente ele já rodasse o puppet pra mim, de graça. Afinal, se eu estou criando a máquina, eu quero provisionar o software. Eu quero esse software na minha máquina!

Se eu quero esse software na minha máquina toda vez que eu crio uma máquina, então é bom que quando eu levante a máquina com vagrant up ele já rode o puppet. Ele já rode o provisioning do software.

Como é que eu vou fazer isso? Eu vou falar pra ele, quando eu configuro a minha máquina chamada “web”, que o meu provision, isso é, o provision é para usar um chamado – adivinha – puppet. E dentro dele, eu vou falar qual é o arquivo de manifest. O arquivo de manifest que eu vou usar é o web.pp.

Então, eu falo para ele:

Olha, por favor, use o puppet e leia o arquivo web.pp. Toda vez que eu der um vagrant up, automaticamente ele vai rodar o passo de provision. E o passo de provision é rodar todos os provisions que estiverem aqui. Nesse caso só tem um provision escrito, que é o puppet. Maravilha! Ele roda o puppet pra gente e o arquivo web.pp.

```puppet
Vagrant.configure("2") do |config|

    config.vm.box = "hashicorp/precise32"
    
    config.vm.define :web do |web_config|
        web_config.vm.network "private_network", ip: "192.168.50.10"
        web_config.vm.provision "puppet" do |puppet|
            puppet.manifest_file = "web.pp"
        end
    end

end
```

Toda vez que eu der vagrant up, a máquina está perfeita, linda, da maneira que eu queria usar.

Eu quero testar isso aí, é óbvio. Dou um vagrant up, ele levanta a máquina. Quando ele levanta a máquina, ele já roda todo o Puppet. E olha quanta coisa a gente já fez! A gente já deu um apt update, a gente já deu um install jdk, a gente já deu um install do Tomcat, a gente deu install do MySQL, a gente criou o banco no MySQL, alterou o arquivo de configuração do Tomcat, colocou o nosso war, restartou o serviço! Tudo isso a gente fez, e o vagrant up fez tudo isso pra gente. Quando eu dei o vagrant up, eu tenho uma máquina pronta pra eu usar.

E eu estou lá com o VRaptor Music Jungle pronto pra eu loggar. É claro, se eu quero testar tudo isso, eu vou lá no meu MySQL, depois de criar um usuário, e está lá no meu banco o usuário que eu acabei de criar. Eu fico feliz e contente.

Só o vagrant up levanta uma máquina completamente no estado que eu gostaria.

Não seja mão de vaca. Você pode dar o vagrant destroy e dar um vagrant up de novo.

Aqui, o que eu vou fazer? Vou dar um `require => Package[“tomcat7”]` e dar um `notify => Service[“tomcat7”]`. Dou um destroy, e falo: “Toda vez que você der um vagrant up, por favor, rode o provision do Puppet, no web.pp.

Agora é dar vagrant up. E esperar, esperar ele baixar tudo e esperar ele instalar tudo. Mas ele vai instalar tudo! Vai instalar tudo aquilo que a gente precisa e, quando ele chegar lá no final, e tiver instalado tudo, tudo, tudo, ele fala: terminei, e tua máquina está pronta!

vagrant ssh, eu estou com o MySQL todo configurado, posso ir no navegador, acessar o meu navegador lá no `192.168.50.10:8080`, Music Jungle, e cadastrar meu usuário que está lá no MySQL.

vagrant up: uma linha de código e eu tenho um ambiente igual ao de produção, igual ao de homologação, de desenvolvimento etc. Sempre querendo mudar uma coisinha ou outra, a gente pode através das configurações que a gente vai passando pro Puppet.

## Utilizando no cloud

Eu já tenho muita coisa pronta. Tanto o meu manifest, que é o vagrantfile, quanto os manifestos do Puppet, que é o web.pp ou qualquer outro arquivo .pp de que eu precisar de configuração, eu posso commitar isso no meu Github, commitar isso no meu repositório de arquivos pra que qualquer desenvolvedor use pra criar a máquina como em produção, o tempo inteiro. A qualquer instante.

Agora, eu estou criando máquinas virtuais na minha máquina, na máquina do dev, do desenvolvedor. Será que é bem isso que eu quero? No meu caso agora, eu gostaria de pegar e criar uma máquina no cloud – criar uma máquina na Amazon, por exemplo – que tenha todas essas características.

Claro, pra criar uma máquina na Amazon ou num outro cloud qualquer, a primeira coisa que eu preciso é ter uma conta em um desses clouds. O vagrant já vem com um plugin para o caso da Amazon. Vamos ver como a gente faz pra criar uma máquina na Amazon, na unha, primeiro, porque eu quero ir pro cloud no Amazon EC2.

O que eu faço? Primeiro, na unha, eu vou ter que escolher qual o sistema operacional que eu vou utilizar. “Ah, eu quero o Ubuntu, por favor”.

Depois, eu tenho que escolher qual o tipo de máquina que eu quero, uma máquina pequena, mini, micro, máquina gigante, gigantesca, gigante família. Escolhe o tipo de máquina que você quer, o tamanho dessa máquina.

Depois, eu tenho que falar pra ele, também, em que região do mundo eu quero que essa máquina fique, tanto do mundo, quanto das áreas etc. Falar onde que eu quero que tenha essa máquina. Aí depois, eu ainda falo lá na Amazon, por exemplo, qual é o nível de segurança que eu quero. Quais são as portas do firewall pela própria Amazon que eu quero liberar.

Eu criei um security_group aqui, que serve pro Devops, no caso, falando:

Olha, eu tenho a porta 8080 aberta, e tenho até a porta do MySQL aberta.
É claro, em produção, você não quer essa porta do MySQL aberta. Você vai provavelmente fechar. Depois, eu falo pra ele assim:

Olha, eu preciso de uma chave para poder acessar o usuário padrão.
No Ubuntu, na Amazon, o usuário padrão chama Ubuntu. Então eu preciso de uma chave ssh privada/pública, para poder acessar o usuário Ubuntu lá na Amazon. Eu vou escolher aqui uma chave que eu já tenho, que é para a palestra e para o curso de Devops. Escolho essa chave e ponho próximo.

Beleza, ele está criando a minha máquina. Eu tive que passar as configurações básicas da minha máquina, assim como a gente fez com o Virtual Box, bem naquele começo, a gente tem que falar as características da máquina e tem que falar as características do sistema operacional – no nosso caso, o Ubuntu.

As características da máquina, no caso da Amazon, a gente tem que falar um pouco mais do que o mínimo que a gente fala lá no vagrant. A gente tem que falar algumas configurações a mais. E é claro, eu já estava loggado na minha conta da Amazon. Então, você precisa criar a conta e se loggar na sua conta da Amazon. Seu usuário e senha, ou algum tipo de segredo e senha que você tenha na Amazon. A gente vai passar por isso.

Criei a minha máquina, opa! Passou agora um tempo e a máquina já está rodando. Agora que a máquina está rodando, eu posso fazer um ssh pra ela.

Legal, vou fazer um ssh pra essa máquina. Primeira coisa, eu copio aquele arquivo .pem, a minha chave de segurança do ssh. Copio para mim, agora eu a tenho. E faço um ssh pra essa máquina. `ssh -i palestra-devops.pem + o ip da minha máquina lá na Amazon`.

Fiz o ssh, estou agora na minha máquina e agora eu posso fazer o que eu quiser nessa máquina. É o Ubuntu, eu estou nessa máquina da Amazon. Assim como eu fiz isso pra Amazon, eu posso fazer isso pra qualquer servidor, claro. No caso da Amazon, especificamente, eu vou querer fazer isso de alguma outra maneira. Porque eu não quero ter que ficar executando apt-get update, apt-get install, eu não quero ter que executar tudo isso na mão. Eu queria usar aqueles arquivos meus do vagrant!

Eu queria usar os arquivos do vagrant, então o que eu vou fazer? Vou matar a minha máquina da Amazon, e agora que eu matei a minha máquina da Amazon, eu vou querer usar o vagrant! O plugin do vagrant que serve para se conectar com Amazon webservices. Que serve para criar máquinas na Amazon.

Legal, então instala o plugin do vagrant.

```sh
vagrant plugin install vagrant-aws
```

O vagrant tem diversos plugins que eu posso utilizar. O plugin que eu vou usar agora é o plugin aws, que serve para mudar o provider das nossas máquinas. Em vez de usar o provider do Virtual Box, que era a máquina virtual local, agora eu vou usar o provider do aws, que é o provider da Amazon webservices lá no cloud da Amazon.

Legal, estou instalando esse plugin. Instalar o plugin não quer dizer que você está usando-o. Só instalei o plugin. Agora que eu instalei o plugin, eu vou ter que configurar o mínimo, algumas características que a gente acabou de falar. Sempre que a gente cria uma máquina, no cloud ou em algum lugar, a gente tem que falar algumas coisas sobre essa máquina.

Por exemplo: eu vou ter que falar que o conjunto de chaves (você se lembra que eu tinha falado de segurança?) era esse aqui de Devops. Eu tenho que falar que essa é a minha chave. Eu tenho que falar qual era a máquina que eu ia usar lá na Amazon (você se lembra que eu tinha escolhido o Ubuntu?). Ela é um ami, uma imagem, de um Ubuntu, e eu tenho que falar essa mesma imagem. Então eu copiei lá do site da Amazon o ami no qual eu queria me basear, é esse ami aqui.

Que mais? Eu tive que escolher o security_group (você lembra que eu criei um security_group?) de Devops. Por quê? Porque eu queria deixar a porta 8080 aberta, queria deixar a porta do ssh aberta e queria deixar a porta do MySQL aberta.

Óbvio, em produção, provavelmente você vai fechar a porta do MySQL pra ninguém acessar de fora, mas de dentro você pode.

O que mais? Vou configurar o username, porque você se lembra: por padrão o usuário do ssh no vagrant se chama “vagrant”. Não é o caso. Na Amazon, o usuário do ssh se chama “ubuntu”. Então, sobrescrevo este usuário para “ubuntu”.

E falo também onde é que está a minha chave privada né, porque ele vai querer fazer um ssh para lá. Se ele quer fazer um ssh pra lá, ele precisa da chave privada. Então, vou deixar a chave privada aqui dentro, palestra-devops.pem, e vou usar essa chave privada para ir lá pra Amazon. Legal? Vamos lá.

```puppet
config.vm.provider :aws do |aws, override|
    aws.keypair_name = “palestra-devops”
    aws.ami = “ami-358c955c”
    aws.security_groups = [‘devops-vagrant’]

    override.ssh.username = “ubuntu”
    override.ssh.private_key_path = “palestra-devops.pem”
end
```

O que mais eu vou ter que fazer? Configurar meu usuário e senha. Eu pego meu usuário e senha lá no site da Amazon. Pego o meu access_key_id e pego o meu secret_access_key. Copio esses dois dados e colo aqui. Claro, cada usuário vai ter seu próprio access_key_id e seu próprio secret_access_key. Use o seu. E aí depois, quando você quiser, se você não vai usá-lo mais, você pode desativar e ninguém nunca mais vai usá-lo. Estou usando um aqui, que depois vou desativar.

Que mais? Eu tenho que configurar o box que eu utilizo. Você se lembra que a gente estava usando o Ubuntu 32 bits? Aquele Ubuntu 32bits só funcionava pro Virtual Box. Então vou ter que trocar: não vou mais usar aquele box do Ubuntu 32 bits que funciona com o Virtual Box. Vou usar um outro box. Vou usar um box que não faz nada, ele não instala nada, mas ele serve muito bem pra Amazon, porque daí ele funciona com o Ubuntu da Amazon, que é aquele ami que a gente tinha escolhido, e ele fica quietinho porque já está tudo instalado. Ou melhor já tem várias coisas com que o Ubuntu já vem instalado.

Mas tem algumas diferenças! Aquela box lá, padrão, precise32, que o pessoal do vagrant define como padrão, e que sempre você vai encontrar nos tutoriais etc., aquela box já vem com o Puppet instalado. Já vem com outras coisas instaladas. E esse box da Amazon não vem com o Puppet instalado. Ele vem com nada, além do Ubuntu padrão. Então, vai estar com o Ubuntu padrão e mais nada. O Puppet não vai estar lá. Estou falando, hein!

Beleza. O que eu faço agora? Eu vou configurar uma coisinha a mais. Só uma coisinha a mais. Eu vou dar um nome pra minha máquina. Eu não quero criar máquinas lá no cloud da Amazon e ficar com todas as máquinas sem nome, aí não sei que máquina é que máquina! Vou ficar louco! Não sei que dinheiro estou gastando onde.

Vou dar um nome pra minha máquina. Lá dentro da definição da minha máquina web, eu vou falar:

Olha, por favor, coloca uma tag na minha máquina. O nome dessa tag é “name”. E o valor dessa tag é MusicJungle (vagrant).

```puppet
web_config.vm.provider :aws do |aws|
    aws.tags = { 'Name' => 'MusicJungle (vagrant)'}
end
```     

Genial, né? Então estou dando um nome pra minha máquina. O nome, na verdade, é uma tag que o Amazon aws usa para mostrar pra você, “Olha que bonitinho, sua máquina se chama MusicJungle (vagrant)”. Assim você sabe que máquina é essa, quem diabos criou essa máquina, quando ela foi criada, para você poder parar de usar e não pagar depois também. Sempre tomar este cuidado. Criou a máquina em um cloud, destrói depois quando você não usa, para não gastar dinheiro.

Legal. Agora, eu falei que o Puppet não vinha instalado. Então eu preciso instalar o Puppet! Eu tenho que instalar o Puppet, se vira, cara, instala o Puppet aí! Não tem segredo pra instalar o Puppet. Você precisa de um script que instala o Puppet, tudo bem?

É esse script bash que faz isso.

Você não pode depender do Puppet pra instalar o Puppet. Você precisa depender de nada, pra instalá-lo. Depois que o Puppet está instalado, você sai instalando tudo, tudo a rodo, instala Tomcat, instala Java, o que você quiser. Antes de você instalar o Puppet, você tem que só instalar o Puppet. Você não pode confiar nele.

Então, primeiro a gente vai instalar o Puppet. Como? Com esse script, o script padrão que a gente usa pra instalação do Puppet em Linux, compatível com Ubuntu.

```sh
#!/bin/sh
set -e -x

if which puppet > /dev/null ; then
    echo "Puppet is already installed"
    exit 0
fi

export DEBIAN_FRONTEND=noninteractive
wget -qO /tmp/puppetlabs-release-precise.deb https://apt.puppetlabs.com/puppetlabs-release-precise.deb

dpkg -i /tmp/puppetlabs-release-precise.deb
rm /tmp/puppetlabs-release-precise.deb
aptitude update
echo Installing puppet
aptitude install -y puppet
echo "Puppet installed!"
```

Legal. Agora, como eu o configuro? Eu vou lá onde a gente usava o provision do Puppet e antes de fazer o provision do Puppet, eu falo: “Faz um provision do shell”. Shell, sh, o arquivo bash, scritpzão simplão que é esse script que a gente acabou de escrever.

Eu escrevi esse script, que fala: - Olha, eu quero o provision do tipo shell, que é um bash simples, e eu quero que o path desse arquivo seja manifests/bootstrap.sh.

É o nome do arquivo que eu dei. Bootstrap, porque ele configura o boot, que é o mínimo – é o Puppet, que eu quero instalar. Agora repara que eu tenho dois provision. O primeiro provision, do tipo shell, chama o arquivo bootstrap.sh. O segundo provision chama o puppet e instala o web.pp. Ele vai executar nessa ordem: primeiro o bootstrap.sh, depois o puppet com o web.pp. Maravilha, porque primeiro ele instala o Puppet, e depois ele configura o meu web.pp.

```puppet
config.vm.define :web do |web_config|
        web_config.vm.network "private_network", ip: "192.168.50.10"
        web_config.vm.provision "shell", path: "manifests/bootstrap.sh"
        web_config.vm.provision "puppet" do |puppet|
            puppet.manifest_file = "web.pp"
        end
        web_config.vm.provider :aws do |aws|
            aws.tags = { 'Name' => 'MusicJungle (vagrant)'}
        end
end
```

Esse script é um script padrão que já está preparado para algumas coisinhas pra garantir que, se você já instalou o Puppet, continua funcionando, e se você não instalou o Puppet, instala-o. E aí, com dois provisions, a gente consegue falar: primeiro instala o Puppet, depois roda o Puppet. Maravilha? Poderia ter vários provisions, existem outros provisions, outras ferramentas, que também servem, assim como o Puppet, ou assim mesmo como o shell, para instalar e configurar o seu ambiente.

Eu já tinha dado vagrant up e a máquina já está rodando. Se a máquina já está rodando, eu posso só dar um vagrant provision. Esse a gente ainda não tinha visto. O vagrant provision serve pra fazer o quê? Só rodar o provision.

vagrant up levanta a máquina e eu rodo os provisions, você lembra? Agora se eu quiser só rodar o provision, eu posso fazer vagrant provision.

Claro, tem diversas outra opções. Mas o vagrant provision é interessante saber, porque se você quiser forçar rodar o provision de novo, você pode só chamar vagrant provision. Ele roda o provision pra você.

Estou rodando o meu provision, ele roda tanto o meu shell quanto o meu puppet lá na máquina da Amazon. Depois de ter criado uma máquina na Amazon. Ele rodou, ele deu um up, ele criou a máquina na Amazon, com a minha autenticação, com tudo o que eu tinha pedido pra ele. E aí, eu dei um vagrant provision pra ele rodar todo o provision de novo. E aí ele fala:

Maravilha, instalei o Puppet! Maravilha, instalei um monte de coisa lá na Amazon.
E aí eu vejo lá na Amazon, beleza, minha máquina está rodando, acesso no navegador o ip da minha máquina, copio o ip da máquina no navegador, porta `8080`, e acesso meu servidor. Acesso, até mesmo, o Music Jungle se eu quiser.

Se eu quiser, eu dou um vagrant ssh e ele vai fazer o ssh pra máquina remota na Amazon. E quando eu faço o ssh na máquina remota na Amazon, eu vou lá, dou um MySQL e verifico que o usuário foi adicionado lá na máquina da Amazon. Legal?

Como eu fiz pra rodar minha máquina lá na Amazon? Eu coloquei a configuração de um box da Amazon, coloquei a configuração de aws, isto é, a ami e várias outras coisas, configurei um nome pra minha máquina – só para ter um nome, porque, se não, ia ficar feio – e falei “Por favor, instala o Puppet primeiro!” Sem Puppet não rola rodar o Puppet. Então, instala o Puppet com um provision, e depois instala o outro, com outro provision.

Lembrando: o vagrant up, ele levanta por padrão com o provider do Virtual Box. Se eu quero forçar o provider do aws, isso é, se eu quero usar o plugin do aws, eu tenho que fazer:

```sh
vagrant up --provider=aws
```

Eu tenho que falar para o vagrant up qual é o provider que eu quero usar agora ou depois. Se eu quero usar agora o provider do aws, então `vagrant up --provider=aws`.

E depois, vagrant provision eu posso fazer à vontade, pra sair rodando o puppet apply, ou o shell, ou seja lá o que for. Ele roda tudo pra gente. Legal? É isso aí.

Eu sou capaz agora de destruir minha máquina e subir uma máquina totalmente nova do zero com tudo configurado em 6 minutos. Na Amazon, eu consigo fazer isso com o vagrant up --provider aws, e em 6 minutos eu tenho a minha máquina.

Local, pode ser mais rápido, pode ser mais devagar, depende do tempo que demora pra instalar o MySQL e o Tomcat. Só depende disso. Mas não demora mais dias. Não demora mais – depender de alguém que sabe o que tem que ser instalado, e em que ordem tem que ser instalado etc. Está tudo automatizado.

Eu consigo criar uma máquina igual à máquina que eu preciso em 6 minutos. Já é alguma coisa. Agora se você me falar que 6 minutos é muito, eu até posso, se for muito lerdo, criar minha própria box. Eu posso pegar esse meu box atual, dou um vagrant package e ele cria um arquivo .box novo.