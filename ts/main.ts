class Player {
    playerName:string;
    totalScore:number;

    /**
     * Construct's a player object
     * @param playerName The player's name
     */
    constructor(playerName:string) {
        this.playerName = playerName;
    }
}

class Game {
    currentPlayersTurn:number;
    currentTurnTotal:number;
    isGameOver:boolean;
}

let player1:Player = new Player("John");

player1.totalScore = 0;

let game:Game = new Game;

game.currentTurnTotal = 0;

window.onload = function():void {
    // setup page buttons
    setupButton("roll-die", rollD6);
    setupButton("pass-turn", passTurn);
}

function passTurn() {
    let total = player1.totalScore + game.currentTurnTotal;

    // add current total to player total
    getInputByID("player1-total").value = total.toString();
}

function rollD6() {
    // simulate a six-sided dice roll by 
    // generating a random number (1 - 6)
    let rollValue:number = generateNumberWithinRange(1, 6);
    
    // output current roll to page
    getInputByID("current-roll").value = rollValue.toString();

    game.currentTurnTotal += rollValue;

    // output current total to page
    getInputByID("current-total").value = game.currentTurnTotal.toString();
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