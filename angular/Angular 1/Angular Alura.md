# Angular 1: Alura

> Curso alura sobre angular 1

<!-- TOC -->

- [Angular 1: Alura](#angular-1-alura)
  - [Descrição](#descri%C3%A7%C3%A3o)
  - [Módulos](#m%C3%B3dulos)
  - [Templates](#templates)
  - [Controllers](#controllers)
    - [Data-Binding](#data-binding)
  - [Diretivas](#diretivas)
    - [ng-repeat](#ng-repeat)
  - [$http](#http)
  - [Diretivas personalizadas](#diretivas-personalizadas)
    - [Templates externos](#templates-externos)
  - [Filtrando dados](#filtrando-dados)
    - [Utilizando Models](#utilizando-models)
      - [Pseudo-classes](#pseudo-classes)
  - [Views, rotas e partials](#views-rotas-e-partials)
    - [LocationProvider e modo HTML5](#locationprovider-e-modo-html5)
  - [Formulários com AngularJS](#formul%C3%A1rios-com-angularjs)
    - [Validação de Formulários](#valida%C3%A7%C3%A3o-de-formul%C3%A1rios)
      - [Outras diretivas](#outras-diretivas)

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

## Diretivas

### ng-repeat

É um loop baseado em uma ou mais propriedades de um controller.

Basicamente a diretiva `ng-repeat` fica colocada no elemento que será repetido.

No nosso controller temos uma lista de fotos:

```js
.controller("FotosController", function ($scope) {
  $scope.fotos = [{
    titulo: "Leão",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  },
  {
    titulo: "Leão2",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    },
  {
    titulo: "Leão3",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  },
  {
    titulo: "Leão4",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  }];
});
```

E então em nossa view, podemos usar a diretiva `ng-repeat`:

```html
<div class="panel panel-default" ng-repeat="foto in fotos">
                <div class="panel-heading">
                    <h3 class="panel-title text-center">{{foto.titulo}}</h3>
                </div>
                <div class="panel-body">
                    <img class="img-responsive center-block" src="{{foto.url}}" alt="{{foto.titulo}}">
                </div><!-- fim panel-body -->
            </div><!-- fim panel panel-default -->
```

Perceba que `ng-repeat="foto in fotos"` não é uma angular expression, mas sim uma expressão javascript.

## $http

O `$http` é um serviço de chamadas HTTP, ele é muito utilizado para chamadas ReST em API's.

Para preencher nossa lista, vamos utilizar uma URL própria que já temos em nossa base de dados simples.

Para injetarmos o `$http` no controller, vamos ter que colocar novamente uma nova dependencia no controller.

```js
angular.module('alurapic')

.controller("FotosController", function ($scope, $http) {
  $scope.fotos = [{
    titulo: "Leão",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  },
  {
    titulo: "Leão2",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    },
  {
    titulo: "Leão3",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  },
  {
    titulo: "Leão4",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  }];
});
```

Vamos transformar o nosso array de fotos em um objeto em branco: `$scope.fotos = [];`

Agora fazemos nossa requisição:

```js
$http.get('v1/fotos')
      .then(function (fotos) {
        $scope.fotos = fotos.data;
      })
      .catch(function (err) { 
        console.error(err);
      });
```

O `$http` é uma promise, ou seja, ela é uma chamada assíncrona, que retorna uma promessa de execução.

Existe um modelo menos verboso que podemos usar para escrever menos:

```js
$http.get('v1/fotos')
      .success(function (fotos) {
        $scope.fotos = fotos;
      })
      .error(function (err) { 
        console.error(err);
      });
```

## Diretivas personalizadas

Diretivas personalizadas são usadas para diminuir a complexidade de uma marcação HTML ou um novo elemento.

Vamos criar um novo módulo de diretivas em um novo arquivo. Depois vamos marcar que o módulo principal é dependente deste novo módulo de diretivas `angular.module('alurapic', ['all-directives']);`.

Uma diretiva deve __sempre__ retornar um DDO (_Directive Definition Object_).

O DDO contém algumas opções:

- _Restrict_: Podem ser combinados (`AE`)
  - `A`: Attribute, define um novo atributo
  - `E`: Element, define um novo elemento HTML
- _Scope_: É o contexto na qual a diretiva está inserida, aqui é aonde passaremos atributos da mesma, por exemplo, se receberemos um atributo chamado "Titulo", vamos defini-lo aqui.
- _Template_: Aqui definiremos o html que será substituido na diretiva.

```js
(function () {
  angular.module('allDirectives', [])
    .directive('painelFotos', function () {
    
      return {
        restrict: "AE",
        scope: {
          titulo: '@'
        },
        template:
        '<div class="panel panel-default">'+
        '        <div class="panel-heading">'+
        '           <h3 class="panel-title text-center">{{titulo}}</h3>'+
        '       </div>'+
        '       <div class="panel-body">'+
        '       </div>'+
        '</div>'
      };

    })
})()
```

> Note que a propriedade titulo está com um `@`, isso significa que o valor passado será literal, ou seja, uma string.

> É importante notar que a diretiva precisa ser em camelCasing, mas quando virar uma tag HTML, a mesma se transforma em hífen. Logo, `painelFotos` viraria `painel-fotos`. Sendo chamado da seguinte maneira:

```html
<painel-fotos ng-repeat="foto in fotos" titulo="{{foto.titulo}}">
    <img class="img-responsive center-block" src="{{foto.url}}" alt="{{foto.titulo}}">
</painel-fotos>
```

Neste caso, os elementos filhos não serão mantidos, ou seja, a imagem não vai ser exibida. Para isso vamos utilizar o _transclude_. O transclude vai manter os elementos marcados com a diretiva `ng-transclude`, vamos alterar a nossa diretiva:

```js
(function () {
  angular.module('allDirectives', [])
    .directive('painelFotos', function () {
    
      return {
        restrict: "AE",
        transclude: true, //Veja o Transclude
        scope: {
          titulo: '@'
        },
        template:
        '<div class="panel panel-default">'+
        '        <div class="panel-heading">'+
        '           <h3 class="panel-title text-center">{{titulo}}</h3>'+
        '       </div>'+
        '       <div class="panel-body" ng-transclude>'+ //Criamos a marcação que será mantida
        '       </div>'+
        '</div>'
      };

    })
})()
```

### Templates externos


Podemos remover aquela marcação de concatenação de strings na diretiva, vamos criar um novo arquivo com o template:

```html
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title text-center">{{titulo}}</h3>
  </div>
  <div class="panel-body" ng-transclude>
  </div>
</div>
```

Agora vamos trocar a propriedade `template` por `templateUrl`:

```js
(function () {
  angular.module('allDirectives', [])
    .directive('painelFotos', function () {
    
      return {
        restrict: "AE",
        transclude: true,
        scope: {
          titulo: '@'
        },
        templateUrl: "../partials/painel-fotos.html"
      };

    })
})()
```

E nela colocamos a url do template, sempre partindo da pasta raiz.

## Filtrando dados

Podemos fazer com que os usuários possam filtrar os dados de suas pesquisas, para isto vamos utilizar uma nova marcação para criar um formulário de envio:

```html
<div class="row">
  <div class="col-md-12">
    <form action="">
      <input type="text" class="form-control" placeholder="filtrar">
    </form>
  </div>
</div>
```

Assim temos uma nova linha com um formulário de filtro.

### Utilizando Models

Para filtrar estes dados, temos que ter a capacidade de utilizar uma string (capturada em tempo real) em uma variável JavaScript. Não podemos utilizar uma angular expression, porque as mesmas são apenas leitura, vamos utilizar então a diretiva `ng-model`.

Primeiramente, criamos uma variável dentro do nosso controller chamada filtro com `$scope.filtro`, e utilizaremos a diretiva no nosso input:

```html
<div class="row">
  <div class="col-md-12">
    <form action="">
      <input type="text" class="form-control" placeholder="filtrar" ng-model="filtro">
    </form>
  </div>
</div>
```

Podemos filtrar uma lista dentro do `ng-repeat`, usamos especificamente uma diretiva do angular que podemos passar um valor e este valor ser reduzido em um array:

```html
<painel-fotos ng-repeat="foto in fotos | filter: filtro" titulo="{{foto.titulo}}">
    <img class="img-responsive center-block" src="{{foto.url}}" alt="{{foto.titulo}}">
</painel-fotos>
```

Utilizando o `| filter: <string>` estamos dizendo que o array deve possuir **em qualquer propriedade** a string passada. Desta forma podemos filtrar os arrays de acordo com um filtro built-in do angular.

Para podermos filtrar uma propriedade especifica, podemos passar um objeto `{propriedade: valor}`

Um dos problemas é que a atualização do `$scope` é instantanea, para podermos criar um _delay_ entre  a digitação e a atualização do dado, podemos utilizar uma diretiva chamada `ng-model-options` com o valor `debounce`

```html
<div class="row">
  <div class="col-md-12">
    <form action="">
      <input type="text" class="form-control" placeholder="filtrar" ng-model="filtro" ng-model-options="{debounce: 500}">
    </form>
  </div>
</div>
```

#### Pseudo-classes

Quando utilizado em conjunto com o ngAnimate, o angular coloca algumas classes a medida que algumas ações são tomadas. Assim como o browser coloca classes como `:before`, `:first-line` e etc, também o angular tem a capacidade de incluir algumas classes no seu DOM.

- `ng-leave`: É uma classe colocada pelo angular no `ng-repeat` quando um elemento deixa a lista
- `ng-leave-active`: É uma classe do angular para o `ng-repeat` quando um elemento está para deixar a lista

Para mais classes, veja na página de ajuda do ngAnimate.

## Views, rotas e partials

O modelo SPA não necessariamente significa que toda a aplicação vai ter apenas uma página, mas sim que ela vai ser carregada uma unica vez e nunca mais após disso.

Para podermos criar outras views e ouras telas para nossas aplicações, podemos utilizar das views do próprio angular.

Para definir um local de visualização, utilizamos a tag `<ng-view>` para definir que aquele local será o local aonde os conteúdos serão colocados.

```html
<html>
  <head>
  ...
  </head>
  <body>
    <ng-view></ng-view>
  </body>
</html>
```

Para utilizarmos o modelo de rotas que iremos implementar, vamos utilizar o script `ngRoute` que o próprio angular provém. Primeiramente vamos importar e definir como uma dependencia no nosso `main.js`.

O Router vai, por meio de requisições AJAX, iniciar o download dos recursos e importar seu conteúdo dentro do `ng-view`.

> __Importante__: Temos que remover todas as referências aos controllers que utilizamos previamente, pois quando trocarmos de rota, esses controllers não estarão mais disponíveis, o próprio router do angular vai injetar essas dependencias no partial carregado.

```js
angular.module("alurapic", ["minhasDiretivas", "ngAnimate", "ngRoute"])
  .config(function($routeProvider) {
    $routeProvider.when("/fotos", {
      templateUrl: "partials/principal.html",
      controller: "FotosController"
    });
  });
```

No código acima estamos dizendo que quando o endereço for `/fotos`, então vamos carregar o partial `principa.html` e aplicar seu controller.

> Note que a URL que o Router enxerga deve seguir o padrão `/#/<caminho>`, ou seja, neste caso acima seria `/#/fotos`

Da mesma forma vamos cadastrar o nosso partial de fotos:

```js
angular.module("alurapic", ["minhasDiretivas", "ngAnimate", "ngRoute"])
  .config(function($routeProvider) {

    $routeProvider.when("/fotos", {
      templateUrl: "partials/principal.html",
      controller: "FotosController"
    });

    $routeProvider.when("/fotos/new", {
      templateUrl: "partials/cadastro.html",
      controller: "CadastroController"
    });
  });
```

Quando não temos nenhuma rota que bata com as rotas existentes, podemos definir uma rota padrão:

```js
angular.module("alurapic", ["minhasDiretivas", "ngAnimate", "ngRoute"])
  .config(function($routeProvider) {

    $routeProvider.when("/fotos", {
      templateUrl: "partials/principal.html",
      controller: "FotosController"
    });

    $routeProvider.when("/fotos/new", {
      templateUrl: "partials/cadastro.html",
      controller: "CadastroController"
    });

    $routeProvider.otherwise({ redirectTo: "/fotos" });
  });
```

Desta forma o método `otherwise` diz que, se não pudermos encontrar a rota selecionada, vamos direcionar para uma rota padrão, neste caso `/#/fotos`.

### LocationProvider e modo HTML5

O angular possui uma capacidade de trabalhar com rotas sem a `#`, mas para isso tanto o front quando o back-end precisam estar preparados para aceitar este tipo de rotas.

uma vez que ambos os lados estejam preparados para isto, podemos simplesmente injetar uma nova dependencia e configura-la de forma adequada.

```js
angular.module("alurapic", ["minhasDiretivas", "ngAnimate", "ngRoute"])
  .config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when("/fotos", {
      templateUrl: "partials/principal.html",
      controller: "FotosController"
    });

    $routeProvider.when("/fotos/new", {
      templateUrl: "partials/cadastro.html",
      controller: "CadastroController"
    });

    $routeProvider.otherwise({ redirectTo: "/fotos" });
  });
```

E no nosso HTML precisamos utilizar a tag `<base href="/">` no topo do head para que isso funcione.

> Não se esqueça de que é importante que o back-end precisa estar configurado para isso.

## Formulários com AngularJS

Tendo um formulário, podemos usar as diretivas `ng-model` para poder atribuir uma variável no angular para cada input do formulário.

Assim como também podemos usar diretivas de eventos do angular para ligar o evento submit do form para um método do angular.

```html 
<form action="" ng-submit="submeter()"></form>
```

E então no modelo do Angular fazemos:

```js
$scope.submeter = function() {

}
```

E colocamos nosso código internamente.

### Validação de Formulários

Primeiramente temos de desativar todas as validações do HTML5 usando o atributo `novalidate` dentro da tag form:

```html
<form novalidate name="formulario" class="row" ng-submit="submeter()">
    <div class="col-md-6">
        <div class="form-group">
            <label>Título</label>
            <input name="titulo" class="form-control" ng-model="foto.titulo">    
        </div>
        <div class="form-group">
            <label>URL</label>
            <input name="url" class="form-control" ng-model="foto.url">
        </div>
        <div class="form-group">
            <label>Descrição</label>
            <textarea name="descricao" class="form-control" ng-model="foto.descricao"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            Salvar
        </button>
         <a href="/" class="btn btn-primary">Voltar</a>
    </div>
    <div class="col-md-6">
        <minha-foto></minha-foto>
    </div>
</form>
```

Então vamos deixar os campos obrigatórios e definir mensagens de erro:

```html
<form novalidate name="formulario" class="row" ng-submit="submeter()">
    <div class="col-md-6">
        <div class="form-group">
            <label>Título</label>
            <input name="titulo" class="form-control" ng-model="foto.titulo" required>
            <span class="form-control alert-danger">Título obrigatório</span>
        </div>
        <div class="form-group">
            <label>URL</label>
            <input name="url" class="form-control" ng-model="foto.url" required>
            <span class="form-control alert-danger">URL obrigatória</span>
        </div>
        <div class="form-group">
            <label>Descrição</label>
            <textarea name="descricao" class="form-control" ng-model="foto.descricao"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            Salvar
        </button>
         <a href="/" class="btn btn-primary">Voltar</a>
    </div>
    <div class="col-md-6">
        <minha-foto></minha-foto>
    </div>
</form>
```

Veja que utilizamos o atributo `required` do próprio HTML5, porém desta vez será tratada pelo angular.

Para as mensagens de erro, criamos um span logo abaixo do campo, porém no momento ele fica sempre exibido. Vamos condicionar ele a exibir apenas quando o formulário estiver inválido. Para isto, primeiramente vamos utilizar a diretiva `ng-show`:

```html
<form novalidate name="formulario" class="row" ng-submit="submeter()">
    <div class="col-md-6">
        <div class="form-group">
            <label>Título</label>
            <input name="titulo" class="form-control" ng-model="foto.titulo" required>
            <span class="form-control alert-danger" ng-show="formulario.$submitted && formulario.titulo.$error.required">Título obrigatório</span>
        </div>
        <div class="form-group">
            <label>URL</label>
            <input name="url" class="form-control" ng-model="foto.url" required>
            <span class="form-control alert-danger" ng-show="formulario.$submitted && formulario.titulo.$error.required">URL obrigatória</span>
        </div>
        <div class="form-group">
            <label>Descrição</label>
            <textarea name="descricao" class="form-control" ng-model="foto.descricao"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            Salvar
        </button>
         <a href="/" class="btn btn-primary">Voltar</a>
    </div>
    <div class="col-md-6">
        <minha-foto></minha-foto>
    </div>
</form>
```

Estamos utilizando uma validação interna do angular que identifica qual é o tipo de erro que obtivemos de acordo com o campo que precisamos. Também pedimos para que esta validação seja feita apenas quando o formulário for submetido.

Podemos mudar o erro para limitar o tamanho de caracteres por exemplo.

```html
<form novalidate name="formulario" class="row" ng-submit="submeter()">
    <div class="col-md-6">
        <div class="form-group">
            <label>Título</label>
            <input name="titulo" class="form-control" ng-model="foto.titulo" required ng-maxlength="20">
            <span class="form-control alert-danger" ng-show="formulario.$submitted && formulario.titulo.$error.required">Título obrigatório</span>
            <span class="form-control alert-danger" ng-show="formulario.$submitted && formulario.titulo.$error.maxlength">O título só pode ter 20 letras</span>
        </div>
        <div class="form-group">
            <label>URL</label>
            <input name="url" class="form-control" ng-model="foto.url" required>
            <span class="form-control alert-danger" ng-show="formulario.$submitted && formulario.titulo.$error.required">URL obrigatória</span>
        </div>
        <div class="form-group">
            <label>Descrição</label>
            <textarea name="descricao" class="form-control" ng-model="foto.descricao"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
            Salvar
        </button>
         <a href="/" class="btn btn-primary">Voltar</a>
    </div>
    <div class="col-md-6">
        <minha-foto></minha-foto>
    </div>
</form>
```

#### Outras diretivas

Podemos usar a diretiva `ng-disabled` para definir quando um campo ou elemento estará desativado:

```html
<button type="submit" class="btn btn-primary" ng-disabled="formulario.$invalid">
            Salvar
</button>
```

Desta forma o botão salvar será apenas habilitado quando o formulário estiver válido