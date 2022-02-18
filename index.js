//váriaveis usadas no código
const naipes = ['Ouros', 'Paus', 'Espadas', 'Copas'];
const cartas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
var cartasEspeciais = {
    A: 11,
    J: 10,
    Q: 10,
    K: 10
};
var baralho = [];
var tableHand = [];
var cartaAleatoria;
var valor;
var valorCarta;

function criarBaralho() {
    baralho = new Array();
    naipes.forEach(naipe => {
        cartas.forEach(carta => {
            baralho.push({ valor: carta, naipe });
        })
    })
}
criarBaralho();


//Cria o sorteio da carta
function createDraw(baralho) {
    var cartaAleatoria = Math.floor(baralho.length * Math.random());
    let valorCarta = baralho[cartaAleatoria].valor == "J" || baralho[cartaAleatoria].valor == "Q" || baralho[cartaAleatoria].valor == "K" ? 10 : baralho[cartaAleatoria].valor == "A" ? 11 : baralho[cartaAleatoria].valor;
    return valorCarta;

}

//Faz a soma das cartas que o usuário possui 
function getHandValue(hand) {
    /*
    hand = [
        2 (posicao 0),
        5 (posicao 1),
        7 (posicao 2)
    ]
    */
    var sum = 0;
    /*
    primera vez que chega aqui:
    sum = 0
    i = 0
    #INICIO DO LAÇO / LOOP
    verificar a condicao => i (0) < hand.length (3) = true
    se true, ele faz o que ta dentro
    sum = sum + hand[i] (hand na posicao i (0), logo, hand[i] = 2)
    logo, sum = 0 + 2 = 2
    por fim, ele faz o i++ = i + 1, logo i = 1
    #FIM DO LOOP

    segunda vez do loop:
    i < hand.length => 1 < 3 = true
    se true, faz ...
    sum = sum + hand[i]
    logo, sum = 2 + 5 (hand[i], i = 1, logo hand[1] = 5)
    sum = 7
    por fim, ele faz o i++, agora o i = 2

    terceira vez:
    i < hand.length => 2 < 3 = true
    se true ...
    sum = sum + hand[i]
    sum = 7 + 7 (hand[i], i = 2, logo, hand[2] = 7)
    sum = 14
    por fim, ele faz o i++, agora o i = 3

    quarta vez:
    i < hand.length => 3 < 3 = false
    logo, ele sai do for
    */
    for (var i = 0; i < hand.length; i++) {
        sum += hand[i];
    }
    return sum;
}

//Critério 1 - Começar jogo com uma carta
function startGame() {

    playerHand = [createDraw(baralho)];
    tableHand = [createDraw(baralho)];

    document.getElementById("player_hand").innerHTML = playerHand;
    document.getElementById("player_hand_value").innerHTML = getHandValue(playerHand);
    document.getElementById("table_hand").innerHTML = tableHand;
    document.getElementById("table_hand_value").innerHTML = getHandValue(tableHand);

}

//envia mais uma carta aleatória para o usuário
function hitCard() {

    if (!playerHand.length /* playerHand.length == 0*/ && !tableHand.length) {
        return Swal.fire({
            icon: 'warning',
            title: 'COMEÇA O JOGOOOOO'
        })
    }
    playerHand.push(createDraw(baralho));

    document.getElementById("player_hand").innerHTML = playerHand;
    document.getElementById("player_hand_value").innerHTML = getHandValue(playerHand)

    document.getElementById("table_hand").innerHTML = tableHand;
    document.getElementById("table_hand_value").innerHTML = getHandValue(tableHand);

    if (getHandValue(playerHand) > 21) {
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'You Lose :(((',
                text: 'You scored ' + getHandValue(playerHand) + ' and ' + 'Table scored ' + getHandValue(tableHand),
            })
            return resetGame();
        }, 800);
    } else if (getHandValue(playerHand) == 21) {
        setTimeout(() => {

            Swal.fire({
                icon: 'success',
                title: 'You Winnnnnn!!!!!!',
                text: 'You scored ' + getHandValue(playerHand) + ' and ' + 'Table scored ' + getHandValue(tableHand),
            })
            return resetGame();
        }, 800);
    }
}

//valida qual o valor maior entre as mãos, define o ganhador e a regra para a mesa receber cartas
function stand() {

    if (!playerHand.length /* playerHand.length == 0*/ && !tableHand.length) {
        return Swal.fire({
            icon: 'warning',
            title: 'COMEÇA O JOGOOOOO'
        })
    }

    var verificaValor = Math.max([getHandValue(playerHand)], getHandValue(tableHand));

    if (getHandValue(tableHand) <= getHandValue(playerHand) && getHandValue(tableHand) < 21) {
        tableHand.push(createDraw(baralho));
        return stand();
    }

    else if (getHandValue(playerHand) > getHandValue(tableHand) && getHandValue(playerHand) <= 21) {
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'You Winnnnnn!!!!!!',
                text: 'You scored ' + getHandValue(playerHand) + ' and ' + 'Table scored ' + getHandValue(tableHand),
            })
            return resetGame();
        }, 800);
    }
    else if (getHandValue(tableHand) > getHandValue(playerHand) && getHandValue(tableHand) <= 21) {
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'You Lose :(((',
                text: 'You scored ' + getHandValue(playerHand) + ' and ' + 'Table scored ' + getHandValue(tableHand),
            })
            return resetGame();
        }, 800);
    }
    else if (getHandValue(tableHand) > 21) {
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'You Winnnnnn!!!!!!',
                text: 'You scored ' + getHandValue(playerHand) + ' and ' + 'Table scored ' + getHandValue(tableHand),
            })
            return resetGame();
        }, 800);
    }
    else if (getHandValue(table == getHandValue(playerHand))) {
        setTimeout(() => {
            Swal.fire({
                icon: 'alert',
                title: 'The table tied with you',
                text: 'You scored ' + getHandValue(playerHand) + ' and ' + 'Table scored ' + getHandValue(tableHand),
            })
            return resetGame();
        }, 800);
    }
    document.getElementById("table_hand").innerHTML = tableHand;
    document.getElementById("table_hand_value").innerHTML = getHandValue(tableHand);
    return verificaValor;
}

// Reseta o game para o estado inicial 

function resetGame() {
    playerHand = [];
    tableHand = [];

    document.getElementById("player_hand").innerHTML = playerHand;
    document.getElementById("player_hand_value").innerHTML = playerHand;
    document.getElementById("table_hand").innerHTML = tableHand;
    document.getElementById("table_hand_value").innerHTML = tableHand;

    return resetGame();
}

/* function disableButton() {
    document.getElementById("btn-start").disabled = false;
    document.getElementById("btn-hit").disabled = true;
    document.getElementById("btn-stand").disabled = true;
    document.getElementById("btn-reset").disabled = true;
    return disableButton();
}
 */