# Conteúdo relevante

[https://www.youtube.com/watch?v=mX0YCODcBZo](https://www.youtube.com/watch?v=mX0YCODcBZo)

- [41:32](https://youtu.be/mX0YCODcBZo?t=2492): Diagrama de funcionamento do download das imagens dentro do client do containerd

O serviço do client é dividido em 4:

- Content Service: usado para baixar dados crus, como manifestos e layers básicos
- Diff Service: Ler dados do content service e montar os layers, se comunica com o snapshotter
- Image Service: Usado para criar os metadados da imagem

![image](https://user-images.githubusercontent.com/3200560/119715225-23076580-be3a-11eb-9ed9-698438783874.png)

O fluxo segue a ideia seguinte:

1. Primeiramente o cliente busca o do registro os manifestos, isso segue mais ou menos a ideia deste fluxo principal

![image](https://user-images.githubusercontent.com/3200560/119715263-2d296400-be3a-11eb-85a6-1b71f382c245.png)

2. Uma vez com os manifestos, teremos o download do conteúdo da imagem, que será feito pelo content service depois que ele armazena o manifesto

3. Para cada layer, o content service vai baixar o blob correspondente

4. O client então, para cada layer, prepara um snapshot daquele layer, chamando o snapshotter service para criar um snapshot

5. O client então chama o diff service para aplicar o diff dos layers

Aplicar um diff significa basicamente ler o layer e extrair os conteúdos dele em algum lugar

6. O diff service retorna o descritor do layer para o client que commita esse snapshot

7. Quando todos os layers forem finalizados o client cria os metadados da imagem usando os descritores

É nestes passos que temos o modelo de `leases`, uma `lease` é um tipo de trava para os arquivos de layers, então enquanto estamos lendo um arquivo ou descompactando, temos que criar uma liberação de acesso.

Outra parte importante do processo é que os `snapshots` são partes que podem ser utilizadas como caching, então se um layer está para ser baixado, podemos verificar se o snapshot não existe primeiro, antes de baixar.

- [https://www.youtube.com/watch?v=4f_2u6rIDTk](https://www.youtube.com/watch?v=4f_2u6rIDTk)

- [https://www.youtube.com/watch?v=3AynH3c0F8M](https://www.youtube.com/watch?v=3AynH3c0F8M)

# Principais tópicos

- containerd foi criado para separar layers do Docker em mais camadas
    - É uma interface com o runC
- **Container runtimes:** são ferramentas como Docker, CRI-O, RKT, containerd
- **Container Runtime ENGINES:** São ferramentas que os runtimes se conectam, como o runC e o kata

## Deep Dive

> Material Relacionado: https://www.youtube.com/watch?v=3AynH3c0F8M

O containerd tem uma arquitetura dividida em vários serviços:

![](containerd-arch.png)

- **Storage**: O serviço de storage é o responsável por armazenar o conteúdo e snapshots das imagens.
- **Metadata**: Armazena os metadados e ponteiros de imagens e containers que vão apontar para o serviço de storage para buscar seu conteúdo.
- **Tasks**: A Task é o que executa o container de fato.

Quando damos um pull em uma imagem, seguimos um fluxo parecido com este:

![](containerd-pull.png)

A ideia é que vamos puxar o conteúdo do repositório remoto através do fluxo que já fizemos lá no início do arquivo, e vamos armazená-lo no serviço de content (storage), as imagens então vão referênciar os layers desse content através de seus hashes.

Depois vamos descompactar estes layers em snapshots e montá-los em algum lugar do disco.

### Snapshots

Snapshots são instruções de como construir um root filesystem no container. Nós podemos ver como eles funcionam através de função `ctr c info <nome do container> | jq -r .Spec.value | base64 -d | jq .` para mostrar o arquivo de configuração do container.

Snapshots são transações de diffs, podemos commitar uma transação de um layer e assim sucessivamente. Listamos o snapshots com `ctr snapshot ls`.

### Metadata

> Conteúdo relacionado: https://www.youtube.com/watch?v=4f_2u6rIDTk

Os metadados de imagem são apenas ponteiros para contents, os contents em si são manifestos que apontam para imagens e layers.

![](containerd-metadata.png)

Quando você remove uma imagem, temos que coletar o lixo porque o metadado só vai apagar a referencia:

![](containerd-metadata-collection.png)

O containerd possui um garbage collector que vai apagar referências não utilizadas automaticamente. Então basta deletar a imagem ou o metadado correspondente que todos os layers serão removidos.

### Executando um container

Quando executamos um container no containerd, o que estamos fazendo é montando o sistema de arquivos pelo client. Então o serviço de tasks do containerd entra em ação buscando esses mounts e buscando as configurações do container dos metadados do container, isso é passado para o runtime que inicia o container de acordo com o SO:

![](containerd-tasks.png)

Para iniciar um container, vamos sempre iniciar pelo comando `run`, que irá inicializar a imagem e o snapshot. O snapshot por sua vez vai criar um setup dos containers e iniciar a task que vai executar o container para o runtime.

![](containerd-start.png)
