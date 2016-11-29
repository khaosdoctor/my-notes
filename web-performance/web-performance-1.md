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
  - [Inline de recursos](#inline-de-recursos)
    - [Automatização de recursos inline](#automatiza%C3%A7%C3%A3o-de-recursos-inline)
    - [Até onde vale a pena?](#at%C3%A9-onde-vale-a-pena)
  - [Requests paralelos](#requests-paralelos)
    - [Limites](#limites)
  - [Cache](#cache)
    - [Escolhendo o cache](#escolhendo-o-cache)
    - [Cache-Control Header](#cache-control-header)
    - [Fingerprinting](#fingerprinting)
      - [Isso deve ser feito com HTML?](#isso-deve-ser-feito-com-html)

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

<defs> <!-- Criamos a tag de definições -->

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

A ténica de usar `<symbol>` é muito útil mas não funciona em todos os navegadores. Em especial, IEs mais antigos. Mas, para isso, podemos usar um polyfill.

Uma bem famosa é a [svg4everybody](https://jonathantneal.github.io/svg4everybody/). Basta adicionar um script simples na página e chamar svg4everybody().

## Inline de recursos

Além de podermos também utilizar arquivos externos como scripts e css, também podemos embutir scripts como tags inline.

Como a tag `<script>` e a tag `<style>` podem ser usadas dentro do HTML própriamente dito isso pode ser uma boa prática para economizar requests.

Arquivos JS e CSS com poucas linhas podem ser simplifados para que sejam carregados inline dentro do html, sendo executados muito antes dos scripts e css que são executados através de requests externas.

> É claro que, de acordo com o asset, não é viável transcrever tudo para o HTML e também não é uma boa prática.

Também é possível utilizar SVG's inline dentro do HTML, isso facilita a manipulação do SVG dentro da página através de CSS puro, mas também faz com que a página carregue a imagem muito mas rápido, já que ela vai estar embutida dentro do HTML.

Em suma: _Embutir recursos dentro do HTML de forma linear é um jeito de minimizar o máximo o custo de requests e também acelerar o carregamento de recursos_.

### Automatização de recursos inline

O plugin do gulp chamado __Inline Source__ consegue automatizar o processo de linearização através do gulp.

Isso funciona da seguinte forma, utilizando o plugin, basta que coloquemos o atributo `inline` na tag `<script>` desta forma `<script inline src=''>` e quando rodarmos o processo de tarefas, então ele será colado na página do HTML.

### Até onde vale a pena?

__Vale a pena__:

- Para recursos pequenos (até 3Kb)
- Poucas informações

__Contras__:

- O cache desses elementos desaparece, porque a cada requisição ele é baixado novamente
- Quando utilizado em muitos recursos fica inviável

O tamanho ideal do HTML deveria ser menor que 14Kb, isso devido ao protocolo TCP/IP, pois cada pacote recebido pelo protocolo é de 1.4Kb e, no modelo atual, o browser recebe 4 segmentos TCP iniciais, ou seja, 5.8kb, mas existe uma nova RFC (que já é utilizada pela maioria dos browsers) que amplia esse limite de pacotes para 10 segmentos, tornando o tamanho ideal de 14kb.

## Requests paralelos

Por possuirmos apenas 6 conexões disponíveis simultaneamente, geralmente temos vários recursos que ficam esperando para serem consumidos e baixados.

O ideal é: _sempre_ tentar reduzir ao máximo o número de requisições, mas existe um limite máximo para quantas conexões podemos reduzir.

Na verdade, há um meio de "burlarmos" a quantidade de conexões.

O limite de conexões não é por browser, mas sim por hostname, ou seja, quando temos diversos hostnames podemos fazer o download da página muito mais rapidamente e __de forma paralela__, pois o browser pode abrir até 6 conexões diferentes para cada hostname (note que um subdominio também altera o hostname, então `ex.com` é diferente de `a1.ex.com`).

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/7_1/7_8+mostrando+o+gr%C3%A1fico+de+cascata.png)

Uma boa técnica é usar diversos hostnames para servir imagens e conteúdos estáticos. Quando temos dois hostnames diferentes vamos ter 12 conexões diferentes que podem ser abertas ao mesmo tempo, fazendo o site carregar na metade do tempo.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/7_1/7_9+mostrando+o+gr%C3%A1fico.png)

> É assim que CDN's funcionam. Quando temos uma CDN cadastrada, automaticamente o serviço vai replicar os dados estáticos como: imagens, js, css e etc por todos os servidores ao redor do mundo (ou seja, irão haver vários hostnames), dependendo do que está mais próximo do cliente.

### Limites

Existe um limite para a quantidade de requests que podem ser feitos tanto pela rede e pelo navegador, caso contrário o sistema fica sobrecarregado e o site acaba ficando mais lento.

## Cache

Arquivos que não mudam com frequencia não precisam ser baixados com frequencia (ou, pelo menos, não todas as vezes que iniciarmos uma página).

Por padrão o browser não realiza nenhum tipo de cache, vem do servidor a indicação de quando e o que deve ser cacheado. Tudo isso é feito através de _headers_ HTTP.

É possível adicionar um cabeçalho chamado `expires`, que diz por quanto tempo os recursos devem ser cacheados.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/8_1/8_1_8+possui+expires.png)

No caso do NGINX basta que adicionemos a propriedade `expires <data>` na sua configuração de servidor.

### Escolhendo o cache

Nem tudo deve ser cacheado, alguns recursos como HTML não devem ser cacheados. O ideal é cachear apenas recursos estáticos como JS, CSS e imagens.

No NGINX o ideal seria colocar expires para uma pasta toda usando a seguinte configuração no servidor web:

```json
server {
    location /<pasta> {
        expires 1d;
    }
}
```

### Cache-Control Header

É a mesma coisa do `expires`, porém um pouco mais antigo, é recomendável setar ambos os headers.

Uma diferença entre o `cache-control` e `expires` é que podemos setar quem pode cachear o recurso, isso porque temos vários intermediários entre a nossa requisição e a página aberta em nosso browser.

Usando o header `cache-control: public` dizemos a rede que __todos__ os dispositivos na rede podem cachear esse recurso (ou essa pasta), assim podemos utilizar proxies e firewalls com essa capacidade de cache como uma CDN.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/8_1/8_1_9+mostrando+o+cache.png)

No NGINX essa adição é feita com `add_header Cache-Control public;`.

Imagine que em uma empresa, temos um proxy com capacidade de cache, se tivermos esse header como `public` dizemos que esse proxy pode cachear o recurso, desta forma todos os usuários da rede irão automaticamente receber o recurso do local mais próximo, uma CDN local.

Para que apenas o browser cacheie o recurso basta colocar `private`.

### Fingerprinting

Quando tivermos arquivos que devem ser cacheados por um longo tempo criamos uma solução e ao mesmo tempo um problema, pois temos um recurso que nunca vai ser baixado, mesmo que ele seja alterado, uma vez que o browser guarda a URL para cachear.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/8_2/8_2_6+mostrando+o+expires.png)

O fingerprinting é uma tecnica que também é chamada de revisão de arquivos. Quando utilizado com o gulp, é possível utilizar plugins como o `gulp-rev` e o `gulp-revdel`.

- [Rev()](https://github.com/sindresorhus/gulp-rev)
- [Revdel()](https://github.com/callumacrae/rev-del)

A ideia é que o rev gere os arquivos e sobrescreva no seu html final, que foi minificado todos os caminhos certos para este arquivo calculando um hash baseado em seu conteúdo, ou seja, se o usuário já possuir um cache de um conteúdo que foi alterado e depois desfeito, então ele continuará lá, pois o hash será o mesmo.

![](https://s3.amazonaws.com/caelum-online-public/Perfomance/8_2/8_2_2+mostrando+os+n%C3%BAmeros+que+foram+agregados+ao+nome+dos+arquivos.png)

#### Isso deve ser feito com HTML?

Jamais, se isso for realizado, é possível que o site quebre apenas porque a URL pode mudar, já que a home é o ponto de entrada de um site.

Em suma, nunca mexa no html.

