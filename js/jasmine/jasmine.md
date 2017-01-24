# Jasmine

<!-- TOC -->

- [Jasmine](#jasmine)
  - [O que é o Jasmine](#o-que-é-o-jasmine)
  - [Primeiro problema: Lista de números](#primeiro-problema-lista-de-números)
  - [Definição do Jasmine](#definição-do-jasmine)
  - [Primeiro teste](#primeiro-teste)

<!-- /TOC -->

## O que é o Jasmine

Jasmine é uma ferramenta de testes automatizados em Javascript, nessas notas vamos desenvolver um problema e testes implementados para este problema.

## Primeiro problema: Lista de números

Para o nosso primeiro problema, vamos começar com uma função base que vai receber uma lista de números e vai nos devolver o maior e menor elemento desta lista. Vamos utilizar o próprio browser para isto mesmo:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>

  <script>
    function MaiorMenor() {
      var menor, maior;
      
      var class = {
        encontra:  function(nums) {

          maior = Number.MIN_VALUE;
          menor = Number.MAX_VALUE;

          nums.forEach(function(num) {
            if(num < menor) menor = num;
            else if (num > maior) maior = num;
          });
        },

        pegaMenor: function() { return menor; },
        pegaMaior: function() { return maior; },
        
      }

      return class;
    }
  </script>
</head>
</html>
```

Agora vamos executar o primeiro teste simples no nosso código:


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>

  <script>
    function MaiorMenor() {
      var menor, maior;
      
      var class = {
        encontra:  function(nums) {

          maior = Number.MIN_VALUE;
          menor = Number.MAX_VALUE;

          nums.forEach(function(num) {
            if(num < menor) menor = num;
            else if (num > maior) maior = num;
          });
        },

        pegaMenor: function() { return menor; },
        pegaMaior: function() { return maior; },
        
      }

      return class;
    };

    var algoritmo = new MaiorMenor();
    algoritmo.encontra([5,15,7,9]);
    console.log(algoritmo.pegaMaior());
    console.log(algoritmo.pegaMenor());
  </script>
</head>
</html>
```

Esse algoritmo tem um problema. Se executarmos o código com os valores `7,6,5,4` não teremos o maior esperado.

> Precisamos de um teste automatizado.

## Definição do Jasmine

O Jasmine na versão StandAlone, possui 3 arquivos que são importantes:

- A pasta `src`
- A pasta `spec` que são aonde ficarão os nossos testes
- E o arquivo `SpecRunner.html` que é a exibição dos resultados

O SpecRunner já vem com alguns códigos exemplo para vermos.

## Primeiro teste

O SpecRunner é o responsável por executar os testes automátizados, ele basicamente possui um HTML simples com algumas importações de scripts. Vamos transformar nosso código acima em um novo arquivo dentro da pasta `src` e vamos chamar de `maiormenor.js`. Agora vamos iniciar o nosso teste em um arquivo chamado `maiormenorSpec.js` na pasta `spec`:

```js
describe('Maior e menor', function() {
  it("deve entender números em ordem não sequencial", function() {
    
    var algoritmo = new MaiorMenor();
    algoritmo.encontra([5,15,7,9]);

    expect(algoritmo.pegaMaior().toEqual(15));
    expect(algoritmo.pegaMenor().toEqual(5));
    
  });
});
```

- O `describe` é a descrição em linguagem natural do cenário.
- O `it` é a descrição individual do teste que recebe a função que de fato será testada
- O `expect` compara o resultado do algoritmo com um valor

Vamos incluir agora no SpecRunner o nosso arquivo da pasta `src` e também o da pasta `spec` e executar.