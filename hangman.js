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
			guessesRemaining : 0,
			guessedLetters : [],
			startGame : function() {
				var self = this;
				console.log("\n\n\n\n\n\n\n\nWelcome to Hangman!\n");
				// Choose random word
				wordChooser.chooseRandomWord();
				// Create word object
				this.currentWord = new WordConstructor(wordChooser.randomWord);
				// Create letter objects
				this.currentWord.createLetterObjects();
				// Debug display
				this.currentWord.display();
				// Remaining guesses
				this.guessesRemaining = this.currentWord.word.length;
				console.log(`You have guesses ${this.guessesRemaining} remaining.\n`);
				// Create gameboard
				this.currentWord.createGameboard();
				inquirer.prompt([{
					name: "userLetter",
      				type: "input",
      				message: "Guess a letter!"
				}]).then(function(response) {
					// Take letter passed in by user
					var guessedLetter = response.userLetter;
					// Add letter to list of guessed letters
					self.guessedLetters.push(guessedLetter);	
					self.currentWord.createGameboard();			

				});


				// console.log(this.currentWord.letters);
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
			var self = this;
			this.word = word;
			this.letters = [];
			this.wordGuessed = false;
			this.display = function() {
				console.log(`The word is ${this.word}\n`);
			};
			this.createLetterObjects = function() {
				for (var i = 0; i < self.word.length; i++) {
      				var newLetter = new LetterConstructor(self.word[i]);
      				this.letters.push(newLetter);
    			}
  			};
  			this.createGameboard = function() {
    			var gameboard = '';
    			for (var i = 0; i < self.letters.length; i++) {
    				var currentLetter = self.letters[i].letterVisibility();
    				gameboard += currentLetter;

    			// self.letters.forEach(function(letter){
      	// 			var currentLetter = letter.letterVisibility();
      	// 			gameboard += currentLetter;
    			};

    			console.log(gameboard + "\n");
  			};

			// Word: Used to create an object representing the current word the user is attempting to guess. 
			// This should contain word specific logic and data.
		};		

		// Letter Constructor Function
		var LetterConstructor = function(letter) {
			var self = this;
			this.letter = letter;
			this.showLetter = false;
			this.displayLetter = function() {
				console.log(self.letter);
			};
			this.letterVisibility = function() {
				if (this.letter === ' ') { 
      				this.showLetter = true;
      				return '  ';
    			}
    			if (this.showLetter === false) { 
    				return '_ ';
    			} else {
    				return (this.letter + " ");
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