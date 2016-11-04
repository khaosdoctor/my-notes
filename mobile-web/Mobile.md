# Fontes responsivas
A maioria dos browsers fixa uma fonte em 16px, porém para faze-la responsiva ao design do site e do dispositivo que 
vai abrir temos que usar o `em`.

`em` é a medida relativa da fonte em relação ao contexto, então se em uma css temos:

```css
html {
  font-size: 10px;
}

body {
  font-size: 2em;
}
```

Teremos um tamanho de fonte no `body` equivalente a 20px, logo a formula para se achar o número de `ems` de uma fonte é:

> alvo / contexto = em

Onde alvo é  o tamanho da fonte que se quer chegar e o contexto é o tamanho da fonte do elemento que ela é filha.

Se tivermos uma estrutura hierárquica, como por exemplo:

```html
<body>
  <h1>
    Teste
    <h2>Dolor</h2>
  </h1>
  <p>Lorem</p>
  Ipsum
</body>
```

E um CSS no modelo:

```css
html {
  font-size: 10px;
}
body {
  font-size: 2em;
}
h1 {
  font-size: 0.8em;
}
p {
  font-size: 0.6em;
}
h1 h2 {
  font-size: 0.625em;
}
```

Os tamanhos das fontes serão sempre relativos entre si, teremos (levando em conta o contexto geral como 10px):

- 20px no body, pois teremos a seguinte formula `20px/10px = 2em`
- 16px no h1, pois agora temos um novo contexto, o h1 está dentro do body, logo o modelo geral não é mais 10px, mas sim 20px (ou 2em), 
então teremos `16px/20px = 0.8em`
- 12px no p, pois da mesma forma que a anterior, o contexto geral é 20px, então `12px/20px= 0.6em`
- no h2 teremos 10px, pois agora, como ele está aninhado no h1, e o mesmo tem 16px como mostrado no segundo tópico, `10px/16px = 0.625em`

# Layouts Fluidos
A maioria dos sites que são fluidos usam os grids fluidos. Diferente dos layouts fixos, eles são geralmente construidos com porcentagens
ao invés de pixels fixos.

A mesma formula de `alvo/contexto` pode ser utilizada, porém como estamos trabalhando com porcentagens, temos que  multiplicar por 100
para ter um valor aceitável.

Lembre-se de que quando estamos falando de margem, o contexto é sempre o contexto do seu elemento, neste caso se estamos trabalhando
com um elemento cujo tamanho é 200px mas está aninhado em outro elemento de 900px, nosso contexto é 900px para este elemento, mas
também vai ser o mesmo contexto para as suas margens, que vão adotar também 900px como contexto.

No caso do padding, o contexto é sempre o elemento que o padding é aplicado. Neste caso o padding do nosso elemento de 200px teria um 
contexto de 200px, já que ele faz parte do próprio elemento.

# Adaptive Web Design
É um método de design criado para adaptação controlada. Isso significa que você sabe qual é o dispositivo que está acessando o website e desenvolve o modelo de acordo.

Para este modelo é necessário saber 4 coisas:
- Quem é seu usuário
- Como ele vai usar o site
- Qual dispositivo ou ambiente ele vai usar
- Qual será o conteúdo e como ele vai adaptar

## Markup
Esqueleto de um site, baseado nas seções que estarão contidas no mesmo, por exemplo, header, conteudo e footer.

## Breakpoints
Aonde o design do site irá se alterar, no contexto adaptivo é a largura e a altura do dispositivo que estará acessando o site. Ou seja, dependendo da largura e da altura, seu site se comportará de forma diferente.

### Media Queries
O modo como serão quebrados os breakpoints ou como o css se comportará em cada caso:

```html
<link rel="stylesheet" href="global.css" media="all" />
<link rel="stylesheet" href="main.css" media="screen" />
<link rel="stylesheet" href="paper.css" media="print" />
```

Contudo, o html não é suficiente porque não adianta em todos os modelos de dispositivos. Neste caso o CSS é melhor utilizado:

```css
@media screen and (max-width: 320px) {
  body {
    font-size: 100%;
  }
}
```

Este bloco vai ser utilizado para todas as telas que são menores ou iguais a 320px, ou seja, para toda resolução menor que 320px, o `font-size` será 100%;

```css
@media screen and (min-width: 320px) {
  body {
    font-size: 100%;
  }
}
```

No caso acima, todos os dispositivos com resolução maior ou igual a 320px terão o css aplicado.

É uma boa prática manter todos os media queries e seus breakpoints juntos no final da mesma CSS, assim são fáceis de manter e fáceis de se achar.

# Retina Screens
Quando existem telas retina, a densidade de pixels em um dispositivo chega a ser o dobro de uma imagem normal (2k), assim as imagens simples que usamos nos monitores normais ficam borradas ou pixeladas em uma tela retina.

Podemos usar media queries para telas retina:

```css
@media
only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (min-device-pixel-ratio: 1.5) {

}
```

Dessa forma nós podemos otimizar o site para imagens retina, todas as imagens retina teriam que ter o dobro do tamanho original, ou seja, uma imagem de 200px teria que ter 400px em uma tela retina.

**Obs**: Uma boa prática é nomear os arquivos com `@2x` no final: logo@2x.png por exemplo.

Temos que usar a propriedade `background-size`, se tivermos uma imagem setada de background de uma div por exemplo, para que a imagem seja diminuida para metade do tamanho, mas com o `background-image` do tamanho original, ou seja, o dobro da densidade. Então se tivermos uma imagem 400x400, ao dobrarmos para 800x800, teremos o background-size de 400px para que ela tenha o tamanho original.

Porém, o tamanho de uma imagem retina é muito grande para um site normal, para resolver esse problema podemos usar a ferramenta http://scottjehl.com/picturefill 