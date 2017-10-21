# Performance de web apps

Técnicas de minificação e performance para aplicações web:

## Na hora da build

- Ahead of time compilation: Compilação rápida disponível no angular
- Sempre fazer o minify e uglify dos scripts: Pode reduzir cerca de 70% do tamanho dos arquivos
- Usar ES6 Modules: Os módulos do ES6 fazem uma análise estática antes da compilação pelo V8 ou qualquer outro compilador do browser então ele pode
  carregar somente partes de um arquivo ao invés de um arquivo todo (com o `<script type='module'>` podemos passar diretamente o arquivo que
  desenvolvemos antes de fazer o transpile, caso o browser não suporte o tipo, podemos usar `<script nomodule>`

## Na hora de servir

- Compressão gz
- Compressão de imagens
- Lazy Loading
- Pre-fetching: Carregar imagens e scripts em background
- Server Side Rendering: O primeiro carregamento vai ao lado do servidor e os demais para o front-end

## Infra

- Usar HTTP/2: Multiplexação e compressão de headers vale muito mais a pena, nestes casos compilar e minificar os arquivos em diversos arquivos
  menores vale mais a pena do que fazer um único bundle
- Utilizar Web Workers: Os WebWorkers são poderes especiais do browser para não travar as threads principais do JS. Um web worker pode existir durante
  somente quando a página está aberta (e podem haver vários), foram feitos também para poder aliviar a carga dos arquivos de script sobre a thread
  principal.
- Utilizar Service Workers: Um service worker pode existir dentro ou fora de  um site, rodando em background do browser. E só pode haver um deles, são
  ótimos para cache, mas também permitem interceptar qualquer requisição que sai desses workers.
- Coletar o máximo possível de dados sobre isso: Utilizar o Chrome devtools para poder obter o máximo possível de performance.
  - Outra ferramenta é o sourcemap explorer que pode te dar quais são os scripts que são mais pesados e suas dependencias.
  - Sonar: Ferramenta nova da Microsoft que faz um lint da sua página da web
  - PWMetrics: Utiliza o google lighthouse e é feito para poder ser executado em linhas de comando
  - Google Lighthouse: Testes para tempos de PWAs e SPAs
