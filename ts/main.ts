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
 * When the "Start Game" button is clicked- creates a new "Pig Dice" game
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
    
    // remove the "start game" form from the page
    // after 3 seconds, and start the game
    delayFunctionCall(removeStartForm, 3000, "start-game-form");
}

/**
 * When called- ends the game, displays a victory message,
 * removes both game buttons and displays the 
 * "Play Again" button in their place
 */
function endGame():void {
    // display the d6 at its idle state
    displayD6Idle();

    // get the winning players name
    let winnerName:string = pigDice.currGame.currPlayer.playerName;

    // get their total score
    let totalScore:number = pigDice.currGame.currPlayer.totalScore;

    // compose game-over message
    let gameOverMessage:string = 
        winnerName + " has won the game with " + totalScore + " points!";

    // display message in the player display
    getByID("curr-player-display").innerText = gameOverMessage; 

    // remove the "Roll Die" and "Pass Turn" buttons from the page
    getByID("game-buttons").removeChild(getInputByID("roll-die"));
    getByID("game-buttons").removeChild(getInputByID("pass-turn"));

    // create and display the "Play Again" button in their place
    createGameButton("play-again", "game-buttons", "Play Again?");

    // set up it's onclick event
    setupButton("play-again", playAgain);
}

/************************
**** CREATE ELEMENTS ****
************************/

/**
 * When the "Play Again" button is clicked- removes the pig-dice-game
 * from the page, and displays the "start game" form in it's place
 */
function playAgain():void {
    // remove the pig-dice-game form from the page
    // after 3 seconds, and display the "Start Game" form
    delayFunctionCall(removePigDiceGame, 3000, "pig-dice-game");
}

/**
 * Creates the "start game" form and displays it on the page
 */
function displayStartGameForm():void {
    // create the start game form
    let startGameForm:HTMLElement = createElementWithID("form", "start-game-form");

    // add it to the page
    getByID("page-content").appendChild(startGameForm);

    // create both input textboxes within the form
    createInputTextBox("player1-name", "start-game-form", "Player1 Name");
    createInputTextBox("player2-name", "start-game-form", "Player2 Name");

    // create the "Start Game" button after the textboxes
    createGameButton("start-game", "start-game-form", "Start Game");

    // setup up it's onclick event
    setupButton("start-game", startGame);
}
 
/**
 * Creates the pig-dice-game and displays it on the page
 */
function displayPigDiceGame():void {
    // create the pig-dice-game container div
    let gameContainer:HTMLElement = createElementWithID("div", "pig-dice-game");
    
    // add it to the page
    getByID("page-content").appendChild(gameContainer);

    // create the current player display h3
    let playerDisplay:HTMLElement = createElementWithID("h3", "curr-player-display");

    // add it to the container
    gameContainer.appendChild(playerDisplay);

    // get player1's name and display it in the player display
    let player1Name:string = pigDice.currGame.currPlayer.playerName;
    playerDisplay.innerHTML = player1Name + "'s Turn";

    // create the game info div
    createGameInfoDiv();
}

/**
 * Creates the game-info div and all it's child elements-
 * and adds them to the pig-dice-game container
 */
function createGameInfoDiv():void {
    // create the game info div
    let gameInfo = createElementWithID("div", "game-info");

    // add it to the game container
    getByID("pig-dice-game").appendChild(gameInfo);

    // create the player-scores, turn-display, 
    // and game-button divs within it
    createPlayerScoresDiv();
    createTurnDisplayDiv();
    createGameButtonsDiv();
}
/**
 * Creates the player-scores div, adds it to the game-info div,
 * and populates it with the score displays for both players
 */
function createPlayerScoresDiv():void {
    // get player1 and player2's names
    let player1Name:string = pigDice.currGame.currPlayer.playerName;
    let player2Name:string = pigDice.currGame.nextPlayer.playerName;

    // create the player-scores div
    let playerScores:HTMLElement = createElementWithID("div", "player-scores");

    // add it to the game info div
    getByID("game-info").appendChild(playerScores);

    // create and add the score displays for both players
    createScoreDisplay("player1", player1Name);
    createScoreDisplay("player2", player2Name);
}

/**
 * Creates a player's score display using their name,
 * and adds it to the player-scores div
 * @param whichPlayer The player the display belongs to (player1 or player2)
 * @param playerName The name of the player the display belongs to
 */
function createScoreDisplay(whichPlayer:string, playerName:string):void {
    // create the score container div
    let scoreContainer:HTMLElement = createElementWithID("div", whichPlayer);

    // add it to the player-scores div
    getByID("player-scores").appendChild(scoreContainer);

    // create the name display label
    let nameDisplay:HTMLElement = createElementWithID("label", whichPlayer + "-label");

    // assign it to the player's score total textbox
    nameDisplay.setAttribute("for", playerName.toLowerCase() + "-total");

    // create the total score label
    let totalScoreLabel:HTMLElement = createElement("label");

    // create two <br> elements
    let br1:HTMLElement = createElement("br");
    let br2:HTMLElement = createElement("br");

    // assemble the player's score display
    scoreContainer.appendChild(nameDisplay);
    scoreContainer.appendChild(br1);
    scoreContainer.appendChild(totalScoreLabel);
    scoreContainer.appendChild(br2);

    // set the text for both labels
    nameDisplay.innerText = playerName + "'s";
    totalScoreLabel.innerText = "Total Score";

    // create and display the player's score total textbox
    // at the bottom of the score display
    createOutputTextBox(playerName.toLowerCase() + "-total", whichPlayer);
}

