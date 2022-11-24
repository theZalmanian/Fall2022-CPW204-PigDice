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

// create an empty instance of pig dice game
let pigDice:PigDice = new PigDice;

window.onload = function():void {
    // setup onclick events for page buttons
    setupButton("start-game", startGame)
    setupButton("roll-die", rollD6);
    setupButton("pass-turn", passTurn);
}

/**
 * When the "Start Game" button is clicked, creates and begins
 * a new instance of the "Pig Dice" game
 */
function startGame():void{ 
    // get both player's names from their respective inputs
    let player1Name:string = getInputByID("player1-name").value;
    let player2Name:string = getInputByID("player2-name").value;

    // create a player object for each player
    let player1:Player = new Player(player1Name);
    let player2:Player = new Player(player2Name);

    // create a new instance of pig dice game
    let currPigDiceGame:Game = new Game(player1, player2);

    // set it as the current game
    pigDice.currGame = currPigDiceGame;
}

/**
 * When a player clicks the "Pass Turn" button or rolls a 1, 
 * adds the current turn total to that player's total score,
 * and then passes the turn on to the next player
 */
function passTurn():void {
    // get the total score of the current round
    let turnTotal:number = pigDice.currGame.currTurnTotal;

    // add it to the current players total score
    pigDice.currGame.currPlayer.totalScore += turnTotal;

    // get the current players name
    let currPlayerName:string = pigDice.currGame.currPlayer.playerName;

    // grab the current players total textbox
    let currPlayerTextBox = getInputByID(currPlayerName.toLowerCase() + "-total");

    // display the current players total score on page
    currPlayerTextBox.value = pigDice.currGame.currPlayer.totalScore.toString();

    // reset the turn total
    resetTurnTotals();

    // switch to the next player
    switchPlayer();
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
}

/**
 * When the "Roll Die" button is clicked, rolls a six-sided die
 * and displays the value on the page
 */
function rollD6():void {
    // simulate a six-sided dice roll by 
    // generating a random number (1 - 6)
    let rollValue:number = generateNumberWithinRange(1, 6);

    // if the roll value is 1
    if(rollValue == 1) {
        // switch to the next player
        switchPlayer();

        // reset the current turn total
        resetTurnTotals();
    }

    // if the roll value is not 1
    else {
        // add roll value to turn total
        pigDice.currGame.currTurnTotal += rollValue;
    }

    // display roll value
    getInputByID("current-roll").value = rollValue.toString();

    // display current total on page
    getInputByID("current-total").value = pigDice.currGame.currTurnTotal.toString();
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
 * Resets the total turn score to 0 for all relevant trackers
 */
function resetTurnTotals():void {
    // reset the total turn score for the game
    pigDice.currGame.currTurnTotal = 0;

    // reset the "current" textboxes values to 0
    getInputByID("current-roll").value = "0";
    getInputByID("current-total").value = "0";
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