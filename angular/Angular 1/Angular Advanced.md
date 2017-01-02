# Angular Avançado

# Views e Rotas
É possível definir templates a serem carregados a partir de determinadas rotas utilizando a diretiva `ng-view`, o que ela faz é
basicamente dizer ao aplicativo para ler todos os templates dentro daquela tag:
```html
<html>
<head>...</head>
<body>
  <div ng-view></div> <!-- Angular vai colocar os templates aqui -->
</body>
</html>
```

É preciso incluir o arquivo de rotas do Angular, pois nas versões mais recentes ele não está mais incluso no core: https://code.angularjs.org/1.5.5/

Depois disso é necessário incluir as rotas como dependência no seru arquivo `app.js` dessa forma:

```js
angular.module('nome',['ngRoute']);
```

Então criamos um arquivo `routes.js` com os conteúdos das rotas:

```js
angular.module('nome')
  .config(function($routeProvider){});
```

> É uma má prática utilizar `var app = angular.module('nome',[]);`, é mais vantajoso reescrever no inicio de todos os arquivos js a 
declaração do modulo.

Utilizando o `$routeProvider` (que é um serviço) poderemos adicionar novos comportamentos de rotas:

- `.when(path, route)`: Cria uma nova rota
- `.otherwise(params)`: Define uma rota quando nenhuma outra é válida (Default)

No arquivo `routes.js`:

```js
angular.module('nome')
  .config(function($routeProvider) {
    $routeProvider.when('/caminho', { templateUrl: 'template.html' })
    
    .when('/outrocaminho',{ templateUrl: 'outrotemplate.html' })
    
    .when('/', { templateUrl: 'maisumtemplate.html' })
    
    .otherwise({ redirectTo: '/' });
  });
```

Sempre que acessarmos `www.site.com/caminho` o arquivo template.html será carregado na div com o `ng-view`, criamos outras páginas
com templates, porém se nenhuma rota bater, redirecionamos para o index, que é uma rota conhecida.

## Implementando Lógica
Rotas nem sempre precisam ter apenas um template associado a elas, mas também é possível associar controllers.

Existem duas maneiras de ligar um controller a uma rota:

1. Inline: No arquivo `routes.js` é possível ligar o controller diretamente pela definição
```js
angular.module('Nome')
  .config(function($routeProvider) {
    $rrouteProvider.when('/notes', {
      templateUrl: 'templates/pages/notes/index.html',
      controller: function() {}
    })
  });
```

Porém o arquivo fica muito confuso.

2. Através de um arquivo separado: É possível definir um arquivo apenas contendo um controller, como neste caso
```js
angular.module('Nome')
  .controller('NomeController', function() {});
```
Em um arquivo separado, e depois chamar no nosso arquivo `routes.js` desta forma:

```js
angular.module('Nome')
  .config(function($routeProvider) {
    $rrouteProvider.when('/notes', {
      templateUrl: 'templates/pages/notes/index.html',
      controller: 'NomeController',
      controllerAs: 'Alias'
    })
  });
```
Não é necessário passar o nome do arquivo javascript pois ao realizar a requisição inicial já teremos que incluir todos os arquivos como parte do index.

## Parâmetros de rotas
É possível definir parâmetros de rotas através de `:nome`, por exemplo, `/notes/:id` seria a URL `http://.../notes/1` onde `1` seria o parâmetro `id`.

```js
angular.module('Nome').config(function($routeProvider) {
  $routeProvider.when('/notes/:id', {
    templateUrl: 'url/do/template.html',
    controller: 'NomeController',
    controllerAs: 'Alias'
  })
});
```

Para buscar esses parâmetros da query é possível usar o `$routeParams` no *controller*, então no arquivo referente ao `NomeController` fazemos o seguinte:

```js
angular.module('Nome')
  .controller('NomeController', function($http, $routeParams) {
    var controller = this;
    $http({method:'GET', url:'/notes/' + $routeParams.id}) //id é o nome do parâmetro que passamos acima
      .success(function(data) {
        controller.prop = data;
      })
  });
```

# $scope
Referencia o escopo atual do controller:

