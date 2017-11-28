// Setup Variables 
// =====================================================================================

	// NPM packages & exports
	var inquirer = require('inquirer');
	var chalk = require('chalk');
	var isLetter = require('is-letter');
	var WordConstructor = require('./wordConstructor.js');

	// Game Logic Function
	var gameLogic = {
		currentWord : null,
		guessesRemaining : 0,
		guessedLetters : [],
		letterAlreadyGuessed : false,
		// Word choosing object
		wordChooser : {
			// Word list
			wordsList : ['apple', 'apricot', 'avocado', 'banana', 'berry', 'blackberry', 'blood orange', 'blueberry', 'boysenberry', 'breadfruit', 'cantaloupe', 'cherry', 'citron', 'citrus', 'coconut', 'crabapple', 'cranberry', 'date', 'dragonfruit', 'durian', 'elderberry', 'fig', 'grape', 'grapefruit', 'guava', 'honeydew', 'jackfruit', 'kiwi', 'kumquat', 'lemon', 'lime', 'lingonberry', 'loquat', 'lychee', 'mandarin orange', 'mango', 'marionberry', 'melon', 'mulberry', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'persimmon', 'pineapple', 'plantain', 'plum', 'pluot', 'pomegranate', 'pomelo', 'quince', 'raspberry', 'star fruit', 'strawberry', 'tangelo', 'tangerine', 'ugli fruit', 'watermelon'],
			//wordsList : ['blood orange'],
			// Random Number
			randomNumber : 0,
			// Current word to guess 
			randomWord : null,
			// Pick mystery word at random
			chooseRandomWord : function(){
				// Find random number between 0 and length of word list
				this.randomNumber = Math.floor(Math.random()* this.wordsList.length);	
				// Pick random workd and cover it to uppercase	
				this.randomWord = this.wordsList[this.randomNumber].toUpperCase();		
			}
		},
		welcome : function(){
			// Welcome Screen
			console.log(chalk.bold("\n\n\nW e l c o m e   t o   H a n g m a n !\n"));
			console.log('\n  _______','\n |/      |','\n |      (_)','\n |      \\|/','\n |       |','\n |      / \\','\n |','\n_|___\n\n\n');
		},
		startGame : function() {
			// Choose random word
			this.wordChooser.chooseRandomWord();
			// Create word object
			this.currentWord = new WordConstructor(this.wordChooser.randomWord);
			// Create letter objects
			this.currentWord.createLetterObjects();
			// Debug display
			// this.currentWord.display();
			// Remaining guesses
			this.guessesRemaining = this.currentWord.numLetters;
			console.log(`You have guesses ${this.guessesRemaining} remaining.\n`);
			// Create gameboard
			this.currentWord.createGameboard();
			this.promptUser();
		},
		promptUser : function() {
			this.letterAlreadyGuessed = false;
			var self = this;
			// Ask user for a letter
			inquirer.prompt([{
				name: "userLetter",
  				type: "input",
  				message: "Guess a letter!",
  				// Validate letter
  				validate: function(userInput) {
        			if (isLetter(userInput)) {
          				return true;
        			} else {
        				console.log("\n\nYou did not choose a letter. Please try again!\n");
          				return false;
        			}
      			}
			}]).then(function(response) {
				// Take letter passed in by user
				var guessedLetter = response.userLetter.toUpperCase();
				// Chec if the letter was already guessed
				self.letterAlreadyGuessed = self.checkIfLetterAlreadyGuessed(guessedLetter);
				if (self.letterAlreadyGuessed) {
					console.log("\nYou already guessed that letter! Please try again!\n");
					self.promptUser();
				} else {
					// Add letter to list of guessed letters
					self.guessedLetters.push(guessedLetter);
					// Check if letter is in word
					var letterFound = self.currentWord.checkLetter(guessedLetter);
					// Check if word was found 
					var wordFound = self.currentWord.checkIfWordFound();
					if (wordFound) {
						console.log("\nCORRECT!!!");
						console.log("You won!");
						console.log(`The word was "${self.currentWord.word}"!\n`);
						self.playAgain();
					} else {
						// Refresh gameboard	
						self.currentWord.createGameboard();
						// Check if a letter was guessed correctly	
						if (letterFound) {
							console.log(chalk.green("\nCORRECT!!!\n"));
						} else {
							console.log(chalk.red("\nINCORRECT!!!\n"));
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
							console.log(chalk.bold(`Sorry, you lose! The word was "${self.currentWord.word}"\n`));
							self.playAgain();
						}
					};
				}
			});
		},
		checkIfLetterAlreadyGuessed : function(guessedLetter) {
			for (var i = 0; i<this.guessedLetters.length; i++) {
				if (guessedLetter === this.guessedLetters[i]) {
					return true;
				} 
			}
			return false;
		},
		playAgain : function() {
			this.guessedLetters = [];
			var self = this;
			inquirer.prompt([{
				name: "userChoice",
  				type: "input",
  				message: "Would you like to play again? (Y/N)"
			}]).then(function(response) {
				if (response.userChoice.toUpperCase() === "Y") {
					self.startGame();
				} else {
					console.log("\nThanks for playing!\n");
				}
			});
		}
	};

// Export
module.exports = gameLogic;