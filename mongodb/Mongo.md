# MongoDB

<!-- TOC -->

- [MongoDB](#mongodb)
  - [O que é Mongo?](#o-que-é-mongo)
  - [Mongo e SQL](#mongo-e-sql)
  - [Orientação a documentos](#orientação-a-documentos)
- [Estrutura do Mongo](#estrutura-do-mongo)
  - [Interpretador](#interpretador)
- [Queries](#queries)
- [Alterando Arrays](#alterando-arrays)
  - [Operadores para Array](#operadores-para-array)
- [Operadores de query](#operadores-de-query)
  - [Queries complexas](#queries-complexas)
    - [Operadores complexos](#operadores-complexos)
      - [Utilização](#utilização)
    - [Projeção de valores](#projeção-de-valores)
    - [Cursores](#cursores)
      - [Contagem](#contagem)
      - [Ordenar](#ordenar)
      - [Limites](#limites)
      - [Paginação](#paginação)
- [Agrupamento](#agrupamento)
  - [Pipeline](#pipeline)
  - [Operadores](#operadores)
- [Referências de documentos](#referências-de-documentos)
  - [Comparações entre modelos de dados](#comparações-entre-modelos-de-dados)
    - [Embedding](#embedding)
    - [Referencing](#referencing)
- [Comandos](#comandos)
- [Operadores](#operadores-1)

<!-- /TOC -->

## O que é Mongo?

Mongo é um banco de dados não relacional, ou noSQL database, que é orientado a documentos. Ótimo para armazenar dados não estruturados
e em grande quantidade. Altamente escalável e replicável.

## Mongo e SQL
MongoDB segue muitas premissas do SQL, porém com nomes diferentes:

* No SQL temos Databases, no Mongo também
* No SQL temos tabelas, no Mongo temos Collections
* No SQL temos Linhas (rows), no mongo temos Documents

A principal diferença é que o SQL é um banco relacional, enquanto o mongo é orientado a documentos.

## Orientação a documentos
Orientação a documentos significa que, por exemplo, ao ter uma tabela de produto por vendedor, provavelmente em SQL teriamos que ter
uma tabela de produtos onde houvesse uma coluna com o id do vendedor, então teríamos uma tabela de vendedores aonde seriam guardados
apenas os vendedores. Haveria uma relação entre a tabela de produtos e de vendedores através da coluna "Vendedor" da tabela produto.

No caso do Mongo, toda a informação sobre um determinado item ou assunto é armazenada em um unico documento (que seria a row do SQL),
ou seja, como se você estivesse preenchendo um formulário, com todos os dados referentes a um item armazenados em um unico local.

# Estrutura do Mongo
Collections são agrupamentos de documentos, cada documento pode existir por si só e é independente dos demais, sendo assim é possível
armazenar diversos documentos separados em uma unica coleção. 

Documentos de uma mesma coleção podem ter atributos diferentes, por exemplo, uma collection de usuários pode ter três documentos, um
com nome, email e telefone, o outro apenas com nome e email e o outro com nome, email e idade. Isso é chamado de **Dynamic Schema** que
significa que cada usuário pode ter dados diferentes.

## Interpretador
MongoDB possui uma linha de comando que nada mais é do que um interpretador javascript. Seus dados são guardados em json.

# Queries
Queries podem ser obtidas usando `db.<collection>.find($query)`, onde $query é o pedaço do documento que queremos procurar, por exemplo, em dois documentos na collection "user":

```json
{
  "name":"Lucas",
  "email":"foo@bar.com"
}
{
  "name":"Paulo",
  "email":"foo@foo.com"
}
```

Se utilizarmos `db.user.find()`, retornaremos os dois documentos, porém se utilizarmos `db.user.find({"name":"Lucas"})` retornaremos apenas o primeiro.

- Se houver mais de um documento que de match com a query, então todos serão retornados.
- As queries são Case Sensitive.
- O documento todo é retornado sempre.
- As queries são sempre de igualdade

# Alterando Arrays

Para alterar arrays é necessário uma nova leva de comandos do tipo update, com outros modificadores. Sendo a sintaxe `db.collection.update({query},{"$op":{campo:newvalue}})`.

## Operadores para Array
* `$pop`: Remove ou o primeiro ou o ultimo elemento de um array, para remover o primeiro, passamos o valor `-1`, se for o ultimo passamos o valor `1` -> `db.collection.update({query},{"$pop": {array: -1}})` (Remove o primeiro elemento), `db.collection.update({query},{"$pop": {array: 1}})` (Remove o ultimo elemento).
* `$push`: Contrário do pop, porém adiciona sempre ao final do array -> `db.collection.update({query},{"$push":{array:"valor"}})` adicionará "valor" no final de array
* `$addToSet`: Adiciona o valor, da mesma forma que o push, porém apenas se o mesmo não existir no array
* `$pull`: Remove **todas** as ocorrencias de um determinado valor do array.


# Operadores de query

É possível adicionar outros parâmetros a Query, como se fossem clausulas where. Para isso, ao se usar o `find()`, `update()` ou qualquer outro comando de alteração ou busca de arquivos, basta adicionar no parâmetro de query os campos separados por vírgula

```json
db.collection.find(
  {
    campo1:"valor",
    campo2:"valor",
    ...
  }
)
```

As queries são sempre utilizadas com o parâmetro `AND`.

## Queries complexas

Queries complexas utilizam outros operadores, como comparação e booleanos.

### Operadores complexos
* `$gt`: Maior que (greater than) `>`
* `$lt`: Menor que (less than) `<`
* `$gte`: Maior ou igual (Greater than or equal to) `>=`
* `$lte`: Menor ou igual (Less than or equal to) `<=`
* `$ne`: Não igual (Not equal to) `!`

É possível mesclar os operadores em um mesmo campo, por exemplo "Preço maior do que 20 e menor que 50". Basta utilizar a virgula no objeto dos operadores. É importante ressaltar que as queries são sempre `AND`.

O operador `$elemMatch` compara valores dentro de um array utilizando os operadores já citados. Ele compara se todos os valores obedecem a todos os critérios passados. Se este operador não for usado, o mongo checara se os valores obedecem a pelo menos um dos critérios, uma query `OR`

É possível concatenar diversas queries juntas, usando ou não operadores: 
```json
db.collection.find(
  {
    campo:"valor", 
    outrocampo:{"$ne":"valor"}, 
    maisumcampo:{
                  "$gt":10, 
                  "$lt":5
                }
  }
)
```

#### Utilização
* `db.collection.find({"preço":{"$lt": 20}})`: Apenas valores menores do que 20 no campo preço
* `db.collection.find({"preço":{"$lte": 20}})`: Apenas valores menores ou iguais a 20 no campo preço
* `db.collection.find({"preço":{"$gt": 20}})`: Apenas valores maiores do que 20 no campo preço
* `db.collection.find({"preço":{"$gte": 20}})`: Apenas valores maiores ou iguais a 20 no campo preço
* `db.collection.find({"preço":{"$ne": 20}})`: Apenas valores diferentes de 20 no campo preço
* `db.collection.find({"preço":{"$gt": 10, "$lt": 20}})`: Apenas valores maiores do que 10 e menores do que 20
* `db.collection.find({"preço":{"$gte": 10, "$ne": 20}})`: Apenas valores maiores ouiguais a 10 e diferentes de 20
* `db.collection.find({"tamanho":{"$elemMatch":{"$gt": 8, "$lte":12}}})`: Apenas valores maiores que 8 e menores ou iguais a 12 dentro do campo tamanho, que é um array de vários valores `[1,5,8,9,45,3,23,12,11]`.

### Projeção de valores
Selecionar apenas um atributo também é possível no mongo, para isto basta que seja usado o segundo parâmetro do comando `find()`. Cada campo do segundo parâmetro deverá seguir a estrutura `{campo:true, campo:true}`, todos os campos marcados como `true` serão retornados, os demais serão ocultos.

Ex: 
- `db.collection.find({},{name:true})` -> traz apenas o campo "name" de todos os documentos
- `db.collection.find({},{name:true, price:true})` -> traz apenas o campo "name" e "price" de todos os documentos
- `db.collection.find({"value":{"$gte":3}},{name:true})` -> traz apenas o campo "name" dos documentos que possuem o campo "value" maior ou igual a 3.

**OBS:** O campo `_id` é sempre retornado por padrão juntamente com os outros campos da projeção. A única forma de omitir este campo é adicionando `{"_id":false}` no parâmetro de projeção.

### Cursores
Cada vez que uma query é executada, é retornado um cursor que aponta para uma sequencia de documentos, é possível realizar operações sobre esses cursores como: contagem, ordenação e etc.

Métodos de cursores sempre vão vir do comando `find()`.

#### Contagem
É possível contar a quantidade de registros em uma query utilizando o método `count()`, que conta a quantidade de documentos em um cursor. Já que o método `find()` aponta um cursor para cada documento, é possível contar todas as matches de uma determinada query com `db.collection.find().count()`.

#### Ordenar
A ordenação provêm do cursor a partir do comando `sort({campo:[1 para asc, e -1 para desc]})`.

* `sort({campo:1})`: Ordena do menor para o maior
* `sort({campo:-1})`: Do maior para o menor

#### Limites
É possível criar uma paginação usando limitadores, como o TOP do SQL ou o LIMIT do MySQL, para isso vamos usar o método `limit()` após uma query de `find()`:

* `db.collection.find().limit(<qty>)`: Vai limitar os resultados em uma `<qty>` passada, ou seja, se `<qty>` for 3, só serão exibidos 3 resultados

#### Paginação
O método `skip(<qty>)` pula uma quantidade de registros na query selecionada, ou seja, se a sua query retornar 50 registros, o método `db.collection.find().skip(10)` vai mostrar apenas 40 contando a partir do 11º registro.

Isto é muito utilizado para a realização de paginação, neste modelo é possível utilizar o comando `db.collection.find().skip(M).limit(N)`, aonde N é o numero de registros que aparecerão por página e `M = N * (<numero da página atual>-1)`, desta forma em uma primeira página exibindo 5 registros, teríamos a equação `M = 5 * (1-1)` que retornaria 0, sendo assim a query ficaria `db.collection.find().skip(0).limit(5)`, já na segunda página teriamos `M = 5 * 1` que seria 5, ficando `db.collection.find().skip(5).limit(5)` e assim por diante.

# Agrupamento
Assim como no SQL, é possível agregar e consolidar valores, por exemplo, numero de produtos por fornecedor.

Basta utilizar o método `db.collection.agregate([{<op>: {"_id":"$agrupador", "tituloacumulador": {"$op":<value>}}}])`

## Pipeline
O Pipeline é uma ferramenta que faz com que os dados agrupados sejam passados de estágio em estágio e modificados ao longo do percurso. É o equivalente e um subselect do SQL.

`db.collection.aggregate([stage, stage, stage])`, onde o valor do stage anterior é passado para o stage seguinte.

Um exemplo de pipeline seria buscar apenas os produtos que contem ferro em sua composição e agrupa-los por vendedor, somando a quantidade encontrada:

```json
db.collection.aggregate([
  {"$match": {
              "composicao":"ferro"
             }
  },
  {"$group":
    {
      "_id": "$vendedor",
      "soma_total": {
                      "$sum": 1
                    }
    }
  }
])
```

O fluxo seria:

1. Filtrar todos os documentos que possuem "ferro" como um dos elementos do array "composicao"
2. Com apenas estes documentos selecionados, agrupamos por vendedor
3. Utilizamos a soma para saber quantos documentos existem em cada agrupamento

Para usar uma query mais complexa podemos utilizar como exemplo, "os top 3 vendedores com produtos abaixo de 15 reais", neste caos teriamos os seguintes estágios:

1. Filtrar todos os produtos abaixo de R$15
2. Projetar apenas os campos necessários
2. Agrupar por vendedor e tirar a média das notas de cada produto
3. Ordenar por nota decrescente
4. Limitar a 3 resultados

Seria uma query assim:

```json
db.produtos.aggregate([
  {"$match": {"preco": {"$lt": 15}}},
  {"$project": {"_id":false, "vendedor":true, "nota": true}},
  {"$group": {
                "_id": "$vendedor",
                "media": {"$avg":"$nota"}
             }},
  {"$sort": {"media": -1}},
  {"$limit": 3}
])
```

Duas boas práticas são:
- Usar o `$match` sempre primeiro
- Usar `$project` sempre quando for agregar, e sempre depois do `$match`

## Operadores
- `$group`: Agrupa valores por uma coluna comum (GROUP BY). Ex: `db.collection.aggregate([{"$group":{"_id":"$campo"}}])`
- `$sum`: É um acumulador, realiza uma soma para cada registro encontrado. `db.collection.aggregate([{"$group":{"_id":"$vendor", "total":{"$sum": 1}}}])`, traria todas os registros agrupados pela coluna "vendor" e somará 1 para cada registro encontrado. É possível também somar uma coluna inteira, se usarmos `"$sum":"$coluna"` seria o equivalente a utilizar o `SUM(coluna)` no SQL.
- `$avg`: Mostra a média de uma determinada coluna ou número de acordo com o número de registros. `db.collection.aggregate([{"$group":{"_id":"$vendor", "average":{"$avg": "$campo"}}}])` irá mostrar a média do valor existente em "campo".
- `$max`: Mostra a média de uma determinada coluna ou número de acordo com o número de registros. `db.collection.aggregate([{"$group":{"_id":"$vendor", "max":{"$max": "$campo"}}}])` irá mostrar o valor mais alto existente em "campo" dentre todos os valores agrupados por "Vendor".
- `$min`: Mostra a média de uma determinada coluna ou número de acordo com o número de registros. `db.collection.aggregate([{"$group":{"_id":"$vendor", "min":{"$min": "$campo"}}}])` irá mostrar o valor mais baixo existente em "campo" dentre todos os valores agrupados por "Vendor".
- `$match`: Apenas encontra os documentos, é similar ao `find()`. Como em `db.collection.aggregate([{"$match": {"ingredients":"unicorn"}])` vai apenas retornar os dados que batem com a query.

**Obs**: É possível utilizar todos os acumuladores juntos em um agrupamento: `db.collection.aggregate([{"$group":{"_id":"$vendor", "min":{"$min": "$campo"}, "max":{"$max": "$campo"}, "sum":{"$sum": "$campo"}}}])`, traria tanto o menor, o maior e a soma de valores agrupados por vendedor.



# Referências de documentos
É possível relacionar documentos dentro do mongo, porém todo tipo de relação é feita manualmente, ou seja, você precisa saber todos os campos de relacionamento entre os documentos para poder ligar um no outro.

A relação é feita normalmente, por exemplo, uma coleção produto com o campo "_id" setado com o código do produto e um campo "vendedor" com o código do vendedor. Neste caso haveriamos de criar outra collection chamada "vendedor" com os documentos todos setados com o campo "_id" com o id do vendedor, desta forma teriamos que realizar uma query de projeção na collection de produtos com `db.produtos.find(<query>,{vendedor:true})` e pegar este resultado para jogar em outra query na collection de vendedores com `db.vendedor.find({"_id":<campo da query anterior>})`.

Por padrão o mongo não reconhece relacionamentos entre documentos, para o banco são apenas chaves e valores, desta forma é preciso tomar muito cuidado quando for inserir ou altera um documento que possui uma referência. No caso da inserção, Mongo não suporta transações, ou seja, multiplos comandos ao mesmo tempo no banco de dados, desta forma é necessário fazer uma inserção por vez e todas as alterações que ocorrem devem ser realizadas sempre do nível mais baixo para o mais alto, por exemplo, a adição e alteração de um fornecedor em um produto, que agora estará referenciando um novo fornecedor, devemos primeiro adicionar o fornecedor e depois atualizar o produto, Mongo não realizar updates parciais, ou seja, qualquer problema com a query de inserção ou de update, vai causar o aborto da mesma sem alterações.

## Comparações entre modelos de dados
Temos no mongo, dois modos de adicionar dados. O primeiro seria incluir um documento inteiro dentro de outro documento (chamado Embed) e o outro seria referenciar um id em um documento para outro documento (Referencing).

Você deve se decidir quando usar os dois tipos de dados fazendo as seguintes perguntas:

> Com que frequencia meus dados serão usados juntos?

- **Sempre**: Neste caso é melhor usar a estratégia do embedding, pois você vai poupar muitas queries
- **As vezes**: Para dados esporádicos, os dois modelos são uteis
- **Raramente**: Então o modelo de referenciamento é mais indicado

> Qual é o tamanho destes dados?

- **Menos que 100 registros**: Neste caso o Embed é mais indicado
- **Algumas centenas**: Qualquer um dos casos é indicado
- **Milhares**: Neste caso, referências são mais indicadas, pois o tamanho do documento seria muito grande

> Os dados vão ser alterados constantemente?

- **Nunca/Raramente**: Embed seria melhor, pois como os dados nunca mudam, é mais fácil gerenciar em um unico documento
- **Ocasionalmente**: Ambos os casos são validos, pois temos que pensar que teremos que atualizar um ou mais documentos
- **Constantemente**: Referenciar neste caso é melhor, pois assim podemos somente atualizar um dos lados, previne inconsistencias

Geralmente o embedding é o melhor ponto de partida, no entanto, é bom considerar as opções de referenciação quando os dados referenciados precisam ser acessados individualmente (Um usuário criador de um comentário, por exemplo, o usuário seria outra entidade que seria constantemente atualizado e teria que ter sua própria visualização) ou então quando os dados forem muito grandes para serem incluidos em um único documento.

### Embedding

- Precisamos apenas de uma query para trazer todo o dado do objeto
- O documento é acessado juntamente com o pai, ou a referencia.
- Suporta escrita atômica, quando vamos atualizar o documento e suas referencias, podemos fazer isso tudo em uma unica query

### Referencing

- Precisamos de no mínimo duas queries para trazer todos os dados
- Os documentos existem independentemente
- Não suporta escrita atomica, temos que atualizar sempre o pai primeiro e depois o filho

# Comandos
* `use <database>`: Alterna entre databases, se não existir será criado
* `db`: Mostra o database que estamos usando
* `db.<collection>.insert(<json>)`: Insere um documento na base atual em <collection>
* `db.<collection>.find(<query>)`: Seleciona todos os documentos de uma coleção, é possível realizar queries com objetos dentro de elementos ou com arrays, cada elemento de um array é tratado individualmente, então se você possuir um campo com array ele pode ser procurado por qualquer um de seus elementos. Se for outro objeto ou documento, como `{"rating":{"strength":1,"flavor":5}}` é possível fazer `db.collection.find({"rating.flavor":5})` ou seja, `objeto.chave:valor`.
* `db.<collection>.find(<query>,{<campo>:true})`: O equivalente a selecionar apenas um campo de um documento (como `SELECT campo FROM doc`
* `db.<collection>.remove(<query>,[<justOne>])`: Deleta os documentos que derem match em uma query, o parâmetro JustOne implice que, se a query der match em mais de um documento, apenas um será deletado.
* `db.<collection>.drop()`: Remove a coleção do banco de dados
* `db.<collection>.count()`: Conta os elementos de uma coleção
* `db.<collection>.save(<json>)`: Se o documento passado tiver um `_id` então usa o update para atualizar o mesmo, senão insere um novo
* `db.<collection>.update(<query>,{<op>:<campo>})`: Atualiza um ou mais campos em um documento. O operador `<op>` pode ser um dos operadores que estão listados abaixo. Caso o update seja do tipo `(<query>,{documento})`, todo o documento é substituido para este que foi passado, ou seja, se fizermos `(<query>,{price:2})`, todo o documento que bater com a query vai ter a sua estrutura alterada para ter somente a chave Price no valor 2.
* `{"array.index"}`: É possível pegar a posição de um array por seu indice usando a notação `campo.indice`, neste caso um array 
`{ingredientes:["a","b","c"]}` é possível usar `{"ingredientes.1"}` para referenciar, no caso o valor `b` do array

# Operadores
* `$set`: Altera um valor do campo em um update -> `{"$set": {campo:newvalor}}`
* `$inc`: Incrementa um valor em um campo -> `{"$inc": {campo: incrby}}`
* `$unset`: Remove um campo -> `{"$unset":{campo:""}}`
* `$rename`: Muda o nome de um campo -> `{"$rename":{campoantigo: camponovo}}`
* `{"array.$":valor}`: Procura dentro de um array por um valor, podendo ser em qualquer posição, por exemplo, ao realizar uma query de update para alterar todos os valores `teste` existentes em um campo do tipo array, podemos ter este valor em qualquer posição, então não podemos usar `{"campo.1":""}`, então usaremos `db.collection.update({"campo":"teste"}, {"$set":{"campo.$":novovalor}})` vai alterar todos os valores do tipo "teste" dentro de um array no campo "campo". **É importante dizer que o valor alterado vai ser somente a primeira ocorrencia, ou seja, se houver mais valores iguais em um array, por exemplo, `["a","teste","teste"]`, somente a primeira ocorrencia de "teste" será alterada.
* `$max`: Atualiza para um valor somente se o novo for maior que o que já está
* `$min`: Atualiza para um valor somente se o novo for menor do que o que já está
* `$mul`: Multiplica o valor atual por um número passado como parâmetro -> `db.collection.update({query},{"$mul":{campo:multiplicapor}})`

[Documentação sobre operadores](https://docs.mongodb.org/manual/reference/operator/update/)