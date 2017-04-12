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

