# Web Performance 2

<!-- TOC -->

- [Web Performance 2](#web-performance-2)
  - [O que é performance?](#o-que-é-performance)
  - [Webpagetest](#webpagetest)
  - [Browser por baixo dos panos](#browser-por-baixo-dos-panos)
    - [Arquivos blockantes](#arquivos-blockantes)
    - [Critical Rendering Path](#critical-rendering-path)
    - [O que fazer?](#o-que-fazer)
  - [O problema do javascript](#o-problema-do-javascript)
    - [Async Scripts](#async-scripts)
  - [Threads](#threads)
    - [Timeout](#timeout)
    - [Lazy Loading](#lazy-loading)
      - [O atributo src](#o-atributo-src)
      - [O problema do onScroll](#o-problema-do-onscroll)
  - [Redes](#redes)
    - [Largura de banda e Latência (RTT)](#largura-de-banda-e-latência-rtt)
    - [Os sites por baixo dos panos](#os-sites-por-baixo-dos-panos)
  - [Bateria](#bateria)
  - [Redes móveis](#redes-móveis)
  - [Técnicas de otimização para redes móveis](#técnicas-de-otimização-para-redes-móveis)
  - [TCP](#tcp)
    - [Slow Start](#slow-start)
    - [KeepAlive](#keepalive)
    - [Flush](#flush)
  - [HTTP Archive](#http-archive)
  - [1 RTT Render](#1-rtt-render)
    - [Aplicação da técnica](#aplicação-da-técnica)
      - [Polyfill](#polyfill)

<!-- /TOC -->

> Melhorias de performance no ponto de vista front-end (HTML, CSS, JS).

## O que é performance?

Performance é essencialmente UX, é a esperiência que o usuário tem, pois no final das contas é ele quem vai te dizer que o site está ou não rápido.

Nesta parte, vamos tentar focar em métricas um pouco menos exatas, como números de bytes ou números de requisições, mas sim algumas coisas mais relativas.

## Webpagetest

É possível acessar o webpage test [neste link](http://webpagetest.org). Esta é uma ferramenta que já foi vista no primeiro módulo, porém agora veremos algumas coisas ais avançadas.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/performaceII_1_1+mostrando+o+site.png)

As configurações avançadas incluem:

- Throtling e mudanças de rede, é possível mudar a velocidade da rede e o tipo de conexão como DSL, Cabo, Fibra
- Número de testes para rodar, ou seja, é o número de vezes que o teste vai ser executado. Isto é uma boa prática porque removemos a quantidade de ruído por testes
- First view e Repeat view, isto significa que ele vai primeiramente executar o site e depois reentrar no mesmo, ignorando o cache, ou então simplesmente entrar e navegar pelo site utilizando o cache

![](https://s3.amazonaws.com/caelum-online-public/performance+2/performaceII_1_2mostrando+as+op%C3%A7%C3%B5es+avan%C3%A7adas.png)

Além destas configurações temos outras várias em relação ao que você pode executar, inclusive testes automatizados e modelos de clique utilizando os webdrivers.

Alguns números mostrados pelo web test são mais importantes do que outros. Em suma, o _load time_ não é uma boa métrica porque o modelo de carregamento de páginas web mudou muito desde o inicio da mesma, porém uma coisa importante é o _start render_ que diz quando o site já começou a ser renderizado.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/performaceII_1_3+mostrando+a+tabela.png)

Mais outras duas métricas muito importantes são o _Speed index_ e o _Visually Complete_, respectivamente, é o tempo que demora para que a parte de cima do site (above the fold) esteja construída e o tempo que demora para o site __completo__ estar construído.

> __Nota__: O speed index é uma métrica mais esotérica, pois quando o site usa fontes customizadas esta métrica não consegue encontrar o tempo exato da carga completa do topo. Neste caso é melhor utilizar os gráficos de _Visual Progress_, que mostra a porcentagem de carregamento visual do documento.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/performaceII_1_5+mostrando+o+gr%C3%A1fico.png)

Estamos interessados, na verdade, em prover uma percepção de performance muito grande para os usuários. Isso significa que a sensação de performance do usuário vai aumentar desde que entregamos o primeiro carregamento e o primeiro render de forma rápida, então isto deve ser priorizado.

## Browser por baixo dos panos

Quando abrimos as abas do nosso navegador, não sabemos o que ele está executando por baixo do capô para nos dar o site que queremos abrir. Se formos parar para realmente ver o que ocorre, podemos identificar as seguintes coisas:

- Ao abrir a página, o primeiro documento html é baixado e lido, uma vez que o browser faz o _parsing_ deste documento, ele sabe quantos arquivos e documentos externos vamos precisar utilizar, então é possível já ir iniciando o download de tais recursos, como javascript, css e etc

### Arquivos blockantes

O problema que encontramos aqui é que nem todo o recurso é carregado da mesma forma devido a importancia que o navegador dá para cada recurso. Imagens, por exemplo, tem um efeito pequeno na página, uma vez que ela vai ocupar apenas um espaço na página e mais nada. Então para o navegador, a imagem não tem nenhuma importância, no caso de um css, uma vez que não é sabido o que existe dentro destes arquivos (um css pode modificar totalmente a página). Portanto o CSS bloqueia todos os downloads subsequentes até que todos os arquivos CSS sejam baixados.

Arquivos com estes comportamentos são chamados de __blockantes__, pois bloqueiam todos os downloads subsequentes.

Um javascript é o que possui o maior nível de _block_ de uma página web, visto que dentro dele podem ocorrer quaisquer coisas, inclusive downloads de novos arquivos CSS e inclusão de outras tags no DOM, desta forma o browser teria que renderizar tudo novamente.

O que queremos dizer aqui é que o browser busca a maior eficiência para carregar todos os arquivos da página.

### Critical Rendering Path

É o caminho crítico de renderização, chamado de crítico porque é o que fica entre o usuário ver uma página pintada e uma página em branco. Pois antes de todo o processo ser executado o site não pode ser pintado.

![CRP](https://cdn.infoq.com/statics_s1_20170323-0336/resource/presentations/critical-rendering-path/pt/slides/sl15.jpg)

Vamos analisar a imagem:

- Primeiramente, o navegador baixa o html, que é o ponto de partida
- Depois é montado o DOM, porém este DOM não pode ser desenhado até que todo o CSS seja baixado
- Em paralelo, os CSS's são baixados, montando um DOM do CSS chamado CSSOM
- Juntando o DOM e o CSSOM é formado a Render Tree, que contém todos os elementos e seus estilos baseados nos CSS's
- Após esta etapa aparece a parte do Layout, que é quando o cálculo de cada elemento é feito, posição e etc
- Só então é possível pintar a página

Não chegamos a observar o Javascript, mas ele pode interferir em qualquer parte do download, no DOM, CSSOM e em qualquer parte dos objetos baixados. Desta forma ele irá alterar a Render Tree, então o browser __não pode fazer o download da página__ sem que os javascripts estejam prontos.

### O que fazer?

Uma boa prática é sempre __priorizar o CSS__, neste caso para podermos priorizar ao máximo, vamos colocar todos os nossos links e chamadas de CSS para o topo da tag `<head>`. De forma que os css's serão baixados primeiro.

Após isto, temos que entender que os scripts também bloquearão a carga do DOM, então é uma boa prática mover todos os scripts para o fim do documento, logo antes da tag `</body>`.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/performaceII_1_10+mostrando+o+on+load.png)

> Uma outra vantagem de ter o script na parte de baixo da página, é que não temos mais que esperar o `onload` da página pois ele já está no final do htmle temos certeza de que a página já foi totalmente carregada.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/performaceII_1_10+mostrando+como+fica+com+o+function.png)

## O problema do javascript

O grande problema de um javascript é que ele tem capacidade de alterar qualquer parte de um site, como HTML, CSS ou até baixar novos elementos.

Uma característica complicada do script é que, mesmo eles sendo possíveis de serem baixados em paralelo, um script só pode ser executado um após o outro, porque ele pode ter dependencias com os scripts anteriores.

### Async Scripts

O HTML5 incluiu a tag `async`, esta tag serve para que possamos indicar quando o script pode ser ___baixado e executado___ de forma assíncrona. Então o browser não irá mais respeitar a ordem e nem as dependencias dos scripts.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/2_1+mostrando+o+async.png)

Não iremos utilizar nenhum atributo async se precisamor ter scripts dependentes, porque a ordem não vai ser respeitada.

Desta forma, podemos colocar nossos scripts de volta no head e utilizar a ordem do html para priorizar melhor ainda as ordens dos scripts.

`<script async src='script-source'></script>`

## Threads

Por característica, o Javascript é executado em uma única thread, isto porque seriam gerados muitos problemas de concorrência durante a execução e o donwload de um site.

O Javascript é o exemplo mais simples, mas todo o navegador é um elemento _single threaded_. O processamento em uma única thread, apesar de resolver vários problemas que existiriam se houvessem muitas threads, ele também é um gargalo.

Mesmo com o async, temos que otimizar o site para que scripts sejam executados na ordem que queremos, ou melhor, executados com mais ou menos atraso.

### Timeout

Para resolver o problema da execução concorrente com os usuários e todas as interações desses usuários, podemos usar o `setTimeout` para atrasar a execução da função. Podemos, por exemplo, ter um script que será executado e atualizará o footer da página, este footer só está no final do site e não será visto de primeira quando o usuário entrar na página.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/2/2_3+mostrando+o+set+timeOut.png)

A ideia é remover scripts menos importantes para que estes sejam executados apenas depois de determinados eventos.

### Lazy Loading

O Lazy Loading é uma técnica que permite adiar a execução ou a carga de um recurso de mídia, isso é muito utilizado em iframes e imagens.

O conceito de Lazy Loading é, basicamente, incluir elementos de mídia dentro de uma página, por exemplo, no caso do iframe, seria criar o elemento iFrame após um determinado tempo.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/3/3_2+mostrando+o+editor.png)

Outros modelos de carregamento seriam também através de interações do usuário, ou seja, o usuário precisaria, por exemplo, clicar no botão play de um vídeo para que o mesmo fosse baixado.

O modelo mais comum de Lazy Loading é carregar imagens e elementos de mídia a medida que o scroll vai chegando próximo do elemento.

Utilizando um exemplo simples, vamos carregar uma série de imagens como lazy loading.

#### O atributo src

Para imagens, o atributo src é o principal elemento da tag. O Browser inicia o carregamento e o download das imagens e de todos os elementos de mídia existentes na página no momento que ele encontra um atributo src. (Por isso que colocar um `display: none`) não é suficiente.

Primeiramente vamos trocar tudo que temos de `<img src="">` por `<img data-src="">`, ou seja, removeremos o atributo `src` para o browser não carregar nada de inicio.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/3/3_4+substituindo+o+src+por+data+src.png)

![](https://s3.amazonaws.com/caelum-online-public/performance+2/3/3_5+mostrando+as+imagens+sem+imagens.png)

Depois, vamos criar um arquivo `lazyload.js`, e vamos trabalhar com o scroll do usuário:

```js
window.onscroll = function() {
  var imgs = document.querySelectorAll('img[data-src]'); //Selecionamos todas as imagens que tem o atributo que colocamos

  for(var i=0; i < imgs.length; i++) {
    if(imgs[i].getBoundingClientRect().top < window.innerHeight) { //Isto fará com que obtenhamos a distancia das imagens em relação ao topo e compara com o tamanho da janela interna do browser
      imgs[i].src = imgs[i].getAttribute('data-src'); //Troca o atributo data-src por src
    }
  }
}
```

- `window.getBoundingClientRect`: Retorna um objeto com 4 propriedades, uma para cada lado de um retangulo imaginário traçado ao redor do elemento selecionado. O valor de cada propriedade é a distancia do respectivo lado do elemento em relação ao respectivo lado da janela
- `window.innerHeight`: Obtém a altura interna da janela do browser (Removendo o menu)

#### O problema do onScroll

Um dos problemas mais famosos do `onscroll` é que ele é chamado muitas vezes.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/3/3_6+mostrando+quantas+vezes+%C3%A9+disparado+o+scroll.png)

Se um código dentro do scroll for pesado, então provavelmente a página ficará lenta.

A técnica para remover este comportamento, é filtrar os números de vezes que as funções são executadas.

```js
var ran = false;

window.onscroll = function() {

  if(ran) return;
  ran = true;
  setTimeout(function() {ran = false;}, 150);
  
  var imgs = document.querySelectorAll('img[data-src]'); //Selecionamos todas as imagens que tem o atributo que colocamos

  for(var i=0; i < imgs.length; i++) {
    if(imgs[i].getBoundingClientRect().top < window.innerHeight) { //Isto fará com que obtenhamos a distancia das imagens em relação ao topo e compara com o tamanho da janela interna do browser
      imgs[i].src = imgs[i].getAttribute('data-src'); //Troca o atributo data-src por src
    }
  }
}
```

Essa técnica é chamada de _throttle_, o que fazemos basicamente é:

- Criar uma variável global que controla se o código foi ou não executado
- Criar uma verificação de "se a variável for true" então retorna a função vazia
- Se não, a variável é setada como true, ou seja, o código não será mais rodado
- Criamos um timeout que limita a execução destas funções a cada X milissegundos, fazendo com que a variável global assuma novamente o valor de false

## Redes

Como podemos entender os conceitos de redes e como eles podem melhorar nossa performance.

### Largura de banda e Latência (RTT)

Vamos imaginar uma situação para ficar mais simples o entendimento. Digamos que tenhamos um cano de água, e queremos enviar água para diversas partes do Brasil.

A largura do cano vai determinar quanta água pode passar por este cano ao mesmo tempo. Isto é o que chamamos, em redes, de __largura de banda do canal__, a quantidade de dados simultâneos que podem trafegar por ali.

A latência é uma medida relativa a distância, tanto em redes quanto no nosso exemplo. Para enviarmos agua de SP para o Amazonas, independente da nossa largura de cano, vai demorar um certo tempo pois a distância é longa. Isto é a __Latência__ do canal, também chamado de _Round Trip Time_, que é o tempo que um pacote TCP leva para chegar ao servidor e voltar.

O RTT é geralmente medido em bytes, essencialmente o _Time to First Byte_ que é o tempo para um único byte ir até o servidor e voltar.

### Os sites por baixo dos panos

Entre o usuário dar um _Enter_ no navegador e ver a pagina, existem MUITAS coisas que acontecem por detrás das cortinas.

O caminho básico seria `Lookup DNS -> HandShake TCP -> HandShake TLS -> Request HTTP`, ou seja, são 4 RTT's que temos antes de sequer podermos ver as páginas.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_2+mostrando+os+4+RTT.png)

- O DNS é o primeiro ponto da conexão, é necessário fazer uma checagem do DNS para transformar o domínio em um IP
- O TCP é a conexão com o servidor de destino (que sabemos os IP's)
- O TLS é um passo opcional, mas é necessário realizar a conexão segura do SSL/TLS antes do HTTP
- Por fim temos a request HTTP, com a resposta do servidor

> Veja que pagamos a latência 4 vezes no mínimo, por isso é tão importante falar de latência

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_3+mostrando+a+compara%C3%A7a%C3%B5.png)

A largura da banda é importante, porém apenas quando temos que trafegar muitos dados ou fazer downloads, por exemplo, streamming de vídeo, downloads em geral. Em páginas da web (que trafegam apenas algumas centenas de kbytes) não fazem a menor diferença em redes com banda de mais de 5mb/s, ou seja, a largura de banda não importa para nenhum tipo de rede acima de 5Mb/s quando falamos de sites e browsers.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_5+comparando+miles+segundos.png)

## Bateria

Quando falamos de bateria, estamos falando apenas em dispositivos mobile. A rede é, depois da tela, o compoente que mais gasta bateria em um celular.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_2_1+mostrando+a+bateria.png)

> Em comparação, a conexão Wi-Fi gasta cerca de 10x menos energia do que uma rede 3G em um caso médio.

O que isto significa? O celular não pode deixar a conexão aberta 100% do tempo, porque a bateria acabaria muito rápido. Ai entramos no caso do RRC (_Radio resource controller_), o RRC permite que o celular fique em um estado "dormente" em relação ao 3/4G, o celular fica 100% do tempo conectado __à antena da operadora__ mas não sempre à internet, então quando o celular precisa acessar a internet, ele precisa pedir uma permissão ao núcleo da operadora para que seja necessário acessar a internet.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_2_3+mostrando+o+idle+connected.png)

> Para redes mais lentas como 3G ou 2G o RRC fica localizado no núcleo da operadora (o que adiciona uma latência a mais), em redes mais rapidas como o 3.5G e 4G, este RRc já fica localizado direto na antena, reduzindo assim a latência final.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_2_4+mostrando+rtt.png))

Isto significa que sempre que mantivermos o celular muito tempo sem conectar na internet e precisarmos realizar uma conexão, é necessário um _handshake_ entre o celular e o RRC. Este mecanismo funciona para os dois lados, ou seja, se ficarmos um determinado tempo sem acessar a internet (o timeout padrão é de 10s), o RRC desliga a rede.

## Redes móveis

Atualmente existem 4 modelos de redes móveis no Brasil:

- 4G - LTE
- 3.5G - HSPA+
- 3G - UMTS, HSPA
- 2G - EDGE, GPRS

O celular automaticamente faz um fallback para redes mais lentas dependendo do status atual do sinal. Se formos verificar as especificações de cada rede, temos limites de velocidade:

- 4G: 300Mb/s
- 3.5G: 168Mb/s
- 3G: 14Mb/s
- 2G: 384kb/s

Isto sendo o limite teórico da tecnologia, porém dependendo do plano de dados a operadora pode liberar menos de 1/10 disto.

Como já foi falado anteriormente, bandas acima ou iguais a 5Mb/s não interferem muito na performance dos dados, então o problema real é de fato a latência.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_2_8+mostarndo+ms.png)

## Técnicas de otimização para redes móveis

- Diminuir número de requests
  - Concatenação de JS
  - Concatenação de CSS
  - Concatenação de imagens com sprites
  - Concatenação de HTML (minificação)
  - Sprites SVG
- Diminuir a distância geográfica entre o servidor e o cliente (isso se aplica muito se houver audiências localizadas)
![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_3_1+mostrando+a+distancia.png)
  - Se o seu site é global, então uma ideia é utilizar CDN's
- Remover redirects, não gastar requests com redirecionamentos desnecessários

## TCP

Algumas configurações TCP ou de rede afetam diretamente a performance do site.

![](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_4_1+mostrando+o+browser+e+o+server.png)

Pela especificação do TCP, ao receber a primeira chamada do HTTP, o servidor pode enviar, de uma só vez, 4 segmentos (que totalizam mais ou menos 5.8kb), ou seja, essas primeiras conversas são essenciais para que o site possa ser rápido.

### Slow Start

O TCP por padrão é chamado de _Slow Start_, isto é feito para estabelecer um ponto de equilíbrio entre os dois servidores. Sendo assim, a primeira chamada de envio é de 4 segmentos, depois 8 segmentos, então 16 e assim por diante até que o cliente começe a ter perda de pacotes, então o servidor volta um estágio para um ponto final aonde ambos conseguem trafegar informações a uma velocidade aceitável. Isto é chamado de _Slow Start_.

> Existem movimentos em comunidades de redes para que o número de segmentos seja aumentado para 10 (totalizando 14kb)

Para minimizar o efeito do slow start, podemos fazer algumas modificações como o _keepalive_.

### KeepAlive

O _keepalive_ é um cabeçalho de conexão que informa ao servidor para manter a conexão TCP atual aberta, desta forma não é necessário passar novamente por todos os SYN e ACK da primeira comunicação, mantendo o mesmo recurso para as requests subsequentes.

Por padrão o browser já suporta o keepalive configurado.

### Flush

O flush é uma ferramenta de dados que faz um envio total dos dados atuais já prontos do website mesmo antes de todos os dados serem buscados do back-end. Isso é muito específico da linguagem, mas todas possuem.

## HTTP Archive

O [HTTP Archive](http://httparchive.org) é um site de buscas para métricas da internet que mostra a indexação do top 1 milhão de sites pelo ranking da Alexa a cada dois meses e fazem uma média de várias informações úteis, como tamnaho médio dos recursos e outras informações bastante pertinentes a performance.

Estas informações podem ser uteis para que possamos ter uma média de tamanhos e de otimizações que devemos fazer em relação aos melhores sites da web (ou pelo menos aos mais acessados).

## 1 RTT Render

Por padrão, o CSS é blocante, pois não faz sentido renderizarmos um HTML sem nenhum tipo de estilo. Então ao paint final de todo o site seria travado pelo próprio CSS.

O segredo para esse tipo de destravamento totalmente é o que é chamado de __1 RTT Render__, ou seja, com um RTT possamos ter uma renderização útil para o usuário, por útil dizemos algo que o usuário possa interagir, geralmente o topo do site.

> É importante dizer que por _carregamento significativo_ não estamos dizendo para carregar todo o site, apenas uma parte específica do site, ou apenas uma pequena parte do site enquanto o resto do site é carregado em background.

Quando estamos dizendo "1 RTT", em prática, esse RTT é o request que nos traz o HTML base, ou seja, não podemos trazer outras coisas a não ser HTML... Então temos que utilizar algumas práticas como:

- Inline do CSS inicial
  - Descobrir qual é o CSS necessário para renderizar a primeira parte do site
- Inline de imagens (como o logo)
- Em um mundo ideal, não precisaríamos de JS para nada, mas se precisarmos, então precisaríamos do Inline do mesmo JS
- Tudo isso tem de caber em 14kb
- Flush do HTML inicial no back-end
- Todo o resto é feito Async

> É importante definirmos que, quando fizermos inline de recursos (como css e js). Estamos fazendo uma troca do cache que temos (porque vamos ter que baixar a mesma coisa várias vezes, por exemplo, um header que é baixado sempre) por um tempo de carregamento inicial.

### Aplicação da técnica

Imagine que temos um arquivo HTML comum:

```html
<html>
  <head>
  </head>
  <body>
  </body>
</html>
```

Vamos inicialmente quebrar o CSS em duas partes, o primeiro arquivo seria o CSS inicial (carregado inline) e o outro seria o CSS do resto do site:

```html
<html>
  <head>
    <link rel="stylesheet" href="caminho/resto.css">
    <style>/* estilo do css inicial inline */</style>
  </head>

  <body>
  </body>

</html>
```

Agora temos que fazer com que nosso CSS seja assíncrono. Mas isso não é tão simples para fazer no CSS, não temos como colocar um atributo `async` pois não existe para o `<link>`, e também não podemos colocar no final da página pois a maioria dos browsers reordena para o header. Então como fazemos?

__Método 1: Scripts JS__

---

Neste caso, temos como utilizar um framework bem pequeno chamado LoadCSS que pode ser carregado no final da página e irá carregar o resto do nosso css assíncronamente:

```html
<html>
  <head>
    <style>/* estilo do css inicial inline */</style>
  </head>

  <body>

    <script src="loadcss.js"></script>
    <script type="text/javascript">loadCSS("resto.css");</script>
  </body>

</html>
```

Veja que tiramos o link, mas essa é uma solução baseada em javascript, o que não é muito elegante... É possível utilizar isso de forma nativa no browser? Sim, através do `rel`.

__Método 2: Rel preload__

---

Podemos utilizar a mesma tag `<link>` porém utilizando um outro valor no atributo `rel`, o `preload`. O grande problema desta técnica é que ela ainda não é aceita em todos os browsers...

![](http://i.imgur.com/wyc6rMl.png)

Desconsiderando a utilização:

```html
<html>
  <head>
    <link rel="preload" as="style" href="caminho/resto.css">

    <style>/* estilo do css inicial inline */</style>
  </head>

  <body>
  </body>

</html>
```

O preload basicamente faz o download do arquivo sem executar o arquivo, fazendo o download de maneira assíncrona mas colocando o mesmo no cache. O atributo `as` define que a prioridade do arquivo será a mesma de uma CSS.

Mas não faz sentido baixarmos um arquivo CSS e não executarmos certo? Para isso vamos utilizar uma outra técnica que é basicamente utilizar o atributo `onload` do html para renderizar o stylesheet quando estiver pronto:

```html
<html>
  <head>
    <link rel="preload" as="style" href="caminho/resto.css" onload="this.rel='stylesheet'">

    <style>/* estilo do css inicial inline */</style>
  </head>

  <body>
  </body>

</html>
```

Veja que o `onload` só será executado quando o arquivo for completamente baixado.

É uma boa prática adicionar um fallback de `<noscript>` para os casos aonde o JS esteja desabilitado

```html
<html>
  <head>
    <link rel="preload" as="style" href="caminho/resto.css" onload="this.rel='stylesheet'">

    <noscript><link rel="stylesheet" href="resto.css"></noscript>

    <style>/* estilo do css inicial inline */</style>
  </head>

  <body>
  </body>

</html>
```

> Mas como faremos para os browsers que não suportam `preload`?

Neste caso vamos utilizar um _polyfill_.

#### Polyfill

O polyfill é uma técnica que força a implementação de um recurso não existente em um browser através de um javascript. Neste caso vamos utilizar o polyfill `cssrelpreload.js` presente no framework [LoadCSS](https://github.com/filamentgroup/loadCSS):

```html
<html>
  <head>
  
    <script src="loadcss.js" async></script>
    <script src="cssrelpreload.js" async></script>

    <link rel="preload" as="style" href="caminho/resto.css" onload="this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="resto.css"></noscript>

    <style>/* estilo do css inicial inline */</style>
  </head>

  <body>
  </body>

</html>
```

Uma das vantagens é que, se o html já possuir o preload, o script não será executado, conforme a descrição:

![](http://i.imgur.com/enVXCr6.png)


