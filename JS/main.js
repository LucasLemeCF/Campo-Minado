const alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const tamanho = 10;
const tamanhoTotal = tamanho * tamanho;
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
            campo[(numero-1)*10+letra] = alfabeto[letra] + numero;
        }
    } 
    
    //coloca as bombas
    for (let index = 0; bombas.length < tamanho; index++) {
        let numAleatorio = Math.floor(Math.random() * (Math.floor(tamanhoTotal) - Math.ceil(0))) + Math.ceil(0);
        if (bombas.includes(numAleatorio) == false) {
            bombas[index] = numAleatorio;
            campo[numAleatorio] += " - X";
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

    let numeroCampo = campo.indexOf(posicao.id + " - X");
    if (numeroCampo != -1 && bandeiras.includes(posicao.id) == false) {
        console.log("Tempo uma bomba");
        posicao.classList.add("vermelho");
        numBombas -= 1
        bandeiras.push(posicao.id);
        document.querySelector("#numBombas").innerHTML = numBombas;
    }
   
}