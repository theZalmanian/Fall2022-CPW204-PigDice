var Player = (function () {
    function Player(playerName) {
        this.playerName = playerName;
        this.totalScore = 0;
    }
    return Player;
}());
var PigDiceGame = (function () {
    function PigDiceGame(currPlayersTurn) {
        this.currPlayer = currPlayersTurn;
        this.currTurnTotal = 0;
        this.isGameOver = false;
    }
    return PigDiceGame;
}());
var player1 = new Player("player1");
var currGame = new PigDiceGame(player1);
window.onload = function () {
    setupButton("roll-die", rollD6);
    setupButton("pass-turn", passTurn);
};
function passTurn() {
    var turnTotal = currGame.currTurnTotal;
    currGame.currPlayer.totalScore += turnTotal;
    var currPlayerName = currGame.currPlayer.playerName;
    var currPlayerTextBox = getInputByID(currPlayerName + "-total");
    currPlayerTextBox.value = currGame.currPlayer.totalScore.toString();
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
        currGame.currTurnTotal += rollValue;
    }
    getInputByID("current-roll").value = rollValue.toString();
    getInputByID("current-total").value = currGame.currTurnTotal.toString();
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
}
function resetTurnTotals() {
    currGame.currTurnTotal = 0;
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
