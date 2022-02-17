//váriaveis usadas no código
var baralho = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
var playerHand;
var tableHand;
var cartaAleatoria;
var valor;

//Cria o sorteio da carta
function createDraw(baralho) {
    var cartaAleatoria = Math.floor(baralho.length * Math.random());
    return baralho[cartaAleatoria];
}

//Faz a soma das cartas que o usuário possui 
function getHandValue(hand) {
    var sum = 0;
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
}