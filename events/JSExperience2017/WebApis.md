# Web Apis

## Page Visibility

Prove uma api que checa se a aba atual está visível ou não no navegador.

```js
window.addEventListener('visibilitychange', () => {
    if(document.hidden) {
        console.log('Escondido')
    }
})
```

A nova spec checa, ao invés de `document.hidden`, o `document.visibilityChange`. Que possui tres
valores: `prerender`, `visible`, `render`.

Ja dá para usar normalmente.

## Web Share

Permite que um site compartilhe algo para um determinado destino:

O Web Share não está bom para ser usado em todo o lugar. Está _under development_

## Online State

Verifica se o usuário está online ou offline: `navigator.online ? 'User online' : 'User offline'`.

Browser support é muito bom. Possível de ser utilizado.

O segundo modelo da API vai permitir verificar o tipo da conexão que o usuário está (wifi, 4g,
bluetooth) e também a velocidade de download do usuário.

## Devide orientation

Expõe a orientação do dispositivo móvel

```js
window.addEventListener('deviceorientation', (e) => {
    console.log(`Alfa: ${e.alpha}, Beta: ${e.beta}, Gama: ${e.gama}`)
}
```

O support é usável hoje, e este tipo de web api pode ser usado para mover imagens e parallax de
acordo com a posição do celular, também é possível utilizar para imagens 360.

## Vibration

Dá acesso ao hardware de vibração de dispositivos móveis.

```js
navigator.vibrate(1000)

// Podemos também utilizar para criar padrões de vibração com pausas e vibrações intercaladas
navigator.vibrate([vibrate, wait, vibrate, wait, vibrate])
```

Não funciona no IE e no safari

## Clipboard

Possibilita a interação do usuário com o clipboard através de operações de cut, copy e replace. Isso
cria um problema de segurança grande para o usuário.

```js
let button = document.querySelector('button')

document.select()
document.execCommand('copy')
```

Por isso termos que fazer dois passos, primeiro precisamos ouvir um evento __real__ de click e
depois selecionar todos os textos para depois poder copiar através do `execCommand`

Funciona em todos os browsers.

## Ambient Light

Provê acesso para o sensor de luz do dispositivo.

```js
window.addEventListener('ambientlight', (e) => {
    console.log(`${e.value} lux`)
})
```
O suporte ainda não é muito bom por causa que não teve um acordo de como essa spec deveria ser
montada. No futuro deverá ser implementado como a instanciação de um sensor e o inicio da leitura ao
invés de obter diretamente do evento.

Atualmente só funciona no firefox.

## Battery Status

Permite que uma página da web acesse o status e as informações de bateria do dispositivo.

```js
navigator.getBattery().then((battery) => {
    console.log(`${battery.level * 100}%`)
})
```

Não funciona no Safari e no IE.

## Web VR

API experimental que permite exibições de realidade virtual.

Não funciona no IE e no Safari.

## Shape Detection

Capta ou detecta o que está acontecendo na imagem ou na cena. Até mesmo detectar texto em uma
imagem.

```js
let faceDetector = new faceDetector() 

faceDetector.detect(image).then(faces => {
    console.log(faces)
})
```

Nenhum browser ainda suporta.

## Web Assembly

Permite rodar código de baixo nível nos browsers muito mais performáticamente.

Ainda em desenvolvimento.

## Game pad

Permite que páginas web se conectem com controles de video game via USB.

```js
window.addEventListener('gamepadconnected', () => {
    let gp = navigator.getGamepads()[0]

    console.log('ID:', gp.id)
    console.log('Axes:', gp.axes.length)
    console.log('Buttons:', gp.buttons.length)
})
```

Suportado em tudo menos no Safari. Nesta API temos que testar todos os botões para sabermos que tipo
de eventos estamos ouvindo.


