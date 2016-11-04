# O que é Ember
Ember é um framework javascript para criar projetos grandes. Baseado em uma arquitetura MVC, funciona bem com Node e outras tecnologias.

## MVC
O paradigma MVC foi criado para criar códigos reutilizaveis e melhorar o trabalho em equipe de um desenvolvimento de software.

*Usuário* -- _interage_ -> *Controller* -- _manipula_ -> *Model* -- _atualiza_ -> *View* -- _mostra_ -> *Usuário*

# Ember Cli
Linha de comando do ember, rodar `ember new <projeto>` cria a pasta com o nome do projeto e todas as dependencias.

# Templates e Rotas

# Templates
Templates são modelos que dizem quais são os htmls corretos para renderizar para cada página do app. Eles seguem a base do Handlebars.js
e estão na pasta app/templates.

Toda a aplicação ember possui um arquivo `application.hbs`

Templates possuem expressões do tipo handlebars expressions, que possuem essa estrutura: `{{exp}}` indicam que esta parte da estrutura
é dinamica dentro do template.

* `{{outlet}}`: Diz para o framework aonde outros templates devem ser renderizados após serem criados.

Quando não existem outros templates, ember gera um template nulo chamado `index.hbs`, que é colocado no outlet, porém ele está em branco.
É possível sobrescrever esse template criando um arquivo index.hbs dentro da pasta templates.

> É uma boa prática sempre ter o index.hbs na app

## Rotas
Rotas são as rotas como qualquer framework...

O arquivo de rotas fica em /app/router.js e é responsável por localizar o usuário na aplicação em todos os momentos.

Ele se parece com isso:

```js
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

//Aqui vão as rotas para mapearmos
Router.map(function() {
	this.route('nome da rota', { path: '/nome da rota' });
});

export default Router;
```

Não é obrigatório utilizar sempre a expressão `this.route('nome da rota', { path: '/nome da rota' });`. Se a rota tiver o mesmo nome
do caminho podemos só utilizar `this.route('nome da rota');`, isto é uma boa prática.

### Ligando templates
Podemos ligar templates simplesmente colocando uma tag `<a>` no nosso template e apontar para o caminho da nossa rota, mas isto faz com
que o framework perca muita eficácia, pois ele vai reler a página toda. Para facilitar, podemos usar 
`{{#link-to "rota"}}texto{{/link-to}}` que irá basicamente reler só o template. Se não houver nenhum id, ember vai gerar um aleatório.

O bloco link-to tem algumas opções, por exemplo, podemos adicionar uma classe colocando 
`{{#link-to "rota" class="classe"}}texto{{/link-to}}`.

Temos outras:
* `{{#link-to "rota" tagName="tag"}}texto{{/link-to}}`: Por padrão o link-to gera um `<a>`, mas é possível alterar a tag utilizando 
`tagname`, ela ainda vai se comportar como um link, no entanto.

> Além dos helpers padrão do Handlebars, existem outros como:
> - debugger: Para o processamento para entrar no debug
> - each: faz uma iteração sobre uma coleção de objetos
> - if: Condição If
> - input: Cria um input
> - log: Log no console
> - textarea: Cria uma TextArea
> - unless: O mesmo que o if ("A não ser que")


