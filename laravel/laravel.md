# Laravel

Framework de desenvolvimento rápido para PHP, permite um reaproveitamento de código muito bom usando técnicas MVC e outros helpers.

## Modelo MVC

A grande ideia desse padrão arquitetural é que você separe suas regras de negócio em 3 camadas, cada uma com sua responsabilidade muito bem definida:

- __Model__ é a camada onde ficam nossas regras de negócio, nossas entidades e classes de acesso ao banco de dados.
- __View__ é a responsável por apresentar as páginas e outros tipos de resultado para o usuário (ou mesmo para outros sistemas, que se comunicam). É a resposta que o framework envia para o navegador, que normalmente é um HTML.
- __Controller__ é quem cuida de receber as requisições web e decidir o que fazer com elas. Nessa camada definimos quais modelos devem ser executados para determinada ação e para qual view vamos encaminhar a resposta. Em outras palavras, essa camada quem faz o link entre todas as outras.

![](http://s3.amazonaws.com/caelum-online-public/laravel/mvc-com-laravel.png)

Repare que, quando nosso cliente envia uma requisição pelo navegador, primeiramente temos um arquivo PHP, que é o routes.php, que está frente de todos. Ele cuida de atender as requisições e enviá-las para o local correto, no caso os nossos controllers.

Os controllers, por sua vez, decidem o que fazer com as requisições, passando pela camada de model (que fazem acesso ao banco, executam as regras de negócio etc.) e logo em seguida delegam pra ::view:: que será exibida como resposta no navegador do cliente.

## Instalação

Para instalar basta executar o comando `composer global require "laravel/installer"` (como está descrito no site oficial) e aguardar a instalação finalizar. 

Após esse processo o comando `laravel` deverá estar habilitado.

## Novo projeto

Para criar um novo projeto executamos `laravel new <projeto>`, isto vai criar uma estrutura de pastas dentro da nossa pasta atual com o nome do nosso projeto.

> Nesta nota vou estar usando a versão 5 do framework, para forçar a criação de um projeto usando o Laravel 5.0 use: `composer create-project laravel/laravel <nome> "5.0."`.

### Configurações

O framework faz todo o possível para que você não precise ficar configurando nada, mas em alguns momentos isso pode ser necessário. Se algo de que você precisa não está configurado por default, como por exemplo o locale, você pode fazer isso facilmente pelo arquivo de configurações presente em `<projeto>/config/app.php`.

### Estrutura de pastas

Esta é a estrutura de pastas do sistema (as mais importantes pelo menos):

- __app__: nela ficam seus modelos, views e controllers, que serão bem detalhados na próxima aula. Em poucas palavras, é onde boa parte do seu código vai ficar. Ela possui uma série de subdiretórios, como Commands, Console, Http, Events, entre outros. Não se preocupe em entender o significado de cada um deles agora, vamos vê-los melhor conforme formos precisando.
- __config__: como o nome já indica, é onde ficam os arquivos de configuração do seu projeto. Se você precisar alterar as configurações de cache, e-mail, banco de dados, entre outras, já sabe onde encontrar.
- __public__: é a pasta pra onde seu web server vai apontar. Lá fica o arquivo index.php, que aponta para sua aplicação. Além disso, é comum colocarmos os arquivos css, imagens, javascript e todos os demais arquivos públicos nesse diretório.
- __vendor__: é onde fica o source code do Laravel, plugins e outras dependências. Tudo que você usar de terceiros (bibliotecas, frameworks etc.) deve ficar nela.

O resto da estrutura está [aqui](http://laravel.com/docs/5.0/structure).

### Artisan Serve

Pra subir o server e testar, usamos o `php artisan serve`. O Artisan é uma ferramenta de linha de comando já inclusa no framework. Ela nos oferece uma série de comandos úteis para tornar nosso desenvolvimento mais produtivo.

O comando `serve` pode ser executado com `php artisan serve` e vai criar um servidor local na porta 8000 para rodar a aplicação.

#### Artisan Name

O namespace padrão de toda aplicação com Laravel é App, mas é muito comum e bastante recomendado que você altere o namespace para o nome da sua aplicação. Como fazer isso? É muito fácil, basta rodar um simples comando e pronto.

Para mudar o namespace, por exemplo, podemos usar o php artisan app:name. Vamos mudá-lo para o nome do projeto. Basta executar o seguinte comando pelo terminal, dentro da pasta de seu projeto:

`php artisan app:name <nome>`

### Rotas

O arquivo de rotas é o principal arquivo para onde o Laravel vai apontar as ações dos controllers.

Queremos ensinar o framework como queremos que ele reaja quando alguém acessar determinada URL, isto é, criar as nossas próprias rotas.

Quando acessamos `http://localhost:8000/`, ou seja, a URL `/` da nossa aplicação, em algum lugar foi configurado que a página padrão do Laravel deveria ser exibida, não é? Esse trabalho é feito no o arquivo routes.php. O arquivo de rotas se encontra em `routes/web.php` e contem algo assim:

> Na versão 5 o caminho é `app/Http/routes.php`

```php
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
```

O objeto `Route` é um provider que realiza o proxy para o direcionamento de rotas.

As rotas podem retornar uma view ou qualquer tipo de texto ou html válido como em:

```php
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return '<h1>Produtos</h1>';
});
```

Em caso de ambiguidade sempre a última rota é quem será registrada. Há outras formas de lidar com ambiguidade, como quando usamos diferentes métodos HTTP, mas entraremos nesse assunto um pouco mais à frente.

## Controllers

Um controller é um gerenciador de ações e lógica da aplicação, por exemplo, um controller para mostrar todos os produtos é o método que vai listar tudo que existe no banco.

No lugar de definir todas as lógicas do nosso sistema nesse arquivo único, o `routes.php`, vamos organizá-las desde o início em Controllers distintos.

Vamos criar um novo arquivo chamado `ProdutoController`, dentro da pasta `app/Http/Controllers`, que é o diretório padrão para esse tipo de classe. Dentro do controller, crie um método chamado lista. O arquivo `ProdutoController.php` ficará assim.


```php
<?php

class ProdutoController {

}
```

Como nosso controller está em uma outra pasta, vamos ter que criar um novo namespace e mostrar aonde nosso controlador está.

```php
<?php

namespace <nome da app>\Http\Controllers;

class ProdutoController {

}
```

Todos os controles do Laravel __precisam__ herdar de uma classe padrão do Laravel chamado `Controller`

```php
<?php

namespace <nome da app>\Http\Controllers;

class ProdutoController extends Controller {

}
```

Criamos uma função aqui que retornaria o mesmo texto que temos nas rotas:

```php
<?php

namespace <nome da app>\Http\Controllers;

class ProdutoController extends Controller {
  public function lista() {
    return 'Um texto aqui';
  }
}
```

Depois precisamos editar o nosso arquivo de rotas para incluir nossa lógica do controller:

```php
<?php

Route::get('/', 'ProdutoController@lista');
```

Sempre utilizamos a lógica de nomenclatura `<nomeController>@<Método>`.

## Conexões com banco de dados

As Conexões com bancos de dados no Laravel são extremamente simples.

Primeiramente temos que mostrar ao framework qual é a base de dados que vamos utilizar e também qual é o tipo de cliente que estaremos utilizando.

Inicialmente vamos apenas mudar o arquivo `config/database.php`:

```php
    'mysql' => [
      'driver'    => 'mysql',
      'host'      => env('DB_HOST', 'localhost'),
      'database'  => env('DB_DATABASE', 'forge'),
      'username'  => env('DB_USERNAME', 'forge'),
      'password'  => env('DB_PASSWORD', ''),
      'charset'   => 'utf8',
      'collation' => 'utf8_unicode_ci',
      'prefix'    => '',
      'strict'    => false,
    ],
```

Vamos apenas editar os dados padrões:

```php
    'mysql' => [
      'driver'    => 'mysql',
      'host'      => env('DB_HOST', '<Host do banco>'),
      'database'  => env('DB_DATABASE', '<base de dados>'),
      'username'  => env('DB_USERNAME', '<username>'),
      'password'  => env('DB_PASSWORD', '<senha>'),
      'charset'   => 'utf8',
      'collation' => 'utf8_unicode_ci',
      'prefix'    => '',
      'strict'    => false,
    ],
```

### Conectando com o banco de dados

No nosso controller vamos editar uma linha para podermos realizar uma nova consulta no banco:

```php
<?php

namespace <nome da app>\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ProdutoController extends Controller {
  public function lista() {

    $produtos = DB::select('<query>');
    return 'Um texto aqui';
  }
}
```

A classe `DB` é um helper para conexões de banco de dados. Note que temos que importar o namespace da classe para que possamos usá-la no projeto.

> Para exibir, podemos utilizar a instrução `dd($produtos)` que é um **D**ata **D**ump dos produtos, o equivalente a um `print_r` mais bonito.

Para acessarmos os objetos do banco de dados, podemos usar a notação de objetos:

```php
<?php

foreach $produtos as $p {
  echo $p->coluna;
}
```

### Modo Debug

Quando o Laravel encontra um erro, uma tela genérica é apresentada, porém precisamos de mais descrições deste erro. Para isso, basta editarmos o arquivo `.env` que é o responsável pela definição das variáveis de ambiente.

Inicialmente ele estará assim:

```env
APP_ENV=local
APP_DEBUG=true
APP_KEY=GEoF8Hb5gBZbDVbSIZhahB1tmBo5Gwa6

DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret

CACHE_DRIVER=file
SESSION_DRIVER=file
```

Vamos remover tudo deixando apenas:

```
APP_DEBUG=true
```

## Views

As views de exibição para o usuário ficam dentro da pasta `resources/views`. Estas views podem ser criadas usando HTML normal, ou então o template engine chamado _blade_.

Com o html + php podemos utilizar algo do tipo:

```php
<table>
  <?php foreach($produtos as $p): ?>
  <tr>
    <td> <?= $p->nome ?> </td>
  </tr>
  <?php endforeach ?>
</table>
```

Agora que temos nossas views, vamos avisar o Controller que não queremos mais printar o HTML, mas sim a view que criamos:

```php
class ProdutoController extends Controller {
  public function lista() {

    $produtos = DB::select('<query>');
    return view('<nome da view>');
  }
}
```

Mas vamos ter um problema quando precisarmos renderizar isso, porque a variável `$produto` não existe na view, então vamos enviar esse dado como parâmetro, mudando a linha `return view('<nome da view>');` para `return view('<nome da view>')->with('<nome da variável na view>, $produtos);`.

O nome da variável na view seria como ela seria chamada quando for enviada para a mesma, e o segundo parametro seria o conteudo.

### Incluindo CSS

Para incluirmos o CSS podemos apenas incluir na tag `link` o caminho `/css/app.css`.

> O Laravel por padrão já vem com o Bootstrap instalado internamente no arquivo app.css