//Retro Word list//

var Retrowords =
["cheese fondue", 
"ring dings", 
"cheese puffs", 
"hostess cupcakes", 
"twinkies", 
"french onion dip", 
"hot dog", 
"cheese burger",
];


//The player's maximum # of tries//
const maxTries = 10;           

// Letters the user has guessed//
var guessedLetters = []; 

//Tells what the current word in the array is//
var currentWordIndex;           

//The user is guessing to match the words on the retro list//
var guessingWord = [];          

//# of guesses remaining for the user//
var remainingGuesses = 0;  

//Let's the user know the game has started//
var gameStarted = false; 

//A prompt to "press any key to try again"//
var hasFinished = false;             

//# of times the user guessed the word correctly//
var wins = 0;                   

// Reset our game-level variables//
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

// Using Math.floor to round the random numbers//
//This is where the words randomly selected by the user will be stored//
currentWordIndex = Math.floor(Math.random() * (Retrowords.length));

// Clears the array//
    guessedLetters = [];
    guessingWord = [];

// Clears hangman image//
    document.getElementById("hangmanImage").src = "";

//Push-to add a new word and clear it out//
    for(var i = 0; i < Retrowords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
// Hide game over and win images/text//
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

//Shows the display is updated//
    updateDisplay();


//Updates to the HTML Page//
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = currentWordIndex;
    for(var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
    }
};

// Updates the image depending on how many guesses have been made//
function updatehangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".jpg";
    
};
    
document.onkeydown = function(event) {
    //Everytime the down key is pressed, the function begins//
    //If the game is finished, then the game reset. 65 is the key-code for the letter "a"//
    //and 90 is the key-code for the letter "z"//
    // Check to make sure a-z was pressed//
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
    if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if(remainingGuesses > 0) {
        if(!gameStarted) {
            gameStarted = false;
        }

        // Make sure we didn't use this letter yet
        if(guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

//This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
// Array to store positions of letters in string
    var positions = [];

// Loop through word finding all instances of guessed letter, store the indicies in an array.
    for(var i = 0; i < Retrowords[currentWordIndex].length; i++) {
        if(Retrowords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if(positions.length <= 0) {
        remainingGuesses--;
        updatehangmanImage();
    } else {
    // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
}

};
