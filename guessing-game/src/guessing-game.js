class GuessingGame {
    constructor() {
    	this.min = null;
    	this.max = null;
    	this.new = null;
    }

    setRange(min, max) {
    	this.min=min;
    	this.max=max
    }

    guess() {
    	this.new = Math.ceil((this.min+this.max)/2);
    	return this.new;
    }

    lower() {
    	this.max = this.new;
    }

    greater() {
    	this.min = this.new;
    }
}

module.exports = GuessingGame;
