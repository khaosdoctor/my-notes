# Leveraging Distributed Architecture

## Lamp

O Stack Lamp geralmnte não escala bem com a maioria das coisas, o grande problema do stack LAMP é o fato de ele não conseguir suportar muitas requisições a medida que a quantidade de usuários vai subindo.

**Precisamos escalar**

## Escalabilidade

> Adicionar máquinas extras não faz que você tenha uma aplicação escalada.

É preciso sempre escalar com um propósito, nunca sem motivo

- Separar lógica baseada na responsabilidade
- Encontrar o elo mais fraco, voce vai precisar de mais deles
- Encontrar soluções alternativas melhores que o stack LAMP
- Não escale demais...

### A aplicação está pronta para ser escalada?

Primeiramente precisamos olhar algumas coisas:

- Se você tem conexões chumbadas no código, como conexões de banco de dados e etc, remova-as e use sempre arquivos com variáveis de ambiente.
- 	O arquivo `.env` é uma boa alternativa

### Replicação

> Não coloque todos os seus ovos em uma única cesta

Isso significa que, uma vez que movemos para a nuvem, estamos sujeitos aos efeitos de quedas ou qualquer outra coisa que afete a rede dos provedores PaaS.

Então é importante que não coloquemos tudo em uma unica região (por exemplo, na AWS, ter o seu site replicado em Ohio apenas), ou então usamos sempre o mesmo provedor.

A solução para isto seria replicar toda a sua aplicação em dois provedores diferentes, por exemplo, usar a AWS e a Azure. Se precisarmos de ainda mais disponibilidade, vamos descendo a qualidade dos serviços como Heroku e DigitalOcean até que estejamos satisfeitos.

### Desastres

Casos de desastres realmente acontecem, por isso é importante ter um fallback quando alguma coisa acontece. Então ter um backup e **testar esse backup para ver se é realmente possível trazer os dados de volta é realmente importante.**

> Veja o NetFlix Simian Army

### Automatização

> Nunca faça manualmente o trabalho manual

A chance de isso dar problema é realmente muito alta, e arrumar é realmente muito complicado.

Sempre automatize seu pipeline, utilizando uma estrutura parecida como:

```
CI -> Testes automatizados -> Provisionamento de aplicações -> Provisionamentos de aplicações menores -> Testes de integração -> Métricas e etc -> Deploy
```

Estruturas de automação e ferramentas como Jenkins, Ant, CircleCI, Travis, Bash, Docker, Vagrant, Chef, Capistrano fazem esse trabalho muito bem.



