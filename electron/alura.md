# Electron

> Utilização de JavaScript para criação de aplicações desktop

## Sumário

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Electron](#electron)
  - [Sumário](#sumário)
  - [Introdução ao Electron](#introdução-ao-electron)
    - [Por que usar Electron?](#por-que-usar-electron)
  - [Instalação](#instalação)

<!-- /code_chunk_output -->

## Introdução ao Electron

O Electron é um framework que permite que você crie aplicativos desktop nativos utilizando tecnologias da web. Foi criado originalmente pela equipe do GitHub para seu editor de texto, Atom.

O Electron foi baseado fortemente no Chromium, o projeto open-source que é a base dos navegadores como o Edge e o Chrome. Além disso, o Electron também é baseado em Node.js para executar o código JavaScript no lado do servidor.

### Por que usar Electron?

Apesar de todas as facilidades dos browsers, nem todos os tipos de ações são permitidas no browser, um dos maiores exemplos é a integração com o próprio sistema operacional. Por exemplo, o browser não tem acesso completo ao seu sistema de arquivo, enquanto um aplicativo desktop nativo já possui essa funcionalidade.

Além da interação com o FS, você também pode chamar APIs do sistema operacional para uma melhor integração, por exemplo, verificação se há Internet, bateria e outras APIs bastante importantes. Apesar também de termos PWAs que são independentes da Internet, aplicativos desktop não possuem necessariamente uma necessidade de conexão com Internet.

Fora que é muito mais fácil para encontrar pessoas para realizar o desenvolvimento do aplicativo desktop usando tecnologias web do que encontrar pessoas para realizar desenvolvimento nativo para todos os principais sistemas operacionais.

## Instalação

Para instalar o Electron, precisamos instalar o Node.js
