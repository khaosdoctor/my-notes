# Electron

> Utilização de JavaScript para criação de aplicações desktop

> **Nota de atualização**: O curso começou como o curso de Electron da Alura, porém o mesmo estava na versão 1.6.1 (de 2017), enquanto a versão mais atual é a 10.1.5 (de 2020), após algumas conversas como core team do Electron eles me aconselharam parar o curso e começar aprendendo diretamente do site. Então estou escrevendo baseado nos aprendizados do site em si.

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

Para instalar o Electron, precisamos instalar o Node.js e depois iniciar um novo projeto com `npm init` em uma pasta vazia, então podemos instalar o electron como uma dependencia normal do node.

Então podemos adicionar o Electron (aqui neste documento, na versão 1.6.1) através de `npm i electron`, depois podemos criar um novo arquivo chamado `main.js`.

> Você pode executar o script npx `npx create-electron-app {nome}` para criar a estrutura completa, ele também permite a criação de projetos que usam TypeScript com `npm create-electron-app {nome} --template=typescript`

Diferentemente de um arquivo Node.js, o Electron busca por um script chamado `main.js` para poder inicializar o processo, porém o nome pode ser qualquer um desde que você atualize o nome dentro do arquivo package JSON para que seja o mesmo.

Nosso arquivo `package.json` será assim:

```json
{
  "name": "electron-learn-project",
  "version": "1.0.0",
  "description": "Simple electron project to learn the framework",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^10.1.5"
  }
}
```

## Criando uma aplicação

Tipicamente, o script que roda no processo principal (main process) é o que controla todo o ciclo de vida da aplicação, mostra a interface de usuário e também os elementos da mesma, além disso é geralmente a que realiza interações com o sistema operacional e cria os processos de render dentro das páginas web.

Uma aplicação electron só pode ter um processo principal.

Um script base poderia ser mais ou menos o seguinte:

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./screens/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
```

O que estamos fazendo neste script:

1. Importamos o `electron`, `app` e `BrowserWindow` nativamente do Electron para podermos gerenciar o ciclo de vida de nossas aplicações.
2. Na linha 3, definimos a função que vai criar uma nova janela do browser para abrirmos a nossa aplicação, com a integração do Node ativada. Então carregamos um arquivo que está presente na pasta `screens/index.html` e ai já abrimos o dev tools ao mesmo tempo.
3. Na linha 16 criamos uma nova janela do browser invocando o método `createWindow` uma vez que a aplicação Electron está inicializada.

Então podemos criar um arquivo dentro de uma pasta `screens` chamado `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
</body>
</html>
```

4. Na linha 18 estamos verificando se estamos no MacOS, porque se sim, quando não há novas janelas, fechamos o app, caso contrário ele continua aberto
5. No final adicionamos outro listener para criar uma janela quando não houver mais nenhuma janela visível, o que acontece quando acabamos de executar um programa ou quando abrimos um programa que já estava préviamente aberto

## Distribuindo a aplicação

Podemos distribuir a aplicação de diversas maneiras, a mais simples e mais utilizada é utilizando um pacote chamado `electron-forge`. Ele permite buildar a aplicação para Linux, Windows e Mac.

Para criar a nossa aplicação, basta entrarmos no repositório dela e executar:

```bash
npm i -D @electron-forge/cli
npx electron-forge import
```

Assim que o processo for concluído, podemos executar o comando `npm run make` para criar a aplicação para a arquitetura atual, ou então `npm electron-forge make -p <plataforma>` onde a plataforma pode ser `win32`, `linux`, `darwin`. Na pasta `out` vamos ter os arquivos zipados e também a nossa aplicação juntamente em outra pasta no mesmo diretório.

> Se você está no Mac e precisa construir aplicações para Linux ou Windows, você precisa instalar pacotes adicionais, como o RPM, dpkg e fakeroot, bem como o wine-stable e mono através do homebrew

Outra opção é a instalação do `electron-packager`, infelizmente o packager não é uma solução de distribuição, então ele não vai criar um instalador, apenas o executável, o [repositório oficial](https://github.com/electron/electron-packager) tem uma lista de aplicações que podem criar distribuições.

Para criar uma aplicação com o packager, basta executar com `npx i electron-packager`, a opção `--all` cria um artefato para cada combinação possível de arquitetura.

Existe [uma lista de pacotes](https://github.com/electron/electron-packager#distributable-creators) que geram distribuíveis de aplicações, no caso do Mac, temos o `electron-installer-dmg`, basta instalar ele localmente no repositório com `npm i electron-installer-dmg -D` e então executar `npx electron-installer-dmg caminho/para/aplicação.app nomedoapp` e isso vai criar um arquivo `.dmg` para instalação.

## Arquitetura do Electron

Como já falamos anteriormente, o Electron possui 3 componentes básicos:

- **Chromium**: Para mostrar o conteúdo web
- **Node.js**: Para trabalhar com o file system e OS
- **APIs custom**: Que colam as duas partes

Além disso o Electron possui dois tipos de processos, o `main` e o `renderer`.

- **Main**: Cria as janelas e páginas da web através de uma BrowserWindow, cada BrowserWindow executa a página no seu próprio processo Renderer e, quando a janela e fechada, seu renderer é também destruído.
- **Renderer**: Se comunica com o processo `main` através de IPC para executar as ações que foram feitas na página.

Algumas das APIs do electron tem restrições de onde podem ser utilizadas, algumas são utilizadas somente dentro do `Main` outros somente dentro do `Renderer`, algumas podem ser utilizadas em ambos os processos. Um exemplo é a classe `BrowserWindow` que só está disponível no processo principal.

### Comunicando ambos os processos

Para se comunicar com o processo `main` através do `renderer`, podemos usar o módulo IPC:

```js
// No processo main
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
    // Faz alguma coisa em nome do renderer
})
```

```javascript
// No Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> **Importante**: Como o processo renderer pode rodar código que é não confiável, é sempre importante validar muito bem o que está chegando para o main.

### Utilizando o Node

O Electron expõe a API completa do Node.js tanto para o Main quando para o Renderer, porém, para o Renderer, a integração com o node precisa ser ativada janela por janela através da chave `nodeIntegration: true` na `BrowserWindow`.

A partir daí você pode usar quaisquer APIs do Node, por exemplo, leitura de arquivos:

```javascript
const fs = require('fs')
const root = fs.readdirSync('/')
console.log(root)
```

Se você quiser utilizar um módulo, basta instalá-lo como dependência `npm i gotql` e depois importar normalmente pela aplicação.
