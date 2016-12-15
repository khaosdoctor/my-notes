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

### Incluindo parâmetros com magic methods

Uma curiosidade é que, no lugar de escrever:

```php
view('listagem')->with('produtos', $produtos);
```

Você pode chamar um método `withProdutos`:

```php
view('listagem')->withProdutos($produtos);
```

O nome da variável na view seria como ela seria chamada quando for enviada para a mesma, e o segundo parametro seria o conteudo.

### Passando um array de dados para a view

Existem diversas outras formas de passar os dados para a view, além do método with. Uma das mais conhecidas e utilizadas é passando um array como segundo parâmetro do método view. Em vez de fazer:

`view('listagem')->with('produtos', $produtos);`

Você faria algo como:

`return view('listagem', ['produtos' => $produtos]);`
Ou extraindo o array para uma variável:

```php
$data = ['produtos' => $produtos];
return view('listagem', $data);
```

Ou ainda criando o array e adicionando cada item manualmente:

```php
$data = [];
$data['produtos'] = $produtos;
return view('listagem', $data);
```

### Métodos: exists e file

Outro ponto é que você pode verificar a existência de uma view com o método exists:

```php
if (view()->exists('listagem'))
{
    return view('listagem');
}
```

Ou mesmo usar o método file para gerar a view a partir de um caminho/diretório diferente:

`view()->file('/caminho/para/sua/view');`

### Incluindo CSS

Para incluirmos o CSS podemos apenas incluir na tag `link` o caminho `/css/app.css`.

> O Laravel por padrão já vem com o Bootstrap instalado internamente no arquivo app.css

## QueryString

Quando quisermos exibir apenas um produto, por exemplo, exibir o produto. Primeiro vamos criar um novo método no nosso controller de produtos que vai chamar uma nova view que exibirá apenas um produto

```php
class ProdutoController extends Controller {
  public function detalhe() {

    $produtos = DB::select('<query> WHERE <filtro>');
    return view('<nome da view>')->with('p', $produto[0]);
  }
}
```

Inclusive podemos enviar um parâmetro no where, para que possamos passá-lo mais facilmente:

```php
$produtos = DB::select('<query> WHERE <campo> = ?', [<campoValor>]);
```

Para cada `?` adicionado uma nova posição do array pode ser criada.

E na view:

```php
<h1>Detalhes do produto <?= $p->nome ?></h1>
. . .
```

Mas e como fazemos para buscar o QueryString?

### Request

Estamos setando um valor fixo no filtro da query, para podermos mandar esse valor dinamicamente, podemos simplesmente alterar nosso HTML na view para que ele atualize com o ID do produto:

```php
<table>
  <tr>
    <td> <?= $p->nome ?> </td>
    <td> <a href="/produto?id="<?= $p->id ?>>
        Visualizar
      </a>
    </td>
  </tr>
</table>
```

E então precisamos pegar o query string da URL, para isso vamos editar nosso controller para que possamos pegar essa variável.

Em nossa função, vamos editar o método que mostra o detalhe do produto:

```php
use Request;

class ProdutoController extends Controller {
  public function detalhe() {

    $id = Request::input('id');
    $produtos = DB::select('<query> WHERE <filtro> = ?', [$id]);
    return view('<nome da view>')->with('p', $produto[0]);
  }
}
```

Note que temos que utilizar o `use` para importarmos o pacote do namespace. Bem como utilizar o método `input` da classe para podermos utiliza-lo como parâmetro.

> De forma mais simples podemos criar um valor padrão para o input utilizando `Request::input('nome', 'default')`

#### Outros métodos da Request

a Request tem uma variedade bem grande de métodos que nos ajudam em trabalhos como esse. Por exemplo, quer saber se existe um parâmetro específico na requisição? Que tal fazer:

```php
<?php
if (Request::has('id'))
{
  // faz alguma coisa
}
```

Há ainda o método all, que retorna um array com todos os parâmetros da requisição, os métodos only e except, com que você pode restringir quais parâmetros quer listar.

```php
<?php
// lista todos os params
$input = Request::all();

// apenas nome e id
$input = Request::only('nome', 'id');

// todos os params, menos o id
$input = Request::except('id');
```

Há também métodos como url, que retorna a URL da request atual, ou o path que retorna a URI. Por exemplo, em uma requisição para o método mostra, ao fazer:

```php
<?php
$url = Request::url();
O valor da $url seria http://localhost:8000/produtos/mostra, mas já no caso do path:

$uri = Request::path();
```