/**
 * Creates the turn-display div and all it's child elements-
 * and adds them to the game-info div
 */
function createTurnDisplayDiv():void {
    // create the turn-display div
    let turnDisplay:HTMLElement = createElementWithID("div", "turn-display");

    // add it to the game-info div
    getByID("game-info").appendChild(turnDisplay);

    // create the current-roll-display image
    let currentRollImage = createElementWithID("img", "roll-display");

    // add it to the turn display div
    turnDisplay.appendChild(currentRollImage);

    // display the d6 at it's idle state
    displayD6Idle();

    // create and add the "turn total" textbox to the div
    createOutputTextBox("turn-total", "turn-display");
}

/**
 * Creates the game-buttons div, adds it to the game-info div,
 * and populates it with the "Roll Die" and "Pass Turn" buttons
 */
function createGameButtonsDiv():void {
    // create the game-buttons div
    let gameButtons:HTMLElement = createElementWithID("div", "game-buttons");

    // add it to the game info div
    getByID("game-info").appendChild(gameButtons);

    // create the "Roll Die" button in the game-buttons div
    createGameButton("roll-die", "game-buttons", "Roll Die");

    // create the "Pass Turn" button in the game-buttons div
    createGameButton("pass-turn", "game-buttons", "Pass Turn");

    // set-up their on-click events
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
 * Creates a preloader within the specified element,
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

/***********************
**** CREATE HELPERS ****
***********************/

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
 * Shortened form of the document.createElement method
 * @param elementType The element's type, such as div or form
 * @returns The newly created HTML Element
 */
function createElement(elementType:string):HTMLElement {
    return document.createElement(elementType);
}

/************************
**** REMOVE ELEMENTS ****
************************/

/**
 * When called, removes the "start game" form from the page,
 * and then creates and displays the pig-dice-game in it's place
 */
function removeStartForm():void {
    // remove the "start game" form from the page
    removeElement("start-game-form", "page-content");
    
    // create and display the pig dice game
    displayPigDiceGame();
}

/**
 * When called, removes the pig-dice-game from the page,
 * and then creates and displays the "start game" form 
 * in it's place
 */
function removePigDiceGame():void {
    // remove the pig dice game from the page
    removeElement("pig-dice-game", "page-content");

    // create and display the "start game" form
    displayStartGameForm();
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
        // switch to the next player after 2 seconds
        delayFunctionCall(switchPlayer, 2000, "curr-player-display");
        turnSwap();
    }

    // if the roll value is not 1
    if(rollValue != 1) {
        // add the rolled value to the turn total
        pigDice.currGame.currTurnTotal += rollValue;
    }

    // display roll value
    displayD6Face(rollValue); 

    // get and display the current total on page
    let currTotal:string = pigDice.currGame.currTurnTotal.toString();
    getInputByID("turn-total").value = currTotal;
}

/**
 * When a player clicks the "Pass Turn" button-
 * adds the current turn total to that player's total score,
 * and then passes the turn on to the next player
 */
function passTurn():void {
    // get the total score of the current turn
    let turnTotal:number = pigDice.currGame.currTurnTotal;

    // add it to the current players total score
    pigDice.currGame.currPlayer.totalScore += turnTotal;

    // get the current players name
    let playerName:string = pigDice.currGame.currPlayer.playerName;

    // get and display the current players total score in their textbox
    let currTotal:string = pigDice.currGame.currPlayer.totalScore.toString();
    getInputByID(playerName.toLowerCase() + "-total").value = currTotal;

    // if the current player's total is now 100 or greater
    if(pigDice.currGame.currPlayer.totalScore >= 10) {
        // end game after 2 seconds
        delayFunctionCall(endGame, 2000, "curr-player-display");
        turnSwap();
    } 

    // otherwise swap players
    else {
        // switch to the next player after 2 second
        delayFunctionCall(switchPlayer, 2000, "curr-player-display");
        turnSwap();
    }
}

/**
 * When called- changes the player whose turn it is currently
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

    // display the new current player's name
    getByID("curr-player-display").innerHTML = nextPlayer.playerName + "'s Turn";

    // enable the game buttons
    enableGameButtons();

    // display the d6 at its idle state
    displayD6Idle();
}

/*******************
**** DISPLAY d6 ****
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
 * When called resets the turn total and disables
 * the "Roll Die" and "Pass Turn" buttons
 */
function turnSwap():void {
    // reset the turn total
    resetTurnTotal();

    // disable the game buttons
    disableGameButtons();
}

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
 * When called, removes the specified element from 
 * within the given element
 * @param elementID The id of the element being removed
 * @param parentID The id of the parent element the element is being removed from
 */
function removeElement(elementID:string, parentID:string):void {
    getByID(parentID).removeChild(getByID(elementID));
}