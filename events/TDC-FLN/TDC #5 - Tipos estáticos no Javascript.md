# Tipos estáticos no Javascript

- **Tipos primitivos**: Tipos básicos que geralmente já estão presentes em alguma linguagem
- **Tipos Compostos**: São derivados de um ou mais tipos primitivos

Linguagens de programação usam o que é chamado de _sistema de tipos_. O sistema pode ser Estático, que é validado em tempo de compilação e o tipo
dinâmico que é validado em tempo de execução.

## Em javascript

No javascript, os tipos não são importantes, as variáveis podem ser de vários tipos dependendo do contexto. Existem 7 tipos primitivos:

- null
- undefined
- boolean
- number
- string
- Symbol

Estes tipos são passados por cópia e não por referência. Isso significa que alterar uma variável não apresentará efeito em outra.

Existem 3 tipos de tipos complexos:

- Functions
- Objetos
- Arrays

Todos tipos acima são mutáveis e são atribuídos por referência. Então todos os lugares que estes objetos forem referenciados eles vão ser alterados.

### Native object Types

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()

Os três primeiros são chamados de _primitive wrappers_. Basicamente, como um primitivo não pode ter funções, uma ação do tipo `'a'.split()` seria
impossível, mas `new String(a).split()` seria válido. Então o JS automaticamente faz o wrapper da função e chama o método, convertendo de volta ao
tipo primitivo logo em seguida.

### Coerção de tipos em JS

Os tipos são convertidos de forma automática, e por isso geram umas conversões estranhas: https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839

- Conversão de String é realizada sempre que um dos lados de qualquer expressão for uma string
- Conversão para booleano é implicitamente feita em todos os _ifs_, e somente 7 valores são os chamados __Falsy__, todo o resto é resolvido para true.

Ver mais: https://github.com/getify/You-Dont-Know-JS

## Por que usar tipagem estática?

- Erros são pegos mais facilmente
- Melhora a legibilidade do seu código
- As ferramentas como IDEs ficam melhores quando elas sabem exatamente o que cada variável é

Mas uma das coisas que ela não faz é __Melhorar a performance em Runtime__.

## Typescript

- Propósito de criar aplicações que são escaláveis

Utiliza o TSC para compilar para JS através de:

- Webpack (ts-loader)
- Babel
- Gulp
- Browserify

## Flow

Uma ferramenta de checagem de tipos para JS

Funciona exatamente igual ao TS mas não tem nenhum compilador, é apenas uma verificação de tipos que precisa ser removida no final.

## Reason

Linguagem criada pelo facebook que é baseada o OCaml. Inferencia de tipos e tudo mais, usa o BuckleScript para compilar
