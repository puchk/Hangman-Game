// Create array of words
var wordBank = ["mario", "luigi", "bowser", "yoshi", "peach", "toad"];
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var chosenWord = "";
var chosenWordSpaces = [];
var chosenWordLetters = [];

var keyTyped = "";
var guess = "";
var remainingLetters = 0;

var wins = 0;
var losses = 0;
var numGuesses = 9;
var wrongGuesses = [];

var myAudio = document.getElementById("themeSong");
var isPlaying = true;
var coin = new Audio("assets/audio/coin.wav");
var hit = new Audio("assets/audio/hit.wav");

document.onkeyup = startGame();
function startGame(){
	// Set up blanks and answers
	alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
	chosenWordSpaces = [];
	numGuesses = 9;
	wrongGuesses = [];

	// Choose random word
	chosenWord = wordBank[Math.floor(Math.random()*wordBank.length)];

	// Sets question mark blocks
	for (i = 0; i < chosenWord.length; i++) {
		chosenWordSpaces[i] = "<div class='inlineStyle'><img src='assets/image/emptyBlock.gif' alt='' class='img-responsive marioBlock newBlock'><div class='caption'><p class='isQuestionMark'>?</p></div></div>";
	}
	document.getElementById("guessToStart").style.visibility = "visible";
	document.getElementById('winner').innerHTML = wins;
	document.getElementById('loser').innerHTML = losses;
	document.getElementById('blankWord').innerHTML = chosenWordSpaces.join(" ");
	document.getElementById('guessesLeft').innerHTML = numGuesses;
	document.getElementById('wrongLetters').innerHTML = wrongGuesses;
}

function endGame() {
	var questionInWord = false;

	// If chosenWordSpaces contains no question marks, then all letters have been guessed
	for(var i=0;i<chosenWordSpaces.length;i++) {
		if(chosenWordSpaces[i].indexOf("?") != -1) {
			questionInWord = true;
		}
	}
	// To win
	if(questionInWord==false && numGuesses>0) {
		setTimeout(function() { alert("You win! The answer was "+chosenWord+"."); }, 10);
		wins++;
		document.getElementById('winner').innerHTML = wins;
		setTimeout(function() {startGame(); }, 11);
	}
	// To lose
	if (numGuesses === 0 && questionInWord==true) {
		alert("You lose! The word was "+chosenWord+".");
		// document.getElementById("playButton").style.display = "block";
		losses++;
		document.getElementById('loser').innerHTML = losses;
		setTimeout(function() {startGame(); }, 11);
	}
}


document.onkeyup = function(event){
	//Start message disappears
	document.getElementById("guessToStart").style.visibility = "hidden";

	var letterInWord = false;
	var letterInAlphabet = false;
	// Converts key press to a letter
	keyTyped = String.fromCharCode(event.keyCode).toLowerCase();
	for (x=0; x < alphabet.length; x++) {
		if (keyTyped === alphabet[x]) {
			guess = keyTyped;
		}
	}
	// For correct guesses
	for(var i = 0; i < chosenWord.length; i++){
		if(chosenWord[i] === guess) {
			chosenWordSpaces[i] = "<div class='inlineStyle'><img src='assets/image/emptyBlock.gif' alt='' class='img-responsive marioBlock newBlock'><div class='caption'><p class='isQuestionMark'>"+guess+"</p></div></div>";
			document.getElementById('blankWord').innerHTML = chosenWordSpaces.join(" ");
			letterInWord = true;
			coin.play();
		}
	}
	// Removes guess from alphabet array
	for (x=0; x < alphabet.length; x++) {
		if (guess === alphabet[x]) {
			letterInAlphabet = true;
			alphabet.splice(x,1);
		}
	}
	// For wrong guesses
	if(letterInWord === false && letterInAlphabet === true) {
		numGuesses--;
		wrongGuesses.push(guess);
		document.getElementById('guessesLeft').innerHTML = numGuesses;
		document.getElementById('wrongLetters').innerHTML = wrongGuesses;
		hit.play();
	}
	// Checks if you win or lose
	endGame();
}

// Pauses and plays the background music when music button is pressed
function togglePlay() {
	  if (isPlaying) {
	    themeSong.pause()
	  } else {
	    themeSong.play();
	  }
	};
	myAudio.onplaying = function() {
	  isPlaying = true;
	};
	myAudio.onpause = function() {
	  isPlaying = false;
}
