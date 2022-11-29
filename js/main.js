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
function endGame() {
    displayD6Idle();
    var winnerName = pigDice.currGame.currPlayer.playerName;
    var totalScore = pigDice.currGame.currPlayer.totalScore;
    var gameOverMessage = winnerName + " has won the game with " + totalScore + " points!";
    getByID("curr-player-display").innerText = gameOverMessage;
    getByID("game-buttons").removeChild(getInputByID("roll-die"));
    getByID("game-buttons").removeChild(getInputByID("pass-turn"));
    createGameButton("play-again", "game-buttons", "Play Again?");
    setupButton("play-again", playAgain);
}
function playAgain() {
    delayFunctionCall(removePigDiceGame, 3000, "pig-dice-game");
}
function displayStartGameForm() {
    var startGameForm = createElementWithID("form", "start-game-form");
    getByID("page-content").appendChild(startGameForm);
    createInputTextBox("player1-name", "start-game-form", "Player1 Name");
    createInputTextBox("player2-name", "start-game-form", "Player2 Name");
    createGameButton("start-game", "start-game-form", "Start Game");
    setupButton("start-game", startGame);
}
function displayPigDiceGame() {
    var gameContainer = createElementWithID("div", "pig-dice-game");
    getByID("page-content").appendChild(gameContainer);
    var playerDisplay = createElementWithID("h3", "curr-player-display");
    gameContainer.appendChild(playerDisplay);
    var player1Name = pigDice.currGame.currPlayer.playerName;
    playerDisplay.innerHTML = player1Name + "'s Turn";
    createGameInfoDiv();
}
function createGameInfoDiv() {
    var gameInfo = createElementWithID("div", "game-info");
    getByID("pig-dice-game").appendChild(gameInfo);
    createPlayerScoresDiv();
    createTurnDisplayDiv();
    createGameButtonsDiv();
}
function createPlayerScoresDiv() {
    var player1Name = pigDice.currGame.currPlayer.playerName;
    var player2Name = pigDice.currGame.nextPlayer.playerName;
    var playerScores = createElementWithID("div", "player-scores");
    getByID("game-info").appendChild(playerScores);
    createScoreDisplay("player1", player1Name);
    createScoreDisplay("player2", player2Name);
}
function createScoreDisplay(whichPlayer, playerName) {
    var scoreContainer = createElementWithID("div", whichPlayer);
    getByID("player-scores").appendChild(scoreContainer);
    var nameDisplay = createElementWithID("label", whichPlayer + "-label");
    nameDisplay.setAttribute("for", playerName.toLowerCase() + "-total");
    var totalScoreLabel = createElement("label");
    var br1 = createElement("br");
    var br2 = createElement("br");
    scoreContainer.appendChild(nameDisplay);
    scoreContainer.appendChild(br1);
    scoreContainer.appendChild(totalScoreLabel);
    scoreContainer.appendChild(br2);
    nameDisplay.innerText = playerName + "'s";
    totalScoreLabel.innerText = "Total Score";
    createOutputTextBox(playerName.toLowerCase() + "-total", whichPlayer);
}
function createTurnDisplayDiv() {
    var turnDisplay = createElementWithID("div", "turn-display");
    getByID("game-info").appendChild(turnDisplay);
    var currentRollImage = createElementWithID("img", "roll-display");
    turnDisplay.appendChild(currentRollImage);
    displayD6Idle();
    createOutputTextBox("turn-total", "turn-display");
}
function createGameButtonsDiv() {
    var gameButtons = createElementWithID("div", "game-buttons");
    getByID("game-info").appendChild(gameButtons);
    createGameButton("roll-die", "game-buttons", "Roll Die");
    createGameButton("pass-turn", "game-buttons", "Pass Turn");
    setupButton("roll-die", rollDie);
    setupButton("pass-turn", passTurn);
}
function createGameButton(buttonID, createWithin, buttonText) {
    var newButton = createInputWithID("button", buttonID);
    newButton.classList.add("game-button");
    newButton.setAttribute("value", buttonText);
    getByID(createWithin).appendChild(newButton);
}
function createOutputTextBox(textBoxID, createWithin) {
    var outputTextBox = createInputWithID("textbox", textBoxID);
    outputTextBox.classList.add("output-textbox");
    outputTextBox.setAttribute("disabled", "disabled");
    outputTextBox.setAttribute("value", "0");
    getByID(createWithin).appendChild(outputTextBox);
}
function createInputTextBox(textBoxID, createWithin, placeholder) {
    var inputTextBox = createInputWithID("textbox", textBoxID);
    inputTextBox.classList.add("input-textbox");
    inputTextBox.setAttribute("placeholder", placeholder);
    getByID(createWithin).appendChild(inputTextBox);
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
function createInputWithID(inputType, inputID) {
    var newInput = createElementWithID("input", inputID);
    newInput.setAttribute("type", inputType);
    return newInput;
}
function createElementWithID(elementType, elementID) {
    var newElement = createElement(elementType);
    newElement.setAttribute("id", elementID);
    return newElement;
}
function createElement(elementType) {
    return document.createElement(elementType);
}
function removeStartForm() {
    removeElement("start-game-form", "page-content");
    displayPigDiceGame();
}
function removePigDiceGame() {
    removeElement("pig-dice-game", "page-content");
    displayStartGameForm();
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
        resetTurnTotal();
        disableGameButtons();
        delayFunctionCall(switchPlayer, 2000, "curr-player-display");
    }
    if (rollValue != 1) {
        pigDice.currGame.currTurnTotal += rollValue;
    }
    displayD6Face(rollValue);
    getInputByID("turn-total").value = pigDice.currGame.currTurnTotal.toString();
}
function passTurn() {
    var turnTotal = pigDice.currGame.currTurnTotal;
    pigDice.currGame.currPlayer.totalScore += turnTotal;
    var currPlayerName = pigDice.currGame.currPlayer.playerName;
    var currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");
    currPlayerTextBox.value = pigDice.currGame.currPlayer.totalScore.toString();
    if (pigDice.currGame.currPlayer.totalScore >= 10) {
        resetTurnTotal();
        disableGameButtons();
        delayFunctionCall(endGame, 2000, "curr-player-display");
    }
    else {
        resetTurnTotal();
        disableGameButtons();
        delayFunctionCall(switchPlayer, 2000, "curr-player-display");
    }
}
function switchPlayer() {
    var currPlayer = pigDice.currGame.currPlayer;
    var nextPlayer = pigDice.currGame.nextPlayer;
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;
    getByID("curr-player-display").innerHTML = nextPlayer.playerName + "'s Turn";
    enableGameButtons();
    displayD6Idle();
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
function disableGameButtons() {
    getInputByID("roll-die").setAttribute("disabled", "disabled");
    getInputByID("pass-turn").setAttribute("disabled", "disabled");
}
function enableGameButtons() {
    getInputByID("roll-die").removeAttribute("disabled");
    getInputByID("pass-turn").removeAttribute("disabled");
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
function removeElement(elementID, parentID) {
    getByID(parentID).removeChild(getByID(elementID));
}