```js
angular.module('Nome').controller('NomeController', function($scope) {
  $scope.prop = 'prop';
});
```

Desta forma, sempre que precisarmos chamar um controller dentro de uma diretiva, digamos neste modelo:

```html
<div class='b' ng-controller='NomeController as nomectrl'>
<h3>{{nomectrl.prop}}</h3>
</div>
```

Podemos simplesmente usar:

```html
<div class='b' ng-controller='NomeController'>
<h3>{{prop}}</h3>
</div>
```

O `$scope` atua como uma variável global dentro do controller, ele referencia todo o escopo da função dentro de um determinado modelo.
Com ele é possível remover os aliases de todos os controllers e também as variáveis do tipo `var controller = this`.

## Objetos de configuração

Por padrão, escopos herdam os escopos pais, ou seja, se você criar uma diretiva de elemento, o escopo dessa diretiva vai herdar o escopo do elemento pai sobre este elemento.

Para que cada elemento tenha seu escopo separado, precisamos definir um outro titulo na diretiva:

```js
angular.module('Nome')
  .directive("nomeDirective", function() {
    var num = 1; //exemplo
    return {
      restrict:'E',
      templateUrl: 'Url/do/Template.html',
      scope: {}, //com essa linha definimos o escopo individual para cada diretiva
      controller: funcion($scope) {
        $scope.prop = "Propriedade "+ num++;
      }
    }
  });
```
Com o exemplo acima, teremos o print da propriedade com os valores sempre incrementais. Isto ocorre porque o escopo do elemento filho vai ter suas próprias variáveis e não vai mais herdar o escopo do pai.

### Diretiva com parâmetros

Para passarmos parâmetros para uma diretiva, digamos `<ng-card ctitle="teste"></ng-card>`, de forma que o elemento saiba que existe um atributo `ctitle`, precisamos de uma configuração extra no `scope`:

```js
angular.module('Nome')
  .directive("nomeDirective", function() {
    var num = 1; //exemplo
    return {
      restrict:'E',
      templateUrl: 'Url/do/Template.html',
      scope: {
        cTitle: "@" //significa que o parâmetro cTitle recebe uma string. (pode ser @ para string, = para two-way binding)
      }
    }
  });
```
Quando usamos `=` não é necessário usar `{{nome}}` basta usar `nome`.

# Link

Toda diretiva tem uma função chamada Link, que relaciona eventos como click, hover e etc depois que ela já foi compilada e exibida. Desta forma não há como termos problemas de executar um js sem que o DOM esteja completo. É o melhor lugar para fazer uma manipulação de DOM ou lógica dentro de uma diretiva.

```js
angular.module("Nome")
  .directive("nwCard", function nwCardDirective() {
    return {
      link: function() {
        $("div.card").on("click", function() { $("div.card p").toggleClass("hidden") }); //jQuery
      }
      ...
    }
  });
```
Porém o problema é que estamos buscando todo o DOM com o `$("div.card")` e temos que buscar só um elemento. Podemos utilizar os parâmetros do link:

```js
angular.module("Nome")
  .directive("nwCard", function nwCardDirective() {
    return {
      link: function(scope, element) { //scope é o escopo da diretiva e o element é o elemento mais externo da mesma, ou seja, o primeiro
        element.on("click", function() { element("div.card p").toggleClass("hidden") }); //jQuery
      }
      ...
    }
  });
```
Desta forma sabemos o elemento que temos que buscar.

O link também tem um terceiro parâmetro que é o `attrs`, que busca todos os atributos da diretiva em questão:

```js
link: function(scope, element, attrs) { //attrs vai buscar todos os atributos da diretiva, então <nwCard header="header"> teria um attrs.header que seria igual a "header"
  element.on("click", function() { element("div.card p").toggleClass("hidden"); }); //jQuery
  console.log(attrs.header);
}
```

# $sce
SCE é um serviço do Angular responsável por criar htmls confiáveis na página, ou seja, se for necessário a inserção de um html após a renderização das funções ele não vai escapar como string. Para isso digamos que tenhamos que colocar um texto em markdown para html. Desta forma podemos utilizar a diretiva `ng-bind-html` ao invés de inserir com `{{}}`, digamos:

