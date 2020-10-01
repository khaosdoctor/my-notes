# SEO - Alura

> Notas pessoais para os cursos da formação SEO da Alura

## Sumário

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [SEO - Alura](#seo-alura)
  - [Sumário](#sumário)
  - [Glossário](#glossário)
  - [Iniciando um projeto de SEO](#iniciando-um-projeto-de-seo)
    - [Cobertura](#cobertura)
  - [Ajudando no rastreamento de páginas](#ajudando-no-rastreamento-de-páginas)
  - [Análise de concorrentes](#análise-de-concorrentes)
  - [Funil de buscas](#funil-de-buscas)
    - [Palavras chave](#palavras-chave)

<!-- /code_chunk_output -->

## Glossário

- __Backlinks__: Links que estão em outro domínio que apontam para o seu site diretamente ou para páginas dentro dele. Este é um dos principais fatores de ranking dentro de uma página do Google. Se o seu site fala de um conteúdo interessante, tanto que outros sites apontam para este conteúdo e fizeram uma menção com um link, isso é um _backlink_. Mas, lembre-se de que a quantidade de links não é a questão mas a qualidade dos sites que apontam para você.
- __Call to Action (CTA)__: Chamada para uma ação específica que o usuário pode fazer. Geralmente aparece em forma de texto. Isso pode ser exemplificado em botões como "Compre agora" ou "Ligue agora".
- __Testes A/B__: Dois tipos de estruturas diferentes ou com elementos diferentes que dividem seu público em duas variantes a fim de entender qual deles performou melhor.
- __HTML com Metadados Estruturados__: Dados estruturados ou _schema_ são palavras usadas no fonte do site que facilitam a identificação de elementos pelos buscadores. Existem dados estruturados para produtos, que nada mais são do que códigos JSON, seguindo um padrão de estrutura. O site [www.schema.org](https://www.schema.org) tem mais informações.
- __Tags e metatags__: São trechos de código que são inseridos no cabeçalhos das páginas, entre as tags `<head></head>`. As metatags são tags com a instrução do nome dela, por exemplo `<title></title>`. Uma metataga especial é a `<meta name="description" content="conteúdo da descrição do site">` essas duas tags são super importantes porque são o título e a descrição que vão aparecer no resultado do site de busca.
- __CTR__: Do inglês, _Click-through Rate_, é a quantidade de links dividido pela quantidade de impressões dele no resultado de busca. Isso significa quantas vezes o seu link apareceu para o usuário e foi clicado. Não há um número ideal para isso, mas, quanto maior o CTR, sinal de que seu link está sendo clicado e exibido bastante.
- __Crawl Budget__: Esse é um dos principais pontos no SEO. Se fossemos traduzir seria algo como o _orçamento de rastreio_ do buscador para varrer o seu site. Os sites precisam ser otimizados para que os buscadores gastem o menor tempo possível varrendo o site e consiga as informações necessárias para ranquear as páginas. Para otimizarmos bem um site temos diversos fatores que podemos pensar: estrutura do HTML, uso correto de meta tags, hospedagem, tempo de carregamento, uso de dados estruturados, conteúdo bem escrito e bem codificado usando estruturas equivalentes (como títulos H1, H2, etc), listas e etc. Quanto mais bem estruturado, melhor o buscador encontra as informações. E em menos tempo.

## Iniciando um projeto de SEO

Para iniciar um projeto de SEO primeiramente precisamos ter contato com as ferramentas que vão nos ajudar a encontrar os resultados que queremos. A principal ferramenta é o [Google Search Console](https://search.google.com/) que é aonde vamos identificar os problemas.

### Cobertura

A cobertura é a quantidade de páginas que o Google está indexando no nosso site. E a quantidade de páginas que o Google está excluindo dele.

![](./images/sc-coverage.png)

As páginas __Válidas__ são aquelas que estão indexadas com sucesso pelo Google. As páginas excluídas são aquelas que não aparecem nos resultados de busca por vários motivos:

![](images/breakdown.png)

Lembrando que nem todas as páginas excluídas precisam de ações imediatas. Um exemplo são páginas com tag canônica adequada, que, segundo a ajuda do Google:

> Página alternativa com tag canônica adequada: essa página é uma cópia de outra que o Google reconhece como canônica. Ela redireciona o usuário corretamente à página canônica. Nesse caso, nenhuma ação é necessária.

Algumas páginas não precisam ser indexadas. Por exemplo, se o intuito da sua página é vender cursos online, então as páginas mais importantes são os cursos, e não as páginas de perfis de usuários e professores. Portanto, podemos excluir automaticamente estas páginas usando a seguinte tag:

```html
<meta name="robots" content="noindex">
```

Ou então pelo próprio search console do Google. Isto é o que chamamos de _Budget Optimization_.

## Ajudando no rastreamento de páginas

O rastreamento por URL contínua é a melhor forma de estruturar o seu site. Isto é chamado de __Arquitetura de URLs__. Um exemplo: Se tivermos uma listagem de cursos online que está na URL `https://site.com.br/topico-do-curso/iniciante` e o curso em si está em `https://site.com.br/curso-propriamente-dito`, não temos o prefixo `topico-do-curso/iniciante`, desta forma o Google não sabe como fazer para continuar o processo.

O ideal seria que o curso estivesse seguindo o modelo de recursos do ReST. Usando a URL `https://site.com.br/topico-do-curso/iniciante/curso-propriamente-dito` e a URL antiga sofra um redirecionamento `301` que significa _Redirecionamento Permanente_, de forma que o Google entende que esta página anterior não existe mais e mudou completamente de endereço.

## Análise de concorrentes

Usando a versão gratuita da ferramenta [SEMRush](https://www.semrush.com/), temos a capacidade de ver aonde nosso site se encontra nas distribuições organicas. Leve em consideração que cada página do Google tem 10 resultados, então o ideal é ter as palavras chaves ranqueadas entre as posições 1~10.

Além disso, a ferramenta possui uma forma de identificar os concorrentes principais e o posicionamento deles dentro das páginas da mesma forma que você pode verificar com seu site.

## Funil de buscas

O funil de buscas é importante para entender como o usuário utilizará a busca. Títulos muito longos podem ser cortados nos resultados, então o ideal é que um título tenha 60 caracteres no máximo.

Também é possível diferenciar a tag `<title></title>` da metatag correspondente, ou seja, é possível ter dois títulos, um para o site e outro para a busca. Muitas vezes temos títulos que são mais curtos para a exibição em uma página e, dentro dela, temos um título mais longo e mais explicativo.

Utilizando a ferramenta gratuita [UberSuggest](https://app.neilpatel.com/pt/ubersuggest) podemos ter uma noção de como as tags rankeiam melhor em nos mecanismos de busca no geral.

### Palavras chave

A própria ferramenta mostra o volume de buscas de uma determinada palavra chave. É importante ter palavras chave com um volume de buscas maior, porém mais difíceis de ranquear, bem como palavras chave com um volume de buscas menor, mas ao mesmo tempo mais simples de serem ranqueadas.

Por exemplo: "Curso de violão" tem mais buscas, porém é mais complicada de ranquear porque é muito genérica. Já "Curso de violão iniciante" tem menos buscas, mas é mais fácil de ranquear porque é mais específica.
