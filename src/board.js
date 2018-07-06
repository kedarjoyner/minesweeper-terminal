/*
* This module contains the Board class
* which contains all of the functional logic 
* necessary to play the minesweeper game
*/

class Board {

    constructor(numberOfRows, numberOfColumns, numberOfBombs) {

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        // generate player board from static function
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        // generate bomb board from static function
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard(){
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        // Check if specified tile in playerBoard is not empty   
        if (this._playerBoard[rowIndex][columnIndex] !== ' ')  {
            console.log('This tile has already been flipped!');
            return;
        }
        if(this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        } 
        this._numberOfTiles--;
    }
    // Detect the number of neighboring bombs based on row and column index

    getNumberOfNeighborBombs(rowIndex, columnIndex) {

        // All possible adjacent options to a flipped tile
        const neighborOffsets = [
            [-1, -1], 
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];

        // Finds the number of rows on the bomboard
        const numberOfRows = this._bombBoard.length;

        // Finds the number of columns in a row
        const numberOfColumns = this._bombBoard[0].length;

        // Stores the number of bombs adjacent to a flipped tile
        let numberOfBombs = 0;

        // Use the row and column offsets to check the neighbors around a flipped tile
        neighborOffsets.forEach( offset => {


            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];

            // Conditions that must be passed before incrementing the number of bombs
            if ( neighborRowIndex >= 0  && neighborRowIndex < numberOfRows && 
                neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ) {
                if ( this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ) {
                    numberOfBombs++;
                }
            } 

        });
        // log the no. of bombs so we can see 'em!
       // console.log(`I found ${this._numberOfBombs} bombs`);   
        return numberOfBombs;

    }
    hasSafeTiles(){
        return this._numberOfTiles !== this._numberOfBombs;
    }
    // iterate through each board row
    // join individual board elements with line separator
    // join all rows together with enter separator
    print() {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
        //console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
    }

    // Dynamically generate player board

    static generatePlayerBoard(numberOfRows, numberOfColumns) {

        let board = [];

        for (let rowCounter = 0; rowCounter < numberOfRows; rowCounter++) {

            let row = [];

            for(let columnCounter = 0; columnCounter < numberOfColumns; columnCounter++ ) {

                row.push(' ');
            }
            board.push(row);
        }
        
        return board;
    }
    // Dynamically generate bomb board

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs ) {
        let board = [];

        for (let rowCounter = 0; rowCounter < numberOfRows; rowCounter++) {

            let row = [];

            for(let columnCounter = 0; columnCounter < numberOfColumns; columnCounter++ ) {

                row.push(null);
            }
            board.push(row);
            }

        let numberOfBombsPlaced = 0;

        while( numberOfBombsPlaced < numberOfBombs ) {

            // Generate a random row index
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);

            // Generate a random column index
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

            // Check if bomb already exists
            if ( board[randomRowIndex][randomColumnIndex] !== 'B' ) {

                // Place bomb if one doesn't already exist
                board[randomRowIndex][randomColumnIndex] = 'B';

                // Increment numberOfBombsPlace
                numberOfBombsPlaced++;
            } 
        }
    
        return board;
    }
}

export default Board;