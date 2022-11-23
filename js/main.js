var Player = (function () {
    function Player(playerName) {
        this.playerName = playerName;
    }
    return Player;
}());
var Game = (function () {
    function Game() {
    }
    return Game;
}());
var player1 = new Player("John");
player1.totalScore = 0;
var game = new Game;
game.currentTurnTotal = 0;
window.onload = function () {
    setupButton("roll-die", rollD6);
    setupButton("pass-turn", passTurn);
};
function passTurn() {
    var total = player1.totalScore + game.currentTurnTotal;
    getInputByID("player1-total").value = total.toString();
}
function rollD6() {
    var rollValue = generateNumberWithinRange(1, 6);
    getInputByID("current-roll").value = rollValue.toString();
    game.currentTurnTotal += rollValue;
    getInputByID("current-total").value = game.currentTurnTotal.toString();
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
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
