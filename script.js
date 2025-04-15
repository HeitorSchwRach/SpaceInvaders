//criar a classe player
//criar aliens

//commitar as branches 

const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')
let pontos = 0
let teclaEsquerdaPressionada = false
let teclaDireitaPressionada = false

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyA') teclaEsquerdaPressionada = true
    if (e.code === 'KeyD') teclaDireitaPressionada = true
})

document.addEventListener('keyup', (e) => {
    if (e.code === 'KyeA') teclaEsquerdaPressionada = false
    if (e.code === 'KeyD') teclaDireitaPressionada = false
})


class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x,
            this.y = y,
            this.largura = largura,
            this.altura = altura,
            this.cor = cor
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Player extends Entidade {
    #velocidade_x
    constructor(x, y, largura, altura, cor) {
        super(x, y, altura, largura, cor);
        this.#velocidade_x = 5;
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    moverEsquerda() {
        this.x -= this.velocidadeX;
        if (this.x < 0) this.x = 0;
    }

    moverDireita() {
        this.x += this.#velocidade_x
        if (this.x = this.largura > canvas.width) this.x = canvas.width - this.largura;
    }
    atualizar() {
        if (!Jogo.gameOver) {
            if (teclaEsquerdaPressionada) this.moverEsquerda();
            if (teclaDireitaPressionada) this.moverDireita();
        }
    }
    verificarColisao(obstaculo) {
        if (alien.x < this.x + this.largura &&
            alien.x + alien.largura > this.x &&
            this.y < alien.y + alien.altura &&
            this.y + this.altura > alien.y) {
            alien.pararAlien();
            this.#velocidade_x = 0;
            ctx.fillStyle = 'black';
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 300, 100);
            Jogo.gameOver = true;
        }}
}

class Aliens extends Entidade {
    #velocidade_y
    constructor(x, y, largura, altura, cor) {
        super(x, y, altura, largura, cor);
        this.#velocidade_y = -2
    }

    cair() {
        this.y -= this.#velocidade_y
    }
    pararAlien() {
        this.velocidade_x = 0;
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Jogo{
    constructor(){
        this.player = new Player (375, 340, 30, 50, 'white');
        this.aline = [
            new Aliens (30, 10, 30 ,50, "green"),

        ];
        this.loop = this.loop.bind(this);
        this.contadorFrames = 0; 
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.desenhar()
    alien.desenhar()
    requestAnimationFrame(loop)
}
loop()