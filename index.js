


let cards = []
const array = []
let playerSum = 0
let dealerCardsShown = []
let dealerCardHidden = 0
let dealerSum = 0

let game = {
    stand: false,
    active: false,
    bet: 0
}

let message = ""
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let player = {
    name: "Sarah",
    chips: 100
}

let playerEl = document.getElementById("player-el")
let chipsEl = document.getElementById("chips-el")
let betEl = document.getElementById("bet-el")
let dealerCardsEl = document.getElementById("dealercards-el")

function getRandomInt() {
    let randomInt = Math.floor(Math.random() * 13) + 1
    if (randomInt === 11) {
        return 1
    } else if (randomInt > 11) {
        return 10
    } else { return randomInt }
}

function sumCards(array) {
    const total = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total;
    console.log(total)
}

function startGame() {

    if (game.active === true) {
        message = "Click HIT to draw a new card."
        messageEl.textContent = message
    } else {
        game.active = true
        game.bet = 10
        betEl.textContent = "Bet: " + game.bet
        player.chips -= game.bet
        playerEl.textContent = "Player: " + player.name
        chipsEl.textContent = "Chips: " + player.chips
        dealerRevealed = false
        dealerCardsShown = []
        dealerCardsShown.push(getRandomInt())
        dealerCardHidden = getRandomInt()
        dealerCardsEl.textContent = "Dealer Cards: " + dealerCardsShown + ", ?" //+ dealerCardsShown + ", ?"
        game.stand = false
        let firstCard = getRandomInt()
        let secondCard = getRandomInt()
        cards = [firstCard, secondCard]
        playerSum = sumCards(cards)
        cardsEl.textContent = "Cards: " + cards + " (" + playerSum + ")"
        checkSum()
    }
}

function checkSum() {
    if (game.stand === true) {
        endGame()
    } else if (playerSum < 21) {
        message = "Do you want to draw a new card?"
        messageEl.textContent = message
    } else if (playerSum > 21) {
        game.active = false
        message = "You're out of the game!"
        messageEl.textContent = message
    } else {
        dealerReveal()
        endGame()
    }
}

function endGame() {
    game.active = false
    if (playerSum < dealerSum && dealerSum <= 21) {
        message = "Lose! Click Start Game to play again."
    } else if (playerSum < 21 && playerSum > dealerSum || playerSum < 21 && dealerSum > 21) {
        message = "Win! Click Start Game to play again."
        player.chips += game.bet * 2
    } else if (playerSum <= 21 && dealerSum === playerSum) {
        message = "Draw! Click Start Game to play again."
        player.chips += game.bet
    } else if (playerSum === 21 && dealerSum != 21) {
        message = "BlackJack! Click Start Game to play again."
        player.chips += game.bet * 3
    }
    chipsEl.textContent = "Chips: " + player.chips
    messageEl.textContent = message
}

function hit() {
    if (game.active === false) {
        message = "Click Start Game to Continue"
        messageEl.textContent = message
    } else {
        cards.push(getRandomInt())
        playerSum = sumCards(cards)
        cardsEl.textContent = "Cards: " + cards + " (" + playerSum + ")"
        checkSum()
    }
}

function dealerReveal() {
    dealerRevealed = true
    dealerCardsShown.push(dealerCardHidden)
    for (dealerSum = sumCards(dealerCardsShown); dealerSum <= 16;) {
        dealerDraw()
    }
    dealerCardsEl.textContent = "Dealer Cards: " + dealerCardsShown + " (" + dealerSum + ")"
}

function dealerDraw() {
    dealerCardsShown.push(getRandomInt())
    dealerSum = sumCards(dealerCardsShown)
}

function stand() {
    if (game.active === false) {
        message = "Click Start Game to Continue"
        messageEl.textContent = message
    } else {
        game.stand = true
        dealerReveal()
        checkSum()
    }
}