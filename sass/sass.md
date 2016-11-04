# SASS - Syntatically Awesome Style Sheets

Sass foi desenhado para ser uma extensão do CSS, adicionando novas funcionalidades e recursos. Sass é um prepocessador, ou seja, ele
precisa passar por um compilador para finalmente chegar a um CSS válido.

> CSS é um SCSS válido, mas o contrário não é válido

## Comentários

Comentários no Sass são demarcados como `//` esses comentários *não* aparecem no css compilado. Já os comentários tradicionais do CSS
como `/* */` serão compilados para dentro do CSS final compilado.

## Partials

Usando uma diretiva `@import` no Sass é possível importar um arquivo Sass compilado para dentro de um arquivo CSS, "mesclando" ambos.
Contudo se tivermos dois arquivos, `login.scss` e `home.scss`, e também tivermos um arquivo principal `main.scss` contendo:

```sass
@import 'login';
@import 'home';
```

Quando rodarmos pelo compilador, então teremos no final um arquivo `main.css` contendo o conteúdo dos outros dois arquivos `.scss`, mas
ainda sim os arquivos `home.css` e `login.css` serão compilados para css.

Para resolver isso usamos _partials_, que são estruturas que definem um arquivo como sendo parte de outro arquivo. Para criar um partial
apenas renomearemos os arquivos `home` e `login` para `_home.scss` e `_login.scss`. Desta forma eles não serão recompilados.

## Nesting selectors

Para evitar repetições de código como:

```css
.content {
  ...
}
.content p {
  ...
}
.content h2 {
  ...
}
```

No Sass poderemos simplesmente fazer:

```scss
.content {
  //Css do .content

  p {
    //Css do .content p
  }

  h2 {
    //CSS do h2
  }
}
```

Que irá compilar para o mesmo do CSS.

## Nested properties

Propriedades com namespaces comuns como:

- text-decoration
- text-transform

Podem sofrer nesting como:

```Sass
.btn {
  text: {
    decoration: underline;
    transform: lowercase;
  }
}
```

O resultado final será:

```css
.btn {
  text-decoration: underline;
  text-transform: lowercase;
}
```

## Parent selector (&)

O seletor de item pai fará com que o Sass entenda que o seletor atual depende do seletor pai, criando classes compostas, por exemplo:

```scss
.content {
  color: red;
  .call { //Uma classe "call" diretamente filha da classe "content" (.content .call)
    color: blue;
  }

  &.call { //Uma classe que é ao mesmo tempo "content" e "call" (.content.call)
    color: green;
  }
}
```

É possível também referenciar diretamente o pai representado por `&` (pense em `&` como uma variável que toma o valor do pai), por exemplo

```css
.sidebar {
  color: blue;
}

.users .sidebar {
  color: black;
}
```

Da forma acima estamos separando muito as classes e as coisas não estão muito concisas. Podemos usar o sass:

```Sass
.sidebar {
  color: blue;

  .users & {
    color: black;
  }
}
```

O `&` será compilado para `.sidebar`, ficando `.users .sidebar`.

> O seletor pai irá acompanhar o nesting do elemento. Logo ELE IRÁ MUDAR dependendo do nível de identação

```sass
.sidebar {
  float: right;
  width: 200px;
  h2 {
    color: black;
    .users & { // Aqui o & estará sendo substituido por ".sidebar h2" que é a junção do elemento pai de .users e o de h2
      color: blue;
    }
  }
}
```

## Variáveis

Variáveis no sass são definidas por `$nome`. Que podem ser chamados assim:

```sass
$base: #77777;

.sidebar {
  boder: 1px solid $base;
}
```

É possível setar valores padrões para variáveis que não sobrescrevam outros valores já setados, por exemplo:

```sass
$title: 'content';
$title: 'content2';
```

No caso acima a variável title terá seu valor setado inicialmente para `content` e depois alterado para `content2`. Sendo assim qualquer chamada que for feita usando essa variável terá o valor `content2` impresso.

Para evitar isso podemos usar a flag `!default`. Ela basicamente checa se já não existem outros valores setados na variável:

```Sass
$title: 'content';
$title: 'content2' !default; //Checa se não existem outros valores já setados
```

Como já havia um valor setado para a variável `title`, então o seu valor não será sobrescrito e o valor final continuará sendo `content`.

## Tipos

Os tipos do Sass são:

