const alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function criaTabuleiro() {
    console.log("Teste");
    var x = document.querySelector("#campo");
    for (let letra = 0; letra < 10; letra++) {
        for (let numero = 1; numero <= 10; numero++) {
            x.innerHTML += '<div class="q" ' + 'id="' + alfabeto[letra] + numero +'"></div>';
        }
    }
    
}