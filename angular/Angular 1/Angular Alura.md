# Angular 1: Alura

> Curso alura sobre angular 1

<!-- TOC -->

- [Angular 1: Alura](#angular-1-alura)
  - [Descrição](#descri%C3%A7%C3%A3o)
  - [Módulos](#m%C3%B3dulos)
  - [Templates](#templates)
  - [Controllers](#controllers)
    - [Data-Binding](#data-binding)

<!-- /TOC -->

## Descrição

Quando desenvolvemos para back-end geralmente temos uma organização de códigos voltado a um paradigma MVC.

Quando estes desenvolvedores back-end se viram a desenvolver front-end, este código não é muito bem organizado, desta forma temos frameworks que visam trazer o paradigma para o ambiente do client.

Um dos frameworks mais famosos é o Angular.js

## Módulos

O angular é baseado na criação de módulos, como no modelo MVC, o módulo principal é comumente chamado de _main.js_ e fica na pasta _js_, é nele que serão definidos todos os outros módulos secundários ou qualquer outro tipo de configuração.

Inicialmente a sintaxe do angular inicia com a seguinte linha:

```js
angular.module('alurapic', []);
```

Isso significa que estamos criando um módulo chamado AluraPic sem nenhuma dependencia.

Para podermos ligar este módulo com nosso html, vamos adicionar um atributo chamado `ng-app` no nosso html:

```html
<!DOCTYPE html>
<html lang="pt-br" ng-app="alurapic">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Alurapic</title>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <script src="js/lib/angular.min.js"></script>
        <script src="js/main.js"></script>
    </head>
    <body>
        <div class="container">
            <h1 class="text-center">Alurapic</h1>
        </div> <!-- fim container -->        
    </body>
</html>
```

Desta forma o Angular saberá qual é o módulo principal da aplicação, registrando que esta página estará ligada ao módulo do angular.

## Templates

Templates são modelos de visualização aonde lacunas são preenchidas no modelo principal. Por exemplo, vamos adicionar uma imagem ao nosso html, essa imagem pode ser fixa ou dinamica, se quisermos que ela seja dinamica podemos apenas criar uma anotação de que, ali, a imagem será alterada:

```html
<!DOCTYPE html>
<html lang="pt-br" ng-app="alurapic">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Alurapic</title>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <script src="js/lib/angular.min.js"></script>
        <script src="js/main.js"></script>
    </head>
    <body>
        <div class="container">
            <h1 class="text-center">Alurapic</h1>
            <img class="img-responsive center-block" src="{{foto.url}}" alt="{{foto.titulo}}">
        </div> <!-- fim container -->        
    </body>
</html>
```

> Perceba o `{{foto.url}}`, que é um objeto dentro do nosso controlador do angular.

## Controllers

Para gerenciar as _angular expressions_ (que são os atributos com as chaves duplas), vamos precisar de um controller.

É uma boa prática criar cada parte do modelo angular em uma pasta e em um arquivo separado, pois facilita a manutenção.

Quando criamos um controller, precisamos ligar o mesmo a um módulo existente, para isto vamos repetir em cada arquivo a instrução `angular.module('alurapic')` porém sem os `[]`, pois não estamos definindo um novo objeto e sim atrelando coisas a um já existente.

Todo controller é definido por um nome e uma função:

```js
angular.module('alurapic')

  .controller("FotosController", function () {
    var foto = {
      titulo: "Leão",
      url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    };
    
  });
```

Para ligarmos um controller a uma parte do nosso DOM, usamos a diretiva `ng-controller`

```html
<body ng-controller="FotosController">
        <div class="container">
            <h1 class="text-center">Alurapic</h1>
            <img class="img-responsive center-block" ng-src="{{foto.url}}" alt="{{foto.titulo}}">
        </div> <!-- fim container -->        
</body>
```

Além de termos de realizar isso, precisamos também definir um escopo para o controller, usamos a dependencia `$scope`:

```js
angular.module('alurapic')

  .controller("FotosController", function ($scope) {
    var foto = {
      titulo: "Leão",
      url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    };
  });
```

Isso define nosso escopo do controller na view, ou seja, o `$scope` é o dominio de acesso da view, tudo que é disponibilizado pelo controller em `$scope` é visivel na view.

```js
angular.module('alurapic')

  .controller("FotosController", function ($scope) {
    $scope.foto = {
      titulo: "Leão",
      url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    };
  });
```

Note que definimos uma nova variável como uma propriedade do `$scope`.

### Data-Binding

Angular possui um termo apropriado para associação de um dado disponibilizado por um controller para a view: data binding (associação/ligação de dados). Qualquer alteração no dado do controller dispara uma atualização da view sem que o desenvolvedor tenha que se preocupar ou intervir no processo.

Excelente! Conseguimos um resultado semelhante ao que tínhamos antes, com a diferença de que agora a AE (Angular Expression) de nossa view foi processada com os dados fornecidos por `FotosController`. Pode parecer pouco, mas isso abre a porteira para que possamos avançar ainda mais no framework da Google.

