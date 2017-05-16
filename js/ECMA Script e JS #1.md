# Javascript 1

> Programando na linguagem web

<!-- TOC -->

- [Javascript 1](#javascript-1)
  - [Introdução](#introdução)
    - [Hello World](#hello-world)
  - [Query selector](#query-selector)
    - [Boas práticas](#boas-práticas)
  - [Variáveis e operadores](#variáveis-e-operadores)
  - [Validações](#validações)
  - [Arrays e Loops](#arrays-e-loops)
  - [Estilos](#estilos)

<!-- /TOC -->

## Introdução

A linguagem mais comum da web hoje em dia é o Javascript, porém isto está se estendendo a muitos outros dispositivos com o Node.js e muito mais. Ele permite adicionar um dinamismo que não teríamos com outras linguagens, por ela interagir com o DOM e com os elementos no site, é possível criar uma série de outras interações que são mais complexas.

Por si só, o HTML e o CSS são "burros" pois não tem uma inteligencia que permite que cálculos complexos e interações XHR com outras páginas e abre uma série de outras portas para que possamos programar não só o dinamismo do nosso site mas também as interações dele com outras páginas.

Atualmente o JS não está só no front ou no back end, mas também em aplicativos desktop e até arduino e IoT.

Como projeto inicial vamos criar um site chamado "Aparecida Nutrição", um site de uma nutricionista que faz os cadastros e controles de pacientes através deste sistema que vamos construir.

### Hello World

O mais básico do javascript seria a nossa função "Olá mundo", que pode ser feita (no html) desta forma:

```html
<html>
<head>
<script>
  alert("Olá mundo")
</script>
</head>
</html>
```

Também podemos atualizar esta função para algo mais interessante e menos invasivo usando o `console.log()`:

```html
<html>
<head>
<script>
  console.log("Olá mundo")
</script>
</head>
</html>
```

## Query selector

É possível manipular o DOM utilizando o Javascript através dos _query selectors_. O Query selector faz a interação do JS com o DOM (Document Object Model), que é a representação do nosso site dentro do browser. É possível acessar o DOM através da keyword `document`.

O `document` é o objeto todo, mas se quisermos manipular apenas uma parte deste DOM, vamos utilizar os _query selectors_:

```js
document.querySelector("h2.titulo") // Isto vai nos retornar apenas o H2 do DOM com a classe titulo
```

Uma boa prática que temos no HTML é colocar os conteúdos do `script` no final do site, para evitar que busquemos um elemento que ainda não foi renderizado.

Vamos trocar o texto da tag que buscamos:

```js
var h2 = document.querySelector('h2.titulo')
h2.textContent = "Aparecida Nutricionista"
```

Óbvio que não vamos utilizar JS para mudar coisas que vão ficar estáticas, pois para isso é muito mais rápido utilizarmos diretamente o HTML e o CSS.

### Boas práticas

É uma boa prática não buscar apenas pela tag, mas buscar por uma classe, ou ID ou CSS, pois se não o nosso código fica muito dependente da estrutura do nosso html.

Outra boa prática é conter códigos javascript em arquivos externos e não diretamente no html.

## Variáveis e operadores

Vamos calcular o IMC dos pacientes, para isto vamos utilizar o cálculo padrão do IMC que é $IMC= \frac{peso}{(altura^2)}$.

Como temos uma lista fixa de pacientes por enquanto, vamos utilizar o query selector para buscar o nosso primeiro paciente.

```js
var altura = document.querySelector('#primeiro-paciente>.info-altura').textContent
var peso = document.querySelecto('#primeiro-paciente>.info-peso').textContent
var imc = peso / (Math.pow(altura,2))
document.querySelector('.info-imc').textContent = imc

console.log(imc)
```

Desta forma temos o imc do primeiro paciente.

## Validações

Podemos validar o IMC para saber se as nossas variáveis estão corretas. Por exemplo, o peso é sempre absoluto e a altura dificilmente é maior do que 2 metros. Vamos validar por isto:

```js
var altura = document.querySelector('#primeiro-paciente>.info-altura').textContent
var peso = document.querySelector('#primeiro-paciente>.info-peso').textContent

if(peso <= 0 || peso > 1000) {
  console.log("Peso Inválido")
} else if(altura < 0 || altura > 3.00) {
  console.log("Altura inválida")
} else {
  var imc = peso / (Math.pow(altura,2))
  document.querySelector('.info-imc').textContent = imc
}


console.log(imc)
```

## Arrays e Loops

Podemos fazer isto para todos os pacientes, mas é muito mais fácil fazer isso em um loop. Para fazer isso vamos ter que mudar nosso seletor de queries para pegar todas as linhas da nossa tabela.

```js
var pacientes = document.querySelector(".paciente")

var tdPeso = paciente.querySelector(".info-peso")
var peso = tdPeso.textContent

var tdAltura = paciente.querySelector(".info-altura")
var altura = tdAltura.textContent

tdImc = paciente.querySelector(".info-imc")

if(peso <= 0 || peso > 1000) {
  console.log("Peso Inválido")
} else if(altura < 0 || altura > 3.00) {
  console.log("Altura inválida")
} else {
  var imc = peso / (Math.pow(altura,2))
  tdImc.textContent = imc
}
```

Neste caso vamos apenas trazer a primeira linha de todos os pacientes, para podermos trazer todas as tags `tr` vamos ter que ter uma outra função próxima do `querySelector` que é a `querySelectorAll`:

```js
var pacientes = document.querySelectorAll(".paciente")

var tdPeso = paciente.querySelector(".info-peso")
var peso = tdPeso.textContent

var tdAltura = paciente.querySelector(".info-altura")
var altura = tdAltura.textContent

tdImc = paciente.querySelector(".info-imc")

if(peso <= 0 || peso > 1000) {
  console.log("Peso Inválido")
} else if(altura < 0 || altura > 3.00) {
  console.log("Altura inválida")
} else {
  var imc = peso / (Math.pow(altura,2))
  tdImc.textContent = imc
}
```

Agora vamos fazer a iteração:

```js
var pacientes = document.querySelectorAll(".paciente") //Array de pacientes

for(var i = 0; i < pacientes.length; i++) {

  var paciente = pacientes[i]

  var tdPeso = paciente.querySelector(".info-peso")
  var peso = tdPeso.textContent

  var tdAltura = paciente.querySelector(".info-altura")
  var altura = tdAltura.textContent

  tdImc = paciente.querySelector(".info-imc")

  if(peso <= 0 || peso > 1000) {
    console.log("Peso Inválido")
  } else if(altura < 0 || altura > 3.00) {
    console.log("Altura inválida")
  } else {
    var imc = peso / (Math.pow(altura,2))
    tdImc.textContent = imc
  }
}
```

Podemos utilizar também o `forEach`:

```js
var pacientes = document.querySelectorAll(".paciente") //Array de pacientes

pacientes.forEach(function(paciente) {

  var tdPeso = paciente.querySelector(".info-peso")
  var peso = tdPeso.textContent

  var tdAltura = paciente.querySelector(".info-altura")
  var altura = tdAltura.textContent

  tdImc = paciente.querySelector(".info-imc")

  if(peso <= 0 || peso > 1000) {
    console.log("Peso Inválido")
  } else if(altura < 0 || altura > 3.00) {
    console.log("Altura inválida")
  } else {
    var imc = peso / (Math.pow(altura,2)
    tdImc.textContent = imc.toFixed(2) //Fixa apenas em 2 casas decimais
  }
  
})
```

## Estilos

Vamos dizer que queremos mudar o estilo das linhas com erro para vermelho, vamos usar a propriedade `style`, que é o CSS aplicado nesta tag:

```js
var pacientes = document.querySelectorAll(".paciente") //Array de pacientes

pacientes.forEach(function(paciente) {

  var tdPeso = paciente.querySelector(".info-peso")
  var peso = tdPeso.textContent

  var tdAltura = paciente.querySelector(".info-altura")
  var altura = tdAltura.textContent

  tdImc = paciente.querySelector(".info-imc")

  if(peso <= 0 || peso > 1000) {
    console.log("Peso Inválido")
    paciente.style.color = 'red'
    
  } else if(altura < 0 || altura > 3.00) {
    console.log("Altura inválida")
    paciente.style.color = 'red'

  } else {
    var imc = peso / (Math.pow(altura,2)
    tdImc.textContent = imc.toFixed(2) //Fixa apenas em 2 casas decimais
  }
  
})
```

Estilos compostos (com duas palavras e um hífen, como `background-color`) devem ser transformadas em camelCase, ou seja, `background-color` viraria `backgroundColor`.

> Note que isso não é uma boa prática, ao invés de alterarmos o estilo direto, vamos definir uma classe nova no nosso CSS e manipular __apenas esta classe__.

Para podermos adicionar uma nova classe ao paciente, vamos utilizar o método `classList`, digamos que tenho um css que possui uma classe chamada `.erro` e ela deve ser adicionada:

```js
var pacientes = document.querySelectorAll(".paciente") //Array de pacientes

pacientes.forEach(function(paciente) {

  var tdPeso = paciente.querySelector(".info-peso")
  var peso = tdPeso.textContent

  var tdAltura = paciente.querySelector(".info-altura")
  var altura = tdAltura.textContent

  tdImc = paciente.querySelector(".info-imc")

  if(peso <= 0 || peso > 1000) {
    console.log("Peso Inválido")
    paciente.classList.add('erro')
    
  } else if(altura < 0 || altura > 3.00) {
    console.log("Altura inválida")
    paciente.classList.add('erro') //Adicionando uma classe

  } else {
    var imc = peso / (Math.pow(altura,2)
    tdImc.textContent = imc.toFixed(2)
  }
  
})
```

