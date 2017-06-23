# Testes em todos os níveis da aplicação

> Como testar sua aplicação em todas as linhas de código desde o desenvolvimento até a produção

## Testes unitários

Testa pequenas unidades de código de todos os componentes que compõem o seu sistema.

- Os métodos fazem exatamente o que deveriam fazer?

Uma vez que a aplicação está sendo desenvolvida, sim, mas depois que a mesma está em produção e uma
manutenção é realizada, pode ser que não.

### Como fazer testes unitários

Neste exemplo vamos utilizar o [Jest](facebook.github.io/jest)

- Desenvolvido especificamente para React
- Fácil configurar e iniciar o uso
- Paralelismo de testes
- Testes de componentes

```sh
npm install --save-dev jest
```

Criamos o nosso script de teste e o nosso `module.spec.js` que é o arquivo responsável pelos testes.

### Snapshot Testing 

> Onde o Jest realmente brilha

Um componente pode ser definido como:

> Um controle com responsabilidade ou saída única, definido um ou mais componentes

Para podermos testar os componentes com o Jest temos como utilizar o Snapshot Testing.

Dado que temos um componente, podemos importar o mesmo no nosso arquivo de testes usando o
`react-test-renderer` e criamos uma representação JSON da saída do componente, esta representação é
chamada de Snapshot.

A cada execução do teste, o Jest utiliza os snapshots que estão salvos e bate a nova versão com esta
nova versão do snapshot que foi tirada no teste que está em execução. Se o componente realmente
mudou basta utilizar a flag `-u` para atualizar todos os snapshots de teste.

## Testes integrados

Um teste integrado (ou end-to-end) é o tipo de teste que verifica todo o fluxo de trabalho da sua
aplicação de ponta a ponta.

Existem infinitos frameworks, podemos utilizar o NightwatchJS para rodar nossos testes end-to-end.

## Integração contínua (CI)

Estes testes garantem que o sistema vai rodar bem na sua própria máquina, mas não garante que ela
pode rodar em qualquer outra máquina, para isso utilizamos o CI. Um CI deve rodar todos os testes,
tanto os unitários quanto os integrados, de componentes e etc.

Ele é o responsável por testar todos os commits e todos os pushes para produção, a integração
continua é o primeiro passo para uma arquitetura de entrega e deploy contínuo.

Porém os servidores de CI não tem interfaces gráficas na maioria dos casoa, ou seja, não podemos
utilizar os navegadores. Para isso existem algumas ferramentas como o SauceLabs. Esta aplicação vai
ser apenas mais um driver para a sua suite de testes.

## Produção

Este é o quinto nível de testes, se todos os testes e o CI passou é 95% de certeza que a aplicação
vai rodar em produção, mas não podemos definir todos os testes ao mesmo tempo.

## Outros testes no ambiente de produção

- Netflix Simian Army
- Testes A/B
- Rode todos os testes novamente em produçãm em um período de menor carga.
