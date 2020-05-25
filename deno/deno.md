# Deno

> Typescript runtime, tipo o Node, mas ao contrário

## Sumário

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Deno](#deno)
  - [Sumário](#sumário)
  - [O que é](#o-que-é)
  - [Comparando com o Node.js](#comparando-com-o-nodejs)
  - [Instalação](#instalação)
  - [Setup de ambiente](#setup-de-ambiente)
    - [VSCode](#vscode)
  - [Exemplos](#exemplos)
  - [Hello World](#hello-world)
    - [Utilizando scripts simples](#utilizando-scripts-simples)
  - [Fazendo uma request web](#fazendo-uma-request-web)

<!-- /code_chunk_output -->

## O que é

Deno é um runtime de execução JavaScript/TypeScript no servidor, o propósito do Deno é o mesmo do Node.js porém com algumas mudanças principalmente no que diz respeito à segurança e execução de código.

As principais diferenças do Deno em relação ao Node são:

- Executa TypeScript nativamente
- Precisa de permissão explícita para poder executar alguns módulos, como rede e armazenamento
- Não possui um sistema de gerenciamento de pacotes como o NPM
  - Ao invés disso os pacotes são baixados diretamnte pela URL da lib
- Ele só possui um executável no final, o `deno`
- Já possui algumas funcionalidades built-in como um inspetor de dependencias `deno info` e um formatador de código `deno fmt`
- Todos os scripts podem sofrer um `bundle` em um único arquivo JS
- Possui uma série de [módulos auditados pelo core team](https://github.com/denoland/deno/tree/master/std) que são garantidos de funcionarem com o Deno

## Comparando com o Node.js

- Deno não usa NPM
- Deno não usa `package.json`
- Deno precisa de permissões explicitas para `fs`, `network` e acesso a qualquer coisa que seja do ambiente
- O Deno __sempre__ vai dar um `panic` e morrer em erros não tratados
- Usa `import` (ES Modules) ao invés do `require()` do CommonJS e todos os módulos são importados por URLs como `import * as log from "https://deno.land/std/log/mod.ts"`

Além disso todos os códigos remotos são baixados e cacheados na primeira execução e não são mais atualizados até o código do usuário ser executado com a flag `--reload`. O que significa que você pode baixar e atualizar seus pacotes mesmo sem rede.

## Instalação

Siga [a página oficial](https://deno.land/manual/getting_started/installation)

## Setup de ambiente

### VSCode

Para o VSCode temos a [extensão oficial do Deno](https://marketplace.visualstudio.com/items?itemName=justjavac.vscode-deno&WT.mc_id=mynotes-github-ludossan) que faz algumas alterações na execução padrão do TS para os arquivos do Deno.

## Exemplos

Vamos a alguns programas de exemplo

## Hello World

Para criar um programa `hello-world` basta abrir uma pasta como temos [aqui](./examples/hello-world) e criar um arquivo `index.ts`:

```typescript
console.log('Hello World')
```

Depois utilizar o comando `deno run index.ts`.

### Utilizando scripts simples

Como o Deno não possui ainda um package manager, e nem vai possuir de acordo com as documentações e os objetivos do projeto, ficamos defasados no uso do `npm run` ou `npm start`. Para evitar que precisemos digitar todas as vezes o comando que queremos rodar com o nome do arquivo, podemos simplesmente utilizar o que já era utilizando anteriormente para arquivos binários em C, o __Makefile__.

Basta criar um arquivo `makefile` na raiz do seu projeto e escrever os scripts:

```makefile
nome-do-script:
    script a ser executado
```

Por exemplo:

```makefile
run:
    deno run index.ts
```

> Veja mais sobre o Makefile [aqui](https://makefiletutorial.com/).

## Fazendo uma request web

