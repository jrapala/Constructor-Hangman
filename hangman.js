// Hangman | By Juliette Rapala
// =====================================================================================
//
// Run this file using node.js to play Hangman!
//
//

	// Setup Variables 
	// =====================================================================================

		// Required exports
		var gameLogic = require('./gameLogic.js');

	// Functions
	// =====================================================================================

		var hangman = function() {
			gameLogic.welcome();
			gameLogic.startGame();
		};

	// Start up Function
	// =====================================================================================

		hangman();



// TO DO LIST:
//
// Check if letter was already guessed
// Win/Loss counter