```html
<div class="card">
  <div class="card-hidden">
    <a ng-href="#/notes/{{id}}">{{body}}</a>
  </div>
</div>
```
O texto que vier do `{{body}}` não vai ser renderizado como html mesmo que ele seja, pois isso traz problemas de segurança, então temos que usar a diretiva:

```html
<div class="card">
  <div class="card-hidden">
    <a ng-href="#/notes/{{id}}" ng-bind-html="body"></a>
  </div>
</div>
```
E então na nossa diretiva realizar:

```js
angular.module("Nome")
  .directive("nwCard", function($sce) {
    return {
      ...
      link: function(scope, element, attrs) {
        scope.body = $sce.trustAsHtml(markdown.toHTML(scope.body));
      }
    }
  });
```
Desta forma o Angular vai saber que este HTML é seguro.

# Serviços

Um serviço é uma ferramenta para fazer conexões entre servidores remotos através de chamadas AJAX. No Angular é basicamente outro arquivo .js incluido dentro da aplicação.

Serviços usam um total de 5 "recipes" que podem variar em complexidade e customização:

- Value: A mais simples, usada para compartilhar apenas um valor, como uma global.
- Factory: É a receita mais usada. Serve para compartilhar funções e objetos entre a aplicação
- Service: Usado para compartilhar instancias de um método ou objeto ao invés do método estático
- Provider: Tem a mesma função do Factory porém também permite a inserção de configurações.
- Constant: Compartilha um valor dentro de uma configuração de aplicação.

Os dois mais utilizados são `Factory` e `Provider`.

## Definindo uma Factory

Para criar um serviço do tipo Factory, precisamos digitar em nosso arquivo javascript:

```js
angular.module("Nome")
  .factory("NomeService", function NomeFactory() { //boa prática sempre utilizar <nome>Recipe como nome da função
    return {
      //Objeto contendo funções compartilhadas
    };
  });
```

Por exemplo, vamos encapsular um método HTTP com um nome e um método GET dentro de uma função anonima.

```js
angular.module("Nome")
  .factory("NomeService", function NomeFactory($http) { //boa prática sempre utilizar <nome>Recipe como nome da função
    return {
      all: function() { //Nome do retorno é "all"
        return $http({method: "GET", url: "/notes"});
      },
      create: function(note) {
        return $http({method: "POST", url: "/notes", data: note});
      }
    };
  });
```

### Usando um serviço dentro do método

Primeiro, precisamos injetar o serviço dentro da função que vamos utilizar no nosso controller.

```js
angular.module("NomeModulo")
  .controller("NomeController", function($scope, NomeService) {
    NomeService.all().success(function(data){ $scope.notes = data; });
  });
```

> Se o objeto só tiver uma unica função você não precisa retornar o objeto com a função dentro, basta retornar somente a função.

No caso de o objeto ser apenas uma função, digamos:

```js
angular.module("Nome")
  .factory("NomeService", function NomeFactory($http) { //boa prática sempre utilizar <nome>Recipe como nome da função
    return {
      all: function() { //Nome do retorno é "all"
        return $http({method: "GET", url: "/notes"});
      }
    };
  });
```

Podemos fazer:

```js
angular.module("Nome")
  .factory("NomeService", function NomeFactory($http) { //boa prática sempre utilizar <nome>Recipe como nome da função
    return function() { //O retorno não tem nome, podemos retornar só a função
        return $http({method: "GET", url: "/notes"});
    };
  });
```

Então para chamarmos o método:

```js
angular.module("NomeModulo")
  .controller("NomeController", function($scope, NomeService) {
    NomeService().success(function(data){ $scope.notes = data; }); // Note que não temos mais o .all()
  });
```

## Criando um provider

O Provider, diferentemente dos outros serviços, permite que passamos configurações para ele, desta forma o serviço se torna configurável e mais genérico.

Para passar uma configuração sempre utilizamos o serviço `this.$get` que pertence a todo Provider.

