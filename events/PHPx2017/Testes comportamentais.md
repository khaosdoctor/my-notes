# Testes comportamentais

Testes comportamentais são testes escritos em linguagens naturais (portugues, ingles) que são interpretados como testes ao longo do plano de execução do desenvolvimento do sistema. Basicamente segue o exemplo do: *Given X*, *When Y*, *Then Z*, por exemplo:

```
Dado que eu estou adicionando um novo cliente
Quando eu digito o nome "Júlio"
E eu digito o sobrenome "de Lima"
E eu digito o login "julio.lima"
E eu digito a senha "senha123"
Então eu deverei ver a mensagem "Sucesso ao realizar seu cadastro"
```

Porém quando temos muitos testes e estes testes são muito grandes e muito complexos, ai temos que reduzir os nossos testes a um número menor, talvez passando um array de opções:

```
Dado que eu estou adicionando um novo cliente
Quando eu informo os dados pessoais do cliente:
| nome | sobrenome | email | senha | login |
| Júlio | de Lima | jlima@gmail.com | senha1234 | jlima
Então eu deverei ver a mensagem "Sucesso ao realizar seu cadastro"
```

Isto seria implementado no método e trabalharíamos com este array.

Estes testes automáticos precisam ser confiáveis e precisam rodar sem supervisão humana e na sua linguagem nativa. É importante notar que **a complexidade de um software não pode ser passada para os testes de software comportamentais e automatizados, pois se não teremos uma série de condições infinitas que não fazem sentido no modelo final**.

> **Testes independentes ao invés de testes dependentes:** Ou seja, priorizar sempre a escrita de testes que não dependam um do outro.  Para fazer isto, vamos exemplificar, com um sistema de cadastro de cliente, se criamos a sequencia de testes:
>
> - Buscar todos os clientes: O teste deve esperar que existam clientes no banco
> - Cadastro do cliente: Nenhum cliente existe igual no banco
> - Alteração do cliente: O cliente já existe no banco
> - Exclusão do cliente: O cliente já existe no banco, não necessariamente é o mesmo cliente do passo anterior
> - Cadastro do pedido: O pedido não existe mas um cliente existe
> - Listagem de pedidos: Pedidos já existem
>
> Desta forma temos que *preparar* nosso banco de dados previamente para que todos os testes não dependam do estado de outros testes.

## Ordenação

Separar os steps do teste de forma que os arquivos de teste representem suas páginas e não as features do seu produto, ou seja, ao invés de ter o mesmo teste para cada página, vamos ter vários arquivos que implementam os mesmos testes. Então ao invés de:

```
+ GerenciarClientes.feature
| GerenciarCleintes.php
```

 Vamos ter:

```
+ GerenciarClientes.feature
| Login.php
| Cadastro.php
| Loja.php
```

A ideia é não repetir código.

