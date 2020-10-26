# DevOps Ágil

A infraestrutura ágil vem com a ideia de que temos de poder fazer *deploys* automáticos várias vezes por dia. Hoje em dia o problema é que o código é publicado muitas vezes mas a infraestrutura não acompanha, pois é necessário que a infraestrutura esteja disponível apenas em horários de baixo uso.

Isso é um problema porque a parte ágil está apenas no software e não no hardware. Isso cria o conceito de ***infraestrutura como código*** e coisas como o *Puppet, Docker, Jenkins, Chef, etc*.

> DevOps é poder desenhar o workflow de infraestrutura e poder automatizar totalmente o deploy para produção e homologação utilizando ferramentas que são totalmente automatizadas, e podem automatizar a infraestrutura como código (Chef, Capistrano, Jenkins, Vagrant, Puppet).

Infraestruturas de código como o gitLab (para criar repositórios git próprios).

> A grande ideia é não ter mais que acessar nenhuma máquina via SSH, tudo será feito pela unica pessoa que cuida de todos estes sistemas. Tudo será automático.