```js
angular.module("Nome")
  .provider("Nome", function NomeProvider() {
    this.$get = function($http) {};
  });
```

Contudo, providers são as primeiras coisas que são carregadas, então você só pode injetar outro provider em um nível mais alto:

```js
angular.module("Nome")
  .provider("Nome", function NomeProvider(outroProvider) {
    this.$get = <Função>() {};
  });
```

Para este exemplo, vamos refatorar um serviço de busca de imagens do Gravatar, de um factory para um Provider:

```js
angular.module('GravatarModule')
  .factory("Gravatar", function GravatarFactory() {
    var avatarSize = 80;
    var avatarUrl = "http://www.gravatar.com/avatar/";
    return function(email) {
      return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
    };
  });
```

Note que temos que passar um email e estamos utilizando a biblioteca externa do CryptoJS para fazer a conversão dele para um hash MD5. Porém não temos a opção de setar o tamanho e nem a url do avatar, pois ela está fixa no código. Um provider vai parmitir que essa configuração seja adicionada.

```js
angular.module('GravatarModule')
  .provider("Gravatar", function GravatarProvider() {
    var avatarSize = 80;
    var avatarUrl = "http://www.gravatar.com/avatar/";
    this.$get = function() { //Temos que contornar o retorno com o $get
      return function(email) {
        return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
      };
    };
  });
```

A chamada da função ainda continua a mesma:

```js
angular.module("GrModule")
  .controller("IndexController", function($scope, Gravatar) {
    $scope.gravatarUrl = function(user) {
      return Gravatar(user.email);
    }
  });
```

Mas note que não temos as confitgurações, que é o objetivo de termos um provider para inicio de tudo.

```js
angular.module('GravatarModule')
  .provider("Gravatar", function GravatarProvider() {
    var avatarSize = 80;
    var avatarUrl = "http://www.gravatar.com/avatar/";
    
    this.setSize = function(size) { //Criamos uma função anonima em uma propriedade que seta o valor do size
      avatarSize = size;
    };
    
    this.$get = function() { //Temos que contornar o retorno com o $get
      return function(email) {
        return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString();
      };
    };
  });
```

Agora podemos usar a parte configurável. Podemos fazer isso diretamente no `app.js` que vai rodar antes de qualquer coisa.

```js
angular.module("Modulo", ["ngRoute"])
  .config(function (GravatarProvider) { GravatarProvider.setSize(100); });
```

# $resource

O ngResource é um serviço que contem os métodos CRUD do HTTP por padrão. Você pode baixar de http://code.angularjs.org e incluir com uma tag `<script>`, depois precisamos inserir eles dentro do modulo:

```js
angular.module("Nome", ['ngResource'])
```

Chamando como:

```js
angular.module("Nome")
  .factory("NomeF", function NomeFFactory($resource) {
    return $resource("/sua/url/:param", {}, {});
  });
```

Então ao invés de utilizar a função get do $http, podemos usar `NomeF.get({param: value})`.

O $resource reduz o código.

# Plugins de terceiros

É uma boa prática induzir uma diretiva para plugins de terceiros pra eles não ficarem jogados no código.

Primeiramente temos que buscar nossas bibliotecas e incluir no código. Neste exemplo, vamos usar o `tooltip.js` do Bootstrap. Substituindo o atributo `title` das divs

```js
angular.module("Nome")
  .directive("title", function($timeout) {
    return {
      restrict: 'A', //Por padrão diretivas são A então isso pode ser omitido
      link: function(scope, element) { //se o Restrict for omitido, não precisamos do link, podemos só retornar a função anonima
        $timeout(function() { //Como o link roda só uma vez, temos que usar o serviço $timeout para que ele seja executado durante todo o Event-loop evitando que não tenhamos valores com {{}} sem eval
          element.tooltip({container: "body"});
        });
        scope.$on('$destroy', function() { element.tooltip('destroy'); }); //Boa prática para destruir quando não está mais usando
      }
    };
  });
```

> Quando usar controller ou link?

Quando você precisa compartilhar funções com outras diretivas, através do `require` use controller, se não use link.