E toda a informação pode ser encontrada na [documentação](https://laravel.com/docs/5.3/requests).

## Recursos

Da mesma forma da query string, podemos acessar um recurso como `url/produto/id`, para ficar um pouco mais semantico.

Para isso funcionar vamos precisar editar nosso arquivo de rotas para adicionar um novo parâmetro depois do recurso.

```php
<?php
Route::get('/produto/{id}', 'ProdutoController@detalhe');
```

Agora precisamos trocar o input do request no nosso controller:

```php
use Request;

class ProdutoController extends Controller {
  public function detalhe() {

    $id = Request::route('id');
    $produtos = DB::select('<query> WHERE <filtro> = ?', [$id]);
    return view('<nome da view>')->with('p', $produto[0]);
  }
}
```

> Note que mudamos de `input` para `route`.

E quanto ao valor default? Quando estávamos usando o método input, nosso código estava assim:

```php
$id = Request::input('id', '0');
```

Por que não fizemos o mesmo com o route? A resposta é simples: o `{id}` da rota agora é obrigatório! Se não passar, não entra no método e ponto-final. Se você quiser que o id do final da url seja opcional, você precisará deixar isso explícito no momento de registrar sua rota.

```php
Route::get('/produtos/mostra/{id?}', 'ProdutoController@mostra');
```

Repare que há uma `?` após o id indicando que ele é opcional.

Isso não é tudo, o Laravel nos oferece uma forma ainda mais interessante de recuperar parâmetros da URL. Basta adicionar um argumento com o mesmo nome do parâmetro na assinatura do seu método, ele vai ser populado. Veja como fica o método do controller:

```php
public function mostra($id){

    $resposta = DB::select('select * from produtos where id = ?', [$id]);

    if(empty($resposta)) {
        return "Esse produto não existe";
    }
    return view('detalhes')->with('p', $resposta[0]);
}
```

Note que em nenhum momento precisamos usar a `Request`, o framework faz esse trabalho por nós.

### Alguns cuidados necessários com recursos de rotas

Quando estamos usando parâmetros na URL, sempre precisamos nos atentar a alguns detalhes. Por exemplo, em algum momento falamos que o id precisaria ser um número? Não. Isso significa que eu consigo acessar o método pela seguinte URL:

- http://localhost:8000/produto/teste

Claramente isso não deveria acontecer. Por nossa sorte, a única consequência aqui será ver a mensagem de que o produto não foi encontrado. Mas existem problemas piores, como ambiguidade entre rotas.

Em nosso caso, isso seria um pouco difícil, mas imagine que para simplificar optássemos por remover o `/produto` de nossa URL. Isso causaria sérios problemas, pois as seguintes URLs seriam equivalentes:

- http://localhost:8000/1
- http://localhost:8000/adiciona

Já que o `{id}` pode ser qualquer coisa, inclusive um texto, ele pode ser a palavra adiciona. Em outras palavras, dependendo da ordem em que eu registrar as rotas, pode acontecer de eu acessar `/produto/adiciona` e a aplicação me responder que esse produto não existe.

Nesse caso, precisaríamos de alguma forma ensinar ao Laravel que o `{id}` da rota sempre será um número. Isso pode ser feito com auxilio do método `where`, como no exemplo:

```php
Route::get(
  '/produtos/mostra/{id}', 
  'ProdutoController@mostra'
  )
  ->where('id', '[0-9]+');
```

Observe que estamos passando para o método where o nome do parâmetro e uma expressão regular com o _pattern_ que pode ser seguido.

## Blade

Blade é um template Engine que é implementado no Laravel assim como o JSX ou o EJS é implementado no Node.

Todo arquivo blade __precisa__ ter uma extensão `.blade.php`

### Templates

Para criarmos um template que será seguido por todas as páginas, podemos pegar apenas as partes repetidas das nossas views (como o cabeçalho e o rodapé) e criar um novo arquivo html na pasta de views.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Titulo</title>
</head>
<body>
<conteudo>
</body>
</html>
```

Repare que o conteúdo é apenas o miolo de nosso HTML. Vamos indicar que é nesta parte que vamos colocar o conteúdo do nosso site:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Titulo</title>
</head>
<body>
  @yield('conteudo')
</body>
</html>
```

> Podemos usar qualquer nome ao invés de 'conteudo'

Agora em nossas páginas reais (aonde está o conteúdo), vamos colocar uma marcação indicando que o arquivo estende um template, e também que ele é o conteúdo de fato

```html
@extends('<nome do template>')

@section('conteudo')
<table>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
</table>
@stop
```

> O nome do template é o nome que demos a view que criamos anteriormente.

Veja que o `@section` define um pedaço de código, um include que poderá ser reutilizado em outros arquivos, mas precisamos colocar o mesmo nome da variável do `@yield` no template.

> Não se esqueça de mudar os nomes das extensões das views para `.blade.php`

### Echo

Utilizamos normalmente as tags `<?= ?>` para printar os resultados das variáveis na tela em um html, no blade podemos apenas circundar com duas chaves:

```php
<table>
  <tr>
    <td> {{$p->nome}} </td>
    <td> <a href="/produto/{{$p->id}}">
        Visualizar
      </a>
    </td>
  </tr>
</table>
```

> Podemos definir valores padrões para variáveis usando o `or` (`{{$p->id or Sem valor}}`)

### Loops

Podemos substituir os loops do foreach por algo mais simples:

```php
<table>
  @foreach($produtos as $p)
  <tr>
    <td> {{ $p->nome }} </td>
  </tr>
  @endforeach
</table>
```

Além do foreach, também podemos fazer o mesmo com o for tradicional:

```php
@for ($i = 0; $i < 10; $i++)
    O indice atual é {{ $i }}
@endfor
```

Ou ainda com um while:

```php
@while (true)
    Entrando em looping infinito!
@endwhile
```

Ha ainda uma variação bastante interessante, chamada forelse. Se a lista for vazia, ele executa o código do bloco marcado com @empty:

```php
@forelse($produtos as $p)
    <li>{{ $p->nome }}</li>
@empty
    <p>Não tem nenhum produto!</p>
@endforelse
```

> Podemos usar tanto `{{ $var }}` como `{{$var}}`

### Ternários condicionais

Podemos utilizar ternários para operar sobre variáveis e devolver valores que serão printados no HTML, como, por exemplo, pintar um item se ele estiver fora de estoque:

```html
<table>
  @foreach($produtos as $p)
  <tr class='{{ $p->quantidade <= 1 ? "danger" : "" }}'>
    <td> {{ $p->nome }} </td>
  </tr>
  @endforeach
</table>
```

Neste exemplo caso a quantidade em estoque seja menor ou igual a 1 terá a classe danger.

### Condicionais completos

Podemos fazer um if verificando se a lista de produtos está vazia, e se estiver, mostrar uma mensagem de que não existe nenhum produto cadastrado. Em PHP puro, o código ficaria assim:

```php
<?php if(empty($produtos)) { ?>

<div class="alert alert-danger">
  Você não tem nenhum produto cadastrado.
</div>

<?php } else { ?>

  <h1>Listagem de produtos</h1>
  <table>

  <? foreach ($produtos as $p) { ?>
?>
<!-- continuação do código -->

<?php } ?> <!-- fechando o foreach -->
<?php } ?> <!-- fechando o else -->
```

Com Blade:

```html
@if(empty($produtos))

<div class="alert alert-danger">
  Você não tem nenhum produto cadastrado.
</div>

@else

  <h1>Listagem de produtos</h1>
  <table>

  @foreach ($produtos as $p)
  <!-- continuação do código -->
  @endforeach

@endif
```

A ausência das chaves e tags do PHP ajuda bastante, nosso código fica mais simples e legível. O arquivo listagem.blade.php completo pode ficar assim:

```html
@extends('principal')

@section('conteudo')

 @if(empty($produtos))
  <div>Você não tem nenhum produto cadastrado.</div>

 @else
  <h1>Listagem de produtos</h1>
  <table class="table table-striped table-bordered table-hover">
    @foreach ($produtos as $p)
    <tr>
      <td> {{$p->nome}} </td>
      <td> {{$p->valor}} </td>
      <td> {{$p->descricao}} </td>
      <td> {{$p->quantidade}} </td>
      <td>
        <a href="/produtos/mostra/{{$p->id}}>">
          <span class="glyphicon glyphicon-search"></span>
        </a>
      </td>
    </tr>
    @endforeach
  </table>

  @endif
@stop
```

Além do `@if` e `@else`, você também pode usar `@elseif` ou mesmo o `@unless`, que faz a condição inversa. Por exemplo, no caso a seguir, o valor condicionado sempre será exibido:

```html
    @unless (1 == 2)
      Esse texto sempre será exibido! 
    @endunless
```