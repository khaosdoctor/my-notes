# Jasmine

<!-- TOC -->

- [Jasmine](#jasmine)
  - [O que é o Jasmine](#o-que-é-o-jasmine)
  - [Primeiro problema: Lista de números](#primeiro-problema-lista-de-números)
  - [Definição do Jasmine](#definição-do-jasmine)
  - [Primeiro teste](#primeiro-teste)
  - [Classes de equivalência](#classes-de-equivalência)
  - [Códigos de teste legíveis](#códigos-de-teste-legíveis)

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

## Classes de equivalência

Vamos realizar um novo teste, desta vez vamos imaginar que temos uma clinica e vamos testar as classes de pacientes.

Primeiramente vamos criar as classes importantes.

```js
function Paciente(nome, idade, peso, altura) {
  var clazz = {
    imprime : function() {
      alert(nome + "tem " + idade + " anos");
    },
    batimentos : function() {
      return idade * 365 * 24 * 60 * 60;
    },
    imc : function() {
      return peso / (altura * altura);
    }
  };

  return clazz;
}
```

Agora temos a nossa classe paciente, vamos criar o teste para ela. Como já temos a nossa pasta `spec`, vamos criar o `PacienteSpec.js`:

```js
describe("Paciente", function() {
  it("deve calcular o IMC", function() {
    var guilherme = new Paciente("Guilherme", 28, 72, 1.82);

    var imc = guilherme.imc();

    expect(imc).toEqual(72 / (1.82 * 1.82));
  });

  it("deve calcular o numero de batimentos", function() {
    var guilherme = new Paciente("Guilherme", 28, 72, 1.82);
    var batimentos = guilherme.batimentos();

    expect(batimentos).toEqual(28 *365 * 24 * 60 * 60);
  });
});
```

Depois disso vamos ao nosso `specRunner.html` e incluimos o script do spec juntamente com o script do maior e menor. 

```html
<script type="text/javascript" src="spec/PacienteSpec.js"><script>
```

Se rodarmos o teste, veremos que ele funciona para estes dados enviados, mas temos que ter certeza de que ele funciona para todos os outros dados que podem ser digitados.

Como teríamos que testar todas as combinações possíveis entre pesos e alturas, isso seria um pouco oneroso, talvez até impossível. E também teríamos o problema de que, na verdade, ambos os testes descrevem a mesma coisa, pois do ponto de vista do SpecRunner a função sempre retorna o mesmo cálculo, logo se um deles falhar implicaria que o outro também falha.

De nada adianta termos dois testes que passam e falham juntos, isto só mostra que estamos, em geral, testanto a mesma coisa. Para isto usamos o que é chamado de __classe de equivalência__.

![](http://s3.amazonaws.com/caelum-online-public/PM-71/ClassesdeEquivalencia.png)

Classes de equivalência é o nome que damos para quando temos testes "parecidos", que exercitam o mesmo caminho no código de produção.


Idealmente devemos ter apenas um único teste por classe de equivalência. Afinal, se dois testes exercitam o mesmo trecho de código, então ambos passarão e falharão no mesmo momento, tornando um deles desnecessário.

Quando temos uma classe de equivalência, o ideal é que teríamos que ter apenas um teste por classe de equivalencia.

Vamos continuar nosso exemplo da clinica, agora vamos criar a classe consulta:

```js
function Consulta(paciente, procedimentos, particular, retorno) {
  var clazz = {
    preco : function() {
      if (retorno) { return 0; }

      var precoFinal = 0;

      procedimentos.forEach(function(procedimento) {
        if("raio-x" == procedimento) { precoFinal += 55; }
        else if("gesso" == procedimento) { precoFinal += 32; }
        else { precoFinal += 25; }
      });

      if(particular) { precoFinal *= 2; }

      return precoFinal;
    },
  };

  return clazz;
}
```

Temos a nossa classe de contulta, vamos criar o `ConsultaSpec.js` dentro da pasta `spec` novamente e adicionar ao nosso specRunner como tinhamos feito anteriormente. O nosso teste será:

```js
describe("Consulta", function() {

  //Testa os retornos
  it("não deve cobrar nada se for um retorno", function() {
    var paciente = new Paciente("Guilherme", 28, 72, 1.80);
    var consulta = new Consulta(paciente, [], true, true);

    expect(consulta.preco).toEqual(0);
  });

  //Verifica o preço para procedimentos comuns
  it("deve cobrar 25 por cada procedimento comum", function() {
    var paciente = new Paciente("Guilherme", 28, 72, 1.80);
    var consulta = new Consulta(paciente, ["proc1","proc2"], false, false);

    expect(consulta.preco).toEqual(50);
  });

  //Olha os preços dos procedimentos padrões
  it("deve cobrar preco especifico dependendo do procedimento", function(){
    var paciente = new Paciente("Guilherme", 28, 72, 1.80);
    var consulta = new Consulta(paciente, ["Procedimento-comum", "raio-x", "Procedimento-comum", "gesso"], false, false);

    expect(consulta.preco).toEqual(25+55+25+32);
  });

  //Verifica o preço para procedimentos comuns em consulta particular
  it("deve cobrar 25 por cada procedimento comum em consulta particular", function() {
    var paciente = new Paciente("Guilherme", 28, 72, 1.80);
    var consulta = new Consulta(paciente, ["proc1","proc2"], true, false);

    expect(consulta.preco).toEqual(100);
  });

  //Olha os preços dos procedimentos padrões
  it("deve cobrar preco especifico dependendo do procedimento", function(){
    var paciente = new Paciente("Guilherme", 28, 72, 1.80);
    var consulta = new Consulta(paciente, ["raio-x", "gesso"], true, false);

    expect(consulta.preco).toEqual((55+32)*2);
  });

});
```

Vamos verificar que neste teste, a classe de equivalencia é o número de procedimentos, podemos criar N procedimentos que os valores finais não vão se alterar, logo, procedimentos é uma classe de equivalência.


## Códigos de teste legíveis

