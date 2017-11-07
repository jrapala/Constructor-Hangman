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

// Export
module.exports = LetterConstructor;