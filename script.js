let hitButtonSelector = document.getElementById('blackjack-hit-btn');
let standButtonSelector = document.getElementById('blackjack-stand-btn');
let dealButtonSelector = document.getElementById('blackjack-deal-btn');

let blackjackGame = {
    'you': {'div':'#your-box','scoreSpan':'#yourScore','score':0},
    'dealer':{'div':'#dealer-box','scoreSpan':'#dealerScore','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardMap':{'2': 2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10': 10, 'K':10, 'Q':10, 'J':10, 'A':[1,11]}
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a'); 
const winSound = new Audio('sounds/cash.mp3');
const lossSOund = new Audio('sounds/aww.mp3');

//Event Listners
hitButtonSelector.addEventListener('click',hitBlackjack);
dealButtonSelector.addEventListener('click',dealBlackjack);
standButtonSelector.addEventListener('click', standBlackjack);

function hitBlackjack(){
    let card = randomCard();
    showCard(YOU,card);
    updateScore(card, YOU);
    showScore(YOU);
}

function showCard(activePlayer,card){
    if(activePlayer['score'] <= 21){
        let imageCard = document.createElement('img');
        imageCard.src = `images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(imageCard);
        hitSound.play();
    }
}

function dealBlackjack(){
    
    let winner = computeWinner();
    displayResult(winner);

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
   
    for(let i = 0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    
    for(let i = 0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector(YOU['scoreSpan']).textContent = 0;
    document.querySelector(YOU['scoreSpan']).style.color = '#ffffff';

    document.querySelector(DEALER['scoreSpan']).textContent = 0;
    document.querySelector(DEALER['scoreSpan']).style.color = '#ffffff';
    
}

function randomCard(){
    let randomNumber = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomNumber];
}

function updateScore(card,activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackjackGame['cardMap'][card];
    } 
}


function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BURST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
    

function standBlackjack(){
    let card = randomCard();
    showCard(DEALER,card);
    updateScore(card, DEALER);
    showScore(DEALER);
}


function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            //draw
        }
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        //draw
    }

    return winner;
}

function displayResult(winner){
    let message, messageColor;
    if(winner === YOU){
        message = 'You won! Congrats!';
        messageColor = 'green';
        winSound.play();
    }else if (winner === DEALER){
        message = 'You lost! Sorry!'
        messageColor = 'red';
        lossSound.play();
    }else{    
        message = 'You drew!';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}