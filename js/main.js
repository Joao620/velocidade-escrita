class palavrasVoadoras{
    constructor(x, y, canvas, texto, corTexto, corBG, tamFonte){
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.texto = texto;
        this.corTexo = corTexto;
        this.corBG = corBG;
        this.tamFonte = tamFonte;
    }

    desenhar(){
        this.canvas.fillStyle = this.corTexo;
        this.canvas.fillText(this.texto, this.x, this.y);        
    }

    apagar(){
        let top = this.y - this.tamFonte;
        let width = this.texto.length * (this.tamFonte / 2);
        this.canvas.fillStyle = this.corBG;
        this.canvas.fillRect(this.x, top, width, this.tamFonte);
    }

    mover(quantMov){
        this.apagar();
        this.x = this.x - quantMov;
        this.desenhar();
    }
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

palavrasNaTela = [];
const canvasDOM = document.getElementById("mainJogo");
const canvas = canvasDOM.getContext("2d");
const canvasLargura = canvasDOM.width;
const canvasAltura = canvasDOM.height;
const corBG = "white";
const corTexto = "black";
const tamanhoFonte = 30;
const fonte = "Arial"
canvas.font = tamanhoFonte + "px " + fonte;

//window.onload = init;

function init(){

    //inicia o game loop
    window.requestAnimationFrame(gameLoop);
}

let secondsPassed;
let oldTimeStamp;
let framesPassados = 0;
let velPalavras = 50;
let spawnPalavras = 100;

function gameLoop(timeStamp){
    framesPassados += 1;

    if (framesPassados % spawnPalavras == 0) {

        let x = (Math.random() * canvasLargura) + tamanhoFonte;
        //let y = (Math.random() * canvasAltura) + ;
        let temp = new palavrasVoadoras(400, 100, canvas, "teste", corTexto, corBG, 30);
        palavrasNaTela.push(temp);
    }
    
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    palavrasNaTela.forEach(elemento => {
        let movimento = velPalavras * secondsPassed;
        if (isNaN(movimento)){
            return;
        }
        elemento.mover(movimento);
    });
    
    //espera o proximo gameloop
    window.requestAnimationFrame(gameLoop);
}