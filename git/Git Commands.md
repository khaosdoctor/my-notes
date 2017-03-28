<!-- TOC -->

- [Comandos base](#comandos-base)
- [Cherry pick](#cherry-pick)
- [Stash](#stash)
- [Tags](#tags)
  - [Restaurando tags](#restaurando-tags)
- [.gitignore](#gitignore)
- [Rebase](#rebase)
- [Revisando pull requests (Quando todos são colaboradores)](#revisando-pull-requests-quando-todos-são-colaboradores)
- [Clone e Fork (Definições)](#clone-e-fork-definições)
- [Upstream](#upstream)
- [Config](#config)
- [Corrigindo problemas com LF e CRLF](#corrigindo-problemas-com-lf-e-crlf)
- [ReReRe](#rerere)
- [Amend (APENAS LOCAL)](#amend-apenas-local)
- [Alias](#alias)
- [Chery Pick](#chery-pick)
- [Submodules](#submodules)
- [Tratando commits orfãos](#tratando-commits-orfãos)
- [Reflogs](#reflogs)
- [SITES DE AJUDA GIT](#sites-de-ajuda-git)

<!-- /TOC -->

# Comandos base

* `git status`: Verifica status atual do repositório (opção -s mostra menos verbose)
* `git rebase <branch>`: Roda o rebase no branch atual com base em `<branch>`
* `git rebase [-i] <HEAD~N>`: Inicia o interactive rebase no branch local (Para ordenar commits) até HEAD-N commits 
* `git init`: Inicia um novo repositório na pasta
* `git commit [-a][-m "message"]`: Commit
* `git remote [show, add] <nome> <url>`: Lista/Adiciona um novo ponteiro remoto
* `git clone <url> [nome]`: Clona o repositório git no local, se não for especificado o nome, será criado com o mesmo nome do remoto
* `git clone <branch> <nome>`: Clona um branch para um outro repositório (backup)
* `git push [remote branch]`: Sobe as alterações para o remote do branch local
* `git log [-%n(numero de commits pra trás) | --oneline | --graph | --pretty | --format=]`: mostra o log de commits ou de um determinado commit
* `git log -p`: Mostra o log com o diff
* `git blame <arquivo>`: Mostra linha a linha quem foi o ultimo autor
* `git diff [branch branch] [arquivo ...] [commit1 commit2]`: Diferenças entre a versão do arquivo atual e a procurada

_**Obs**: O git diff mostra apenas diferenças entre os arquivos dentro de um commit (do ultimo commit se não for especificado nenhum) e os arquivos de fora do stage, pode-se usar `--staged`_

_**Obs²**: Se usarmos `git diff <commit>` temos todas as diferenças entre aquele commit e o nosso arquivo. O `git diff <c1> <c2>` mostra as diferenças entre `commit1` e `commit2`_ 

_**Obs³**: O comando `git diff <commit>~<num>` mostra as diferenças do `<commit>` até `<num>` de commits para trás (tanto em stage quanto fora)_

* `git rm <arquivo>`: Remove um arquivo do repositório (fisicamente, remove do disco)
* `git mv <arquivo>`: Renomeia um arquivo do repositório

_**Obs**: Se o segundo parâmetro for um caminho `git mv principal.js js/p.js` ele vai mover o arquivo_

* `git checkout --<arquivo>`: Desfaz uma mudança em um arquivo
* `git reset [<arquivo>] [--soft]`: Remove o arquivo do stage, mas ele continua com as mudanças
* `git reset [<arquivo>] [--hard] [<SHA> | HEAD~%n]`: Remove todas as alterações do arquivo, ou de todos os arquivos se não for especificado nenhum, e volta a HEAD para o ultimo commit antes desse (ou um commit específico se for mandado depois ex: `git reset --hard HEAD~3`, voltaria três commits atrás da HEAD)
* `git remote [-v]`: Lista todos os remotos (-v mostra a url)
* `git push -u`: se o branch remoto não foi criado, cria o branch remoto e seta como padrão para este branch (não precisa usar git push branch)
* `git branch -r`: Mostra todos os branches remotos
* `git branch [opções] <nome>`: Cria um novo branch
* `git push origin :<branch>`: Remove um branch remoto
* `git remote show <remote>`: Mostra informações de um determinado `<remote>`
* `git remote prune <remote>`: Deleta todos os Stale Branches do remoto (Branches que não possuem correspondentes locais porque os mesmos já foram deletados.
* `git branch --merged`: Mostra todos os branches que foram mesclados no branch atual
* `git branch --no-merged`: Mostra todos os branches que não foram mesclados no branch atual
* `git branch -d <branch>`: Deleta um branch
* `git branch -D <branch>`: Força a remoção de um branch mesmo se este não estiver mesclado

# Cherry pick
Seleciona comandos de outro branch para poder commitar no branch atual
* `git cherry-pick [opções] <commit> <commit>`: Busca os commits de outro branch (pelo SHA) e mescla no branch atual
* `git cherry-pick --no-commit <commit>`: Pega os commits mas não mescla, deixa no stage
* `git cherry-pick --edit <commit>`: Edita a mensagem do commit antes de mesclar
* `git cherry-pick --signoff <commit>`: Mostra a pessoa que fez o commit que está no cherry pick
* `git cherry-pick -x <commit>`: Mostra de onde o commit foi pego

#Stash
Depósito de mudanças ainda não concluídas a serem concluidas depois.

* `git stash`: Armazena o estado atual do repositório em um stash
* `git stash list`: Lista todos os estados armazenados
* `git stash apply [Nº]`: Aplica o ultimo estado listado quando não tem o numero do stash, se não aplica o stash informado
* `git stash pop`: Aplica o ultimo stash listado e remove da lista
* `git stash drop`: Limpa a lista do stash
* `git stash --keep-index`: Só armazena no stash o que não está no stage
* `git stash --include-untracked`: Armazena no stash também os arquivos não trackeados pelo git no repositório
* `git stash list --stat`: Lista todos os stashes com detalhes de mudanças
* `git stash show <stashNr> [--patch]`: Mostra informações de um stash específico, com o `--patch`, mostra os diffs
* `git stash save "Mensagem"`: Salva um stash com uma mensagem explicativa
* `git stash branch <branch>`: Cria um novo branch a partir do stash

# Tags
Tags são meios de criarmos ponteiros para um commit específico, como se fosse um alias, é muito utilizado para identificar uma versão final, por exemplo, v1.3.2.

* `git tag`: Lista todas as tags
* `git tag [-a <tag> -m "Mensagem"]`: Cria uma tag e uma mensagem explicativa desta tag
* `git tag <tag>`: Cria uma tag
* `git tag -s`: Usa uma chave publica pra identificar o criador da tag

O `git push` não identifica que tem que mandar as tags para o servidor, então você tem que usar `git push --tags` para mandar as tags junto.

## Restaurando tags
Você pode restaurar o estado de uma tag usando o `git checkout <tag>`, como se fosse um commit.

#.gitignore
O arquivo `.gitignore` tem uma lista de pastas e/ou extensões que o git não deve considerar quando faz o controle de versões, por exemplo, pastas de logs de desenvolvimento, debugers e etc.

A estrutura segue um modelo simples, onde cada regra é escrita em uma linha diferente:
* `pasta/`: Ignora todos os arquivos em uma pasta
* `pasta/*.extensão`: Ignora todos os arquivos de determinada extensão dentro de uma pasta
* `*.extensão`: Ignora todos os arquivos de determinada extensão dentro do repositório
* `arquivo.*`: Ignora todos os arquivos chamados "arquivo" (é case sensitive) dentro do repositório
* `pasta/arquivo.*`: Ignora todos os arquivos chamados "arquivo" dentro da pasta

# Rebase
O rebase reorganiza os commits de forma a excluir commits de merge. Ele faz três coisas basicamente:
1. Pega todos os commits que estão no branch local **e não estão no branch remoto** e move para uma área temporária
2. Depois o rebase roda todos os commits do branch remoto um de cada vez, colocando eles na linha do tempo.
3. Por último, pega todos os commits na área temporária e roda eles depois dos commits que foram rodados do remoto.

# Revisando pull requests (Quando todos são colaboradores)
Primeiramente no branch master, rode o comando
* `git fetch`: isto vai trazer as alterações de todos os branches
* `git branch -a`: isso vai visualizar todos os branches, incluindo os remotos (em vermalho) por causa do -a
* `git checkout <branch>`: vai mudar seu repositório para o branch selecionado aonde você poderá testar o que foi criado
* `git commit`: commita as mudanças para o próprio branch
* `git push`: sobe as mudanças para este branch

# Clone e Fork (Definições)
Quando você é o dono de um repositório você pode dar o git CLONE para clonar no seu computador.
Se você não é dono do repositório, mas alguém te adicionou como colaborador, você pode clonar o projeto com git clone

No entanto se você não é dono do projeto nem colaborador, você ainda pode clonar mas você não pode dar push pois você não tem permissão.

> O FORK, é quando você puxa o repositório para o seu usuário e depois clona para o seu computador, mas todas as alterações > neste repositório serão feitas no seu próprio repositório que foi utilizado no FORK, ou seja, a contribuição não vai para > o repositório original.

# Upstream
Quando você realiza um fork, você clona o repositório localmente, perdendo a comunicação com o repositório original, desta forma sempre que você der um pull você não vai ver as alterações do original, mas sim do seu fork apenas, para contornar isso adicionamos um remoto da URL do endereço do repositório original só para fazer pull.

Upstream é a atualização de um fork no github. Ela contem todas as atualizações realizadas pelos pull requests que foram aceitos, tornando possível que você atualize seu fork com os códigos de outros colaboradores em outros forks.

* `git remote add upstream <caminho do repo>`

depois rode:

* `git fetch upstream`: traz todas as alterações do repositório original
* `git merge upstream/master master`: mescla o repositório original com o seu
* `git push origin master `: sobe as alterações para o seu fork

# Config
O git tem três níveis de configuração
* `git config --local`: vale a pena para o repositório atual
* `git config --global`: vale para o seu usuário
* `git config --system`: vale para todos os usuários

o comando `git config --global --list` vai listar todos as configurações. O parâmetro de estado pode ser `--local`, `--global` ou `--system`.

# Corrigindo problemas com LF e CRLF
No Windows rodar: `git config --global core.autocrlf true`
Em linux ou mac: `git config --global core.autocrlf input`

# ReReRe
Corrige automaticamente conflitos em merges quando ocorrem novamente:
* `git config --global rerere.enabled true`

# Amend (APENAS LOCAL)
Permite mesclar um commit com outro commit anterior ou permite que mude a mensagem dele 

* `git commit --amend`: Mescla com o commit anterior e permite que você edite a mensagem do commit, fazendo isso você substitui COMPLETAMENTE o commit
* `git commit --amend --no-edit`: Apenas mescla, não permite que altere a mensagem.

# Alias
* `git config [--global] alias.<comando> "<comando2>"`: adiciona um alias com o nome de "comando" que executa comando2 (lembrando que sempre que for usar tem que ser "git comando")

# Chery Pick
Pega um commit de um branch e coloca em outro (copia)

* `git cherry-pick <sha>`: Pega um commit especifico de um outro branch e adiciona no nosso branch atual
* `git cherry-pick --no-commit <sha1> <sha2> ...`: Pega dois commits específicos e adiciona suas alterações no nosso stage mas não commita
* `git cherry-pick --edit <sha>`: Adiciona um commit de um outro branch mas abre um editor que possibilita que editemos a mensagem do commit
* `git cherry-pick -x <sha>`: Adiciona o commit original que ele veio (Só funciona com publicos porque locais não tem o mesmo SHA)
* `git cherry-pick --signoff <sha>`: Adiciona quem puxou o commit na mensagem

# Submodules
Um repositório git dentro de outro repositório git. Em essencia ele permite que sejam compartilhados arquivos entre repositórios, mas como ele próprio é um repositório, então qualquer alteração feita nos arquivos contidos nele serão mostradas para os repositórios como sendo pulls, ou seja, é  um jeito de atualizar dependencias mutuas de forma simples e rápida entre vários projetos.

1. Criar um repositório normal
2. Adicionar os arquivos que serão compartilhados entre os projetos
3. Rodar git submodule add `<addr do repositório>` dentro do seu repositório principal
4. Diretório com o nome do submodule será criado

Se você já tem um repositório com submódulos mas ainda é novo (deu clone agora) os diretórios dos submódulos estarão vazios, então é preciso rodar `git submodule init` e `git submodule update` para inicializar os arquivos e atualizar para o ultimo commit do módulo.

* `git submodule update`: atualiza o commit do submodulo local para o ultimo commit do submodulo remoto
* `git submodule init`: inicia um submodulo existente
* `git submodule add <addr>`: adiciona um submódulo ao repositório atual

# Tratando commits orfãos
Commits orfãos são commits que não estão em nenhum branch, como submódulos não estão nunca em nenhum branch, então sempre que você for alterar um arquivo dentro do diretório do submódulo você vai precisar dar checkout no branch que quer trabalhar antes de dar push. Se você der um commit sef estar em nenhum branch, então você vai ter um commit orfão.

Para sanar esta questão você deve dar checkout no branch que quer trabalhar e rodar um "git status", ele vai dizer que existe um commit orfão então rodar um "git merge <sha>" para mesclar o commit neste branch.

> ***SEMPRE QUE VOCÊ FIZER UMA ALTERAÇÃO NO SUBMÓDULO É NECESSÁRIO FAZER UM PUSH NA PASTA DO SUBMÓDULO E TAMBÉM NO DIRETÓRIO PAI***

Tem alguns comandos que ajudam.
* `git push --recurse-submodule=check`: verifica se existe alguma atualização nos submódulos antes de dar push no pai.
* `git push --recurse-submodule=on-demand`: faz o push tanto do pai quanto do submódulo ao mesmo tempo sempre que houver alteração


# Reflogs
Log local que mantém todos os dados de todos os commits e todas as ações realizadas no git

* `git reflog`: Mostra todos os reflogs
* `git log --walk-reflogs`: Mostra o log de todos os reflogs

Você pode usar um `git reset --hard <sha>|<headPOS>` para voltar para uma posição do log onde `<headPOS>` pode ser `HEAD@{0}` e etc.

# SITES DE AJUDA GIT
* http://git-scm.com
* http://gitimmersion.com
* http://gitready.com
* http://ndpsoftware.com/git-cheatsheet.html
* http://nvie.com/posts/a-successful-git-branching-model/ <- Sobre Git Flow e ideias de branching
* http://scottchacon.com/2011/08/31/github-flow.html
