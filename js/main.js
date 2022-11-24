var Player = (function () {
    function Player(playerName) {
        this.playerName = playerName;
        this.totalScore = 0;
    }
    return Player;
}());
var PigDiceGame = (function () {
    function PigDiceGame(currPlayer, nextPlayer) {
        this.currPlayer = currPlayer;
        this.nextPlayer = nextPlayer;
        this.currTurnTotal = 0;
        this.isGameOver = false;
    }
    return PigDiceGame;
}());
var CurrentGame = (function () {
    function CurrentGame() {
    }
    return CurrentGame;
}());
var game = new CurrentGame;
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
    var currPigDiceGame = new PigDiceGame(player1, player2);
    game.currGame = currPigDiceGame;
}
function passTurn() {
    var turnTotal = game.currGame.currTurnTotal;
    game.currGame.currPlayer.totalScore += turnTotal;
    var currPlayerName = game.currGame.currPlayer.playerName;
    var currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");
    currPlayerTextBox.value = game.currGame.currPlayer.totalScore.toString();
    resetTurnTotals();
}
function changePlayers() {
}
function rollD6() {
    var rollValue = generateNumberWithinRange(1, 6);
    if (rollValue == 1) {
        resetTurnTotals();
    }
    else {
        game.currGame.currTurnTotal += rollValue;
    }
    getInputByID("current-roll").value = rollValue.toString();
    getInputByID("current-total").value = game.currGame.currTurnTotal.toString();
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
}
function resetTurnTotals() {
    game.currGame.currTurnTotal = 0;
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
