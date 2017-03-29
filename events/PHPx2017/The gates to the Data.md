# The gates to the Data

> Formas de se realizar acesso a dados utilizando aplicações PHP

## A base de tudo

### Drivers

No início, a maioria dos SGBD's tinham drivers disponíveis para o PHP. 

**Vantagens:**

- Você poderia utilizar o código específico para o banco de dados utilizados

**Desvantagem:**

- Não tem portabilidade para outros SGBD's

### PDO

Depois tivemos o PDO (PHP Data Objects) que abstraia todas as funcionalidades dos SGBD's em um unico local.

**Vantagens:**

- Usava um unico objeto, removia a desvantagens do anterior

**Desvantagens:**

- Lentidão na aplicação caso não seja configurado corretamente

### Active Record

O armazenamento de dados é feito em classes dentro do sistema e depois é salvo como um modelo. O Eloquent é um exemplo.

**Vantagens:**

- Fácil de implementar
  - Tudo fica concentrado em uma unica classe

**Desvantagens:**

- Acoplamento da camada de negócio na infra-estrutura, pois você mesmo salva os dados e sabe como isto está sendo feito

### ORM

Faz as transferencias dos objetos do banco de dados para o código, porém desta vez o sistema de Data Mappers separa as entidades em diversas classes gerenciadas por um *EntityManager*

**Vantagens:**

- Separa a lógica de implementação de banco e de storage

**Desvantagens:**

- Adiciona mais uma camada à aplicação

## Doctrine

É o principal ORM do mercado. Começou como um Active Record mas passou a ser um ORM depois de umas versões.

### DBAL

*Doctrine Database Abstraction Layer*, é a abstração do PDO (que, por sua vez, é uma abstração também), fornece uma interface comum para todos os bancos de daods, de forma mais fluente. Porém gera outra camada por incluir mais uma abstração de interface

#### Query Builder

Ele possui um query builder parecido com o code igniter:

```php
$queryBuilder
  ->select('nome')
  ->from('users')
  ->groupBy('id');
```

#### Doctrine ORM

Promove transparencia para a persistencia de objetos PHP. Usa um padrão de Data Mapper desde o seu núcleo de construção.

Desta forma é possível separar e trocar todas as camadas da aplicação. Mas este modelo é mais indicado pra aplicações de longo prazo, que mantém um longo histórico de manutenções e etc, quando é uma aplicação mais simples é mais fácil utilizar um paradigma mais rápido.

## Entidades

Uma entidade é um objeto que pode ser definido pela sua identidade, por exemplo, um entidade de usuário é unica se seus atributos são únicos, diferentemente de um objeto de valor que será igual para qualquer um dos seus atributos desde que eles sejam iguais. Abaixo é um exemplo de entidade:

```php
<?php
  class article {
    private $id;
  	private $author;
  
  	public function __construct() {
      $this->comments = new ArrayCollection();
  	}
  
  	public function getId() { return $this->id; }
  	public function getAuthor { return $this->author; }
  	public function setId($value) { $this->id = $value; }
  	public function setAuthor($value) { $this->author = $value; }
  }
```

### Entity Mappers

Como dizemos para nosso ORM que estas entidades serão mapeadas?

Método 1: Annotation mapper (Desvantagem é que acoplamos a camada de dados na estrutura)

```php
<?php
  /** @Entity */
  class article {
  	/** @Column(type="integer") */
    private $id;
    /** @Column(type="string") */
  	private $author;
```

XML Mapper:

```xml
<doctrine-mapping>
 <entity name="Message">
  <field name="id" type="integer" />
  <field name="author" type="string" />
 </entity>
</doctrine-mapping>
```

## Relacionamentos

Imagine que temos a nossa entidade:

```php
<?php
class Product {
	private $shipping;
  	public function getShipping() { return $this->shipping; }
  	public function setShipping(Shipping $value) { $this->shipping = $value; }
}
```

### One to One

Nosso relacionamento seria:

```xml
<doctrine-mapping>
	<entity class="Product">
  		<one-to-one field="shipping" target-entty="Shipping">
          <join-column name="shipping_id" referenced-column-name="id"/>
      	</one-to-one>
  	</entity>
</doctrine-mapping>
```