- Booleans: `$rounded: false;`
- Números (com ou sem unidades): `$rounded: 4px;` ou `$line-height: 1.5;`
- Cores de vários tipos: `$base: black;` ou `$base: rgba(0,0,0,1);` ou `$base: #000;`
- String (com ou sem aspas): `$name: Lucas;` ou `$name: 'Lucas';`
- Listas (Que agem como arrays e podem ser separadas com vírgulas ou espaços): `$authors: nick, dan, aimee, drew;` ou `$margin: 40px 0 20px;`
- Nullo: `$border: null;`

## Escopos

Variáveis no sass tem um escopo bem definido. Qualquer variável declarada fora de um nesting poderá ser acessada por todos os nestings internos, no entando o contrário não é verdade, uma vez que a variável é declarada internamente em um nesting, ela não poderá ser acessada por fora:

```Sass
p {`
  $color: blue;
  color: $color;
}
h1 {
  color: $color; //Variável color não pode ser acessada
}
```

Já o seguinte funcionaria perfeitamente:

```Sass
$color: blue;

p {
  color: $color;
}
h1 {
  color: $color;
}
```

> Se uma variável está definida como global e for alterada dentro de um nesting então seu valor será alterado globalmente.

## Interpolação

Podemos usar variáveis como sendo parte de códigos CSS ou então propriedades, até elementos ou seletores através da sintaxe `#{$variável}`:

```Sass
$side: top;

sup {
  position: relative;
  #{$side}: -0.5em; //$side será usada como a propriedade top do css
}

.callout-#{$side} { //Usado como seletor.
  color: blue;
}
```

## Mixins

Combate a repetição no css. São blocos de código reutilizável que podem levar argumentos (funções):

Todos os mixins começam com `@mixin`

```sass
@mixin button {
  border: 1px solid black;
  color: blue;
}
```

Para utilizar um mixin basta usarmos `@include` dentro da declaração que queremos:

```scss
.btn-a {
  @include button;
  background: black;
}
```

## Parâmetros

Podemos passar parâmetros também para os mixins:

```sass
@mixin button ($color) {
  border: 1px solid $color;
  color: blue;
}
```

E usamos:

```scss
.btn-a {
  @include button(black);
  background: black;
}
```

Podemos definir parâmetros padrões:

```sass
@mixin button ($color: black) {
  border: 1px solid $color;
  color: blue;
}
```

Ai não precisamos mandar parâmetros. Pois serão padrões. Para adicionar mais de um argumento usamos:

```sass
@mixin button ($color, $size) {
  border: $size solid $color;
  color: blue;
}
```

E também podemos adicionar valores padrões:

```sass
@mixin button ($color, $size: 1px) {
  border: $size solid $color;
  color: blue;
}
```

> Todos os argumentos padrões devem vir no *final* das listas de argumentos

### Varargs

Variaveis como argumentos são listas infinitas, que serão usadas diretamente no código:

```scss
@mixin border ($val...) {
  border: $val;
}
```

Desta forma podemos passar parâmetros infinitos separados por virgula ou qualquer outra coisa.

## Extend

Adiciona a propriedade de herança no sass. Por exemplo, se tivermos duas classes com os mesmos parâmetros, podemos simplesmente herdar uma da outra desta forma:

CSS:

```css
.btn {
  background: black;
  color: red;
  border: 1px solid red;
}

.btn-a {
  background: black;
  color: red;
  border: 1px solid red;
}
```

SASS:

```scss
.btn {
  background: black;
  color: red;
  border: 1px solid red;
}

.btn-a {
  @extend .btn;
}
```

Desta forma `btn-a` vai herdar todas as propriedades de `btn`.

## Extend com multiplis escopos

Se tivermos uma cadeia do tipo: `.classe { .classe { elemento { }}}` ou qualquer outros objetos encadeados, o extend irá herdar não só o pai mas também o filho:

```scss
.content {
  border: 1px solid black;

  h2 {
    color: blue;
  }
}

.wrapper {
  @extend .content;
}
```

Isto compilaria para:

```css
.content {
  border: 1px solid black;
}

.content h2 {
    color: blue;
}

.wrapper {
  border: 1px solid black;
}

.wrapper h2 {
    color: blue;
}
```

> O extend irá *sempre* extender o elemento em qualquer parte do código, ou seja, se em uma classe você definir uma propriedade e depois redefinir esta mesma propriedade, todos os elementos que irão extender ela serão afetados

