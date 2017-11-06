// Hangman | By Juliette Rapala
// =====================================================================================


// Steps:
//
// 
//
// 
//
// Every guess = decrease by 1
// Check if letter was already guessed
// If out of guesses, you lose! 
//
  				// if (letterFound) {
  				// 	console.log("\nCORRECT!!!");
  				// } else {
  				// 	console.log("\nINCORRECT!!!");
  				// }

	// Setup Variables 
	// =====================================================================================

		// NPM packages
		var inquirer = require('inquirer');

		var guessed = false;
		var guessesRemaining;

	// Functions
	// =====================================================================================

		// Game Play Function
		var gamePlay = {
			currentWord : null,
			guessesRemaining : 0,
			guessedLetters : [],
			startGame : function() {
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
				this.promptUser();
			},
			promptUser : function() {
				var self = this;
				// Ask user for a letter
				inquirer.prompt([{
					name: "userLetter",
      				type: "input",
      				message: "Guess a letter!"
				}]).then(function(response) {
					// Take letter passed in by user
					var guessedLetter = response.userLetter;
					// Add letter to list of guessed letters
					self.guessedLetters.push(guessedLetter);
					// Check if letter is in word
					var letterFound = self.currentWord.checkLetter(guessedLetter);
					// Refresh gameboard	
					self.currentWord.createGameboard();
					// Check if a letter was guessed correctly	
					if (letterFound) {
						console.log("\nCORRECT!!!\n");
					} else {
						console.log("\nINCORRECT!!!\n");
						self.guessesRemaining--;
						// Display remaining guesses if there are more than 0
						if (self.guessesRemaining > 0) {
							console.log(`${self.guessesRemaining} guesses remaining!!!\n`);
						};
					}
					// If the user has guesses remaining, prompt for another guess
					if (self.guessesRemaining > 0) {
						self.promptUser();
					// If the user has run out of guesses, end game and display word.
					} else if (self.guessesRemaining === 0) {
						console.log(`Sorry, you lose! The word was "${self.currentWord.word}"\n`);
					}

				});

				// console.log(this.currentWord.letters);
			}
		};

		// Word Chooser Function
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
			this.letters = [];
			this.wordGuessed = false;
			this.display = function() {
				console.log(`The word is ${this.word}\n`);
			};
			this.createLetterObjects = function() {
				for (var i = 0; i < this.word.length; i++) {
      				var newLetter = new LetterConstructor(this.word[i]);
      				this.letters.push(newLetter);
    			}
  			};
  			this.createGameboard = function() {
    			var gameboard = '';
    			for (var i = 0; i < this.letters.length; i++) {
    				var currentLetter = this.letters[i].letterVisibility();
    				gameboard += currentLetter;
    			};
    			// Display gameboard
    			console.log("\n" + gameboard + "\n");
  			};
  			this.checkLetter = function(userLetter) {
  				var letterFound = false;
  				for (var i = 0; i < this.letters.length; i++) {
  					if (this.letters[i].letter === userLetter) {
  						this.letters[i].showLetter = true;
  						letterFound = true;
  					};
  				};
  				if (letterFound) {
  					return true;
  				} else {
  					return false;
  				}
  			};
			// Word: Used to create an object representing the current word the user is attempting to guess. 
			// This should contain word specific logic and data.
		};		

		// Letter Constructor Function
		var LetterConstructor = function(letter) {
			this.letter = letter;
			this.showLetter = false;
			this.displayLetter = function() {
				console.log(this.letter);
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