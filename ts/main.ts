/**
 * Represents a player in a game of pig dice
 */
class Player {
    /**
     * The player's name
     */
    playerName:string;

    /**
     * The player's total score across the game
     */
    totalScore:number;

    /**
     * Creates a player object to keep track of the players total score
     * @param playerName The player's name
     */
    constructor(playerName:string) {
        this.playerName = playerName;
        this.totalScore = 0; // Each player starts with 0 points
    }
}

/**
 * Represents a game of pig dice
 */
class Game {
    /**
     * The player whose turn it is currently 
     * (Player 1 at start of game)
     */
    currPlayer:Player;

    /**
     * The player whose turn it will be next 
     * (Player 2 at start of game)
     */
    nextPlayer:Player;

    /**
     * The total score of the current turn
     */
    currTurnTotal:number;

    /**
     * True if game is over; otherwise False
     */
    isGameOver:boolean;

    /**
     * Creates a  game object to keep track of the relevant game data
     * @param currPlayer The player whose turn it is currently (Player 1 at start of game)
     */
    constructor(currPlayer:Player, nextPlayer:Player) {
        this.currPlayer = currPlayer; // The player going first
        this.nextPlayer = nextPlayer; // The player going second
        this.currTurnTotal = 0; // The game starts at 0 points
        this.isGameOver = false; // The game is not over when it begins
    }
}

/**
 * Represents the current game of pig dice being played
 */
class PigDice {
    /**
     * The current game of pig dice being played
     */
    currGame:Game;
}

window.onload = function():void {
    // setup onclick event for the "Start Game" button
    setupButton("start-game", startGame);
}

/*******************
**** GAME STATE ****
*******************/

/**
 * The current game of pig dice
 */
let pigDice:PigDice = new PigDice;

/**
 * When the "Start Game" button is clicked, creates and begins
 * a new instance of a "Pig Dice" game
 */
function startGame():void{ 
    // get both player's names from their respective inputs
    let player1Name:string = getInputByID("player1-name").value;
    let player2Name:string = getInputByID("player2-name").value;

    // create a player object for each player
    let player1:Player = new Player(player1Name);
    let player2:Player = new Player(player2Name);

    // create a new instance of pig dice game
    let newGame:Game = new Game(player1, player2);

    // set it as the current game
    pigDice.currGame = newGame;
    
    // remove the "start game form" from the page
    // after 3 seconds, and start the game
    delayFunctionCall(removeStartForm, 3000, "start-game-form");
}

/**
 * When called, removes the start form from the page,
 * and displays the pig dice game
 */
function removeStartForm():void {
    getByID("page-content").removeChild(getByID("start-game-form"));
    createPigDiceGame();
}

function removePigDiceGame():void {
    getByID("page-content").removeChild(getByID("pig-dice-game"));
}

/**
 * When called, ends the game and displays 
 * a message to the winner
 */
function endGame():void {
    // display the d6 at its idle state
    displayD6Idle();

    // remove the "Roll Die" and "Pass Turn" buttons from the page
    getByID("game-buttons").removeChild(getInputByID("roll-die"));
    getByID("game-buttons").removeChild(getInputByID("pass-turn"));

    // get the winning players name
    let winnerName = pigDice.currGame.currPlayer.playerName;

    // get their score
    let totalScore = pigDice.currGame.currPlayer.totalScore;

    // compose game-over message
    let gameOverMessage = winnerName + " has won the game with " + totalScore + " points!"

    // display message
    getByID("turn-display").innerText = gameOverMessage; 

    // create and display the "Play Again" button
    createGameButton("play-again", "game-buttons", "Play Again?");

    // give it an onclick event
    setupButton("play-again", playAgain);
}

/************************
**** CREATE ELEMENTS ****
************************/

function playAgain() {
    // remove the game
    delayFunctionCall(removePigDiceGame, 3000, "pig-dice-game");

    // create the start game form
    delayFunctionCall(createStartGameForm, 3000, "pig-dice-game");
}

/**
 * Creates the Start Game form and displays it on the page
 */
