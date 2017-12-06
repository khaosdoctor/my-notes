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
  - [Recursão de diretórios](#recursão-de-diretórios)
  - [Listando processos do sistema](#listando-processos-do-sistema)
  - [Obtendo uso de memória](#obtendo-uso-de-memória)
  - [Agrupando logs](#agrupando-logs)
  - [Tratando o status de saída](#tratando-o-status-de-saída)

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

converte 2>erros_conversao.txt

if [ $? -eq 0 ] then
  echo 'Conversão executada com sucesso'
else
  echo 'Houve um erro na conversão'
fi
```

Agora só mostraremos a mensagem importante.

## Recursão de diretórios

Digamos que agora temos que fazer a varredura de todos os arquivos em pastas distintas dentro de um diretório passado, ou seja, temos que pesquisar recursivamente os diretórios para todas as imagens.

Nosso script anterior não vai nos ajudar muito, então vamos criar outro:

```sh
#!/bin/bash

cd ~/Downloads/livros

for arquivo in * do # Iterar por todos os arquivos do local
  if [ -d $arquivo ] then
    cd $arquivo
    for conteudo in * do
      # Repetição de código
    done
  else
    # Converter a imagem
  fi
done
```

Perceba que temos uma função repetitiva, porque dentro do diretório podemos ter também imagens ou outros diretórios. Temos que criar uma função recursiva.

```sh
#!/bin/bash

converte_imagem() {
  local caminho_imagem=$1
  local imagem_sem_extensao=$(ls $caminho_imagem | awk -F. '{ print $1 }')

  convert $imagem_sem_extensao.jpg $imagem_sem_extensao.png
}

varrer_diretório() {
  cd $1
  for arquivo in * do
    local caminho_arquivo=$(find ~/Downloads/livros -name $arquivo)
    if [ -d $caminho_arquivo ] then
      varrer_diretorio $caminho_arquivo # Passando um parâmetro para a função
    else
      converte_imagem $caminho_arquivo
    fi
  done
}

varrer_diretorio ~/Downloads/livros

if [ $? -eq 0 ] then
  echo "Conversão realizada com sucesso"
else
  echo "Houve um erro de conversão"
fi
```

Note que, para passarmos parâmetros para funções, basta que escrevamos o mesmo na frente da função, e depois buscamos utilizando `$1` ou qualquer outra parte de busca de argumentos que já sabemos.

Note também que verificamos o status de erro dentro da função para podermos exibir a mensagem de sucesso ou falha.

## Listando processos do sistema

Uma nova aplicação do uso do shellScript é para busca de informações de processos. Para isto, em sistemas Unix, temos um arquivo para cada processo com o log de data, hora e a quantidade de memória em Mb alocada para cada processo. Estes arquivos são salvos com o número do processo (PID) como nome.

Felizmente podemos fazer uma ordenação e listagem de processos usando o comando `ps`. Se utilizarmos o comando completo `ps -e -o pid --sort -size` teremos a lista de todos os processos do sistema que estão usando mais memória.

Queremos apenas os 10 primeiros, podemos utilizar o `head`, mas temos que ficar atentos porque teremos um cabeçalho, então temos que forçar a busca de 11 linhas (ao invés dos 10 padrões do `head`) utilizando o comando `head -n 11`.

Removemos o cabeçalho usando `grep [0-9]` para pegar apenas os PID's. O comando completo seria `ps -e -o pid --sort -size | head -n 11 | grep [0-9]`.

Vamos criar o nosso script:

```sh
#!/bin/bash

processos=$(ps -e -o pid --sort -size | head -n 11 | grep [0-9])

for pid in $processos do
  nome_proesso=$(ps -p $pid -o comm=)
done
```

Para podermos printar a data no nosso arquivo de log, podemos utilizar `date +%F,%H:%M:%S`. Assim podemos redirecionar o nosso script para escrever no nosso arquivo de log com:

```sh
#!/bin/bash

processos=$(ps -e -o pid --sort -size | head -n 11 | grep [0-9])

for pid in $processos do
  nome_proesso=$(ps -p $pid -o comm=)
  echo -n $(date +%F,%H:%M:%S,) >> $nome_processo.log
done
```

Estamos utilizando uma `,` após os segundos para podermos já colocar a nossa alocação de memória em megabytes, enquanto utilizamos `-n` para evitar que o `echo` pule uma linha.

## Obtendo uso de memória

Para obtermos a quantidade de memória utilizada pelo processo, podemos utilizar o comando `ps -p <pid> -o size`, mas vamos precisar remover o cabeçalho, pois temos uma saída com a primeira linha tendo o cabeçalho `SIZE`, vamos usar `grep [0-9]` juntamente para remove-lo.

Estes valores estão em Kbytes, e queremos Megabytes, então temos que dividir o valor por 1024, mas se utilizarmos `echo <mem>/1024` teremos printado a string desta conta, mas não seu resultado. Então temos que utilizar um comando chamado `bc` desta forma `bc <<< <mem>/1024`, podendo usar a opção `scale` para limitar a quantidade de casas depois da virgula, desta forma: `bc <<< "scale=2;<mem>/1024"`.

Nosso script vai ficar assim:

```sh
#!/bin/bash

processos=$(ps -e -o pid --sort -size | head -n 11 | grep [0-9])

for pid in $processos do
  nome_proesso=$(ps -p $pid -o comm=)
  echo -n $(date +%F,%H:%M:%S,) >> $nome_processo.log
  tamanho_processo=$(ps -p $pid -o size | grep [0-9])
  echo "$(bc <<< "scale=2;$tamanho_processo/1024") MB" >> $nome_processo.log
done
```

## Agrupando logs

Vamos fazer uma verificação apenas para que possamos salvar nosso arquivo dentro de uma única pasta:

```sh
#!/bin/bash

if [ ! -d log ] then
  mkdir log
fi

processos=$(ps -e -o pid --sort -size | head -n 11 | grep [0-9])

for pid in $processos do
  nome_proesso=$(ps -p $pid -o comm=)
  echo -n $(date +%F,%H:%M:%S,) >> log/$nome_processo.log
  tamanho_processo=$(ps -p $pid -o size | grep [0-9])
  echo "$(bc <<< "scale=2;$tamanho_processo/1024") MB" >> log/$nome_processo.log
done
```

## Tratando o status de saída

Agora podemos implementar uma função agrupando todo o nosso código para podemos pegar o status de saída:

```sh
#!/bin/bash

if [ ! -d log ] then
  mkdir log
fi

processos_memoria() {

processos=$(ps -e -o pid --sort -size | head -n 11 | grep [0-9])

for pid in $processos do
  nome_proesso=$(ps -p $pid -o comm=)
  echo -n $(date +%F,%H:%M:%S,) >> log/$nome_processo.log
  tamanho_processo=$(ps -p $pid -o size | grep [0-9])
  echo "$(bc <<< "scale=2;$tamanho_processo/1024") MB" >> log/$nome_processo.log
done

}

processos_memoria
```

Então podemos tratar nosso erro:

```sh
#!/bin/bash

if [ ! -d log ] then
  mkdir log
fi

processos_memoria() {

processos=$(ps -e -o pid --sort -size | head -n 11 | grep [0-9])

for pid in $processos do
  nome_proesso=$(ps -p $pid -o comm=)
  echo -n $(date +%F,%H:%M:%S,) >> log/$nome_processo.log
  tamanho_processo=$(ps -p $pid -o size | grep [0-9])
  echo "$(bc <<< "scale=2;$tamanho_processo/1024") MB" >> log/$nome_processo.log
done

}

processos_memoria

if [ $? -eq 0 ] then
  echo "Os arquivos foram salvos com sucesso"
else
  echo "Houve um erro ao salvar os arquivos"
fi
```

Com isto podemos finalizar o nosso script.