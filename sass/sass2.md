# Sass P. 2

## A sintaxe .sass

A sintaxe .sass confia nos espaços em branco e identação e a remoção das chaves:

```scss
.content {
    border: 1px;
    h2 {
        color: black;
    }
}
```

A sintaxe acima, chamada de Sassy CSS, é a mais comum. A sintaxe identada (.sass) seria a seguinte:

```sass
.content
    border: 1px
    h2
        color: black
```

Que deixa um pouco mais simples, parecido com o Jade/Pug. Também omitimos o ponto e vírgula.

A segunda diferença é a declaração de mixins, em scss temos de declarar `@mixin`:

```scss
@mixin foo($v) { color: $v; }

.content {
    @include foo(black);
}
```

Já na sintaxe identada:

```sass
=foo($v)
    color: $v;

.content
    +foo(black)
```

Usamos `=` para declarar um mixin e `+` para usar.

## Listas

Além das funções originais que estão no outro arquivo, também temos funções que trabalham especificamente com listas.

- Length: Tamanho de uma lista `length($authors)`
- Append: Adiciona um novo item no final da lista sem modificá-la `append($lista, nome)`
- Join: Junta duas listas em uma `join($l1, $l2)`
- Index: Retorna o indice do item que buscamos na lista `index($lista, busca)`, lembrando que se o item não for encontrado será retornado false, e os indices não começam com 0, mas sim com 1.
- Nth: Se passado um indice, ele retornará o valor deste indice `nth($lista, 3)`, retorna o indice 3 da lista
- Zip: Combina a lista em pares separados por virgula `zip($li, $l2)`, se tivermos `$a: 1 2` e `$b: 3 4` e usarmos `zip($a, $b)` teremos uma lista grande desta forma `[ [1,2] , [3,4] ]`, lembrando que os itens são agrupados em duas listas diferentes dentro de uma lista maior, então o indice desta lista maior será outra lista.

## Utilidades

### Escala de cores

As funções `darken` e `lighten` são úteis, porém elas tem uma falha que impede que sejam utilizadas em alguns casos. Essa falha é a de que elas são lineares, ou seja, alterações em cores que já são claras escalam diretamente para o branco, ao invés de uma cor mais clara.

Se usarmos `lighten(#eee, 7%)` o resultado será `white`.

Podemos então usar a função `scale_color(#eee, $lightness: 7%)`, isso fará com que a cor seja escalada relativamente entre #eeeeee e branco que seria a próxima cor.

### Condicionais simples

Podemos utilizar operadores ternários e if's inline para criar condições mais simples como `if(condition, 'true', 'false')`. O que fica muito mais legível.

### Placeholder

Seletores que são extensíveis mas não são compilados como classes. São declarados com `%`. Porém não podemos utilizar o placeholder como classe porque ele não compila, mas podemos utilizar uma classe dentro de nosso placeholder:

```sass
%btn
.btn
    color: black
```

Desta forma podemos usar tanto o seletor quando o placeholder.

## Compass

Compass é uma extensão do Sass. Ele contem alguns módulos e padrões de repetição que são muito utilizados tanto no sass quanto em outros projetos.

### Utilização

O Compass é dividido em 5 módulos principais:

- Utilities
- Typography
- CSS3
- Layout
- Reset

Os primeiros 4 não incluem nenhum CSS quando utilizado, apenas `Reset` que realiza saídas de CSS por si só.

Para utilizar, podemos basicamente importar o compass:

```scss
@import "compass" /* Inclui o utilities, typography e css3 */
@import "compass/layout"
```

### Reset

O Reset vai resetar todo o CSS quando importado, então não é uma boa ideia usá-lo em produção. Ele printa uma stylesheet pronta para reset de posições, códigos e etc.

## Mixins

Podemos utilizar:

```sass
@import "compass"

.content
    +box-sizing(border-box)
```

E o compass vai se encarregar de adicionar o necessário

Outros mixins que estão disponíveis são:

- background (gradients)
- border-radius
- box-shadow
- columns
- transform
- transition

Exemplo:

```scss
@import "compass"

.content
    +background(linear-gradient(top, #9b9592, #3c3733))
```

Isso por si só vai nos dar um background color com gradients.

### Utility