function createStartGameForm():void {
    // create the start game form
    let startGameForm = createElementWithID("form", "start-game-form");

    // add it to the page
    getByID("page-content").appendChild(startGameForm);

    // create both input textboxes within the form
    createInputTextBox("player1-name", "start-game-form", "Player1 Name");
    createInputTextBox("player2-name", "start-game-form", "Player2 Name");

    // create the "Start Game" button after the textboxes
    createGameButton("start-game", "start-game-form", "Start Game");

    // setup the "Start Game" button's onclick
    setupButton("start-game", startGame);
}
 
/**
 * Creates the elements needed to play the pig dice game, 
 * and makes the game visible when the required elements are created
 */
function createPigDiceGame():void {
    // create the pig dice game container div
    let gameContainerDiv = createElementWithID("div", "pig-dice-game");
    
    // add it to the page
    getByID("page-content").appendChild(gameContainerDiv);

    // create the turn display h3
    let turnDisplayH3 = createElementWithID("h3", "turn-display");

    // add it to the container
    gameContainerDiv.appendChild(turnDisplayH3);

    // display the player whose turn it is currently
    getByID("turn-display").innerHTML = pigDice.currGame.currPlayer.playerName + "'s Turn";

    // create the game info div
    createGameInfoDiv();
}

/**
 * Creates a player's score display using their name,
 * and displays it in the game-info div
 * @param whichPlayer The player the display belongs to (player1 or player2)
 * @param playerName The name of the player the display belongs to
 */
function createScoreDisplay(whichPlayer:string, playerName:string):void {
    // create the score container div
    let scoreContainer:HTMLElement = createElementWithID("div", whichPlayer);

    // create the name display label
    let nameDisplay:HTMLElement = createElementWithID("label", whichPlayer + "-label");

    // assign it to the player's score total textbox
    nameDisplay.setAttribute("for", playerName.toLowerCase() + "-total");

    // display the player's name
    nameDisplay.innerText = playerName + "'s";

    // create a <br> element
    let break1:HTMLElement = createElement("br");

    // create the total score label
    let totalScoreLabel:HTMLElement = createElement("label");

    // set it's text
    totalScoreLabel.innerText = "Total Score";

    // create another <br> element
    let break2:HTMLElement = createElement("br");

    // assemble the player's score display
    getByID("player-scores").appendChild(scoreContainer);
    scoreContainer.appendChild(nameDisplay);
    scoreContainer.appendChild(break1);
    scoreContainer.appendChild(totalScoreLabel);
    scoreContainer.appendChild(break2);

    // create and display their score total textbox
    // at the bottom of the score display
    createOutputTextBox(playerName.toLowerCase() + "-total", whichPlayer);
}

function createGameInfoDiv():void {
    // create the game info div
    let gameInfo = createElementWithID("div", "game-info");

    // add it to the container
    getByID("pig-dice-game").appendChild(gameInfo);

    // create the player scores, turn totals, and game button divs
    createPlayerScoresDiv();
    createTurnTotalsDiv();
    createGameButtonsDiv();
}

function createPlayerScoresDiv():void {
    // get player1 and player2's names
    let player1Name:string = pigDice.currGame.currPlayer.playerName;
    let player2Name:string = pigDice.currGame.nextPlayer.playerName;

    // create the Player Scores div
    let playerScores = createElementWithID("div", "player-scores");

    // add it to the game info div
    getByID("game-info").appendChild(playerScores);

    // create the score display for both players
    createScoreDisplay("player1", player1Name);
    createScoreDisplay("player2", player2Name);
}

function createTurnTotalsDiv():void {
    // create the Turn Totals div
    let turnTotals = createElementWithID("div", "turn-totals");

    // add it to the game info div
    getByID("game-info").appendChild(turnTotals);

    // create the current roll display image
    let currentRollImage = createElementWithID("img", "roll-display");

    // add it to the turn totals div
    turnTotals.appendChild(currentRollImage);

    // link to the die at it's idle state
    displayD6Idle();

    // create the turn total textbox
    createOutputTextBox("turn-total", "turn-totals");
}

