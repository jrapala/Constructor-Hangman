// Required exports
var LetterConstructor = require('./LetterConstructor.js');
var isLetter = require('is-letter');


// Word Constructor Function
var WordConstructor = function(word) {
	this.word = word;
	// Array of letter objects
	this.letters = [];
	this.wordGuessed = false;
	this.numLetters = 0;
	this.display = function() {
		console.log(`The word is ${this.word}\n`);
	};
	this.createLetterObjects = function() {
		for (var i = 0; i < this.word.length; i++) {
			// Create a new letter object for every letter in the word
			var newLetter = new LetterConstructor(this.word[i]);
			// Add letter object to array
			this.letters.push(newLetter);
			// Count number of letters in word
			if (isLetter(this.word[i])) {
				this.numLetters++;
			}
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
	this.checkIfWordFound = function() {
		var wordFound = true;
		for (var i = 0; i < this.letters.length; i++) {
			if (this.letters[i].showLetter === false)
				wordFound = false;
		};
		return wordFound; 
	}
	// Word: Used to create an object representing the current word the user is attempting to guess. 
	// This should contain word specific logic and data.
};		


// Export
module.exports = WordConstructor;