'use strict'
class TicTacToe {
    constructor() {
    	this.matrix = new Array(3);
    	this.currPlayer='x';
    	for(var i = 0; i < 3; i++)
    		this.matrix[i] = new Array(3);
    	for(var row = 0; row < 3; row++) 
   			for(var col = 0; col < 3; col++) 
        		this.matrix[row][col] = null;
        this.winner = null;
        this.numTurn = 0;
        this.finished = false;
    }

    whoIsWiner(){
    	var xxx = 0, ooo = 0;
    	for(var row = 0; row < 3; row++){
    		xxx = 0; ooo = 0;
   			for(var col = 0; col < 3; col++){ 
   				if (this.matrix[row][col] == 'x')
   					xxx++;
   				if (this.matrix[row][col] == 'o')
   					ooo++;
        	}
        	if ((xxx == 3) || (ooo == 3)){
        		this.winner = this.matrix[row][0];
        		this.finished = true;
        	}
        }
        for(var col = 0; col < 3; col++){
    		xxx = 0; ooo = 0;
   			for(var row = 0; row < 3; row++){ 
   				if (this.matrix[row][col] == 'x')
   					xxx++;
   				if (this.matrix[row][col] == 'o')
   					ooo++;
        	}
        	if ((xxx == 3) || (ooo == 3)){
        		this.winner = this.matrix[0][col];
        		this.finished = true;
        	}
        }
        if (((this.matrix[0][0] == this.matrix[1][1]) && (this.matrix[2][2] == this.matrix[1][1])) || 
           ((this.matrix[0][2] == this.matrix[1][1]) && (this.matrix[2][0] == this.matrix[1][1])))
            if (this.matrix[1][1] != null){
           	    this.winner = this.matrix[1][1];
        	    this.finished = true;
           }
        if (this.numTurn == 9) this.finished = true;

    }

    getCurrentPlayerSymbol() {return this.currPlayer;}

    nextTurn(rowIndex, columnIndex) {
    	if (this.matrix[rowIndex][columnIndex] == null){
    		if (this.currPlayer == 'x'){
    			this.matrix[rowIndex][columnIndex] = 'x';
    			this.currPlayer = 'o';
    		}
    		else{
    			this.matrix[rowIndex][columnIndex] = 'o';
    			this.currPlayer = 'x';
    		}
    		this.numTurn++;    	
        }
    }

    isFinished() {
    	this.whoIsWiner();
    	return this.finished;
    }

    getWinner() {
    	this.whoIsWiner();
    	return this.winner;
    }

    noMoreTurns() {return (this.numTurn == 9);}

    isDraw() {
    	this.whoIsWiner();
    	return ((this.winner == null) && this.isFinished());
    }

    getFieldValue(rowIndex, colIndex) {return this.matrix[rowIndex][colIndex];}
}

module.exports = TicTacToe;
