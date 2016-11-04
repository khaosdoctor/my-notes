# HTTP

## Comunicação Client <=> Server

Todas as regras de comunicação da web são definidos no modelo Cliente <> Servidor, ou seja, existe uma comunicação entre o browser e o servidor para exibir o conteúdo.

![](https://s3.amazonaws.com/caelum-online-public/http/http-cliente_servidor.png)

## Regras de comunicação

Para todas as comunicações existentes, devem haver sempre regras e vocabulário. Pensando no idioma que falamos, essas regras seriam muito mais complexas e extensas, mas como estamos falando de máquinas, a comunicação é muito mais lógica e simples.

![](https://s3.amazonaws.com/caelum-online-public/http/http-cliente_servidor-regras.png)

Por exemplo, uma página que não pode ser encontrada, ou um arquivo que não pode ser baixado será informado pelo servidor como _não encontrado_ e, portanto, deve possuir uma gramática específica para isso. Com códigos de erros e protocólos definidos e tipados. O protocolo principal da internet é o __HTTP__ (**H**yper**T**ext **T**ransfer **P**rotocol)

![](https://s3.amazonaws.com/caelum-online-public/http/http-cliente-servidor-protocolo.png)

### P2P

O modelo Cliente-Servidor não é o único modelo de comunicação na rede, nem sempre o mais adequado. Por exemplo, imagine que precisa contar as letras de 20 palavras. No caso do modelo Cliente-Servidor, quem fará esse trabalho é o servidor, certo? E se precisar contar as letras de 1 milhão de palavras? Muito trabalhoso para o servidor não?

O modelo Cliente-Servidor tenta centralizar o trabalho no servidor, mas isso também pode gerar gargalos. Se cada Cliente pudesse ajudar no trabalho, ou seja, assumir um pouco da responsabilidade do servidor seria muito mais rápido. Isso é a ideia do P2P! Não há mais uma clara divisão entre Cliente-Servidor, cada cliente também é servidor e vice versa!

Isto é útil quando você precisa distribuir um trabalho ou necessita baixar algo de vários lugares diferentes.

## HTTPS

É a versão segura do HTTP. Por definição, o HTTP transita dados em texto puro, ou seja, informações importantes ou sensíveis, que serão trafegados pela rede através de vários intermediários (modem, roteadores, provedores, VPS, WHM e etc).

Ai que entramos com o HTTP**S** (de Secure), este protocolo permite que os dados sejam trafegados pelos pontos de rede de forma criptografada, desta forma estas informações seguras não são transferidas do cliente para o servidor em forma de texto puro, mas sim no formato SSL.

### O Formato RSA

O RSA é uma forma de autenticação assimétrica, ou seja, precisa de um certificado digital com uma chave pública e uma chave privada. A **Autoridade certificadora** (CA) é a empresa ou orgão que confirma que o site ou o domínio é de fato quem ele diz ser.

A CA confirma esse certificação, porém precisamos criptografar os dados para fazer esta transação. O Certificado Digital possui uma chave publica, essa chave publica é uma entidade que será baixada pelo navegador e utilizará essa chave para criptografar os dados. No lado do servidor, existe uma chave privada, que só é conhecida pelo servidor que está servindo os dados (por isso é assimétrica, uma chave é diferente da outra) que é usada para descriptografar os dados enviados pelo browser.

Mas se a comunicação é o oposto, ou seja, quando o servidor envia os dados, então os dados são criptografados usando a chave privada e descriptografados utilizando a chave pública presente no navegador.

### Problemas de chaves assimétricas

As chaves assimétricas são extremamente seguras, porém são lentas, justamente pelo fato de que as comunicações precisam ser geradas em chaves diferentes, e a decriptcação é lenta.

Neste caso temos as chaves **simétricas**, que são basicamente o mesmo par de chaves, um no lado do cliente e outro no lado do servidor, que são bastante rápidas, mas não tão seguras. Pois se todos tiverem a chave, não há nenhum motivo em criptografar os dados.

Para sanar este problema, a comunicação web utiliza ambos os protocolos de autenticação. E comunicação é __iniciada__ com uma criptografia assimétrica, apenas para identificar que o servidor é realmente quem ele diz ser, e depois é gerada uma chave simétrica para o client e o server, que só funcionará naquela sessão do navegador para o restante da comunicação.

## Domínios

Domínios são utilizados para os humanos identificarem mais facilmente os sites.

> Uma exemplo de dominio: _http://alura.com.br_.

O domínio não é necessário para os computadores, pois estes se comunicam via IP, o endereço universal de rede. Esse endereço é decodificado a partir de o domínio pelo DNS (**D**omain **N**ame **S**erver).

![](https://s3.amazonaws.com/caelum-online-public/http/domain-hierarquia.png)

Além do IP, temos a porta de rede que teremos que utilizar, já que existem 65535 portas disponíveis, o HTTPS define uma porta padrão _443_ enquanto a porta padrão do protocolo HTTP é _80_.

### Recursos

Os recursos são as páginas que vem depois do domínio, como por exemplo http://alura.com.br/dashboard, neste caso o _/dashboard_ seria um **recurso**.

### Estrutura do HTTP

Sempre teremos a seguinte estrutura: _protocolo://dominio:porta/recurso/recurso_

Isso define uma URL (**U**nified **R**esource **L**ocator).

## Requisição e resposta

A comunicação entre um navegador e um servidor é sempre realizado através de requisições e respostas.

![](https://s3.amazonaws.com/caelum-online-public/http/alura-request-response.png)

O cliente sempre envia informações e o servidor sempre responde utilizando uma resposta, que poderia ser uma página, um código, um recurso, um arquivo ou qualquer outro tipo de coisa.

> Todas as requisições são independentes e não conhecem nada sobre os dados da requisição anterior.

Se pensarmos em uma plataforma de login, seria um pouco deselegante enviar em _cada_ requisição o usuário e senha da pessoa que estaria logada, então é criado um _hash_, um número único de difícil advinhação para cada usuário.

![](https://s3.amazonaws.com/caelum-online-public/http/alura-req-res-cookie.png)

## Cookies

Cookies são a forma mais antiga de armazenamento de dados entre servidores e clientes.

![](https://s3.amazonaws.com/caelum-online-public/http/alura-cookie-navegador.png)

O hash que falamos anteriormente podem ser usados para o armazenamento dos hashes e identificações do usuário. Essas informações são utilizadas para que não precisemos enviar sempre as mesmas informações para o server.

> Geralmente o servidor realiza a autenticações sozinhas e retorna os tokens pré criados utilizando uma criptografia (que geralmente é um SHA256)

## Verbos HTTP

O HTTP se comunica com o server através de uma semantica simples.

Um verbo HTTP define nossa intenção para com o servidor:

- GET: Baixar um arquivo do servidor
- POST: Enviar algum dado ao servidor
- DELETE: Remover um dado do servidor
- PUT: Atualizar um dado do servidor

E o servidor responde com códigos de resposta. Existem várias famílias de código, como:

- 200: OK, FINE
- 300: Existe uma ação que o navegador deve realizar
- 400: Erro de arquivo, falha de resposta ou autenticação
- 500: Erro no servidor

## Cabeçalhos

Os cabeçalho são detalhes que a resposta da requisição (e a requisição em si) possuem que informam o que deve ser feito ou mais informações sobre aquela requisição.