## Placeholder selectors

Denotados com o sinal `%`. São usados para evitar problemas descritos acima. Pois os placeholders nunca viram elementos do css, mas podem ser extendidos por qualquer outro:

```scss
%btn {
  color: blue;
}

.btn-a {
  @extend %btn;
}

.btn-b {
  @extend %btn;
}
```

Desta forma o compilado será:

```css
.btn-a,
.btn-b {
  color: blue;
}
```

Perceba que o elemento `btn` nunca existirá.

## Directives

Adicionam funções como `for`, `while` e etc. Assim como funções matemáticas ou métodos:

```scss
@function fluidize($target, $context) {
  @return ($target / $context) * 100;
}
```

E chamamos desta forma:

```scss
.sidebar {
  width: fluidize(12, 18);
}
```

> Sempre precisamos adicionar os () na função

## If

```scss
$theme: dark;

header {
  @if $theme == dark { // Se o $theme for dark ele vai compilar o código abaixo
    color: white;
  }
  @else if $theme == light { // se light
    color: blue;
  }
  @else { // Se não branco
    color: black;
  }
}
```

### Operadores

- `==`: Igual
- `!=`: Diferente
- `>`: Maior
- `>=`: Maior ou igual
- `<`: Menor
- `<=`: Menor ou igual

## Each

Loop por itens de lista:

```scss
$authors: nick aimee dan drew;

@each $author in $authors {
  .author-#{$author} {
    background: url(author-#{$author}.jpg);
  }
}
```

## For

O mesmo do each mas para números.

```scss
.item {
  position: absolute;
  right: 0;
  @for $i from 1 through 3 {
    &.item-#{$i} {
      top: #i * 30px;
    }
  }
}
```

## While

```scss
$i: 1;

.item {
  position: absolute;
  right: 0;
  @while $i < 4 {
    &.item-#{$i} {
      top: #i * 30px;
    }

    $i: $i + 1;
  }
}
```

## Matemática com cor

É possível executar funções matemáticas dentro do Sass, as funções permitidas são:

- Adição
- Subtração
- Multiplicação
- Divisão
- Resto (%)

> Operações com números no sass retornam 5 pontos decimais por padrão

## String

O Operador de concatenação de strings é o `+` assim como em javascript ou qualquer outra linguagem derivada do C.

O operador do lado esquerdo determina a posição das aspas no final da concatenação, por exemplo:

- `$family: 'sans-' + serif nos dará 'sans-serif'
- `$family: sans- + 'serif' nos dará sans-serif

## Unidades

Quando operamos aritméticamente com Sass, o resultado de operações com unidades diferentes tende a ser convertido para a unidade padrão pelo próprio sass

Ex:

```scss
h2 {
  font-size: 10px + 4pt;
}
```

Isso será convertido para pixels e nos dará um resultado final de

```css
h2 {
  font-size: 15.33333px;
}
```

Porém se utilizarmos operadores relativos, como o "em" e os pixels, o sistema nos apresentará um erro de conversão. Uma vez que o "em" é uma unidade relativa.

## Funções matemáticas

Sass possui algumas funções matemáticas por padrão.

- round($number): Arredonda o valor para o próximo numero inteiro
- ceil($number): Arredonda para cima
- floot($number): Arredonda para baixo
- abs($number): Valor absoluto de um número (Módulo `|x|`)
- min($list): Valor minimo de uma lista
- max($list): Valor máximo de uma lista
- percentage($number): Conversão para porcentagem

## Cores

Sass possui algumas funções simples para tratamento de cores.

### Operações

Sass possui algumas funções e atalhos para cores pré definidos, também podemos executar operações matemáticas sobre as cores que já temos:

```scss
$color-base: #333333;

.addition {
  background: $color-base + #112233;
}
```

A soma dessas cores irá separar o RGB em três blocos, na cor base teremos R: 33, G: 33 e B: 33 assim como na cor somada que será R: 11, G: 22 e B: 33, então somaremos os R's, G's e B's obtendo `#445566`

> Isto também funciona com subtração, multiplicação e divisão nestas cores.

### Conversão

Podemos converter as cores dos mais diversos formatos para outros com uma função de conversão.

Por exemplo, se quisermos converter um valor em hexadecimal para rgba podemos fazer isso:

```scss
$color: #333333;

.alpha {
  background: rgba($color, 0.8);
}
```

Desta forma o hexadecimal é convertido para rgb

