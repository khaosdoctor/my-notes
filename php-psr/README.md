# PHP PSR's

Conjunto de especificações para buscar um desenvolvimento colaborativo padrão em aplicativos PHP ([Site](http://www.php-fig.org)):

- PSR-4 / PSR-0: Autoload
- PSR-3 / PSR-7: Interfaces
- PSR-1 / PSR-2: Estilos de codificação

## PSR-1: Organização de código

- Sempre utilizar as tags do PHP no formato `<?php` ou `<?=`
- Sempre utilizar a codificação UTF-8
- Nomenclaturas de classes devem seguir o `StudlyCaps`
- Constantes de classe são sempre em maiúsculo e com separadores em underscore
- Métodos sempre com `camelCase`

## PSR-2: Complemento de Organização

- Namespaces devem ter uma linha em branco em cima e abaixo
- Declarações de heranças e interfaces são sempre na mesma linha das classes
- Chaves de classes e de métodos sempre na próxima linha
- Chaves de estruturas de controle de fluxo (if, else, for) devem estar na mesma linha do if
- Sem espaços entre parenteses e parâmetros
- Espaços entre parentesese nome do método

## PSR-3: Interfaces de Log

No mundo desta PSR, as interfaces de log seriam compativeis entre projetos, de forma que você poderia trocar de projetos e manter a mesma interface.

Verificar pasta PSR-3

## PSR-4: Autoload

Para definirmos a PSR-4 utilizando o Composer, precisamos fazer as seguintes alterações no nosso composer JSON:

```json
{
    "require": {
        "monolog/monolog": "^1.21"
    },
    "autoload": {
        "psr-4": {
            "Namespace\\":"caminho/de/leitura"
        }
    }
}
```

Então podemos rodar `composer update` e esperar a atualização dos namespaces.

Em um arquivo de exemplo, poderemos usar nosso pacotes com o autoload do composer:

```php
<?php

require_once "vendor/autoload.php";

$hello = new \App\Hello;
```

Para criarmos um novo namespace, podemos simplesmente seguir o caminho da pasta. Imagine que vamos criar uma outra pasta dentro da estrutura `src/App` com o nome de "Controllers", ficando `src/App/Controllers`.

Podemos então criar um arquivo `IndexController.php` com o conteúdo:

```php
<?php

namespace App\Controllers;

class IndexController
{
  public function getController()
  {
    return "Controller";
  }
}
```

Então basta chamarmos desta forma:

```php
$controller = new \App\Controllers\IndexController;
echo $controller->getController();
```

## PSR-6: Cache

Deine padrões para criação de interfaces de cache.

## PSR-7: Interfaces HTTP

Define padrões de cabeçalho e interfaces para comunicação HTTP.