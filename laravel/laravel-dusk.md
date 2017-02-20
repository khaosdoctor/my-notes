# Laravel Dusk

O Dusk é uma ferramenta de testes automátizados de Browser desenvolvida pela equipe do Laravel Framework, atualmente disponível a partir da versão 5.4.

Com ele é possível simular cliques, formulários, navegação e muito mais coisas de forma simples e rápida.

> Todo o conteúdo deste tutorial está [na documentação oficial do Dusk](https://laravel.com/docs/5.4/dusk)

## Instalação

Primeiramente precisamos instalar a dependencia do Dusk, uma vez que ele não vem por padrão em uma instalação limpa.

```sh
composer require laravel/dusk
```

Uma vez instalado, adicione o seguinte no arquivo `config/app.php` na seção de _service providers_: `Laravel\Dusk\DuskServiceProvider::class`.

Execute o comando `php artisan dusk:install` para finalizar a instalação e criar os diretórios correspondentes.

## Configuração

Uma vez instalado, um diretório Browser será criado dentro da pasta Tests e vai conter um exemplo de teste.

É necessário setar a URL da aplicação no arquivo `.env` através da constante `APP_URL`, que deve ser exatamente a URL que você está utilizando (localmente ou no CI) para acessar o arquivo. Ex: `localhost:8000`.

## Rodando os testes

Para rodar os testes é necessário que, primeiro, sejam iniciados os serviços do artisan como o `serve`, rodando o comando `php artisan serve` e outros como o serviço de queues com o `php artisan queue:listen` antes de executar `php artisan dusk` para iniciar todos os testes.

> O comando do Artisan para o Dusk aceita todos os parâmetros que também são aceitos pelo PHPUnit

## Criando testes

Para criar os testes vamos usar o comando do Artisan `dusk:make`, todos os testes serão colocados no diretório `tests/browser`:

```sh
php artisan dusk:make <TestName>
```

### Rodando em ambientes secundários

Para fazer com que o Dusk rode os testes em outro ambiente, basta criar na raiz do projeto um arquivo com a seguinte estrutura: `.env.dusk.{ambiente}`, por exemplo, se você quiser criar um ambiente local para seus testes, crie um arquivo `.env.dusk.local`.

### Utilizando múltiplos browsers

Em alguns casos é necessário que os testes sejam feitos com mais de um browser, como por exemplo em um chat aonde é necessário dois browsers para interagir um com o outro.

Para isto basta "pedir" por mais um browser no método *browse* (que automaticamente leva um browser como parâmetro), desta forma:

```php
<?php
$this->browse(function ($first, $second) {
    $first->loginAs(User::find(1))
          ->visit('/home')
          ->waitForText('Message');

    $second->loginAs(User::find(2))
           ->visit('/home')
           ->waitForText('Message')
           ->type('message', 'Hey Taylor')
           ->press('Send');

    $first->waitForText('Hey Taylor')
          ->assertSee('Jeffrey Way');
});
```

Note que `$first` é um browser e `$second` é outra janela.

## Interação

Por ser um framework de testes de browser, o Dusk permite que você interaja pelo código com a tela do browser e clique em links ou use eventos.

### Clicando em links

Para clicar em um link utilizamos o método `clickLink`, que irá clicar no link que tiver o mesmo texto do parâmetro enviado:

```php
$browser->clickLink($linkText);
```

### Atributos, textos e values

Além de links, é possível obter o valor de um atributo, texto ou valor de determinado elemento.

#### Valores

Para obter um valor de um elemento dado um seletor, use o método `value`:

```php
$value = $browser->value('selector');
```

Agora, se o objetivo é setar um valor, passe um segundo parâmetro:

```php
$browser->value('selector', 'value');
```

Onde o selector segue o mesmo padrão do jQuery e o Sizzle.

#### Atributos

Para buscar atributos basta utilizar o método _Attribute_ passando um selector e um nome de atributo:

```php
$attribute = $browser->attribute('selector', 'value');
```

#### Texto

Para trazer o texto de um elemento dado um seletor, use `text`:

```php
$text = $browser->text('selector');
```

### Formulários

O Dusk permite a interação com formulários de acordo com o elemento ou o input que é necessário.

#### Digitando valores em caixas de texto

Para interagir com qualquer tipo de input que seja do tipo texto, use o método `type`:

```php
$browser->type('<selector>', '<value>');
```

> Nota: O seletor não é necessário no método, se ele não for passado, o framework vai tentar encontrar um input com o atributo `name`. Se nenhum input for encontrado, o Dusk vai tentar encontrar uma TextArea.

Para limpar o input digite:

```php
$browser->clear('email');
```

#### Dropdowns

Para selecionar um dropdown, basta utilizar o método `select`, assim como o `type`. Novamente a nota anterior se aplica, se nenhum seletor for enviado, o Dusk irá procurar um dropdown com o atributo `name` que se aplique.

```php
$browser->select('<selector>', '<value>');
```

#### Checkboxes

Para utilizar o checkbox basta utilizar o método `check`, da mesma forma como os demais, se nenhum seletor for enviado, o dusk vai procurar pelo atributo `name`:

```php
$browser->check('<selector>');

$browser->uncheck('<selector>');
```

#### Radio Buttons

Para selecionar um Radio Button, podemos utilizar o método `radio`, se nenhum seletor for enviado, o Dusk irá buscar por atributos `name` e `value`:

```php
$browser->radio('<selector>', '<value>');
```

#### Arquivos

Para trabalhar com arquivos, utilizamos o método `attach`, este método irá buscar o seletor definido, se o mesmo não existir, irá buscar o atributo `name` correspondente:

```php
$browser->attach('<selector>', 'caminho/do/arquivo.png');
```

### Usando o teclado

O método `keys` permite que você envie combinações complexas de teclas através do teclado a um elemento. Por exemplo, você pode simular o pressionamento prolongado de teclas de controle (`ctrl+c` por exemplo). No exemplo abaixo vamos segurar `shift` enquanto digitamos algo no input, depois vamos soltar o `shift` e digitar outra coisa:

```php
$browser->keys('<selector>', ['{shift}','Estou segurando o shift'], 'soltei o shift');
```

É possível também enviar atalhos com:

```php
$browser->keys('<selector>', ['{command}', 'j']);
```

No exemplo acima estamos enviando o equivalente a `ctrl+j`.

> Todas as constantes e nomes de teclas modificadores entre as chaves `{}` estão descritas no [documento oficial do Facebook webdriver](https://github.com/facebook/php-webdriver/blob/community/lib/WebDriverKeys.php) (basta olhar os consts).

### Usando o Mouse