function createGameButtonsDiv():void {
    let gameButtonsContainer = createElementWithID("div", "game-buttons");

    // add it to the game info div
    getByID("game-info").appendChild(gameButtonsContainer);

    // create the "Roll Die" button
    createGameButton("roll-die", "game-buttons", "Roll Die");

    // create the "Pass Turn" button
    createGameButton("pass-turn", "game-buttons", "Pass Turn");

    // set up their on-click events
    setupButton("roll-die", rollDie);
    setupButton("pass-turn", passTurn);
}

/**
 * Creates a game button with the given id,
 * places the given text within it,
 * and creates it within the given element
 * @param buttonID The id being given to the button
 * @param createWithin The id of the HTML Element the button is being created in
 * @param buttonText The text being displayed within the button
 */
function createGameButton(buttonID:string, createWithin:string, buttonText:string):void {
    // create a button with the given id
    let newButton:HTMLInputElement = createInputWithID("button", buttonID);

    // give it the game button class
    newButton.classList.add("game-button");

    // place the given text within it
    newButton.setAttribute("value", buttonText);

    // create it within the given element
    getByID(createWithin).appendChild(newButton);
}

/**
 * Creates an output textbox with the given id,
 * and creates it within the given element
 * @param textBoxID The id being given to the textbox
 * @param createWithin The id of the HTML Element the textbox is being created in
 */
function createOutputTextBox(textBoxID:string, createWithin:string):void {
    // create an output textbox with the given id
    let outputTextBox:HTMLInputElement = createInputWithID("textbox", textBoxID);

    // give it the output class
    outputTextBox.classList.add("output-textbox");

    // disable the textbox
    outputTextBox.setAttribute("disabled", "disabled");

    // display a zero inside it
    outputTextBox.setAttribute("value", "0");

    // create it within the given element
    getByID(createWithin).appendChild(outputTextBox);
}

/**
 * Creates an input textbox with the given id, 
 * places the given placeholder text within it,
 * and creates it within the given element
 * @param textBoxID The id being given to the textbox
 * @param createWithin The id of the HTML Element the textbox is being created in
 * @param placeholder The placeholder text being displayed within the textbox
 */
function createInputTextBox(textBoxID:string, createWithin:string, placeholder:string):void {
    // create an input textbox with the given id
    let inputTextBox:HTMLInputElement = createInputWithID("textbox", textBoxID);

    // give it the input class
    inputTextBox.classList.add("input-textbox");

    // display the given placeholder text
    inputTextBox.setAttribute("placeholder", placeholder);

    // create it within the given element
    getByID(createWithin).appendChild(inputTextBox);
}

/**
 * Creates and returns an HTML Input Element with the given id
 * @param inputType The input element's type, such as textbox or button
 * @param inputID The id being given to the element
 * @returns The newly created HTML Input Element
 */
function createInputWithID(inputType:string, inputID:string):HTMLInputElement {
    // create an html input element with the given id
    let newInput = <HTMLInputElement> createElementWithID("input", inputID); 
    
    // make it the specified input element
    newInput.setAttribute("type", inputType);

    // return the newly created input element
    return newInput;
}

/**
 * Creates and returns an HTML Element with the given id
 * @param elementType The element's type, such as div or form
 * @param elementID The id being given to the element
 * @returns The newly created HTML Element
 */
 function createElementWithID(elementType:string, elementID:string):HTMLElement {
    // create the specified element
    let newElement:HTMLElement = createElement(elementType);

    // give it the specified id
    newElement.setAttribute("id", elementID);

    // return the newly created element
    return newElement;
}

/**
 * Creates a moving preloader within the specified element,
 * and removes it after the specified time
 * @param createWithin The id of the HTML element the preloader is being created in
 * @param removeAfter The time after which the preloader will be removed (milliseconds)
 */
