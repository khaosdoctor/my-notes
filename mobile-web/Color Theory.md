# Teoria das cores

<!-- TOC -->

- [Teoria das cores](#teoria-das-cores)
  - [Introdução](#introdução)
  - [HSL](#hsl)
      - [Hue (Matiz)](#hue-matiz)
      - [Saturation (Saturação)](#saturation-saturação)
      - [Lightness (Luminância)](#lightness-luminância)
      - [Brightness](#brightness)
- [Color Scheme](#color-scheme)
  - [Sentimentos e cores](#sentimentos-e-cores)
  - [Construindo o Scheme](#construindo-o-scheme)

<!-- /TOC -->

## Introdução

Existem dois tipos de cores:

* Cores palpáveis (Cores subtrativas): Como a casca de uma maçã
* Cores não palpáveis (Cores aditivas): Como uma tela de um computador

Cores subtrativas são controladas usando o esquema CMYK, e são ideais para impressão

Cores aditivas são controladas usando RGB, são ideais para telas e digitais.

## HSL

Humanos não processam cores no modelo RGB ou CMYK. Nós processamos cores do modo HSL (Hue [matiz], Saturation [Saturação], Lightness [Luminancia])

#### Hue (Matiz)
É melhor visualizado em uma roda de cores. Você começa no 0º (Vermelho) e conforme avança no sentido horário você ganha variações.
O verde e azul estão localizados em um padrão triangular na roda, estando um a 120º e o outro a 240º, ou seja, com um espaçamento
de 120º entre si. Chamado de padrão triádico.

#### Saturation (Saturação)
É melhor visualizado em uma tira, aonde o início (ou 0%) é completamente cinza e o 100% é completamente vermelho, sendo simbólico de que
com 0% você não tem realce na cor, enquanto o vermelho absoluto (100%) seria a cor mais viva possível a partir da matiz.

#### Lightness (Luminância)
É a quantidade de luz colocada na cor. Em uma escala de 0 a 100% onde 0 é o preto absoluto e 100% é o branco total, no ponto
de 50% temos o vermelho vivo, que significa que com 50% de luz teremos a forma mais viva da matiz possível. Com 100% a matiz se torna 
branca e com 0% ela se torna preta.

Em essência:
* **Hue**: Controla a cor em si
* **Saturation**: Controla a vivacidade da hue
* **Lightness**: Controla a quantidade de branco na hue

O Espaço HSL pode ser visualizado como um cilindro de três dimensões (pense que a roda de cores é o topo do cilindro).

1. Na primeira dimensão temos a Hue, que seria o perímetro do circulo, já que as cores se movem *ao redor* do cilindro 
2. Na segunda temos a saturação, que seria a largura/raio do cilindro. Onde o raio 0, ou o meio, seria o 0% e a borda seria 100%
3. Na terceira temos a luminancia, que representa a altura do cilindro. No fundo temos 0% de luz e no topo 100% (do preto para o branco)

Se formos imaginar como uma estrutura física, uma cor mais escura estaria mais no fundo do circulo enquando uma cor mais clara estaria
mais para o topo do mesmo. Da mesma forma que uma cor mais fosca ou sem saturação estaria mais para o meio do cilindro. Enquanto isso 
as cores selecionadas, ou a matiz, seria toda a extensão do mesmo.

#### Brightness
O Brightness é do espaço HSB, utilizado por muitos softwares como o Photoshop, mas qual é a diferença entre B e L?

> A diferença é que com Lightness a 100% a cor é branca, porém com Bightness a 100%, a cor é a forma mais viva da mesma.

É como se brightness fosse um misto de saturação e luminância. Porém, imaginando uma régua de B e L, a régua de Brightness seria
a exata metade do tamanho da régua de lightness.

# Color Scheme
Um esquema de cores é uma sequencia de 4 ou 5 cores que fazem parte da guia de estilo do site. Cada uma delas vai ser aplicada em diferentes elementos dentro da aplicação.

Um esquema precisa de uma **cor base**, a cor base influencia todas as demais cores. Cada cor passa um sentimento.

## Sentimentos e cores

* Vermelho: Calor, paixão e Excitação
* Laranja: Aquecimento, Vitalidade (Assiciada com confiança)
* Amarelo: Otimisto, Criatividade (Representa alegria)
* Verde: Serenidade, Saúde (Remete a natureza e frescor)
* Azul: Segurança, verdade, estabilidade (Implica lealdade, e comunicação)
* Roxo: Espiritualidade, Inteligencia, Riqueza
* Pink: Intensidade jovem
* Marrom: Durabilidade, classe (Representa idade, estabilidade e relaxamento)
* Preto: Poder, Drama (Sério, forte)
* Branco: Simplicidade e limpeza (Remete a algo puro)

Sempre manter a cultura em mente, por exemplo, a cor vermelha pode significar intensidade aqui no mundo ocidental, porém na Russia é associada ao comunismo.

## Construindo o Scheme
Uma vez selecionada a cor base é possível construir o esquema de diversos métodos diferentes:

- **Monocromático**: É um esquema de cor que tem a matiz constante, porém diversifica na luz e na saturação (no esquema HSL). É o mais simples de criar, uma vez que é só mexer com o S e L, são bem uteis quando utilizados juntos, porém pecam em versatilidade.
- **Análogo**: O esquema análogo mexe com todos os controladores HSL, aonde respectivamente, imaginando uma linha onde a cor base está no centro, as cores da esquerda diminuem a Matiz, enquanto as da Direita aumentam a mesma, toda a alteração de matiz deve ser igual para os dois lados, por exemplo, o incremento pode ser de 20º desde que para a direita as duas cores aumentem 20 e 40º e para a esquerda diminuam 20 e 40º, a diferença de matiz em relação a base não pode passar de 40º. Todas alterando a Saturação e Luminancia.
  * Ex: (H:160º S:100% L:59%) (H:180º S:77% L:53%) **(H:200º S:100% L:62%)** (H:220º S:78% L:51%) (H:240º S:100% L:59%). Note que as cores da direita e da esquerda tem quase os mesmos níveis de saturação que as suas opostas diretas
- **Complementar**: Cores complementares tem cores que diferem tanto na L quanto na S porém pelo menos 2 das cores devem ter a matiz oposta a base.

> Para achar o oposto da matiz de uma cor, some 180º ao seu valor original, se ele passar de 360, subtraia 360 do mesmo. Por exemplo, 200º: 200+180 = 380 (maior que 360) logo 380 - 360 = 20º, portanto a cor oposta a matiz de 200º é a matiz de 20º

Esquemas podem ser parcialmente corretos, porém não necessariamente necessitam ser 100% acurados.