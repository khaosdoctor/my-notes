# Laravel

Framework de desenvolvimento rápido para PHP, permite um reaproveitamento de código muito bom usando técnicas MVC e outros helpers.

## Instalação

Para instalar basta executar o comando `composer global require "laravel/installer"` (como está descrito no site oficial) e aguardar a instalação finalizar. 

Após esse processo o comando `laravel` deverá estar habilitado.

## Novo projeto

Para criar um novo projeto executamos `laravel new <projeto>`, isto vai criar uma estrutura de pastas dentro da nossa pasta atual com o nome do nosso projeto.

### Artisan Serve

O PHP artisan é uma ferramenta de controle que cria várias funções. Uma delas é o `serve`.

O comando `serve` pode ser executado com `php artisan serve` e vai criar um servidor local na porta 8000 para rodar a aplicação.

### Rotas

O arquivo de rotas é o principal arquivo para onde o Laravel vai apontar as ações dos controllers.

O arquivo de rotas se encontra em `routes/web.php` e contem algo assim:

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

