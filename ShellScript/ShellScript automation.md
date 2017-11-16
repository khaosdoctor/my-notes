# Automação de tarefas usando ShellScript

<!-- TOC -->

- [Automação de tarefas usando ShellScript](#automação-de-tarefas-usando-shellscript)
  - [Automatizando a conversão de imagens](#automatizando-a-conversão-de-imagens)
  - [Parâmetros](#parâmetros)
  - [Glob](#glob)
  - [AWK](#awk)
  - [Checando existência](#checando-existência)
  - [Verificando erros](#verificando-erros)
  - [Redirecionament de erros](#redirecionament-de-erros)

<!-- /TOC -->

## Automatizando a conversão de imagens

Digamos que vamos precisar converter uma série de arquivos da extensão `jpg` para `png`. Neste modelo, podemos utilizar um pacote chamado `imagemagick`. Temos nossos arquivos já na pasta `imagens-livros`, como o imagemagick já pode converter essas imagens, podemos utilizar o comando `convert`.

```sh
convert original.jpg original.png
```

Portanto temos agora a solução ideal para nosso problema. Então podemos converter todas as imagens de uma determinada pasta para uma extensão determinada apenas programando um shellscript para fazer determinada ação.

Vamos criar nosso script:

```sh
#!/bin/bash

convert original.jpg original.png
```

Veja que estamos só convertendo um único arquivo. Como podemos passar parâmetros para o script?

## Parâmetros

Para buscarmos os parâmetros, podemos utilizar `$1` ou então `$` e o número correspondente posicional do parâmetro. Veja que estamos criando uma constante com nossos caminhos das pastas para ficar mais fácil de programarmos.

```sh
#!/bin/bash

CAMINHO=~/Downloads/imagens
DEST=~/Downloads/imagens/converted

convert $CAMINHO/$1.jpg $DEST/$1.png
```

Mas e se quisermos passar mais de um parâmetro? Podemos utilizar `$2`, mas e se quisermos infinitos parâmetros? Podemos fazer um `for` para cada parâmetro.

```sh
#!/bin/bash

CAMINHO=~/Downloads/imagens
DEST=~/Downloads/imagens/converted

for imagem in $@
do
  convert $CAMINHO/$imagem.jpg $DEST/$imagem.png
done
```

Veja que estamos utilizando `$@` que diz que estamos englobando todos os parâmetros enviados para o comando.

Agora queremos converter todos os arquivos de um tipo de extensão para outra.

## Glob

Para podermos fazer essa função, podemos simplesmente englobar todos os arquivos que são `*.jpg`, mas primeiro precisamos estar na pasta das nossas imagens:

```sh
#!/bin/bash

cd ~/Downloads/imagens
DEST=png

for imagem in *.jpg
do
  convert $CAMINHO/$imagem $DEST/$imagem.png
done
```

Veja que utilizamos o glob `*.jpg` para poder pegar __todos os arquivos com a extensão jpg__, mas este arquivo será passado com o nome completo, então temos que remover o `.jpg` de dentro do nosso comando convert. Mas ainda vamos ter uma saída do tipo `imagem.jpg.png` no final, porque temos o caminho com o nome completo. Como podemos remover as extensões repetidas?

## AWK

O AWK é um utilitário de manipulação de texto, ou seja, podemos simplesmente remover e quebrar nossa string em várias partes seguindo um delimitador:

```sh
#!/bin/bash

cd ~/Downloads/imagens
DEST=png

for imagem in *.jpg
do
  imagem_sem_extensao=$(ls $imagem | aws -F. '{ print $1 }')
  convert $CAMINHO/$imagem_sem_extensao.jpg $DEST/$imagem_sem_extensao.png
done
```

Veja o seguinte:

- `awk -F.` diz que nosso delimitador de texto é o `.`
- `{ print $1 }` é um código perl para printar apenas o primeiro slice
- Temos que envolver nosso código em `$()` em `$(ls $imagem | aws -F. '{ print $1 }')` para que recebamos na variável somente o resultado final desta expressão

## Checando existência

Precisamos mover os arquivos para uma pasta própria, mas antes, precisamos saber se esta pasta existe mesmo. Vamos fazer esta verificação antes:

```sh
#!/bin/bash

cd ~/Downloads/imagens
DEST=png

if [ ! -d png ] then
  mkdir png
fi

for imagem in *.jpg do
  imagem_sem_extensao=$(ls $imagem | aws -F. '{ print $1 }')
  convert $CAMINHO/$imagem_sem_extensao.jpg $DEST/$imagem_sem_extensao.png
done
```

- `-d` no `if` verifica se um diretório existe
- Precisamos colocar todos os comando do `if` dentro de colchetes

## Verificando erros

Para podermos deixar uma interface mais amigável para o usuário e mostrar o que estamos fazendo, fomos requisitados para colocar mensagens durante a execução do script em casos de erro ou acerto.

Para isso temos que pegar o status de saída do comando, para que saibamos se houve um sucesso ou uma falha no processo de conversão. Qualquer sucesso tem um código de saída 0, caso contrário é um número com o código do erro.

Para podermos verificar se correu tudo bem, vamos envolver nosso código atual em uma função:

```sh
#!/bin/bash

converter () {
  cd ~/Downloads/imagens
  local DEST=png

  if [ ! -d png ] then
    mkdir png
  fi

  for imagem in *.jpg do
    local imagem_sem_extensao=$(ls $imagem | aws -F. '{ print $1 }')
    convert $CAMINHO/$imagem_sem_extensao.jpg $DEST/$imagem_sem_extensao.png
  done
}

converte_imagem
```

> Estamos utilizando `local` pois, por padrão, todas as variáveis no shell são globais, então poderíamos, por exemplo, acessar a variável `DEST` de fora da função, para que isso não aconteça utilizamos essa keyword

Agora podemos pegar o nosso resultado

```sh
#!/bin/bash

converter () {
  cd ~/Downloads/imagens
  local DEST=png

  if [ ! -d png ] then
    mkdir png
  fi

  for imagem in *.jpg do
    local imagem_sem_extensao=$(ls $imagem | aws -F. '{ print $1 }')
    convert $CAMINHO/$imagem_sem_extensao.jpg $DEST/$imagem_sem_extensao.png
  done
}

converte_imagem

if [ $? -eq 0 ] then
  echo 'Conversão executada com sucesso'
else
  echo 'Houve um erro na conversão'
fi
```

O problema no nosso código é que, se houver um erro, teremos todo o stack do erro mostrado na tela. Isso, para o nosso usuário, não é tão importante, apenas a mensagem que o script não foi executado.

## Redirecionament de erros

Para redirecionarmos apenas os erros, podemos referenciar o `stderr` como `2` dentro do código e direcionarmos usando `>`:

```sh
#!/bin/bash

converter () {
  cd ~/Downloads/imagens
  local DEST=png

  if [ ! -d png ] then
    mkdir png
  fi

  for imagem in *.jpg do
    local imagem_sem_extensao=$(ls $imagem | aws -F. '{ print $1 }')
    convert $CAMINHO/$imagem_sem_extensao.jpg $DEST/$imagem_sem_extensao.png
  done
}

converte_imagem 2>erros_conversao.txt

if [ $? -eq 0 ] then
  echo 'Conversão executada com sucesso'
else
  echo 'Houve um erro na conversão'
fi
```

Agora só mostraremos a mensagem importante.

