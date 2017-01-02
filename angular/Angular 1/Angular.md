# Angular.js
> Framework front-end para criação de páginas dinâmmicas HTML, ajuda a organizar, manter e acelerar qualquer tipo de site.

<!-- TOC -->

- [Angular.js](#angularjs)
- [Diretrizes](#diretrizes)
  - [Modulos](#modulos)
    - [Expressões](#express%C3%B5es)
- [Controllers](#controllers)
- [Filtros](#filtros)
- [Built-in directives](#built-in-directives)
- [Validações](#valida%C3%A7%C3%B5es)
- [Angular Templates](#angular-templates)
  - [Diretrizes específicas](#diretrizes-espec%C3%ADficas)
    - [Definição](#defini%C3%A7%C3%A3o)
    - [Definição com controllers](#defini%C3%A7%C3%A3o-com-controllers)
- [Dependências](#depend%C3%AAncias)
- [Serviços](#servi%C3%A7os)
    - [Chamadas HTTP](#chamadas-http)
      - [Tratando erros de chamada](#tratando-erros-de-chamada)
  - [Incluindo serviços](#incluindo-servi%C3%A7os)
- [Referencias](#referencias)

<!-- /TOC -->

Angular acelera as requisições basicamente por buscar apenas informações necessárias nas requisições, e não requisitar toda a informação
novamente.

# Diretrizes
Adiciona ações a um código HTML. É um modo de adicionar comportamentos no código.

## Modulos
Um módulo Angular é uma aplicação, ele é o que define o que vai ser executado e quando vai ser executado, você pode linkar um aplicativo
Angular a um html pela diretriz `ng-app`

```html
<!DOCTYPE html>
<!-- Executa o módulo "store" presente no app.js quando o documento carrega -->
<html ng-app="store">
<head>
	<title>GemStore</title>
	<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>

	<!-- Scripts in the end -->
	<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
	<script type="text/javascript" src="bower_components/bootstrap/dist/bootstrap.min.js"></script>
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="app.js"></script>
	<!-- Scripts in the End -->
</body>
</html>
```
"index.html"

E depois no arquivo "app.js"

```js
var app = angular.module('store', [ ]);
```

O módulo "Store" está linkado ao html, a partir daí podemos usar expressões

### Expressões
Expressões começam com `{{exp}}`, como em:

```html
<p>Eu tenho {{4+6}} anos</p>
```

Resulta em "Eu tenho 10 anos". Também podemos fazer operações com strings:

`<p>{{"Olá" + " mundo"}}</p>`

Resultará em "Olá mundo".

# Controllers
É onde definimos o comportamento da nossa aplicação ao criar funções e valores.

> Colocar o código envolta de uma closure é um bom hábito:

```js
(function() {
	var app = angular.module('store', [ ]);


})();
```

Agora precisamos criar algo para dar ao controller utilidade, já que estamos criando uma loja de joias, vamos criar uma joia como um
atributo do controller, será o *produto*:

```js
var gem = {
		name: "Rubi",
		price: 2.95,
		description: "A red gem, very very valuable"
	};
```

Será a descrição da nossa joia, agora vamos fazer dela um atributo do nosso controller:

```js
	// Controller da loja
	app.controller('StoreController', function() {

		// Propriedade do controller
		this.product = gem;

	});
```

Desta forma, gem é agora uma propriedade do controller, o arquivo `app.js` fica assim:

```js
(function() {
	var app = angular.module('store', [ ]);

	var gem = {
		name: "Rubi",
		price: 2.95,
		description: "A red gem, very very valuable"
	};

	// Controller da loja
	app.controller('StoreController', function() {

		// Propriedade do controller
		this.product = gem;

	});

})();
```

Em nosso HTML agora podemos ligar o controller com um template pré pronto, desta forma:

```html
<div ng-controller="StoreController as store">
		<h1>{{store.product.name}}</h1>
		<h2>{{store.product.price}}</h2>
		<p>{{store.product.description}}</p>
</div>
```

Primeiramente, usamos a diretriz `ng-controller` para ligar o controller à div, o que significa que todo o código dentro do controller
será acessível dentro desta div. Desta forma podemos usar o template de expressões para buscar nosso objeto `gem` dentro do nosso
controller, através da notação padrão de objetos no javascript, uma vez que nossa pedra é um JSON.

# Filtros
Angular tem alguns filtros que torna possível a manipulação de dados na página, esses filtros sempre seguem as mesmas expressões `{{data | filter:options}}`.

Por exemplo: `<em class="pull-right">{{product.price | currency}}</em>` Vai buscar o resultado da propriedade price do array produto e filtrar como moeda.

- `{{expr | date:'MM/dd/yyyy @ h:ma'}}`: Printaria as horas como 12/27/2015 @ 12:50AM
- `{{expr | uppercase/lowercase}}`: Transforma o casing de uma palavra
- `{{expr | limitTo:n}}`: Limita a quantidade de caracteres de uma string, ou então (se usado no ng-repeat) limita a quantidade de itens em um array.
- `<li ng-repeat="product in store.products | orderBy: '-price'">`: Ordena os valores de um array (use - ou + para desc e asc)

# Built-in directives
Angular tem algumas diretrizes pré definidas.

- `ng-show`: Mostra ou esconde o elemento se a expressão interna for `true`, por exemplo: `<p ng-show="controller.prop.value">lorem</p>` só irá mostrar o texto se a propriedade tiver um valor `true`.
- `ng-hide`: Contrário do ng-show, esconde um elemento
- `ng-repeat`: Laço foreach, precisa de uma expressão específica do angular do tipo -> `ng-repeat="nome in array`, desta forma é possível acessar o array da seguinte maneira:
```html
<div ng-controller="StoreController as store">
	<div ng-repeat="product in store.products">
		<div ng-hide="product.soldOut">
			<h1>{{product.name}}</h1>
			<h2>{{product.price}}</h2>
			<p>{{product.description}}</p>
			<button ng-show="product.canPurchase">Add to Cart</button>
			<hr>
		</div>
	</div>
</div>
```
- `ng-src`: Usado na tag img, avalia a expressão e coloca o valor na tag. Aceita uma expressão: `ng-src="{{product.img}}"`
- `ng-class`: Aplica uma classe ao elemento se as condições forem verdadeiras, `<li ng-class="{ active:tab == 1 }">` vai aplicar a classe `active` se o valor da variável tab for 1.
- `ng-href`: Similar ao `ng-src` porém funciona com tags `<a>`
- `ng-model`: Realiza uma ligação de um elemento com outro elemento:
```html
<form name="reviewForm">
						<blockquote>
							<b>Stars: {{review.stars}}</b> - {{review.body}}
							<cite>By: {{review.author}}</cite>
						</blockquote>
						<select ng-model="review.stars">
							<option value="1">1 Star</option>
							<option value="2">2 Stars</option>
							<option value="3">3 Stars</option>
							<option value="4">4 Stars</option>
							<option value="5">5 Stars</option>
						</select>
						<textarea ng-model="review.body"></textarea><br/>
						<label>by:</label>
						<input ng-model="review.author" type="email" />
						<input type="submit" value="Submit" />
					</form>
```
Repare que a variável `review` não existe dentro da blockquote, mas estamos ligando ela nos elementos do form através do `ng-model`.
- `ng-submit`: Permite executar ou avaliar uma expressão quando um form é enviado pelo submit. `ng-submit="reviewForm.$valid && reviewCtrl.addReview(product)"`

# Validações
Angular já vem com validações HTML imbutidas para forms, ou seja, é necessário adicionar o atributo `novalidate` em um form para que o mesmo funcione bem.

Depois disto os campos que forem obrigatórios podem ter somente o atributo `required` que eles serão validados de acordo com o angular, através de classes.

- `ng-pristine`: O campo ainda não foi tocado
- `ng-dirty`: O campo já foi alterado uma vez
- `ng-valid`: O campo é válido
- `ng-invalid`: O campo é inválido

Note que `pristine` e `dirty` aparecem sempre junto de `valid` e `invalid`. Desta forma o desenvolvedor pode alterar a CSS de acordo.

O status do form pode ser obtido através da expressão `<nome do form (atributo name)>.$valid`.

# Angular Templates
O framework do angular vem equipado com a possibilidade de separar pedaços do código em snippets e jogá-los dentro de templates html em arquivos, ou seja, ele basicamente inclui um arquivo html dentro de um escopo ou uma tag html no index ou no arquivo principal.

Usamos a diretiva `ng-include` para adicionar um arquivo como no exemplo `<h3 ng-include="'product-title.html'"></h3>`. Porém esta forma faz com que o browser realize duas requisições para o servidor, uma para obter a index e outra para obter o arquivo "product-title.html", o que é ruim.

## Diretrizes específicas
É possível escrever diretrizes específicas no Angular, ou seja, HTML que expressa comportamento na sua página. Geralmente HTML expressa só a marcação da página, e como ela é estruturada, não como ela se comporta. Este é o verdadeiro pode do Angular, escrever modelos de marcação que possam expressar ações.

Existem diversos tipos de diretivas:

- Diretivas de expansão: Basicamente são tags html que são substituidas por um template (substitui o ng-include)
- Diretivas de Expressão: Expressão de UI complexa
- Diretivas de eventos: Chama eventos e define handlers
- Diretivas de reuso: Reusa componentes comuns

### Definição
Para definir uma diretiva específica, basta fazer:
```js
app.directive('nomeDiretriz', function() {
return {
//lógica
};
});
```
Dentro da função anonima temos de retornar um objeto diretiva. Ficando assim no html `<nome-diretriz></nome-diretriz>`, sendo assim o traço (`-`) no html traduz para camelCase no js.

No caso de uma diretiva de expansão (que substitui o ng-include) podemos definir um objeto deste tipo:
```js
app.directive('productTitle', function() {
	return {
		restrict: 'E', //tipo de diretriz: E para "elemento", para definirmos um novo elemento html
		templateUrl: 'product-title.html' //url do template
	};
});
```

Podemos definir tanto uma diretiva de elemento como acima como uma diretiva de atributo: `<h3 product-title></h3>`. A diferença é nenhuma o que muda é que quando definimos elementos de UI é boa prática utilizar diretivas de elemento e quando definimos uma ação ou um comportamento (uma tooltip por exemplo) usamos o atributo.

Se fossemos definir uma dirretiva de atributo:
```js
app.directive('productTitle', function() {
	return {
		restrict: 'A', //tipo de diretriz: A para "atributo", para definirmos um novo atributo html
		templateUrl: 'product-title.html' //url do template
	};
});
```

### Definição com controllers
É possível anexar um controller dentro de uma diretiva específica.

Para isto podemos fazer desta forma:
```js
app.directive('productPanels', function() {
	return {
		restrict: 'E', //Elemento
		templateUrl: 'product-panels.html', //Template
		controller: function() { //função do controller, é a mesma função que vai dentro do app.controller('nome',function());
			this.tab = 1;
			this.selectTab = function(tab) {
				this.tab = tab;
			};
			this.isSelected = function(tab) {
				return this.tab === tab;
			};
		},
		controllerAs: 'panel' //Alias do controller, equivalente a usar ng-controller="nome AS <alias>"
	};
});
```

Desta forma assim que incluirmos esta diretiva, automaticamente o controller vai ser incluso junto.

# Dependências
É possível modularizar totalmente uma aplicação angular através de injeção de dependências. Para fazer isto basta criar um novo arquivo javascript. Adicionar nele uma nova closure como abaixo:
```js
(function() {
	var app = angular.module('modulo', [ ]);
})();
```

Então no arquivo app.js principal incluir
```js
(function() {
	var app = angular.module('store', ['modulo']);
```

> E também no html incluir o arquivo novo que foi criado: `<script type="text/javascript" src="arquivo.js"></script>`

Desta forma é possível separar as funcionalidades de acordo com o que cada parte da aplicação realiza, tornando o código mais sustentável. Tudo que foi definido juntamente com o app.js no inicio (todas as diretivas e etc) podem ser simplesmente copiadas, pois o arquivo será incluido dentro do total.

# Serviços
É possível separar os dados vindos de chamadas de API externas através de serviços internos do angular.

O Angular já vem com vários serviços inclusos:

- `$http`: Permite trazer dados JSON através de chamadas API
- `$log`: Cria um log no console
- `$filter`: Filtra um array

### Chamadas HTTP
Podemos fazer uma requisição REST através do serviço http:
```js
$http({ method: 'GET', url: '/products.json' });
```

Ou usando uma sintax mais simples:
```js
$http.get('/products.json');
```

Os métodos reduzidos suportados são: GET, POST, PUT, PATCH e DELETE. Para quaisquer outros métodos como OPTIONS, TRACE e etc devemos utilizar a sintaxe mais longa.

> É possível passar dados através de uma request `POST`, por exemplo, através de `$http({method:'POST', url:'/notes', data: dados})`, onde os dados são a carga enviada.

#### Tratando erros de chamada
É possível tratar não só sucessos de retorno, mas também erros com o método `catch`:
```js
angular.module('Nome')
	.controller('NomeController', function($http) {
		var controller = this;
		this.save = function(note) {
			controller.errors = null;
			$http({method:'POST', url:'/notes', data:note})
				.catch(function(note) {
					controller.errors = note.data.error; //pega o erro no corpo enviado
				})
		};
	});
```

## Incluindo serviços
Para fazer a inclusão de serviços é necessário usar a dependency injection, ou seja, temos que injetar no controller uma funcionalidade, ficando assim:

```js
app.controller('StoreController', ['$servico', function($servico) {

}]);
```

Note que temos que adicionar um array por fora da função para isso. Depois podemos utilizar desta forma:
```js
app.controller('StoreController', ['$http', function($http) {

	//Variável de escopo do controller, define como this para que possamos acessar dentro do success
	var store = this;
	//Inicialização da propriedade
	store.products = [ ];
	//Chamada http		     Callback(Dados)
	$http.get('/data/gems.json').success(function(data) {
		//Quando o callback retornar, podemos setar os dados iguais a propriedade, ja que store é this, seria o mesmo que this.products, porém o this se refere a função callback e não ao escopo
		store.products = data;
	});

}]);
```

# Referencias
- http://docs.angularjs.org
- http://egghead.io
- http://thinkster.io