function displayPreloader(createWithin:string, removeAfter:number):void {
    // create a container div
    let preloaderContainer = createElement("div");

    // give it the lds-ellipsis class
    preloaderContainer.classList.add("lds-ellipsis");

    // give it the preloader id
    preloaderContainer.setAttribute("id", "preloader");

    for(let currDiv:number = 0; currDiv < 4; currDiv++) {
        // create four more divs
        let square = createElement("div");
        
        // and place them in the preloader container
        preloaderContainer.appendChild(square);
    }

    // empty the element the preloader will be displayed in
    getByID(createWithin).innerHTML = "";

    // place the preloader within the specified element
    getByID(createWithin).appendChild(preloaderContainer);

    // remove it after the given interval 
    setTimeout(removePreloader, removeAfter);
}

/**
 * When called, removes the preloader from the page
 */
function removePreloader():void {
    // remove the preloader from the page
    getByID("preloader").remove();
}

/******************
**** PLAY GAME ****
******************/

/**
 * When the "Roll Die" button is clicked, simulates the roll of a
 * six-sided die and displays the roll value on the page
 */
 function rollDie() {
    // display roll transition image
    displayD6Roll();
    
    // after 1 second display the roll result
    setTimeout(rollD6, 1000);
}

/**
 * Rolls a six-sided die and displays the value on the page
 */
function rollD6():void {
    // simulate a six-sided dice roll by 
    // generating a random number (1 - 6)
    let rollValue:number = generateNumberWithinRange(1, 6);

    // if the roll value is 1
    if(rollValue == 1) {
        // reset the turn total
        resetTurnTotal();

        // disable the game buttons
        disableGameButtons();

        // switch to the next player after 1 second
        delayFunctionCall(switchPlayer, 2000, "turn-display");
    }

    // if the roll value is not 1
    if(rollValue != 1) {
        // add roll value to turn total
        pigDice.currGame.currTurnTotal += rollValue;
    }

    // display roll value
    displayD6Face(rollValue); 

    // display current total on page
    getInputByID("turn-total").value = pigDice.currGame.currTurnTotal.toString();
}

/**
 * When a player clicks the "Pass Turn" button or rolls a 1, 
 * adds the current turn total to that player's total score,
 * and then passes the turn on to the next player
 */
 function passTurn():void {
    // get the total score of the current turn
    let turnTotal:number = pigDice.currGame.currTurnTotal;

    // add it to the current players total score
    pigDice.currGame.currPlayer.totalScore += turnTotal;

    // get the current players name
    let currPlayerName:string = pigDice.currGame.currPlayer.playerName;

    // grab the current players total textbox
    let currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");

    // display the current players total score in their textbox
    currPlayerTextBox.value = pigDice.currGame.currPlayer.totalScore.toString();

    // if the current player's total is now 100 or greater
    if(pigDice.currGame.currPlayer.totalScore >= 10) {
        // reset the turn total
        resetTurnTotal();

        // disable the game buttons
        disableGameButtons();

        // end game after 2 seconds
        delayFunctionCall(endGame, 2000, "turn-display");
    } 

    // otherwise swap players
    else {
        // reset the turn total
        resetTurnTotal();

        // disable the game buttons
        disableGameButtons();

        // switch to the next player after 1 second
        delayFunctionCall(switchPlayer, 2000, "turn-display");
    }
}

/**
 * When called, changes the player whose turn it is currently
 * to the next player in the game
 */
function switchPlayer():void {
    // get the player whose turn it is currently
    let currPlayer = pigDice.currGame.currPlayer;

    // get the player whose turn it is next
    let nextPlayer = pigDice.currGame.nextPlayer;

    // swap their positions
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;

    // display the new current player
    getByID("turn-display").innerHTML = nextPlayer.playerName + "'s Turn";

    // enable the game buttons
    enableGameButtons();

    // display the d6 at its idle state
    displayD6Idle();
}

/*******************
**** d6 DISPLAY ****
*******************/

/**
 * Displays an image of a die face corresponding to 
 * the passed through number (for a six-sided die)
 * @param rollValue The value the six-sided die landed on
 */
