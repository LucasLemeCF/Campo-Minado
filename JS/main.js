const alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const tamanho = 10;
const tamanhoTotal = tamanho * tamanho;
var numPosicao = [tamanhoTotal];
var campo = [tamanhoTotal];
var bombas = [tamanhoTotal];
var bandeiras = []
var numBombas = tamanho;

function criaTabuleiro() {
    const grama1 = ["grama1", "grama2"];
    const grama2 = ["grama2", "grama1"];
    var grama = grama1;

    //cria o campo
    var x = document.querySelector("#campo");
    for (let numero = 1; numero <= tamanho; numero++) {
        for (let letra = 0; letra < tamanho; letra++) {
            x.innerHTML += '<div class="q ' + grama[numero%2] + '" ' + 'id="' + alfabeto[letra] + numero +'" onclick="cavar(' + alfabeto[letra] + numero + ')"></div>';
            if (grama == grama1) {grama = grama2} else {grama = grama1};
            numPosicao[(numero-1)*10+letra] = alfabeto[letra] + numero;
            campo[(numero-1)*10+letra] = "";
        }
    } 
    
    //coloca as bombas
    for (let index = 0; bombas.length < tamanho; index++) {
        let numAleatorio = null;
        while(true) {
            numAleatorio = Math.floor(Math.random() * (Math.floor(tamanhoTotal) - Math.ceil(0))) + Math.ceil(0);
            if (bombas.includes(numAleatorio) == false) {
                break;
            }
        }   
        bombas[index] = numAleatorio;
        campo[numAleatorio] = "X";
    }

    //coloca numero de bombas ao redor
    for (let index = 0; index < tamanhoTotal; index++) {
        if (campo[index].includes("X") == false) {
                let n = 0;

                let letra = numPosicao[index].charAt(0);
                let numero = numPosicao[index].slice(1, 3);
                let letraAnterior = alfabeto[alfabeto.indexOf(letra)-1];
                let letraPosterior = alfabeto[alfabeto.indexOf(letra)+1];

                if(campo[numPosicao.indexOf(letraPosterior + (parseInt(numero)+1))] == "X") {n += 1;}
                if(campo[numPosicao.indexOf(letra + (parseInt(numero)+1))] == "X") {n += 1;}
                if(campo[numPosicao.indexOf(letraAnterior + (parseInt(numero)+1))] == "X") {n += 1;}

                if(index >= 1 && campo[index - 1].charAt(0) == "X") {n += 1;}
                if(index < tamanhoTotal-1 && campo[index + 1].charAt(0) == "X") {n += 1;}

                if(campo[numPosicao.indexOf(letraPosterior + (parseInt(numero)-1))] == "X") {n += 1;}
                if(campo[numPosicao.indexOf(letra + (parseInt(numero)-1))] == "X") {n += 1;}
                if(campo[numPosicao.indexOf(letraAnterior + (parseInt(numero)-1))] == "X") {n += 1;}
            
                campo[index] = n.toString();
        }
    }

    //mostra as bombas
    for (let index = 0; index < campo.length; index++) {
        console.log(index + " = " + campo[index]);
    }

    document.querySelector("#numBombas").innerHTML = numBombas;
}

function cavar(posicao) {
    //console.log(posicao.id);

    //muda a cor
    if (posicao.classList.contains("grama1")) {
        posicao.classList.remove("grama1");
        posicao.classList.add("terra1");
    } else {
        posicao.classList.remove("grama2");
        posicao.classList.add("terra2");
    }

    let numeroCampo =  campo[numPosicao.indexOf(posicao.id)].includes("X")
    if (numeroCampo == true && bandeiras.includes(posicao.id) == false) {
        console.log("Tem uma bomba");
        posicao.classList.add("vermelho");
        numBombas -= 1
        bandeiras.push(posicao.id);
        document.querySelector("#numBombas").innerHTML = numBombas;
    }

    posicao.innerHTML = "<h1>" + campo[numPosicao.indexOf(posicao.id)] + "</h1>";
    console.log(campo[numPosicao.indexOf(posicao.id)])
}