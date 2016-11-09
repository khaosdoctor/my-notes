# Web Performance 1

<!-- TOC -->

- [Web Performance 1](#web-performance-1)
  - [Motivos para otimização](#motivos-para-otimiza%C3%A7%C3%A3o)
  - [Tamanho dos arquivos](#tamanho-dos-arquivos)
    - [Minificação](#minifica%C3%A7%C3%A3o)
    - [GZIP](#gzip)
    - [Imagens](#imagens)
      - [Tamanho](#tamanho)
      - [Metadados](#metadados)
      - [SVG](#svg)
      - [Ferramentas de otimização de imagens](#ferramentas-de-otimiza%C3%A7%C3%A3o-de-imagens)
  - [Custo de requests](#custo-de-requests)
    - [Apendice: Google App Engine](#apendice-google-app-engine)
      - [Parte 1: Baixando o SDK](#parte-1-baixando-o-sdk)
      - [Parte 2: App.yaml](#parte-2-appyaml)
      - [Parte 3: Adicionando o projeto](#parte-3-adicionando-o-projeto)
      - [Parte 4: Incluindo no cloud platform](#parte-4-incluindo-no-cloud-platform)
      - [Parte 5: Iniciando o aplicativo](#parte-5-iniciando-o-aplicativo)
    - [Ferramentas de análise](#ferramentas-de-an%C3%A1lise)
    - [Concatenação de CSS](#concatena%C3%A7%C3%A3o-de-css)
    - [Sprites](#sprites)
      - [Sprites SVG](#sprites-svg)

<!-- /TOC -->

> Melhorias de performance no ponto de vista front-end (HTML, CSS, JS).

## Motivos para otimização

Um site rápido aumenta a conversão de usuários e a opinião do usuário em relação ao seu site, pois um site rápido passa a ideia de maior responsividade e de que o seu sistema funciona muito melhor do que ele aparenta, até porque um site rápido dá uma ideia fluida para o usuário. 

## Tamanho dos arquivos

Uma das coisas que a impacta diretamente a performance é o tamanho dos arquivos, e isso já é meio instintivo.

Podemos fazer várias coisas, uma delas é cortar funcionalidade do site, o que não é o que nós queremos, mas podemos reduzir a quantidade de coisas que que são desnecessárias.

- Espaços
- Tabs
- Identação
- Comentários

Isso tudo é desnecessário para o browser, então podemos usar o processo chamado de minificação.

### Minificação

Podemos usar sites de minificação presentes em toda a internet, assim como podemos usar ferramentas como o Gulp.js e o Grunt.js para poder executar tarefas de minificação.

> A minificação de um site pode economizar cerca de 80% um arquivo, assim com otodos os demais arquivos do mesmo. A soma geral do que podemos economizar é o que vale a pena.

### GZIP

O GZIP é um utilitário de compressão de conteúdo rodado do lado do servidor web.

A inicialização do GZIP difere de webserver para webserver, isso precisa ser pesquisado na versão do webserver que está sendo usado (Apache, Jboss, Tomcat, Nginx), cada versão possui sua própria configuração para exibição de contaúdos com GZIP.

### Imagens

Em todos os sites, as imagens são pontos importantes. Mas também são responsáveis por cerca de 2 terços do espaço total do site.

#### Tamanho

É importante servir imagens com os tamanhos específicos, ou seja, se o site utiliza uma imagem redimensionada em tamanho 100x100, logo, no servidor, a mesma imagem deve ser de 100x100, se não o browser vai baixar uma imagem fora de tamanho desperdiçando bytes com downloads em tamanhos diferentes.

Um exemplo clássico é quando servimos icones e thumbnails que são de alta resolução, então uma imagem pode ter 1000x1000 mas ela estar sendo redimensionada no browser para 100x100. O ideal seria que essas imagens já fossem 100x100 diretamente do servidor, para evitar o tamanho desnecessário.

#### Metadados

Todas as imagens tem metadados, ou seja, dados que dizem aonde as imagens foram obtidas ou qualquer outra propriedade da camera ou do autor, para uma organização pessoal eles são legais, mas para otimização web eles são extremamente desnecessários. Esse processo de remoção de metadados é chamado deminificação ou otimização de imagens.

Uma das formas de otimização é utilizar sites na web como o [Kraken.io](http://kraken.io) que fazem esse tipo de otimização automaticamente.

Existem dois tipos de otimizações de imagens:

- Lossy: Este tipo de otimização gera uma perda visual, porém o resultado final é mennor do que o em uma otimização lossless
- Lossless: Não existem perdas visuais para o arquivo de imagem, ou seja, o arquivo continua sendo o mesmo do inicio ao fim do processo de minificação.

> __Observações__: Uma imagem PNG é péssima para muitos pixels com diferenças muito grandes de cores entre eles, enquanto o jpeg pode ser até 10x menor.

#### SVG

A otimização SVG pode ser feita por diversos locais, uma das opções é o Gulp.js com tarefas e automatização. Uma outra opção é utilizar sites como o [SVGOMG](https://jakearchibald.github.io/svgomg/), que podem reduzir o arquivo cerca de 80%

Assim como qualquer outro arquivo de imagem, o SVG é um XML que pode ter comentários e etc, essas ferramentas removem quantidades de casas decimais, tags vazias, especificidades dos editores svg como o illustrator ou o sketch, tira os espaços e muda as coordenadas do svg para arredondar o número de casas decimais para poder remover texto desnecessário.

> __Importante__: É muito importante que nunca sejam otimizadas as imagens originais e sempre cópias, para que você não corra o risco de perder as capacidades de edição das mesmas.

#### Ferramentas de otimização de imagens

No MACOS é possível utilizar o [imageoptim](http://imageoptim.com), que realiza apenas otimizações Lossless pois ele substitui o arquivo original e coloca o outro na lixeira.

Para o windows, é possivel usar o [R.I.O.T (Radical Image Optimization Tool)](http://luci.criosweb.ro/riot/), que nada mais é do que um wrapper para as funções mais famosas de otimização:

- JPEG: jpegtran
- PNG: pngcrush
- SVG: svgo (Instala pelo node)

## Custo de requests

Uma página faz uma série de requisições para o servidor, o objetivo principal é reduzir ao máximo o número de requisições.

O tempo para cada requisição pode variar de acordo com várias variáveis: A distancia do servidor, a velocidade da internet e etc.

Um navegador pode apenas abrir 6 conexões máximas no HTTP1.1, isso faz com que o número de requisições máximas que um browser pode sustentar por requisição, desta forma todas as conexões que excedem o número máximo precisam esperar até as outras conexões sejam liberadas para que elas comecem a ser iniciados. Assim, é possível dizer que o um dos maiores problemas na performance web seja esse impedimento do número de conexões.

![](https://dl.dropboxusercontent.com/u/267101/cursos-online-alura/otimizacao-performance-web/waterfall.png)

> Na imagem é possível ver que as requests ficam esperando (barra cinza), até que as conexões de requests anteriores sejam liberadas.

Existem algumas ferramentas online que testam essas performances automaticamente, mas neste caso o site precisa estar hospedado na web.

### Apendice: Google App Engine

O Google App Engine é uma plataforma de hospedagem da Google, qu epossui já algumas implementações basicas como o HTTP2.

#### Parte 1: Baixando o SDK

Primeiro precisamos baixar o SDK do Google App Engine para uma linguagem específica, podemos fazer o download para PHP já que isso é um site estático, não vai fazer diferença.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_1+mostrando+o+aplicaivo.png)

#### Parte 2: App.yaml

O arquivo de configuração do App Engine que deve ficar na raiz da pasta da sua aplicação.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform3_2_3+mostrando+o+yaml.png)

#### Parte 3: Adicionando o projeto

No programa de interface do App Engine, basta clicar nas opções para Adicionar um projeto existente e selecionar a pasta e a porta que ele deve funcionar.

> Isso vai fazer com que o aplicativo rode __localmente__ na plataforma do App Engine.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_2+mostrando+o+aplicativo.png)

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_4+mostrando+o+aplicativo.png)

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_5+mostrando+o+aplicativo+e+o+arquivo+adicionado.png)

#### Parte 4: Incluindo no cloud platform

Podemos selecionar o menu _"dashboard"_ e criar um novo projeto (Podemos selecionar um id diferente e dar um nome qualquer).

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_7+mostrando+o+projeto.png)

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_9+mostrando+o+projeto+criado.png)

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_10+mostrando+o+deplou.png)

Após isso podemos abrir o nosso arquivo `app.yaml` e adicionar uma outra linha no inicio do arquivo:

```yaml
application: <seu-id>
```

E então basta clicar em deploy que o programa vai fazer automaticamente o deploy para o servidor web no id da sua aplicação.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_11+mostrando+o+aplicativo+rodando.png)

#### Parte 5: Iniciando o aplicativo

Todos os projetos ficam armazenados em `<seu-id>.appspot.com` então se criarmos um id `performance` iremos acessar por `performance.appspot.com`.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/3_2/perform_3_2_13+abrindo+o+dev+tools.png)

Esse serviço é gratuito.

> A vantagem deste tipo de servidor da Google é que ele já vem com um asérie de performances prontas, como o GZIP e o HTTP2.

### Ferramentas de análise

Existem serviços online de análise de performance.

- PageSpeed Insights: Ferramenta do Google para fazer análises de performances
- WebPageTest: [Neste link](http://webpagetest.org), é possível escolher a localização do teste e também o navegador que será utilizado. É uma das ferramentas mais complexas e completas que existem para essa finalidade.

### Concatenação de CSS

Para diminuir o número de requests é importante reduzir a quantidade de arquivos que são baixados pelo browser. Em sites modernos, é uma prática comum modularizar a maioria dos arquivos de imagem ou texto, como CSS, JS e etc. 

Na situação atual, uma quantidade muito grande de arquivos CSS ou JS pode criar um gargalo de implementação e de performance em um site, pois utilizamos todas as 6 conexões de rede do browser par baixar apenas arquivos CSS e "travamos" todos os outros recursos.

O mundo ideal seria termos um unico arquivo CSS, mas isso sujaria nosso código fonte, porque teríamos um unico arquivo fonte que seria muito grande. Desta forma é mais amigável que tenhamos o arquivo único apenas no ambiente de desenvolvimento.

> É importante mudar também o direcionamento no HTML

Um dos plugins mais interessantes é o [Gulp UseRef](https://www.npmjs.com/package/gulp-useref).

### Sprites

Spriting consiste em juntar todas as imagens do site ou app em um unico arquivo a fim de reduzir a quantidade de requisições feitas pelo browser.

A imagem completa é grande e contem todas as imagens necessárias, e no html temos como colocar um background e posicionar esse background para que a div seja uma "janela" para essa imagem maior, exibindo somente uma parte dele.

Temos como automatizar essa tarefas utilizando o gulp ou o [ImageMagick](http://www.imagemagick.org/script/index.php) utilizando o comando `convert <caminho> -append <destino>`.

A automatização de sprites pode ser muito útil. Uma vez que ela pode gerar tanto os sprites sozinha quanto também o css já preparado com as coordenadas.

- [Sprity](https://www.npmjs.com/package/sprity)
- [SpriteSmith](https://github.com/Ensighten/spritesmith)
- [Gulp-SpriteSmith](https://www.npmjs.com/package/gulp-spritesmith)

#### Sprites SVG

O modo de spriting mostrado acima só é válido para imagens do tipo bitmap, como o PNG. Para SVG temos que adotar uma abordagem diferente.

Uma vez que o SVG é basicamente um XML, basta que criemos um novo arquivo `.svg` e criamos essas imagens todas internamente.

Vamos criar um arquivo `file.svg` e copiar o conteúdo de outro svg já pronto para dentro dele:

```svg
<svg width=0 height=0 xmlns="http://www.w3.org/2000/svg"> <!-- Abrimos a tag SVG -->

<defs> <!-- Criamos a tag de definições

</defs>

</svg>
```

Dentro da tag `defs` temos a capacidade de criar símbolos, e dentro de cada símbolo podemos reutilizar vários outros svgs como icones reutilizáveis.

```svg
<svg width=0 height=0 xmlns="http://www.w3.org/2000/svg"> <!-- Abrimos a tag SVG -->

<defs> <!-- Criamos a tag de definições

<symbol id="ID do symbol, que vai permitir que encontremos ele depois">
<!-- Conteúdo original do SVG aqui dentro -->
</symbol>

</defs>

</svg>
```

Para utilizarmos isso no html basta criarmos uma tag svg:

```html
<svg><use xlink:href="caminho/da/imagem.svg#id_do_simbolo"/></svg>
```

