// Letter Constructor Function
var LetterConstructor = function(letter) {
	this.letter = letter;
	// Gameboard visibility
	this.showLetter = false;
	this.displayLetter = function() {
		console.log(this.letter);
	};
	// Letter display function
	this.letterVisibility = function() {
		// Blank spaces
		if (this.letter === ' ') { 
			this.showLetter = true;
			return '  ';
		}
		// Unguessed letter
		if (this.showLetter === false) { 
			return '_ ';
		// Visible letter
		} else {
			return (this.letter + " ");
		}
	};
}

// Export
module.exports = LetterConstructor;