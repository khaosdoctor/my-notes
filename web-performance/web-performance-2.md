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

- O DNS é o primeiro ponto da conexão, é necessário fazer uma checagem do DNS para transformar o domínio em um IP
- O TCP é a conexão com o servidor de destino (que sabemos os IP's)
- O TLS é um passo opcional, mas é necessário realizar a conexão segura do SSL/TLS antes do HTTP
- Por fim temos a request HTTP, com a resposta do servidor

> Veja que pagamos a latência 4 vezes no mínimo, por isso é tão importante falar de latência

A largura da banda é importante, porém apenas quando temos que trafegar muitos dados ou fazer downloads, por exemplo, streamming de vídeo, downloads em geral. Em páginas da web (que trafegam apenas algumas centenas de kbytes) não fazem a menor diferença em redes com banda de mais de 5mb/s, ou seja, a largura de banda não importa para nenhum tipo de rede acima de 5Mb/s quando falamos de sites e browsers.
