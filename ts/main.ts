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
class PigDiceGame {
    /**
     * The player whose turn it is currently 
     * (Player 1 at start of game)
     */
    currPlayer:Player;

    /**
     * The total score of the current turn
     */
    currTurnTotal:number;

    /**
     * True if game is over; otherwise False
     */
    isGameOver:boolean;

    /**
     * Creates a pig dice game object to keep track of the relevant game data
     * @param currPlayersTurn The player whose turn it is currently (Player 1 at start of game)
     */
    constructor(currPlayersTurn:Player) {
        this.currPlayer = currPlayersTurn;
        this.currTurnTotal = 0; // The game starts at 0 points
        this.isGameOver = false; // The game is not over when it begins
    }
}

let player1:Player = new Player("player1");

let currGame:PigDiceGame = new PigDiceGame(player1);

window.onload = function():void {
    // setup page buttons
    setupButton("roll-die", rollD6);
    setupButton("pass-turn", passTurn);
}

/**
 * When a player hits the "Pass Turn" button or rolls a 1, 
 * passes the turn on to the next player
 */
function passTurn() {
    // get the total score of the current round
    let turnTotal:number = currGame.currTurnTotal;

    // add it to the current players total score
    currGame.currPlayer.totalScore += turnTotal;

    // get the current players total textbox
    let currPlayerTextBox = getInputByID(currGame.currPlayer.playerName);

    // display the current players total score on page
    currPlayerTextBox.value = currGame.currPlayer.totalScore.toString();
}

function rollD6() {
    // simulate a six-sided dice roll by 
    // generating a random number (1 - 6)
    let rollValue:number = generateNumberWithinRange(1, 6);
    
    // display current roll value
    getInputByID("current-roll").value = rollValue.toString();

    // calculate the new turn total
    currGame.currTurnTotal += rollValue;

    // display it on the page
    getInputByID("current-total").value = currGame.currTurnTotal.toString();
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


/****************
**** HELPERS ****
****************/

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
 * Gets an HTML Input Element by it's ID
 * @param id - The input's id
 * @returns The corresponding HTML Input Element
 */
function getInputByID(id:string):HTMLInputElement {
    return <HTMLInputElement> getByID(id);
}

/**
 * Shortened form of the document.getElementById method
 * @param id - The element's id
 * @returns The corresponding HTML Element
 */
function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}