Existem muitos helpers de utilidades neste módulo, é possível checar o resto [aqui](http://compass-style.org/reference/compass).

Temos que usar esse módulo com cuidado, pois alguns helpers não possuem um bom suporte para as atuais tecnologias.

#### image-url

Podemos definir uma url de uma imagem:

```sass
@import "compass"

body
    background: image-url('bg-body.png') repeat
```

Com este resultado:

```css
body {
    background: url('/images/bg-body.png') repeat;
}
```

Note que é necessário configurar estes módulos para que ele saiba as pastas aonde procurar sua imagem.

#### scale-lightness

```sass
@import "compass"

.content
    color: scale-lightness(#eee, 7%)
```

Podemos usar também um valor negativo para a porcentagem para escurecer.

Similarmente, `scale-saturation` faz a mesma coisa.

#### Opposite Position

Esta função retorna o oposto da posição passada como parâmetro:

```sass
@import "compass"

opposite-position(top) //bottom
opposite-position(left) //right
opposite-position(right bottom) //left top
```

Exemplo:

Vamos construir um triangulo:

```scss
.caret
    border: 100px solid transparent
    border-bottom: 100px solid #000
    border-top: 0
    height: 0
    width: 0
```

Podemos definir a posição que o triangulo vai apontar usando um mixin

```scss
=caret($point)
    $opposite: opposite-position($point)
    border: 100px solid transparent
    border-#{$opposite}: 100px solid #000
    border-#{$point}: 0
    height: 0
    width: 0

.caret
    +caret(top)
```

#### Contrast Color

Retorna uma cor clara ou escura baseada no brilho do parâmetro:

`contrast-color(cor, cor escura, cor clara, threshold)`

Exemplo: Uma série de botões com vários fundos, e queremos saber qual é a cor do texto de cada um.

```sass
@function button-text($bg)
    @return contrast-color($bg, #333, #eee, 50%)

.btn-a
    background: #222
    color: button-text(#222);

btn-b
    background: #aaa
    color: button-text(#aaa);
```

#### Stretch

Feito para esticar um filho para ocupar todo o espaço do pai que ele está aninhado.

```sass
@include "compass/layout"

.content
    height: 400px
    position: relative
    width: 400px

.sidebar
    background: #aeaeae
    +stretch //Vai esticar
```

Podemos passar 4 parâmetros para o stretch o top, right, bottom e left como `stretch(0,0,0,0)` desta forma podemos controlar as bordas.

#### Imagens

##### Image size

```sass
@import "compass"

.logo
    background: image-url('s.png')
    height: image-height('s.png')
    width: image-width('s.png')
```

Este helper pega o tamanho da imagem e seta os valores correspondentes, desta forma não precisamos redimensionar o painel sempre que a nossa imagem mudar de tamanho.

##### Inline (base64)

Podemos converter automaticamentepara base 64 usando `inline-image`

```sass
@import "compass"

.logo
    background: inline-image('s.png')
    height: image-height('s.png')
    width: image-width('s.png')
```

## Vertical Rhythm

Rhythm é um modelo de layout que realiza o ajuste de grids da forma "baseline", ou seja, todos os textos estão alinhados com uma linha base, parecido com uma folha de caderno.

Usando o Compass vamos criar um grid baseline que será totalmente gerenciado pelo compass.

Vamos utilizar um reset inicial para setar todo o conteúdo como 0 e depois utilizar o `establish-baseline` para setar uma linha de base padrão:

```sass
@import "compass"

$base-font-size: 18px
$base-line-height: 30px
+establish-baseline
```

O establish baseline basicamente seta os tamanhos das linhas e ajusta todos para a mesma base.

Isso é bom para uma fonte com um unico tamanho, porém quando precisamos de vários tamanhos de fontes diferentes, podemos utilizar o mixin `+adjust-font-size-to(Npx)` que irá ajustar automaticamente a unidade relativa em `em` conformando com o baseline.

### Leading

Leading é a medida de quantas linhas um bloco de texto pode ocupar em um layout baseline.

Se tivermos um blockquote, por exemplo, podemos setar o leading com o mixin `+adjust-leading-to(2)` e ele irá tomar 2 linhas. Com o texto centralizado exatamente no meio da linha.

É sempre bom ajustar o tamanho da fonte para o texto não ficar deslocado na linha. Para fazer isso podemos setar primeiramente o mixin de ajuste e passar um segundo parâmetro para o mixin de leading:

```sass
@import "compass"

blockquote
    +adjust-font-size-to(20px)
    +adjust-leading-to(2, 20px)
    background: #ccc
```

Agora ele vai compensar o tamanho da linha.

### Margens

Para adicionar margem sem quebrar a linha podemos usar os mixins `+leader(n)` ou `+trailer(n)`. O leader é o margin-top e o trailer seria o margin-bottom.

Da mesma forma como no leading, se ajustarmos o tamanho da nossa fonte, precisaremos também notificar os trailers e os leaders sobre essa mudança, setando um segundo parâmetro:

```sass
@import "compass"

h1
    +adjust-font-size-to(50px)
    +trailer(2, 50px)
```

O primeiro número é sempre o número de linhas que ele vai dar de espaço.

Temos também outros mixins como:

- padding-leader
- padding-trailer

Ambos funcionam da mesma forma, porém com o padding.

Também podemos setar todos eles juntos usando o mixin `rhythm`, que tem a seguinte forma: `+rhythm(leader, padding-leader, padding-trailer, trailer, font-size)` como em `rhythm(1,2,2,1,36px)`.

### Border

Para adicionar o border podemos seguir os mesmos exemplos, porém com `trailing-border` e `leading-border`:

O mixin segue o modelo: `+trailing-border(tamanho-borda, linhas-padding, font-size)` e podemos deixar como `+trailing-border(10px, 1, 50px)`.

Este mixin só adicionará bordas em cima ou em baixo do elemento. Se quisermos adicionar bordas ao redor do elemento e também espaço entre a borda e o elemento (linhas-padding) podemos usar o `rhythm-borders` com os mesmos parâmetros.

## Sprite

Como criar sprites manuais e automaticamente.

Sprites são combinações de várias imagens pequenas em uma unica imagem grande para reduzir a quantidade de requisições para o servidor.

### Sprites automáticos

O Compass pode gerar sprites automaticamente a partir de uma série de imagens, imagnemos que temos uma pasta chamada `icons` contendo três imagens de três icones, cada uma com um tamanho diferente. Manualmente seria um processo tedioso e complicado.

Porém vamos importar todos os arquivos de uma maneira diferente.

```sass
@import "compass"
@import "icons/*.png"
```

Isso vai criar uma imagem na pasta `images` com uma string auto gerada na frente.

Após isso podemos usar o mixin `+all-<pasta>-sprites` no nosso caso seria `+all-icons-sprites`.

O que isso vai fazer é criar automaticamente um CSS com classes já definidas com cada posição de cada icone dentro do sprite maior. Porém ele ainda tem alguns problemas.

- Cria muitos seletores
- Não seta os tamanhos exatos da imagem

Para combater isso vamos usar um sprite-map

### Sprites manuais

Vamos utilizar um sprite-map para poder importar as imagens que queremos.

```sass
@import "compass"
$icons = sprite-map("icons/*.png") //Não cria a imagem automaticamente

i
    background: $icons //Agora a imagem é criada
    display: inline-block

```

O que fizemos foi setar o background de um elemento `i`, como o bootstrap faz, para a imagem que queremos, e isso vai criar um sprite-map com todas elas, mas apenas um seletor. Porém ainda não definimos os tamanhos.

Para setar os tamanhos manualmente, juntamente com as posições, vamos utilizar a criação manual de classes, por exemplo, criando um icone de cancelar.

Temos um icone na pasta `icons` chamado `cancel.png`:

```sass
.icon-cancel
    background-position: sprite-position($icons, cancel)
```

Temos que passar o sprite-map e também o nome do icone. Isso vai criar automaticamente o posicionamento do icone.

Para podermos setar o tamanho do sprite, vamos usar um mixin:

```sass
.icon-cancel
    background-position: sprite-position($icons, cancel)
    +sprite-dimensions($icons, cancel)
```

Isso vai nos dar um css:

```css
.icon-cancel {
    background-position: 0 -169px; /*positionamento do icone*/
    height: 166px;
    width: 166px;
}
```

Agora se precisarmos usar esse icone podemos simplesmente criar um elemento `<i class="icon-cancel">` e passar apenas o tamanho que queremos parao icone aparecer.

Agora podemos copiar isso para poder criar todos os outros, mas isso é muito repetitivo. Podemos criar um mixin para isso.

O Sass tem a função `@each` que é um loop, e o compass tem uma função `sprite_names` que retorna todos os nomes de arquivos dentro de um sprite-map, então podemos juntar as duas.

```sass
@each $i in sprite_names($icons)
    .icon-#{$i}
        background-position: sprite-position($icons, $i)
        +sprite-dimensions($icons, $i)
```

Agora sempre que adicionarmos um icone na nossa pasta de sprites, o sprite será adicionado para o css.

