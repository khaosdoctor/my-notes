# Serverless

> O conceito de serverless vem de você não ter nenhum tipo de operação, ou seja, NoOps. Utilizando uma estrutura como serviço onde o desenvolvedor não precisa se preocupar com a infraestrutura

## BaaS (BackEnd As A Service)

O Firebase é um exemplo de arquitetura Serverless BaaS.

No caso, o Firebase é um banco de dados NoSQL que permite que sua aplicação seja implementada totalmente no Client-Side, ou seja, é possível implementar uma aplicação JavaScript totalmente sem nenhum servidor back-end, incluindo bibliotecas que permitem que sua aplicação acesse um serviço de banco e etc sem precisar implementar nenhuma interface ou lógica do lado do cliente.

## FaaS (Function As A Service)

> Lógica server-side disparada por eventos e que executa em containers stateless gerenciados por um terceiro

É a lógica do AWS Lambda, onde é possível executar um código em resposta a um evento de uma aplicação client. Esta função é executada em um servidor qualquer de forma que ela não reside em nenhum servidor, ou seja, ela fica pendente até que seja executado, só então ela é instanciada e executada.

Isto faz com que essas chamadas HTTP se tornem microserviços facilmente.

## DevOps, NoOps, Fully Managed

> Movimento de busca de automação de produção de software e redução (ou eliminação) de recursos computacionais visíveis	

Em outras palavras, remover toda a gerencia de máquina e manter o produto de forma como serviço para que o foco da produtividade seja o código e o desenvolvimento.