### Funções

O Sass possui funções de alterações de cores que são muito mais previsiveis que as operações matemáticas que foram descritas acima, desta forma o nosso css é muito mais fácil de manter e o resultado final é muito mais previsível.

- lighten($color, x%): Clareia a cor `$color` em `x%` (Ex: `lighten(#333, 20%);` nos dará #666)
- darken($color, x%): Escurece a cor `$color` em `x%` (Ex: `lighten(#333, 20%);` nos dará black)
- saturate($color, x%): Satura a cor em `x%` (Ex: `saturate(#87bf64, 20%)` nos dará #82d54e que é uma cor mais intensa)
- desaturate($color, x%): Similar ao saturate, esta função remove a saturação em x% (O mesmo exemplo acima com o desaturate nos dará #323130)
- mix($c1, $c2, [x%]): Mistura as duas cores passadas formando uma nova cor (Ex: `mix(#ffff00, #107fc9)` nos dará #87bf64), a função mix leva um terceiro parâmetro opcional que limita a quanitdade da primeira cor que será usada para a mistura, desta forma se usarmos o exemplo em parenteses com o x em 30% (significando que temos uma mistura de 30% de amarelo e 70% de azul) nos dará um verde azulado.
- grayscale($color): Retorna o correspondente em grayscale para a cor passada (é o equivalente a remover a saturação em 100%)
- invert($color): Retorna o valor oposto na roda de cores para a cor passada
- complement($color): A cor complementar a cor passada será retornada

## Responsividade

Sass possui algumas formas de melhorar o media query e nos ajudar a trabalhar com responsividade.

## Media queries

Podemos usar o nesting simples para compilar media queries dentro de seletores, como por exemplo:

```scss
.sidebar {
  border: 1px solid #ccc;
  @media (min-width: 700px) {
    float: right;
    width: 30%;
  }
}
```

E o Sass iria compilar para uma media query normal.

## Respond-to

Respond-to é uma prática que inclui a criação de um mixin e uma media query dinâmica utilizando a notação `@content`

> *@content* é uma notação no Sass que diz basicamente que todo o conteúdo dentro do mixin quando foi chamado será incluido no local substituindo a variável. Desta forma podemos utilizar um mixin do tipo `@include the-mixin { //conteúdo }` e o @content será a referência para todo o conteúdo dentro do mixin.

Um exemplo:

```scss
@mixin respond-to {
  @media (min-width: 700px) {
    @content
  }
}

.sidebar {
  border: 1px solid black;
  @include respond-to {
    float: right;
    width: 30%;
  }
}
```

O @content seria o float e o width dentro do respond-to.

Para transformar o mixin em flexível, podemos utilizar uma variável parâmetro para setar o tamanho do media query:

```scss
@mixin respond-to($size) {
  @media (min-width: $size) {
    @content
  }
}

.sidebar {
  border: 1px solid black;
  @include respond-to(700px) {
    float: right;
    width: 30%;
  }
}
```

Que seria compilado em:

```css
.sidebar {
  border: 1px solid black;
}
@media (min-width: 700px) {
  .sidebar {
    float: right;
    width: 30%;
  }
}
```

Isto é uma boa prática, porém estamos limitados a apenas utilizar o min width. Vamos refatorar para dois parâmetros

```scss
@mixin respond-to($val, $size) {
  @media ($val: $size) {
    @content
  }
}

.sidebar {
  border: 1px solid black;
  @include respond-to(max-width, 700px) {
    float: right;
    width: 30%;
  }
}
```

Que seria compilado em:

```css
.sidebar {
  border: 1px solid black;
}
@media (max-width: 700px) {
  .sidebar {
    float: right;
    width: 30%;
  }
}
```

### Notas sobre responsividade

1. Não podemos utilizar o @extend em uma media query para um elemento fora desta media query, porém podemos extender conteúdos dentro da mesma média query sem problemas:

```scss
.sidebar {
  .p {
    border: 1px solid green;
  }
 @media (min-width: 700px) {
   @extend .p; //Não é possível
 }
}
```

Mas:

```scss
.sidebar {
  .p {
    border: 1px solid green;
  }
    @media (min-width: 700px) {
      .content {
        width: 50%;
      }
    .aside {
      @extend .content; //Possível
    }
  }
}
```

2. Sass não combina as media queries, então duas media queries iguais não serão misturadas, e sim duplicadas.