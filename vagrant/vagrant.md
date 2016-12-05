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

