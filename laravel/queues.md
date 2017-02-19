# Laravel

## Queues

Queues são (em tradução) filas de execução. Estas filas de execução são utilizadas pelo framework para criar chamadas assíncronas de comandos, que não param a execução do programa e executam em background na aplicação.

## Criando Queues

Primeiramente, temos que criar um novo comando, este comando será o responsável por executar a ação da fila.

Para isto vamos utilizar o artisan com a linha `php artisan make:job <name>`

> Note que o comando pode mudar dependendo da versão do Laravel. Na versão 5.4 o comando é `php artisan make:job <name>` em outras versões o comando poderá ser diferente, veja [aqui a lista de comandos](https://laravel.com/docs/5.0/queues)

O que isto significa é que estaremos criando um comando, ou um job, que será enfileirado.

### Estrutura de um job

O job é estruturado com um método publico de `__construct` e outro chamado `handle`.

O método handle é o que vai executar a ação quando for processado.

```php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ImportProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        file_put_contents(storage_path().'/x.txt', "gravou ".date('d-m-Y H:i:s'));
    }
}
```

O arquivo anterior vai criar um arquivo chamado `x.txt` no diretório `/storage` quando for chamado.

### Configurando a conexão da fila

A Queue é, em essencia, uma tabela em um banco de dados. Sua configuração fica em `config/queue` e lá é possível definir como será a conexão.

Maiores detalhes em todas as conexões estão [aqui](https://laravel.com/docs/5.4/queues#driver-prerequisites), mas para criar uma função de fila utilizando o banco de dados atual, coloque sua configuração no driver desta forma:

```php
'default' => env('QUEUE_DRIVER', 'database'),
```

Ou então no arquivo `.env` na constante `QUEUE_DRIVER`.

Após isto, rode o comando `php artisan queue:table` para gerar uma *migration* que irá criar a tabela de fila, e então `php artisan migrate` para executa-la no banco de dados.

## Executando uma fila

Após ter criado o arquivo, podemos executar o nosso job na fila.

Para que um job seja executado, podemos simplesmente dar um dispatch em nosso controller.

### Adicionando o namespace

Temos que adicionar o namespace da nossa classe queue para poder executa-la com sucesso.

Imagine que temos um job chamado _ImportProductsJob_ na nossa pasta _Jobs_, este arquivo não é visível pelo Laravel se você chama-lo sem antes utilizar seu namespace. Então no topo do arquivo vamos colocar a seguinte linha:

```php
use App\Jobs\ImportProductsJob;
```

Agora podemos usar o Dispatch

### Delegando o método

Para de fato executar a queue, vamos utilizar nosso controller e chamar o método `dispatch` desta forma:

```php
 public function <nome da função>(Request $request)
    {
        //lógica
        
        $this->dispatch((new ImportProductsJob())->onConnection('database')); //Chamada da fila

    }
 ```
 
 Veja que usamos apenas o método dispatch para isto, e nele passamos a instancia da classe que queremos executar.
 
 ## Criando um listener
 
 Para podermos criar um listener, ou um worker, vamos utilizar o comando `php artisan queue:work <conexão>`. Isto irá executar um worker em nosso CLI.
 
Se quisermos executar em modo Daemon basta adicionarmos o `--daemon` no final.

### O Processo Listen

Existe um processo mais interativo chamado `php artisan queue:listen <conexão>`.

O problema do Listen é que ele exige muita memória e muito processamento, então não é uma boa prática utiliza-lo.

 