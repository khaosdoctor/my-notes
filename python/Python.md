# Python
Linguagem de programação altamente utilizada pelos programadores em geral por ser:

- Fácil de ler
- Fácil de aprender
- Muito rápido
- Versátil
- É possível adicionar libs separadas

É uma linguagem interpretada, o IDLE é o interpretador padrão do Python, porém existem outros.

## Math
O interpretador básico de python tem suporte paara operações basicas matemáticas sem precisar de nenhum tipo de adicional, assim como as demais linguagens. Os operadores básicos suportados são:

- Soma (+)
- Subtração (-)
- Multiplicação (*)
- Divisão (/)
- Divisão inteira (//): Divide normalmente porém pega apenas a parte inteira do número `1//2` retornaria 0
- Potência (\*\*), representado como `2**5` seria 2^5
- Negação (-x), o oposto do número.

## Variáveis
Variáveis no python são definidas como: `[nome_da_variavel] = [valor]` não existe mais nenhuma definição após isso. (Ler Pep 8 para estilo de código).

Para concatenar strings usamos `+`. Comentários são `#`.

## Módulos
Funções externas matemáticas, como por exemplo o `ceil` e `sqrt` não estão presentes no compilador comum, então temos de importar a lib `math` através da declaração `import math`.

## Print
Printa na tela a string, é a mesma coisa do `echo` do PHP. O uso é `Print(<a>, <b>)` exibiria um `a b` na tela com espaços automáticos.

# Conversões
Assim como qualquer linguagem com tipos definidos, diferentemente de PHP, porém mais parecido com JS, temos que converter os tipos a fim de exibí-los ou trabalhar com variáveis. Como uma int para string ou uma string para int.

Para isso podemos usar
- `str(x)`: Converte x para string
- `int(x)`: Converte x para int
- `float(x)`: Converte x para float

# Strings
Em python, cada string é uma cadeia de caracteres, como um array. Então `Hello` é traduzido por `H E L L O` onde o indice 0 é `H`. Então para podermos pegar apenas uma letra temos: `st = "teste"` aonde `st[0]` é "t".

## Funções de strings
- `len(x)`: Retorna o tamanho da string como int

### Slices
Slices são substring, uma substring é uma função built-in do python que é usada da seguinte maneira:

Temos a palavra `Python`, logo `P Y T H O N`. 

Para pegarmos apenas as letras `tho` poderíamos concatenar as posições 2, 3 e 4 juntas.

Porém é muito trabalhoso, podemos usar o slice: `palavra = "Python"` e então `palavra[2:5]` note que o substring começa contando a primeira letra no indice, ou seja, ele irá contar o indice 2, a letra "T". Mas a função vai até o ultimo indice -1, ou seja, ela não considera o indice 5, mas sim o 4 que seria a letra "O", buscando de 2 a 4 que é o que queríamos.

> Para ficar mais fácil de visualizar, basta imaginar uma barra que vem antes do primeiro indice e antes do segundo, como uma borda. Exemplo: `P Y | T H O | N` aonde temos `THO` como slice 2:5

Existem alguns atalhos, por exemplo:
- `palavra[:x]`: Começa do princípio e vai até X, o mesmo que `palavra[0:x]`
- `palavra[x:]`: Começa do indice X e vai até `len(palavra)`, o tamanho total da string

A fórmula para descobrir o número do substring seria `<var>[indexInicio:indexFinal+1]`, aonde `indexInicio` é o indice do primeiro caracter que você quer e `IndexFinal` é o indice do último caracter que você quer buscar.

# Condicionais
Operadores de comparações para o Python são:

- `>`
- `<`
- `<=`
- `>=`
- `==`
- `!=`

Assim como em qualquer linguagem.

Variáveis booleanas em Python *sempre* começam com a primeira letra maiúscula, como em `True` e não `true`

## if
Sintaxe:
```python
if [expr] [op] [expr]:
  [expr]
```

### else 
Sintaxe:
```python
if [expr] [op] [expr]:
  [expr]
else:
  [expr]
```

### else if
A sintaxe é diferente, usamos `elif`:
```python
if [expr] [op] [expr]:
  [expr]
elif [expr] [op] [expr]:
  [expr]
else:
  [expr]
```

## Operadores booleanos
Os operadores `e` e `ou` são definidos como `and` e `or`:
```python
if [expr] [op] [expr] <and/or> [expr] [op] [expr]:
  [expr]
elif [expr] [op] [expr]:
  [expr]
else:
  [expr]
```

# Input
Função imbutida no python para pedir inputs do usuário. Sintaxe:
```python
[var] = input("[texto exibido]"))
```

A variável vai receber o valor do input e vai avaliar a expressão.

## raw_input
Raw_input é a maneira de buscar a informação do usuário de forma limpa (como string) e realizar tratamentos, a sintaxe é a mesma do input, porém não é realizada nenhuma validação se é um código python ou não, desta forma o input é sempre livre de injections:
```python
[var] = raw_input("[texto exibido]"))
```

# Lists e Dictionaries
Lists são arrays, podem armazenar qualquer tipo de conteúdo e não são tipados, então uma lista pode armazenar diversos valores de diversos tipos em uma unica instancia, por exemplo, misturando ints com strings.

Sintaxe: 
```python
empty = []
empty = [1,2,3,4,5]
empty = [1,'1','2','teste']
empty = [[1,2,3],[3,4,5]] # É possível ter listas de listas
```

A busca de um item na lista é normal, usando o indice da mesma como em um array:
```python
l = [1,2,3,4,5]
l2 = [[1,2,3],[4,5,6]]

print(l[2]) # printaria 3
print(l2[1][0]) # printaria 4
```

## Sublistas
É possível dividir uma lista em sublistas da mesma forma como dividimos strings em substrings:

```python
l = [1,2,3,4,5,6]
a = l[1:3] # traz 2, 3
```

## Adicionando itens
Podemos adicionar novos itens em tempo de execução usando `lista.append(item)`.

## Removendo os itens
Para remover itens de uma lista podemos fazer de duas maneiras, ou por indice ou por valor.

- Por chave: `del lista[indice]`
- Por valor: `lista.remove(item)`

Podemos também remover uma sublista de uma lista com `del lista[range1:range2]`

## Comparação de listas
Para duas listas serem iguais, elas tem que possuir os mesmos itens na mesma ordem.

Sintaxe:
```python
l1 = [1,2,3,4]
l2 = [4,3,2,1]
l3 = [1,2,3,4]

print(l1 == l2) # False porque não tem a mesma ordem
print(l1 == l3) # True porque estão na mesma ordem
```

# Dictionaries
Dictionaries são arrays multidimensionais com chaves e valores, como em conjuntos chave valor do PHP. Assim como as listas, podem armazenar qualquer tipo de valor e mixados

Sintaxe:
```python
slang = {} # vazio
slang = {'chave':'valor', 'chave':'valor'}
```

A expressão `slang['chave']` retornaria `valor`, pois estamos buscando pela chave do dicionário.

## Adicionando valores
Podemos adicionar valores ou alterar valores em um dicionário como: `dict['chave'] = 'valor'`, desta forma iremos atualizar a `chave` do dicionário `dict` com `valor`, porém se `chave` não existir, será criada com `valor`.

## Deletando valores
Para remover o valor basta que usemos `del dict['chave']`

## Checando valores
Pode ser que uma chave não exista, neste caso ao tentar deletar um item teremos um erro. Para isso podemos usar o método get:
`var = dict.get('chave')` que nos retornara se existir.

Se a chave não existir, então `None` será retornado.

> None é o equivalente ao Null ou Undefined. Representa a ausência de um valor. É avaliado para False em um condicional booleano

## Comparação de dictionaries
A ordem não importa em um dictionary, porque os itens são buscados pela chave e não pelo seu indice. Desta forma um dicionário será sempre igual a outro se seus pares de chaves e valores forem iguais:
```python
d1 = {1:1,2:2,3:3,4:4}
d2 = {2:2,4:4,1:1,3:3}

print(d1 == d2) # True, a ordem não importa
```

# Loops

## For
Sintaxe:
```python
for [value] in [array]:
  [expr]
```

O loop for só funciona em listas ou em strings, aonde em uma string cada passada é uma letra.

```python
>>> a = "Lucas"
>>> for b in a:
	print(b)

L
u
c
a
s
```

### Loops em Dictionaries
Para usar um loop em um dicionário, podemos usar uma propriedade chamada `items()`:

```python
for key, value in dict.items():
  [expr]
```

A função `items()` retorna os pares chave/valor dentro do dictionary ao invés de apenas as chaves.

> Para buscarmos uma lista de chaves *apenas*, usamos `dict.keys()` e para *apenas* valores `dict.values()`

## While
Sintaxe:

```python
while [expr]:
	[expr]
```

A sintaxe `while (True):` vai ser um loop eterno, assim como em todas as outras linguagens de programação. Podemos quebrar o loop com a instrução `break`.

Similarmente, a sintaxe `continue` irá retornar imediatamente ao inicio do loop e continuará rodando o mesmo, diferentemente do `break` irá sair da instrução.

# Random
A função Random é utilizada desta forma:
```python
immport random

r1 = random.random()
```

Temos que importar o modulo Random do python padrão.

Métodos disponíveis:
- `random.random()`: Retorna um aleatório entre 0 e 1
- `random.choice([array])`: Retorna um valor aleatório da lista informada
- `random.randint([lower], [upper])`: Retorna um número aleatório entre `[lower]` e `[upper]`

# Range
Cria uma lista de números de determinado tamanho:

Sintaxe:
```python
range(10) # O mesmo que [0,1,2,3,4,5,6,7,8,9]
```

A função `range` tem três parâmetros: `range([inicio], [fim], [step])`, então `range(1,10,2)` irá retornar uma lista de 1 a 9 pulando de 2 em 2. Pois a função range não chega até o ultimo valor.

# Formatação númerica
A função built-in `format` serve para formatar valores, como no exemplo:
```python
a = format(1.5, '.2f') # printará 1.50
b = format(1, '.2f') # printará 1.00
```

# Funções
A definição de uma função se dá pela seguinte sintaxe:
```python
def [nome]([param],[param]...):
	[expr]
```

Todas as funções devem ser definidas antes de serem usadas, então elas provavelmente serão definidas no inicio do código. Antes de todo o programa rodar.

# main()
É uma boa prática organizar todas as partes do programa principal em uma função chamada `main()`, por exemplo:
```python
def hello(name):
	print('Hello',name)

name = str(input("Qual é seu nome?"))
hello(nome)
```

Poderia ser substituido por:
```python
def hello(name):
	print('Hello',name)

def main():
	name = str(input("Qual é seu nome?"))
	hello(nome)

main() # Unica chamada no final do script
```

Isso é usado para evitar problemas no código e confusão de linhas.

## Escopo
O escopo pode ser local ou global, dentro de uma função uma variável é definida somente dentro da mesma, então estão em um escopo local.
```python
def fn():
	var = 0 # Escopo local
```
Qualquer variável fora das funções é uma variável global.
```python
def main():
	[expr]
var = 1 # Global
main()
```

# Key,val pairs
A função `split` irá retornar o resultado de um `explode`, como sendo uma lista de valores, porém imaginando que tenhamos um arquivo de horários separados por " - ":

```
Ventriloquism - 9:00am
Snake Charmer - 12:00pm
Amazing Acrobatics - 2:00pm
Enchanted Elephants - 5:00pm
```

Se lermos individualmente as linhas desse arquivo podemos retornar tanto o nome quanto o horário em variáveis separadas com conjuntos chave/valor:

```python
schedule_file = open('schedule.txt', 'r')
for line in schedule_file:
    (show, time) = line.split(' - ')   # Conjunto (chave, valor) = resultado
    print(show, time)
schedule_file.close()
```

O comando funciona equivalente ao `list()` do PHP, setando cada valor do array para uma variável na lista em ordem.

# Trabalhando com arquivos
## Escrita
Para escrever em um arquivo usamos a função `open`:
```python
handle = open('[nome]','[modo]')
```

> O modo de escrita pode ser: `w` para escrita, `r` para leitura ou `a` para inclusão (append)

Então podemos usar a `handler` do arquivo para escrever um texto:
```python
handle = open('[nome]','[modo]')
handle.write('[texto]')
```

O comando `write` vai escrever o texto no arquivo. Após terminar temos de fechar o arquivo:

```python
handle = open('[nome]','[modo]')
handle.write('[texto]')
handle.close()
```

> Note que teremos de adicionar nossas próprias linhas, pois o comando write não pula linhas automaticamente

## Leitura
Naturalmente para leitura a função `open` permanece a mesma:
```python
arquivo = open('[nome]','r')
```

Para lermos o arquivo todo de uma unica vez, podemos usar a função `read()`:
```python
arquivo = open('[nome]','r')
print(arquivo.read())
```

Podemos também ler uma linha de cada vez usando a função `arquivo.readline()`, lembre-se de que para cada chamada dessa função, uma nova linha será lida e retornada.

Para lermos em um loop, basta que utilizemos o handler do arquivo dentro do laço:
```python
arquivo = open('arquivo.txt','r')

for linha in arquivo:
	[expr]
```

O problema da função acima é que ela vai trazer o `\n` da linha como string, para removermos basta que utilizemos a função `strip()`, que irá remover todos os whitespaces (incluindo CRLF ou `\n`, `\r` e etc) assim como a função `trim()` basica:

```python
arquivo = open('arquivo.txt','r')
lista = []
for linha in arquivo:
	linha.strip()
	lista.append(linha)
```

O código acima vai adicionar todas as linhas do arquivo em uma lista.

# Try, catch
Como exemplo de tratamento de exceções, podemos dizer um arquivo que não existe para ser lido, isso irá uma exceção "File not found". A sintaxe try/catch seria a seguinte:
```python
try:
	[expr]
except:
	[catch]
```

Para tratar um tipo específico de exceção, como `ValueError`, que ocorre quando tentamos converter uma string para um número, mas a string contem letras:

```python
try:
	[expr]
except ValueError:
	[catch]
```

## Capturar a mensagem de erro
Para capturar a mensagem de erro de uma exception fazemos:
```python
try:
	[expr]
except ValueError as var: # Onde ValueError pode ser qualquer tipo de exceção e var pode ser qualquer nome de variável
	[catch]
```

Desta forma a mensagem do erro será jogada dentro da variável `var`.

# Módulos
Módulos são como Packages do java, ou dlls do .NET, eles contem implementações prontas do código para importação.

## PIP
Python Package Manager, é o equivalente do composer ou NPM. Instala módulos que não estão listados.

`pip install [package]` Instala um pacote

> Você precisa adicionar o caminho `/Python/scripts` nas variáveis globais do seu sistema operacional para usar o pip

# Criando um Módulo
Um módulo basicamente é um arquivo python (.py) no mesmo diretório do arquivo principal, por exemplo:
```
dir:
	a.py
	b.py
	c.py
```

Dentro de `a.py` podemos rodar `import b` ou `import c`. Então temos que adicionar o nome do módulo na frente de cada função que utilizamos.