### One to Many

Agora vamos mudar de entidade para um relacionamento um para muitos, imagine o XML:

```xml
<doctrine-mapping>
	<entity name="User">
  		<id name="id" type="integer">
      		<generator strategy="AUTO" />
      	</id>
      	
      	<field name="name" type="string" />
        <field name="mail" type="string" />
      	<field name="login" type="string" />
      	
      	<many-to-one field="type" target-entity="Type" />
  	</entity>
</doctrine-mapping>
```

Isto produziria uma classe:

```php
<?php
  class User {
    protected $id;
  	protected $mail;
  	protected $login;
  	protected $name;
  	protected $type;
  
  	/** @return Type $type */
  	public function getType() { return $this->type; }
  
  	/** @param Type $type */
  	public function setType(Type $type) {
      $this->type = $type;
  	} 	
  }
```

### Many to Many

Temos que mapear a nossa *Join Table* para que tenhamos o relacionamento N-M.

```php
<?php
  class User {
    private $groups;
  	
  	public function __construct() {
      $this->groups = new ArrayCollection(); //Próprio do framework, pode usar um Array normal que também vale.
  	}
  }

  class Group {
    // ...
  }
```

## Repository Pattern

É o responsável pela mediação entre o domínio e a camada de mapeamento de dados, atuando como uma coleção em memória de objetos.

Em suma, ele faz a abstração das classes.

```php
<?php
namespace Doctrine\ORM;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\Common\Collections\Selectable;

class EntityRepository implements ObjectRepository, Selectable {
  protected $_entityName;
  protected $_em;
  protected $_class;
  
  public function __construct ($em, Mapping\ClassMetadata $class) {
    $this->_entityName = $class->name;
    $this->_em = $em;
    $this->_class = $class;
  }
  
  public function funct($id, $lockMode = null, $lockVersion = null) {
   return $this->_em->find($this->_entityName, $id, $lockMode, $lockVersion); 
  }
}
```

Esse é o exemplo de um repositório padrão do Doctrine.

### Mapeando o Repository

```xml
<doctrine-mapping>
	<entity name="User">
  		<id name="id" type="integer" repository-class="UserRepository">
      		<generator strategy="AUTO" />
      	</id>
      	
      	<field name="name" type="string" />
        <field name="mail" type="string" />
      	<field name="login" type="string" />
      	
      	<many-to-one field="type" target-entity="Type" />
  	</entity>
</doctrine-mapping>
```

E então temos a nossa classe de repositório:

```php
<?php

use Doctrine\ORM\EntityRepository;
use Psyco\Pantheon\Core\User\Entity\User;

class UserRepository extends EntityRepository {
  public function insert (User $user) {
    $this->_em->persist($user);
    $this->_em->flush();
    return $user;
  }
  
  public function update (User $user) {
    $this->_em->flush();
    return $user;
  }
  
  public function delete (User $user) {
    $this->_em->remove($user);
    $this->_em->flush();
  }
}
```

### Utilizando o repository

```php
class UserController {
  private $userRepository;
  public function __construct (
    \UserRepository $userRepository
  ) {
    $this->userRepository = $userRepository;
  }
  
  public function create() {
    $userCollection = $this->userRepository->findAll();
    $user = new User();
    $this->userRepository->insert($user);
  }
}
```

## Instalando o Doctrine

Existem N maneiras de instalar o Doctrine em diversos Frameworks já pré prontos, mas o modo mais simples, utilizando apenas o código segue do composer:

```bash
$ composer install doctrine/orm
```

E então configuramos o entityManager:

```php
//bootstrap.php
require_once "Vendor/autoload.php";

use Doctrine\ORM\Tool\Setup;
use Doctrine\ORM\EntityManager;

$paths = ["path/to/xml-mappings"];
$isDevMode = false;
$dbParams = [
  'driver'		=> 'pdo_mysql',
  'user'		=> 'root',
  'password'	=> '',
  'dbname'		=> 'foo'
];

$config = Setup::createXMLMetadataConfiguration($paths, $isDevMode);
$entityManager = EntityManager::create($dbParams, $config);
```

