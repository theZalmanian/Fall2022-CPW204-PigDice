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
    setupButton("roll-die", rollD6);
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
function passTurn() {
    var turnTotal = pigDice.currGame.currTurnTotal;
    pigDice.currGame.currPlayer.totalScore += turnTotal;
    var currPlayerName = pigDice.currGame.currPlayer.playerName;
    var currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");
    currPlayerTextBox.value = pigDice.currGame.currPlayer.totalScore.toString();
    resetTurnTotals();
    switchPlayer();
}
function switchPlayer() {
    var currPlayer = pigDice.currGame.currPlayer;
    var nextPlayer = pigDice.currGame.nextPlayer;
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;
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
    getInputByID("current-roll").value = rollValue.toString();
    getInputByID("current-total").value = pigDice.currGame.currTurnTotal.toString();
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
}
function resetTurnTotals() {
    pigDice.currGame.currTurnTotal = 0;
    getInputByID("current-roll").value = "0";
    getInputByID("current-total").value = "0";
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
function getInputByID(id) {
    return getByID(id);
}
function getByID(id) {
    return document.getElementById(id);
}
