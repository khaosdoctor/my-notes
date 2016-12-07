# Clojure

Existem dois tipos de paradigmas de programação (na verdade existem vários), um deles é a _programação imperativa_ que é o mais comum, usando comando imperativos linha após linha, como é a maioria das linguagens, como C, C++, Java e etc.

O paradigma funcional é um pouco diferente, usaremos o Clojure, mas ela não é a única, temos Lisp, Scheme, Scala, Elixir e etc.

## Leiningen e Clojure

O leiningen é uma ferramenta de build e gerenciamento de projetos escrita em Clojure que é muito utilizada na comunidade da linguagem.

## Linguagens funcionais

Em linguagens comuns estamos acostumados com chaves e colchetes, em linguagens funcionais temos que nos acostumar com parenteses.

Para iniciarmos um teste de Clojure no terminal podemos instalar o [Leiningen](http//leiningen.org), no mac basta um `brew install leiningen`, e executarmos o `lein repl` que vai abrir uma interface de testes funcional para que possamos usar.

### Funções

Em linguagens funcionais, as funções são sempre os primeiros parâmetros de qualquer chamada:

```clojure
(+ 5 2)
```

> Significaria o mesmo que 5+2, porém a função (soma) vem primeiro, e só depois os parâmetros

O mesmo vale para multiplicações e tudo mais: `(* 1 3)`, `(/ 3 5)` e etc.

__Lembre-se de sempre abrir os parenteses__

### Variáveis

Variáveis em Clojure são inexistentes, ou melhor dizendo, as variáveis não variam, são sempre imutáveis.

Para criarmos uma variável em qualquer linguagem e atribuir a ela um valor podemos colocar:

```c
int a = 3+4;
```

Porém isso não existe em uma linguagem funcional. Temos constantes definidas com o _def_:

```clojure
(def idade 29)
```

Vai nos dar uma "variável" idade com o valor de 29, porém se realizarmos qualquer operação com ela como, poe exemplo, `(+ idade 3)` vamos obter o valor exato de 32, porém ao printarmos a variável na tela novamente, veremos que seu valor continua 29, ou seja, o valor não mudou.

Isso ocorre porque todas as variáveis em funções são determinadas como constantes e objetos imutáveis, que devem ser preservados e versionados ao longo do programa.

## Iniciando um projeto

Para iniciar um projeto (vamos fazer um jogo de forca), basta usarmos o shell para escrever:

```sh
lein new app <projeto>
```

No nosso caso `lein new app forca` vai gerar uma pasta com o nome do nosso projeto com uma estrutura minima com vários arquivos.

Os arquivos importantes estão na pasta `src/`

### Métodos base

O arquivo `core.clj` vai ter uma estrutura básica como:

```clojure
(ns forca.core
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
```

Tudo que for escrito no arquivo será escrito entre o `(ns ...)` e o `(defn -main)`.

Vamos iniciar com uma constante chamada `total-de-vidas` com o valor de 6.

```clojure
(def total-de-vidas 6)
```

Se iniciarmos o `lein repl`, todas as classes que estão dentro da pasta do projeto serão pré carregadas, ou seja, todas as constantes e definições que dermos dentro do projeto estarão disponíveis no repl.