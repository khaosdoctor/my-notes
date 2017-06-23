# ECMA Script 7

## Array#Includes

Verifica se existem elementos dentro de um array

## Exponentiation operator

Realiza operações com potência. Por exemplo `2^3` ficaria `2**3`.

# ECMAScript 8 (ECMAScript 2017)

## Object.values, Object.entries

Permite que você busque todos os valores de um objeto com apenas os valores com o `Object.values`.

O `Object.entries` propõe uma lista de valores convertidos a partir do array no formato
`Chave:Valor` como uma série de arrays.

## String.padStart | PadEnd

Permite fixar o tamanho de uma string passando como parâmetro o tipo de caractere que será
preenchido.

```js
"Olá".padStart(3,'.') // .Olá
```

O mesmo vale para o `padEnd`.

## Trailing commas

O ES8 permite que propriedades de objetos agora tenham a vírgula sobrando:

```js
function teste (p1, p2,) // No 7 não funcionaria
```

## Async/Await

Permite executar código assíncrono de forma mais fácil sem precisar utilizar funções dentro de
funções e callbacks.
