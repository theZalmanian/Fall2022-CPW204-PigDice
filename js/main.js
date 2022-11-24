var Player = (function () {
    function Player(playerName) {
        this.playerName = playerName;
        this.totalScore = 0;
    }
    return Player;
}());
var Game = (function () {
    function Game(currPlayer, nextPlayer) {
        this.currPlayer = currPlayer;
        this.nextPlayer = nextPlayer;
        this.currTurnTotal = 0;
        this.isGameOver = false;
    }
    return Game;
}());
var PigDice = (function () {
    function PigDice() {
    }
    return PigDice;
}());
var pigDice = new PigDice;
window.onload = function () {
    setupButton("start-game", startGame);
    setupButton("roll-die", rollDie);
    setupButton("pass-turn", passTurn);
};
function startGame() {
    var player1Name = getInputByID("player1-name").value;
    var player2Name = getInputByID("player2-name").value;
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    var currPigDiceGame = new Game(player1, player2);
    pigDice.currGame = currPigDiceGame;
}
function endGame() {
    getByID("roll-die").setAttribute("disabled", "disabled");
    getByID("pass-turn").setAttribute("disabled", "disabled");
    getByID("roll-die").classList.add("game-over");
    getByID("pass-turn").classList.add("game-over");
    getByID("test").innerText = pigDice.currGame.currPlayer.playerName + " has won the game!";
}
function passTurn() {
    displayD6Idle();
    var turnTotal = pigDice.currGame.currTurnTotal;
    pigDice.currGame.currPlayer.totalScore += turnTotal;
    var currPlayerName = pigDice.currGame.currPlayer.playerName;
    var currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");
    currPlayerTextBox.value = pigDice.currGame.currPlayer.totalScore.toString();
    if (pigDice.currGame.currPlayer.totalScore >= 10) {
        endGame();
    }
    else {
        resetTurnTotals();
        switchPlayer();
    }
}
function switchPlayer() {
    var currPlayer = pigDice.currGame.currPlayer;
    var nextPlayer = pigDice.currGame.nextPlayer;
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;
}
function rollDie() {
    displayD6Roll();
    setTimeout(rollD6, 1000);
}
function rollD6() {
    var rollValue = generateNumberWithinRange(1, 6);
    if (rollValue == 1) {
        switchPlayer();
        resetTurnTotals();
    }
    else {
        pigDice.currGame.currTurnTotal += rollValue;
    }
    displayD6(rollValue);
    getInputByID("current-total").value = pigDice.currGame.currTurnTotal.toString();
}
function displayD6(rollValue) {
    if (rollValue == 6) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-6.svg";
    }
    else if (rollValue == 5) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-5.svg";
    }
    else if (rollValue == 4) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-4.svg";
    }
    else if (rollValue == 3) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-3.svg";
    }
    else if (rollValue == 2) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-2.svg";
    }
    else if (rollValue == 1) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-1.svg";
    }
}
function displayD6Roll() {
    getImageByID("roll-display").src = "images/dice-icons/d6-roll.svg";
}
function displayD6Idle() {
    getImageByID("roll-display").src = "images/dice-icons/d6-idle.svg";
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
}
function resetTurnTotals() {
    pigDice.currGame.currTurnTotal = 0;
    getInputByID("current-total").value = "0";
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
function getImageByID(id) {
    return getByID(id);
}
function getInputByID(id) {
    return getByID(id);
}
function getByID(id) {
    return document.getElementById(id);
}
