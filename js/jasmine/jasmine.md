# Jasmine

<!-- TOC -->

- [Jasmine](#jasmine)
  - [O que é o Jasmine](#o-que-é-o-jasmine)
  - [Primeiro problema: Lista de números](#primeiro-problema-lista-de-números)
  - [Definição do Jasmine](#definição-do-jasmine)
  - [Primeiro teste](#primeiro-teste)
  - [Classes de equivalência](#classes-de-equivalência)
  - [Códigos de teste legíveis](#códigos-de-teste-legíveis)
    - [beforeEach](#beforeeach)
    - [Multi Describe](#multi-describe)
    - [Test Data Builders](#test-data-builders)
  - [Lidando com HTML e Interfaces](#lidando-com-html-e-interfaces)
    - [Iniciando com o TDD](#iniciando-com-o-tdd)
    - [Testes de sistema](#testes-de-sistema)
    - [Passos para o TDD](#passos-para-o-tdd)

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

Como vamos ter mais códigos de testes do que de produção, é importante que tenhamos códigos de testes bastante legíveis. Por exemplo:

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

Veja que repetidamente definimos o mesmo paciente Guilherme. Como em TDD temos uma prática de inicializar objetos e variáveis __antes__ do teste começar, o próprio Jasmine nos proporciona a função `beforeEach`.

### beforeEach

```js
describe("Consulta", function() {

  var guilherme;
  beforeEach(function() {
    guilherme = new Paciente("Guilherme", 28, 72, 1.80);
  });

  //Testa os retornos
  it("não deve cobrar nada se for um retorno", function() {
    var consulta = new Consulta(guilherme, [], true, true);

    expect(consulta.preco).toEqual(0);
  });
  
  // Resto do código
});
```

### Multi Describe

Também podemos utilizar a estrutura describe para definir diversos níveis de testes no nosso código. Por exemplo, se quisermos quebrar os testes de consultas em vários subníveis:

```js
describe("Consulta", function() {

  var guilherme;
  beforeEach(function() {
    guilherme = new Paciente("Guilherme", 28, 72, 1.80);
  });

  describe("Consultas do tipo retorno", function() {
    //Todos os testes do tipo retorno
  });

  describe("Consultas com procedimentos", function() {
    //Todos os testes do tipo procedimento
  });
});
```

O teste é o mesmo, mas o relatório fica melhor organizado, desta forma temos não só o código mais visível, mas também o relatório final também.

![](http://s3.amazonaws.com/caelum-online-public/testes-automatizados-em-javascript-com-jasmine/cap03/describes.png)

### Test Data Builders

Quando temos entidades com muitos parâmetros ou definidas em vários lugares, podemos criar um test builder, que vem do design pattern de mesmo nome. Esta técnica consiste em criar um novo arquivo de fonte com o nome `<entidade>Builder.js`, neste arquivo podemos definir valores padrões de parâmetros e retornar o objeto criado, assim só precisaremos muda-lo uma vez.

Vamos criar um `PacienteBuilder.js` na nossa pasta spec:

```js 
function PacienteBuilder() {
  var nome = "Guilherme";
  var idade = 28;
  var peso = 72;
  var altura = 1.80;

  var clazz = {
    construir : function() {
      return Paciente(nome, idade, peso, altura);
    }
  };

  return clazz
}
```

Então podemos chamar no nosso teste como

```js
describe("Consulta", function() {

  var guilherme;
  beforeEach(function() {
    guilherme = new PacienteBuilder().construir();
  });

  describe("Consultas do tipo retorno", function() {
    //Todos os testes do tipo retorno
  });

  describe("Consultas com procedimentos", function() {
    //Todos os testes do tipo procedimento
  });
});
```

Mas e se quisermos trocar os valores? Podemos criar um method chaining utilizando o builder:

```js 
function PacienteBuilder() {
  var nome = "Guilherme";
  var idade = 28;
  var peso = 72;
  var altura = 1.80;

  var clazz = {
    construir : function() {
      return Paciente(nome, idade, peso, altura);
    },
    comIdade : function(valor) {
      idade = valor;
      return this;
    },
    comPeso : function(valor) {
      peso = valor;
      return this;
    }
  };

  return clazz
}
```

Assim podemos encadear os métodos utilizando:

```js
describe("Consulta", function() {

  var guilherme;
  beforeEach(function() {
    guilherme = new PacienteBuilder().comIdade(35).comPeso(80).construir();
  });

  describe("Consultas do tipo retorno", function() {
    //Todos os testes do tipo retorno
  });

  describe("Consultas com procedimentos", function() {
    //Todos os testes do tipo procedimento
  });
});
```

## Lidando com HTML e Interfaces

Como podemos testar o JavaScript que está misturado com manipulações de interface? Por exemplo, como vamos testar um código JS que está manipulando a interface e a camada view? Simplesmente não temos como testar.

```js
var peso = $("#peso").val();
var altura = $("#altura").val();

var imc = peso / (altura * altura);

$("#resultado").val("O IMC é " + imc);
```

Os programas construidos desta maneira são pouco testáveis pois interagem com muitas partes do código de um mesmo modo e em um mesmo momento, tornando complicado a evaluação dos dados de entrada e saída, já que eles podem vir de um input ou de qualquer outro elemento na página.

A solução para isso é o chamado __TDD__, ou seja, programar orientado ao teste que vamos desenvolver. Temos de pensar no teste antes mesmo de pensar no nosso código de produção.

### Iniciando com o TDD

Imagine que temos um código grande e monolítico. O primeiro passo para converter em uma implementação simples é:

> Separar as responsabilidades, o que for regra de negócio fica de um lado, o que manipular interfaces de outro e tudo que envolver infraestrutura e manipulação de banco de dados em outro local

Este é o famoso MVC.

Como então vamos testar os dois códigos? O código do controlador de pacientes e o código que faz o binding entre os valores que vem da tela e a classe de pacientes?

Unitariamente não temos como fazer este teste, e também não faz sentido, porque estas classes binding são geralmente repassadores de valores que instanciam um controller e uma view e transita valores de um para o outro.

Para que possamos testar esses códigos, vamos precisar de um outro tipo de teste.

### Testes de sistema

Todos os testes que fizemos agora são chamados de _testes unitários_, o teste de sistema é também chamado de "teste caixa preta" ou também testes ponto a ponto. Isso significa que vamos utilizar muito o Selenium para que seja simulada a interação o usuário com o browser, clicando em inputs e todos os outros valores.

Estes tipos de testes são de outro nível de teste, um nível mais alto de teste com menos abstraçòes e mais testabilidade concreta.

### Passos para o TDD

Para implementar este paradigma de programação temos que ter uma ideia fixa na mente:

> Pense primeiro nos requisitos, depois na implementação

Com isso queremos dizer que temos de esquecer a implementação e como ela será implementada ou escrita, vamos pensar apenas na entrada e na saída de dados. Com isso ganhamos algumas coisas:

- Por pensar na nossa saída e como vamos utilizar nossas API's, naturalmente o nosso código fica mais bonito
- O teste se torna fácil
- A implementação pode seguir uma forma ou um modelo, que é o do teste
- Uma vez implementado o teste e desevolvida a implementação, qualquer mudança subsequente será feita ao contrário, ou seja, da implementação para o teste
- Como estamos pensando só no teste e na regra de negócio, nossos códigos ficam melhor testados porque ocupamos a mente apenas com os dados da camada de negócio e não com a aplicação em si, escrevendo mais testes para aquele cenário específico.

Para começarmos no TDD podemos seguir os seguintes passos:

1. Primeiramente pensamos no teste mais simples possível para o nosso requisito (por exemplo, agendar uma data de um retorno para 20 dias depois da data da consulta). Neste passo já implementamos como queremos que a nossa api se comporte, ou seja, qual será o rosto do nosso código final para o desenvolvedor que estiver usando.
2. Escrevemos os valores que queremos como entrada, baseado no passo anterior, e os valores que esperamos como saída
3. Rodamos o teste pela primeira vez, ele vai falhar, isso já era esperado, pois provavelmente nossas novas classes ainda não existem
4. Iniciamos a implementação de modo que o objetivo primário é fazer o teste passar, porém implementando a lógica completa (neste passo podemos usar valores fixos e qualquer outro tipo de bizarrice no nosso código)
5. Testamos o código novamente, desta vez esperamos que ele passe, se ele passar podemos ir para o próximo passo.
6. Refatoramos o nosso código para tirar as más práticas, como repetições de código e qualquer outro valor fixo, mas ainda precisamos manter o código passando e sendo funcional
7. Repita o processo para cada melhoria

![](http://s3.amazonaws.com/caelum-online-public/PM-71/TDD.png)

Este é o chamado ciclo `Red -> Green -> Refactor`, onde fazemos primeiro o teste falhar, depois implementamos uma solução simples para o teste passar e ai refinamos nossa solução e repetimos o processo até termos convicção de que o nosso código está bem testado.