function displayD6Face(rollValue:number):void {
    // Based on the rolled value, display the corresponding image
    if(rollValue == 6) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-6.svg";
    }
    else if(rollValue == 5) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-5.svg";
    }
    else if(rollValue == 4) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-4.svg";
    }
    else if(rollValue == 3) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-3.svg";
    }
    else if(rollValue == 2) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-2.svg";
    }
    else if(rollValue == 1) {
        getImageByID("roll-display").src = "images/dice-icons/d6-side-1.svg";
    }
}

/**
 * Displays an image of a hand throwing up a 
 * six-sided die to simulate a "die roll"
 */
function displayD6Roll():void {
    getImageByID("roll-display").src = "images/dice-icons/d6-roll.svg";
}

/**
 * Displays a 3d image of a six-sided die
 */
function displayD6Idle():void {
    getImageByID("roll-display").src = "images/dice-icons/d6-idle.svg";
}

/****************
**** HELPERS ****
****************/

/**
 * When called disables the "Roll Die" and "Pass Turn" buttons
 */
function disableGameButtons():void {
    // disable both game buttons
    getInputByID("roll-die").setAttribute("disabled", "disabled");
    getInputByID("pass-turn").setAttribute("disabled", "disabled");
}

/**
 * When called removes the disabled property from the 
 * "Roll Die" and "Pass Turn" buttons
 */
function enableGameButtons():void {
    // enable both game buttons
    getInputByID("roll-die").removeAttribute("disabled");
    getInputByID("pass-turn").removeAttribute("disabled");
}

/**
 * Calls a function after the given interval (in milliseconds) has passed,
 * and displays the preloader during the delay
 * @param callFunction The function being called after the specified time
 * @param delayBy The # of milliseconds the function call is delayed by
 * @param preloaderContainer The id of the HTML element the preloader is being created in
 */
function delayFunctionCall(callFunction:() => void, delayBy:number, preloaderContainer:string):void {
    // display preloader during delay
    displayPreloader(preloaderContainer, delayBy);

    // call function after delay
    setTimeout(callFunction, delayBy);
}

/**
 * Generates a random number within the given range
 * @param min The lower limit of the range (inclusive)
 * @param max The upper limit of the range (inclusive)
 * @returns The generated number
 */
 function generateNumberWithinRange(min:number, max:number):number {
    // generate a random number between min and max
    let number:number =  (Math.random() * max) + min;
    
    // as random generates a float, 
    // return it without the decimals
    return Math.floor(number);
}

/**
 * Resets the total turn score for all relevant trackers
 */
function resetTurnTotal():void {
    // reset the turn total score for the game
    pigDice.currGame.currTurnTotal = 0;

    // reset the turn total textbox
    getInputByID("turn-total").value = "0";
}

/**
 * Sets up an onclick event for a button
 * @param id The button's id
 * @param useFunction The function to be called when button is clicked
 */
function setupButton(id:string, useFunction:() => void):void {
    // get the button
    let button:HTMLElement = getByID(id);

    // set it's onclick event
    button.onclick = useFunction;
}

/**
 * Gets an HTML Image Element by it's ID
 * @param id - The image's id
 * @returns The corresponding HTML Image Element
 */
function getImageByID(id:string):HTMLImageElement {
    return <HTMLImageElement> getByID(id);
}

/**
 * Gets an HTML Input Element by it's ID
 * @param id The input's id
 * @returns The corresponding HTML Input Element
 */
function getInputByID(id:string):HTMLInputElement {
    return <HTMLInputElement> getByID(id);
}

/**
 * Shortened form of the document.getElementById method
 * @param id The element's id
 * @returns The corresponding HTML Element
 */
function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}

/**
 * Shortened form of the document.createElement method
 * @param type The type of element being created
 * @returns The newly created HTML Element
 */
 function createElement(type:string):HTMLElement {
    return document.createElement(type);
}

/**
 * When called, removes the specified element from 
 * within the given element
 * @param elementID The id of the element being removed
 * @param parentID The id of the parent element the element is being removed from
 */
function removeElement(elementID:string, parentID:string):void {
    getByID(parentID).removeChild(getByID(elementID));
}