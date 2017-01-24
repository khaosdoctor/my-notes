# Tipografia

<!-- TOC -->

- [Tipografia](#tipografia)
  - [Introdução](#introdução)
- [Atributos que influenciam o design](#atributos-que-influenciam-o-design)
- [Tipografia](#tipografia-1)
  - [Guia de estilos](#guia-de-estilos)
  - [Tipos de fonte](#tipos-de-fonte)
    - [Serif](#serif)
      - [Tipos](#tipos)
    - [Sans Serif](#sans-serif)
      - [Tipos](#tipos-1)
    - [Script](#script)
  - [Usos ideais](#usos-ideais)
  - [**Regra simples**: "Mantenha o mesmo ou mude muito"](#regra-simples-mantenha-o-mesmo-ou-mude-muito)
    - [Boas Combinações](#boas-combinações)
- [Tamanhos de fontes](#tamanhos-de-fontes)
  - [Hierarquia visual](#hierarquia-visual)
    - [Começando a hierarquia](#começando-a-hierarquia)
  - [Leading](#leading)
  - [Uso de negritos e itálicos](#uso-de-negritos-e-itálicos)
- [Largura da linha](#largura-da-linha)
      - [CpL (Characters Per Line)](#cpl-characters-per-line)
- [Sem Orfãos e Viúvas](#sem-orfãos-e-viúvas)

<!-- /TOC -->

## Introdução

*"Content is king"*: O conteúdo que controla o que será criado pelo designer. Todo o site é baseado em o que ele quer passar

# Atributos que influenciam o design
* **Audiencia**: Coisas como idade, raça, genero, nicho cultural influenciam quem poderá gostar do seu conteúdo
* **Tom**: Casual? Formal? Amigável? Sarcástico?
* **Propósito**: Informativo? Conversão?

Só após saber cada um desses pontos que será possível começar com o design.

# Tipografia

A tipografia pode ser verbal e visual ao mesmo tempo, isso significa que cada fonte 
vai passar tanto uma informação quanto um sentimento sobre o que está sendo mostrado

## Guia de estilos
Guia de referência com multiplas instancias de tipografias que você vai usar no website. Ele divide o site em 5 partes:

1. O Título ou Headline: É o título princípal da sua página
2. B-Head, ou subtitulo
3. Navegação e menus
4. Body do conteúdo
5. Byline, texto final que pode ir no footer ou no fim de cada post informando a data e informações uteis

## Tipos de fonte

### Serif

É uma linha pequena que sai das bordas das letras, alguns exemplos de serifa são fontes como Times.

#### Tipos
* Humanist Serif: Contém constrastes de pinceladas, como se fossem pontos de pressão, emulam caligrafia (**Classico e tradicional** Ideal para jornalismo e algo histórico)
* Transitional Serif: É mais afiada nas bordas, mais quadrada (**Dinamico, Forte** Ideal para tipos acadêmicos)
* Modern Serif: Linha serifa horizontal bem fina e muitos contrastes (**Limpa e elegante**, ideal para artes e cultura)
* Egyptian/Slab Serif: Tem serifas bem largas e quase nenhuma linha de pressão e contraste (**Autoritário, mas amigável**, ideal para marketing)

### Sans Serif

Fontes *sem serifa*:

#### Tipos
* Humanist Sans Serif: Mesma coisa do outro porém cria uma tensão entre o perfeito e o imperfeito (ideal para aplicações do governo ou educação)
* Transitional Sans Serif: Caracteres bem definidos e linhas fortes (**Moderno**, ideal para tecnologia e mobilidade)
* Geometric Sans Serif: Formas geométricas que formam os espaços em branco das letras (**Objetico, universal** ideal para ciência e arquitetura)

### Script
Imitam mais a caligrafia humana do que qualquer coisa, são ótimas para passar uma noção de amizade, mas nem tão boas para textos longos.
Exemplos são Scriptna e Comic Sans

## Usos ideais

Uma fonte serifada é melhor aproveitada em headers e subtitulos, enquanto para textos e corpo de sites, o melhor estilo é o sem serifa.

É importante misturar as fontes, porém misturas muito iguais não dão certo, como Garamond e Epic (duas fontes Humanist Serif), elas
são muito iguais para ficarem boas juntas.

Outro tema importante é não combinar fontes que tenham a mesma classe mas tipos diferentes, como duas serifas do estilo
Epic e Myriad (Uma é humanist e outra Slab)

Grandes pares vem de fontes de classes distintas como Sans e Serif e com tipos distintos como Perpetua (transitional serif) e Gill Sans
(humanist Sans), são duas fontes de classes distintas (*serifada e sem serifa*) e com tipos distintos (*humanist e transitional*).

## **Regra simples**: "Mantenha o mesmo ou mude muito"

Quando for criar uma tipografia mista você deve escolher, ou manter as duas muito próximas uma da outra, ou então criar um contraste
gritante. **Contraste é sempre melhor que Harmonia**.

### Boas Combinações 

* Geometric Sans + Transitional Serif (body)
* Script + Geometric Sans (maior contraste possível)

# Tamanhos de fontes

Humanos criam associações para poder entender as coisas, podemos usar isso no design criando

## Hierarquia visual

Estabelecer relações entre os itens de um conjunto para ajudar a pessoa a compreender o todo.

> Os olhos sempre correm de elementos maiores para menores

**Exemplo**: Um texto com muitas linhas não atrai o usuário, pois ele não sabe o que o conteúdo quer dizer sem ler o texto todo. Para sanar este problema, podemos criar um headline com um sumário do que está por vir, um título simples que descreve quais são os objetivos do texto.

### Começando a hierarquia

* **Body**: Sempre começamos pelo corpo. Não há uma regra de ouro para estimar o tamanho do texto no corpo de um website, pois dependendo do tipo de conteúdo que deseja ser passado, fontes maiores (que costumam ser mais irritantes) ficam melhores do que fontes menores (que são mais sérias e concisas).

* **Headline**: Geralmente o tamanho do título é de 200% a 300% maior que o tamanho do texto do body. Todo o resto é relativo à esses dois.

* **B-Head**: Geralmente em torno de 150% do Body

* **Navigation**: Mesmo tamanho do Body, ou seja, 100% da fonte.

* **Byline Text**: Geralmente menor que o body, de 2~4px menor ou então 75% do tamanho.

## Leading

A quantidadde de espaço entre linhas do texto (o famoso line-height do CSS).

Linhas muito largas afetam negativamente a leitura, já que o olho tem que se mover mais entre as linhas para ler. No entanto, leadings que são muito curtos criam uma sensação claustrofóbica no leitor, fazendo-o ler mais depressa e ser mais desconfortável.

O leading ideal tem entre 120%e 150% do tamanho do corpo, mas felizmente não temos que fazer nenhuma conta. Se setarmos a propriedade `line-height:` do CSs para o valor relativo de `1.5` ficando `line-height: 1.5;` teremos automáticamente 1.5x o tamanho do corpo independente da fonte.

## Uso de negritos e itálicos

Uso de diferentes pesos para fontes pode criar sensações diferentes ao ler o texto. Textos com muito negrito causam uma sensação negativa de leitura.

Um mal exemplo de uso seria um texto cujo título não é mais negrito do que o texto em si, ou seja, não há nenhuma hierarquia visual neste modelo, apenas confusão.

# Largura da linha

Linhas muito curtas são dificeis de ler pois o usuário deve ficar mudando de linha o tempo todo, mas linhas muito longas são ruins também porque o olho pode se perder durante a leitura.

#### CpL (Characters Per Line)

A medida usada para largura de linhas é o CPL, que identifica a quantidade de caracteres devem haver por linha. A medida ideal está entre 50~70CpL.

No CSS isso é controlado usando o atributo `max-width`, um valor maior permite mais CpL

# Sem Orfãos e Viúvas

* **Viúvas**: São palavras que ficam sozinhas em uma linha de texto, criando uma nova linha, como se fosse uma quebra. Isto não é bom para leitura.
* **Orfãos**: São linhas inteiras de texto que ficam sozinhas em uma coluna ou página enquanto a continuação está em outra coluna ou página