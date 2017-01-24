# Jekyll

<!-- TOC -->

- [Jekyll](#jekyll)
  - [O que são geradores estáticos?](#o-que-são-geradores-estáticos)
    - [Vantagens](#vantagens)
  - [Comandos](#comandos)
  - [Estrutura de pastas](#estrutura-de-pastas)
  - [Config.yml](#configyml)
  - [Permalinks](#permalinks)
  - [Front Matter e Liquid templates](#front-matter-e-liquid-templates)
    - [Front Matter ([Documentação](https://jekyllrb.com/docs/frontmatter/))](#front-matter-documentaçãohttpsjekyllrbcomdocsfrontmatter)
    - [Liquid templates ([Documentação](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers))](#liquid-templates-documentaçãohttpsgithubcomshopifyliquidwikiliquid-for-designers)
      - [Listas](#listas)
      - [If](#if)

<!-- /TOC -->

## O que são geradores estáticos?

Ferramenta que recebe um template pré definido, um markup e processa todos juntos e transforma em um HTML básico, um site estático.

### Vantagens

- Simplicidade
- Não possui banco de dados
- Suporte por qualquer servidor
- Facilidade de escrita (utiliza markdown)
- Sistemas de templates, condicionais e filtros

## Comandos

Jekyll possui uma série de comandos e subcomandos. Os subcomandos mais importantes são:

- `import`: Permite que você importe a informação de outros sistemas para o formato Jekyll
- `build`: Gera os arquivos
- `clean`: Limpa a pasta padrão de destino
- `new`: Cria um novo blog
- `serve`: Sobe um servidor local para testes
- `docs`: Cria uma documentação local do Jekyll

Já as opções mais importantes são:

- `-s`: Indica o caminho de origem
- `-d`: Caminho de destino
- `--layouts`: Define a pasta que ficarão os layouts

## Estrutura de pastas

- `_includes`: Arquivos que são repetidos ao longo de todo o site, footer, header e etc
- `_layouts`: Definir layouts padrões para determinados tipos de páginas.
- `_posts`: Aonde vão ficar todos os posts escritos em markdown
- `_sass`: aonde ficam os arquivos Sass
- `css`: Aonde são definidas as variáveis principais do Sass e criam a css principal

## Config.yml

O arquivo `config` contém todas as configurações globais como: email, nome, titulo, descrições e etc.

Este arquivo só é compilado quando ele roda pela primeira vez, então é necessário que você reabra o servidor sempre que for gerar o arquivo novamente, ou alterá-lo.

Alguns pontos importantes deste arquivo são:

- `baseurl`: É a url de base que será acessado o blog, por exemplo, se colocarmos `/blog`, o acesso deverá ser feito por `http://dominio.com/blog`
- `url`: É a url que está hospedando o site atualmente.

Qualquer variável extra pode ser criada abaixo da lista e deve ser iniciada no blog como `{{ site.variavel }}`.

## Permalinks

Para a criação de url's personalizadas de posts, podemos criar uma nova linha no arquivo `config.yml` desta forma:

```yaml
permalink: /pattern/:parametro
```

Alguns parâmetros que existem são:

- `:title`: Título do blog
- `:day` ou `:month` ou `:year`: Auto explicativo
- `:categories`: Categoria do post

> Mais informação na [documentação oficial](https://jekyllrb.com/docs/permalinks/)

## Front Matter e Liquid templates

### Front Matter ([Documentação](https://jekyllrb.com/docs/frontmatter/))

É uma definição estrutural do YAML através de chave e valor:

```yaml
---
chave: valor
---
```

Presente no topo dos arquivos.

### Liquid templates ([Documentação](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers))

Permite adicionar variáveis e outras informações dentro de um escopo de HTML:

```HTML
<div>
 {{ content }}
</div>
```

Inclui um bloco dentro do html.

Já o seguinte bloco, indica que vamos passar um comando ao Liquid:

```html
{% include head.html %}
```

Acima incluimos todo o conteúdo dentro de um arquivo na pasta `_includes`.

Para incluirmos uma outra variável dentro do nosso html, basta que criemos um novo par chave/valor no frontmatter e chamemos usando os escopos do Liquid.

O Liquid só entender 3 escopos:

- Page: Escopo de página, itens acessíveis na página como um todo (todos os arquivos fora da pasta `_posts`)
- Post: Escopo de postagem, item acessível somente dentro do post (Todos os arquivos dentro da pasta `_posts`)
- Site: Escopo global, acessível de qualquer lugar

Então se fizermos:

```html
---
var: valor
---

<div>{{ page.var }}</div>
```

Obteremos valor como resposta.

#### Listas

Podemos criar listas como:

```yml
---
var:
  - valor
  - valor
  - valor
---
```

Para percorrermos essas informações, precisamos usar loops.

```html
{% for valor in page.var %}
<p>{{ valor }}</p>
{% endfor %}
```

#### If

Se definirmos uma variável booleana, podemos criar condicionais simples:

```yml
---
var: false
---

{% if page.var %}
#algo
{% endif %}
```