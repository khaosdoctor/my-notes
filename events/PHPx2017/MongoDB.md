# MongoDB Schemas Design Patterns

## Exemplo de sistema usando Mongo

Um banco de dados relacional armazenaria todos os dados de um sistema médico (por exemplo), teremos todos os dados de todos os pacientes, médicos e tudo mais em um único lugar. Teríamos um relacionamento e tabelas para cada um deles.

Os problemas começam quando temos que criar bancos de dados longos, com tipos de dados variáveis, ou então com relacionamentos complicados. Essa variabilidade de dados vai começar a criar um conflito no banco de dados relacional.

> O foco de um sistema noSQL não é utilizar o projeto todo, mas sim se preocupar só com a parte importante do sistema, uma coisa de cada vez

## Documentos

Documentos residem em *Collections*, e são o equivalente às linhas do banco de dados relacional.

É possível estabelecer um documento como referência, ou seja, exatamente como um banco de dados relacional. Ou também por incorporação

### Embedding vs Reference

As vantagens da incorporação é que não precisamos fazer várias queries, para poder trazer todos os registros e todos os dados que precisamos. Temos que notar também que o Mongo **não é transacional**, ou seja, cada transação vai ser atômica em um unico documnto (operações entre documentos não são possíveis).

A desvantagem é que existe a possibilidade de duplicação de dados, como temos vários documentos iguais dentro de outros documentos, então a chance de termos algo repetido é muito grande. Sem falar que também temos a limitação de 16MB por documento no Mongo.

As vantagens da referencia são que as chances de dados duplicados são menores do que em um modelo *embed* e também reduz a chance de termos o problema dos limites.

Uma das desvantagens é ter que fazer várias queries.

## Relacionamentos

- **Relacionamento 1-1**:
- 	Se tivermos duas entidades fortes o ideal é fazer a referencia
- 	Se tivermos uma entidade forte e outra fraca, então o melhor é utilizar a incorporação, ou seja, incluir todos os dados dentro de um único documento ao invés de criar referencias para outro documento
- **Relacionamento 1-N:**
- 	Utilizar o *embed* quando possível
- 	Se tivermos várias entidades fracas
- 	Trazemos os dados em uma única query
- **Relacionamentos N-M:**
- 	Neste caso depende, podemos usar os dois casos. 
- 	Se a relação não for alterar muito, use o *embed*
- 	Se não use a referencia

A regra geral é:

> Sempre que possível use a incorporação, principalmente se tivermos relacionamentos 1-1, 1-n com tabelas fracas.

## Performance

Podemos utilizar os dois modelos, por exemplo:

```
Imagine que temos Pacientes que fazem exames, cada paciente pode fazer N exames e são M pacientes. Ao invés de termos de referenciar todos os documentos com exames, digamos, para poder trazer todos os pacientes que fizeram um Raio X em SP, podem ser milhões.

Imagine que tenhamos que iterar pela tabela de procedimentos e depois pela de pacientes batendos os documentos.

Neste caso é muito melhor termos apenas o nome ou o tipo do exame juntamente com o documento do paciente. Assim só precisamos checar uma unica collection e pegar a informação que precisamos, neste caso é OK duplicar os dados desde que eles não mudem.
````
