// Hangman | By Juliette Rapala
// =====================================================================================


// Steps:
//
// 
//
// Prevent uppercase or numbers
// Ask to start new game if win/lose
// Check if letter was already guessed
// Combine word chooser function


	// Setup Variables 
	// =====================================================================================

		// NPM packages & exports
		var inquirer = require('inquirer');
		var WordConstructor = require('./wordConstructor.js');

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
					// Check if word was found 
					var wordFound = self.currentWord.checkIfWordFound();
					if (wordFound) {
						console.log("You won!");
					} else {
						// Refresh gameboard	
						self.currentWord.createGameboard();
						// Check if a letter was guessed correctly	
						if (letterFound) {
							console.log("\nCORRECT!!!\n");
						} else {
							console.log("\nINCORRECT!!!\n");
							self.guessesRemaining--;
							// Display remaining guesses if there are more than 0
							if (self.guessesRemaining === 1) {
								console.log(`${self.guessesRemaining} guess remaining!!!\n`);
							} else if (self.guessesRemaining > 0) {
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
					};

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


	// Start up Function
	// =====================================================================================

		gamePlay.startGame();