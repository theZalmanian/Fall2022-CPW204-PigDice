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
    // setup onclick event for Start Game button
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

    getByID("player1-label").innerHTML = player1Name + "'s";
    getByID("player2-label").innerHTML = player2Name + "'s";

    // display the new current player
    getByID("turn-display").innerHTML = player1Name + "'s Turn";
    
    // // remove the start game form from the page
    getByID("start-game-form").innerHTML = "";
    createLoadingIcon("start-game-form");
    setTimeout(test, 2000);
}

function test() {
    getByID("page-content").removeChild(getByID("start-game-form"));
    createPigDiceGame();
}

/**
 * When called, ends the game and displays 
 * a message to the winner
 */
function endGame():void {
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
    createGameButton("play-again", "Play Again?");
}

/************************
**** CREATE ELEMENTS ****
************************/

/**
 * Creates the elements needed to play the pig dice game, 
 * and makes the game visible when the required elements are created
 */
function createPigDiceGame() {
    // create the roll-die button
    createGameButton("roll-die", "Roll Die");

    // create the pass-turn button
    createGameButton("pass-turn", "Pass Turn");

    // set up their on-click events
    setupButton("roll-die", rollDie);
    setupButton("pass-turn", passTurn);

    // get player1 and player2's names
    let player1Name:string = pigDice.currGame.currPlayer.playerName;
    let player2Name:string = pigDice.currGame.nextPlayer.playerName;

    // create their score total textboxes
    createTotalTextbox(player1Name.toLowerCase() + "-total", "player1");
    createTotalTextbox(player2Name.toLowerCase() + "-total", "player2");

    // make the pig-dice-game div visible
    getByID("pig-dice-game").style.opacity = "1";
}

/**
 * Creates a "game" button with the given id,
 * and places the given text within it
 * @param buttonID The id being given to the button
 * @param buttonText The text being displayed in the button
 */
function createGameButton(buttonID:string, buttonText:string):void {
    // create a game button with the given data
    let newButton:HTMLInputElement = createInput("button", buttonID, "game-button", buttonText);

    // add it into the game-buttons div
    getByID("game-buttons").appendChild(newButton);
}

/**
 * Creates a "score total" textbox with the given id,
 * and places it within the given div
 * @param textBoxID The id being given to the textbox
 * @param createWithin The id of the HTML element the textbox is being created in
 */
function createTotalTextbox(textBoxID:string, createWithin:string):void {
    // create a total textbox with the given data
    let newTextBox = createInput("textbox", textBoxID, "output-textbox", "0");

    // disable the textbox
    newTextBox.setAttribute("disabled", "disabled");

    // add it into the given div
    getByID(createWithin).appendChild(newTextBox);
}

/**
 * Creates and returns an HTML Input Element with the given attributes
 * @param inputType The input element's type, such as textbox or button
 * @param inputID The id being given to the element
 * @param inputClass The class being given to the element
 * @param inputText The text being placed within the element
 * @returns The newly created HTML Input Element
 */
function createInput(inputType:string, inputID:string, inputClass:string, inputText):HTMLInputElement {
    // create an html input element
    let newInput = <HTMLInputElement> createElement("input");
    
    // make it the specified input element
    newInput.setAttribute("type", inputType);

    // give it the specified id
    newInput.setAttribute("id", inputID);

    // give it the specified class
    newInput.classList.add(inputClass);

    // place the specified text within it
    newInput.setAttribute("value", inputText);

    // return the input
    return newInput;
}

/**
 * Creates a moving loader within the specified element,
 * and removes it after the specified time
 * @param createWithin The id of the HTML element the loader is being created in
 */
function createLoadingIcon(createWithin:string):void {
    // create a container div
    let loaderContainer = createElement("div");

    // give it the lds-ellipsis class
    loaderContainer.classList.add("lds-ellipsis");

    // give it the loader id
    loaderContainer.setAttribute("id", "loader");

    for(let currDiv:number = 0; currDiv < 4; currDiv++) {
        // create four more divs
        let circle = createElement("div");
        
        // and place them in the loader container
        loaderContainer.appendChild(circle);
    }

    // place the loader container within the specified element
    getByID(createWithin).appendChild(loaderContainer);
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
        // switch to the next player
        switchPlayer();
    }

    // if the roll value is not 1
    else {
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
    // display the d6 at its idle state
    displayD6Idle();

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
        // end the game
        endGame();
    } 
    // otherwise swap players
    else {
        // switch to the next player
        switchPlayer();
    }
}

/**
 * When called, changes the player whose turn it is currently
 * to the next player in the game
 */
function switchPlayer():void {
    // reset the turn total
    resetTurnTotal();
    
    // get the player whose turn it is currently
    let currPlayer = pigDice.currGame.currPlayer;

    // get the player whose turn it is next
    let nextPlayer = pigDice.currGame.nextPlayer;

    // swap their positions
    pigDice.currGame.currPlayer = nextPlayer;
    pigDice.currGame.nextPlayer = currPlayer;

    // display the new current player
    getByID("turn-display").innerHTML = nextPlayer.playerName + "'s Turn";
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
    let button:HTMLElement = getByID(id);
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