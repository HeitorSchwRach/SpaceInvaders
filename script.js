//arrumar polimorfismo
//fazer o boneco atirar
//arrumar os erros
//fazer os bonecos que forem atirados morrerem de dar um delay para nascer outros
//fazer dar GameOver caso o alien enconste no chão ou no player
//fazer a pontuação aumentar a cada alien morto
//organizar o codigo
//arrumar a classe jogo
const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');
let pontos = 0;
let teclaEsquerdaPressionada = false;
let teclaDireitaPressionada = false;
let teclaEspacoPressionada = false;


document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') teclaEspacoPressionada = true;
    if (e.code === 'KeyA') teclaEsquerdaPressionada = true;
    if (e.code === 'KeyD') teclaDireitaPressionada = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') teclaEspacoPressionada = false;
    if (e.code === 'KeyA') teclaEsquerdaPressionada = false;
    if (e.code === 'KeyD') teclaDireitaPressionada = false;
});


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
        super(x, y, largura, altura, cor);
        this.#velocidade_x = 5;
        this.atirando = false
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }

    moverEsquerda() {
        this.x -= this.#velocidade_x;
        if (this.x < 0) this.x = 0;
    }
    
    moverDireita() {
        this.x += this.#velocidade_x;
        if (this.x + this.largura > canvas.width) this.x = canvas.width - this.largura;
    }    
    atualizar() {
        if (!Jogo.gameOver) {
            if (teclaEsquerdaPressionada) this.moverEsquerda();
            if (teclaDireitaPressionada) this.moverDireita();
        }
    }
    verificarColisao(alien) {
        if (alien) {

            ctx.fillStyle = 'white';
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 300, 100);
            Jogo.gameOver = true;
        }
    }
    atirar() {
        if (this.atirando) {
        }
    }
}

class Aliens extends Entidade {
    #velocidade_y
    constructor(x, y, largura, altura, cor) {
        super(x, y, altura, largura, cor);
        this.#velocidade_y = 2
    }

    cair() {
        this.y -= this.#velocidade_y
    }

    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}
class Jogo {
    constructor() {
        this.player = new Player(375, 340, 50, 30, 'white');
        this.alien = [
            new Aliens(30, 10, 30, 50, "green"),

        ];
        this.loop = this.loop.bind(this);
        this.contadorFrames = 0;
    }

    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.player.desenhar();
        this.player.atualizar();

        this.alien.forEach(alien => {
            alien.cair(); 
            alien.desenhar();
            this.player.verificarColisao(alien);
        });
        

        

        this.contadorFrames++;
        if (this.contadorFrames) {

        }

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Pontos: ${pontos}`, 10, 30);

        if (!Jogo.gameOver) {
            requestAnimationFrame(this.loop);
        }
    }
}


const jogo = new Jogo();
const player = jogo.player;
jogo.loop()