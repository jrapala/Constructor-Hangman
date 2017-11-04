// Hangman | By Juliette Rapala
// =====================================================================================


// Steps:
//
// 1. Console.log a displayed word
// 2. Console.log a word populated by blanks
// 
//

	// Setup Variables 
	// =====================================================================================

		// NPM packages
		var inquirer = require('inquirer');

		var guessed = false;
		var guessesRemaining;

	// Functions
	// =====================================================================================

		// Game Play
		var gamePlay = {
			currentWord : null,
			startGame : function() {
				console.log("Welcome to Hangman!");
				// Choose random word
				wordChooser.chooseRandomWord();
				// Create word object
				this.currentWord = new WordConstructor(wordChooser.randomWord);
				// Debug display
				this.currentWord.display();
			}
		};

		// Word Chooser 
		var wordChooser = {
			// Word list
			wordsList : ['banana', 'apple', 'orange', 'peach'],
			// Random Number
			randomNumber : 0,
			// Current word to guess 
			randomWord : null,
			// Pick mystery word at random
			chooseRandomWord : function(){
				// Find random number between 0 and length of word list
				this.randomNumber = Math.floor(Math.random()* this.wordsList.length);		
				this.randomWord = this.wordsList[this.randomNumber];		
			}
		};

		// Word Constructor Function
		var WordConstructor = function(word) {
			this.word = word;
			this.display = function() {
				console.log(`The word is ${this.word}`);
			}
			// Word: Used to create an object representing the current word the user is attempting to guess. 
			// This should contain word specific logic and data.
		};		

		// Letter Constructor Function
		var LetterConstructor = function(letter) {
			this.letter = letter;
			this.showLetter = false;
			showLetterFunction = function() {
				if (this.letter === ' ') { 
      				this.showLetter = true;
      				return '  ';
    			}
    			if (this.showLetter === false) { 
    				return ' _ ';
    			} else {
    				return this.letter;
    			}
  			};

		}

			// this.guessesRemaining = this.randomWord.guessesAllowed;
			// this.display = function(){
			// 	console.log(`The random word is ${this.randomWord}. There are ${this.guessesRemaining} guesses remainin`);
			// }
			// this.lettersGuessed = ['a'];
			// this.letterArray = this.word.split("");
			// this.currentArray = [];
			// this.displayWord = '';
			// this.displayLetters = function() {
			// 	console.log(this.letterArray);
			// }
			// this.createGameboard = function(){
			// 	for (var i = 0; i<this.wordLength; i++) {
			// 		for (var j = 0; j<this.lettersGuessed.length; j++) { 
			// 			if (this.letterArray[i] === this.lettersGuessed[j]) {
			// 				this.currentArray.push(this.letterArray[i]);
			// 			} else {
			// 				this.currentArray.push("_");
			// 			};
			// 		}
			// 	}
			// 	this.displayWord = this.currentArray.join(' ');
			// }
			// this.displayGameboard = function() {
			// 	this.createGameboard();
			// 	console.log(this.displayWord);
			// }

			// Letter: Used for each letter in the current word. Each letter object should either display an 
			// underlying character, or a blank placeholder (such as an underscore), depending on whether or not 
			// the user has guessed the letter. This should contain letter specific logic and data.
		};

	// Gameplay Functions
	// =====================================================================================



	// Inquirer Functionality
	// =====================================================================================

		// inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
	 //    	// Use user feedback for... whatever!!
		// });


	// Start up Function
	// =====================================================================================

	// Start App
	// =====================================================================================

	gamePlay.startGame();