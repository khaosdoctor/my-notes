# PHP 7

> O que mudou, o que parou de funcionar e por que? Como refatorar seu código php5.6 para PHP7


Para esta nota estaremos utilizando o miniblog disponível em http://github.com/andrechavesg/miniblog e vamos fazer todas as alterações sobre esse mesmo projeto.

## Instalação

Primeiramente vamos instalar uma nova versão do PHP na máquina, atualmente usamos a 5.6, mas podemos instalar uma nova versão juntamente com essa existente.

As instruções de instalação do PHP7 em várias máquinas estão em: https://goo.gl/2oIFbN

Note que a instalação padrão necessitará da criação do banco de dados.

![Erro de conexão com banco](https://s3.amazonaws.com/caelum-online-public/php+7/1_4+mostrando+o+aviso.png)

```sql
mysql> create database miniblog;
Query OK, 1 row affected (0,00 sec)

> use miniblog;
Database changed
> show tables;
Empty set (0,00 sec)
```

Vamos importar o SQL do miniblog:

```sql
mysql> exit
Bye
> cd Downloads
> Downloads alura$ cd miniblog
> miniblog alura$ ls
Vendor          index.php               miniblog.sql
autoload.php    instalando php7-mysql 
> mysql -u root miniblog < miniblog.sql
```

## Funções MySQL

Ao subirmos o miniblog com o server embarcado do PHP:

```sh
> cd Downloads
> Downloads alura$ cd miniblog
> php -S localhost:3000
```

Recebemos o seguinte erro:

![](https://s3.amazonaws.com/caelum-online-public/php+7/1_17+mostrando+o+erro.png)

Se abrirmos o código veremos que esta linha possui uma função MySQL:

![](https://s3.amazonaws.com/caelum-online-public/php+7/2_1+mostrando+a+p%C3%A1gina.png)

Analisando a linha 7 como na mensagem, vemos que temos uma função mysql, todas as funções `mysql_*` como o `mysql_connect` ou `mysql_error` deixaram de existir no PHP7, sendo substituidas por outras funções equivalentes.

Para resolver esses problemas com as funções `mysql_*` temos duas possibilidades para resolver esta situação.

### mysqli_connect

A função `mysqli_connect` era a função mais indicada para a substituição da função anterior do `mysql_connect`, essa função recebe no construtor o endereço do host, usuário, senha e também o banco de dados, fazendo com que a função `mysql_select_db` seja desnecessária.

### PDO

O PDO é uma classe de conexão genérica que pode ser utilizada para a conexão com vários bancos de dados a partir de uma única abstração.

Para podermos usar o PDO vamos adicionar um novo objeto:

```php
<?php
namespace Vendor\Factory

class ConnectionFactory {
    public static function getConnection() {
        $pdo = new \PDO('mysql:host=localhost;dbname=miniblog','root','');
        
        return $pdo;
    }
}
```

O PDO precisa de uma connectionString que diz qual é o banco, usuário e senha que ele vai utilizar, bem como o host.

### mysql_real_escape_string

Ao continuarmos nosso debug, vemos que existe um outro erro, dessa vez com uma query. A função `mysql_real_escape_string`.

![](https://s3.amazonaws.com/caelum-online-public/php+7/2_2+mostrando+o+onde+est%C3%A1+o+erro.png)

![](https://s3.amazonaws.com/caelum-online-public/php+7/2_3+mstrando+o+erro+na+linha+37.png)

Como as demais funções que começam com `mysql_` ela não funciona mais, como estamos utilizando agora o PDO, vamos ter de trocar todos os locais aonde realizamos queries no banco de dados e qualquer outra operação que utiliza uma função derivada do `mysql_` para o PDO.

```php
public function adiciona(Usuario $usuario) {
    $query = "INSERT INTO Usuario (nome, senha, email, bio, dataDeIngresso) VALUES (:nome, :senha, :email, :bio, :dataDeIngresso)";
    $statement = $this->con->prepare($query);
    $statement->bindValue(':nome',$usuario->getNome());
    $statement->bindValue(':bio',$usuario->getBio());
    . . .
    
    $statement->execute();
}
```

Perceba que nós refatoramos uma função que utilizava uma função `mysql_` para utilizar o PDO, que proporciona um ganho que vai além da vantagem de poder funcionar em vários bancos de dados, que são os atributos, ou parâmetros de queries (utilizando o `bindValue`).

![](https://s3.amazonaws.com/caelum-online-public/php+7/2_6+mostrando+o+altera.png)

Para podermos buscar os dados do banco depois do `execute()` podemos usar o `$statement->fetchObject('Vendor\Model\Usuario');`

```php
public function adiciona(Usuario $usuario) {
    $query = "INSERT INTO Usuario (nome, senha, email, bio, dataDeIngresso) VALUES (:nome, :senha, :email, :bio, :dataDeIngresso)";
    $statement = $this->con->prepare($query);
    $statement->bindValue(':nome',$usuario->getNome());
    $statement->bindValue(':bio',$usuario->getBio());
    . . .
    
    $statement->execute();
    $usuario = $statement->fetchObject('Vendor\Model\Usuario');
    return $usuario;
}
```

Esta função irá retornar o resultado desta query para um novo objeto chamado `Vendor\Model\Usuario`, que será uma instancia da classe usuário.




