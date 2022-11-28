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
    createPigDiceGame();
}
function removePigDiceGame() {
    getByID("page-content").removeChild(getByID("pig-dice-game"));
}
function endGame() {
    displayD6Idle();
    getByID("game-buttons").removeChild(getInputByID("roll-die"));
    getByID("game-buttons").removeChild(getInputByID("pass-turn"));
    var winnerName = pigDice.currGame.currPlayer.playerName;
    var totalScore = pigDice.currGame.currPlayer.totalScore;
    var gameOverMessage = winnerName + " has won the game with " + totalScore + " points!";
    getByID("turn-display").innerText = gameOverMessage;
    createGameButton("play-again", "game-buttons", "Play Again?");
    setupButton("play-again", playAgain);
}
function playAgain() {
    delayFunctionCall(removePigDiceGame, 3000, "pig-dice-game");
    delayFunctionCall(createStartGameForm, 3000, "pig-dice-game");
}
function createStartGameForm() {
    var startGameForm = createElementWithID("form", "start-game-form");
    getByID("page-content").appendChild(startGameForm);
    createInputTextBox("player1-name", "start-game-form", "Player1 Name");
    createInputTextBox("player2-name", "start-game-form", "Player2 Name");
    createGameButton("start-game", "start-game-form", "Start Game");
    setupButton("start-game", startGame);
}
function createPigDiceGame() {
    var gameContainerDiv = createElementWithID("div", "pig-dice-game");
    getByID("page-content").appendChild(gameContainerDiv);
    var turnDisplayH3 = createElementWithID("h3", "turn-display");
    gameContainerDiv.appendChild(turnDisplayH3);
    getByID("turn-display").innerHTML = pigDice.currGame.currPlayer.playerName + "'s Turn";
    createGameInfoDiv();
}
function createScoreDisplay(whichPlayer, playerName) {
    var scoreContainer = createElementWithID("div", whichPlayer);
    var nameDisplay = createElementWithID("label", whichPlayer + "-label");
    nameDisplay.setAttribute("for", playerName.toLowerCase() + "-total");
    nameDisplay.innerText = playerName + "'s";
    var break1 = createElement("br");
    var totalScoreLabel = createElement("label");
    totalScoreLabel.innerText = "Total Score";
    var break2 = createElement("br");
    getByID("player-scores").appendChild(scoreContainer);
    scoreContainer.appendChild(nameDisplay);
    scoreContainer.appendChild(break1);
    scoreContainer.appendChild(totalScoreLabel);
    scoreContainer.appendChild(break2);
    createOutputTextBox(playerName.toLowerCase() + "-total", whichPlayer);
}
function createGameInfoDiv() {
    var gameInfo = createElementWithID("div", "game-info");
    getByID("pig-dice-game").appendChild(gameInfo);
    createPlayerScoresDiv();
    createTurnTotalsDiv();
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
function createTurnTotalsDiv() {
    var turnTotals = createElementWithID("div", "turn-totals");
    getByID("game-info").appendChild(turnTotals);
    var currentRollImage = createElementWithID("img", "roll-display");
    turnTotals.appendChild(currentRollImage);
    displayD6Idle();
    createOutputTextBox("turn-total", "turn-totals");
}
function createGameButtonsDiv() {
    var gameButtonsContainer = createElementWithID("div", "game-buttons");
    getByID("game-info").appendChild(gameButtonsContainer);
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
        resetTurnTotal();
        disableGameButtons();
        delayFunctionCall(switchPlayer, 2000, "turn-display");
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
        delayFunctionCall(endGame, 2000, "turn-display");
    }
    else {
        resetTurnTotal();
        disableGameButtons();
        delayFunctionCall(switchPlayer, 2000, "turn-display");
    }
}
function switchPlayer() {
    var currPlayer = pigDice.currGame.currPlayer;
    var nextPlayer = pigDice.currGame.nextPlayer;
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;
    getByID("turn-display").innerHTML = nextPlayer.playerName + "'s Turn";
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
function createElement(type) {
    return document.createElement(type);
}
function removeElement(elementID, parentID) {
    getByID(parentID).removeChild(getByID(elementID));
}
