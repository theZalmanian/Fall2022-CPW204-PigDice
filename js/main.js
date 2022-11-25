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
window.onload = function () {
    setupButton("start-game", startGame);
};
var pigDice = new PigDice;
function startGame() {
    var player1Name = getInputByID("player1-name").value;
    var player2Name = getInputByID("player2-name").value;
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    var newGame = new Game(player1, player2);
    pigDice.currGame = newGame;
    delayFunctionCall(removeStartForm, 3000, "start-game-form");
}
function removeStartForm() {
    getByID("page-content").removeChild(getByID("start-game-form"));
    displayPigDiceGame();
}
function endGame() {
    getByID("game-buttons").removeChild(getInputByID("roll-die"));
    getByID("game-buttons").removeChild(getInputByID("pass-turn"));
    var winnerName = pigDice.currGame.currPlayer.playerName;
    var totalScore = pigDice.currGame.currPlayer.totalScore;
    var gameOverMessage = winnerName + " has won the game with " + totalScore + " points!";
    getByID("turn-display").innerText = gameOverMessage;
    createGameButton("play-again", "Play Again?");
}
function displayPigDiceGame() {
    createGameButton("roll-die", "Roll Die");
    createGameButton("pass-turn", "Pass Turn");
    setupButton("roll-die", rollDie);
    setupButton("pass-turn", passTurn);
    var player1Name = pigDice.currGame.currPlayer.playerName;
    var player2Name = pigDice.currGame.nextPlayer.playerName;
    getByID("player1-label").innerText = player1Name + "'s";
    getByID("player2-label").innerText = player2Name + "'s";
    createTotalTextbox(player1Name.toLowerCase() + "-total", "player1");
    createTotalTextbox(player2Name.toLowerCase() + "-total", "player2");
    getByID("turn-display").innerHTML = player1Name + "'s Turn";
    getByID("pig-dice-game").style.opacity = "1";
}
function createGameButton(buttonID, buttonText) {
    var newButton = createInput("button", buttonID, "game-button", buttonText);
    getByID("game-buttons").appendChild(newButton);
}
function createTotalTextbox(textBoxID, createWithin) {
    var newTextBox = createInput("textbox", textBoxID, "output-textbox", "0");
    newTextBox.setAttribute("disabled", "disabled");
    getByID(createWithin).appendChild(newTextBox);
}
function createInput(inputType, inputID, inputClass, inputText) {
    var newInput = createElement("input");
    newInput.setAttribute("type", inputType);
    newInput.setAttribute("id", inputID);
    newInput.classList.add(inputClass);
    newInput.setAttribute("value", inputText);
    return newInput;
}
function displayPreloader(createWithin, removeAfter) {
    var preloaderContainer = createElement("div");
    preloaderContainer.classList.add("lds-ellipsis");
    preloaderContainer.setAttribute("id", "preloader");
    for (var currDiv = 0; currDiv < 4; currDiv++) {
        var square = createElement("div");
        preloaderContainer.appendChild(square);
    }
    getByID(createWithin).innerHTML = "";
    getByID(createWithin).appendChild(preloaderContainer);
    setTimeout(removePreloader, removeAfter);
}
function removePreloader() {
    getByID("preloader").remove();
}
function rollDie() {
    displayD6Roll();
    setTimeout(rollD6, 1000);
}
function rollD6() {
    var rollValue = generateNumberWithinRange(1, 6);
    if (rollValue == 1) {
        delayFunctionCall(switchPlayer, 1000, "turn-display");
    }
    else {
        pigDice.currGame.currTurnTotal += rollValue;
    }
    displayD6Face(rollValue);
    getInputByID("turn-total").value = pigDice.currGame.currTurnTotal.toString();
}
function passTurn() {
    displayD6Idle();
    var turnTotal = pigDice.currGame.currTurnTotal;
    pigDice.currGame.currPlayer.totalScore += turnTotal;
    var currPlayerName = pigDice.currGame.currPlayer.playerName;
    var currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");
    currPlayerTextBox.value = pigDice.currGame.currPlayer.totalScore.toString();
    if (pigDice.currGame.currPlayer.totalScore >= 10) {
        delayFunctionCall(endGame, 2000, "turn-display");
    }
    else {
        delayFunctionCall(switchPlayer, 1000, "turn-display");
    }
}
function switchPlayer() {
    resetTurnTotal();
    var currPlayer = pigDice.currGame.currPlayer;
    var nextPlayer = pigDice.currGame.nextPlayer;
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;
    getByID("turn-display").innerHTML = nextPlayer.playerName + "'s Turn";
}
function displayD6Face(rollValue) {
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
function delayFunctionCall(callFunction, delayBy, preloaderContainer) {
    displayPreloader(preloaderContainer, delayBy);
    setTimeout(callFunction, delayBy);
}
function generateNumberWithinRange(min, max) {
    var number = (Math.random() * max) + min;
    return Math.floor(number);
}
function resetTurnTotal() {
    pigDice.currGame.currTurnTotal = 0;
    getInputByID("turn-total").value = "0";
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
function createElement(type) {
    return document.createElement(type);
}
