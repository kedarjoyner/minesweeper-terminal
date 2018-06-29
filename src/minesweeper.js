
// Dynamically generate player board

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {

    let board = [];

    for (let rowCounter = 0; rowCounter < numberOfRows; rowCounter++) {

        let row = [];

        for(let columnCounter = 0; columnCounter < numberOfColumns; columnCounter++ ) {

            row.push(' ');
        }
        board.push(row);
    }
    
    return board;
};

// Dynamically generate bomb board

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs ) => {
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


        // Add control flow to eliminate placing bombs over existing bombs

    }
  
    return board;
};

// Detect the number of neighboring bombs based on row and column index

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {

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
    const numberOfRows = bombBoard.length;

    // Finds the number of columns in a row
    const numberOfColumns = bombBoard[0].length;

    // Stores the number of bombs adjacent to a flipped tile
    let numberOfBombs = 0;

    // Use the row and column offsets to check the neighbors around a flipped tile
    neighborOffsets.forEach( offset => {


        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];

        // Conditions that must be passed before incrementing the number of bombs
        if ( neighborRowIndex >= 0  && neighborRowIndex < numberOfRows && 
            neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ) {
            if ( bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ) {
                numberOfBombs++;
            }
        } 

    });


    // log the no. of bombs so we can see 'em!
    console.log(`I found ${numberOfBombs} bombs`);
  
    return numberOfBombs;

};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {

    // Check if specified tile in playerBoard is not empty

    if (playerBoard[rowIndex][columnIndex] != ' ')  {
        console.log('This tile has already been flipped!');
        return;
    } else if(bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    } 

}


// iterate through each board row
// join individual board elements with line separator
// join all rows together with enter separator
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);

let bombBoard = generateBombBoard(3, 3, 6);

//getNumberOfNeighborBombs(bombBoard, 3, 1);


console.log('Player Board: ');

printBoard(playerBoard);

console.log('Bomb Board: ');

printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Update Player Board:');

printBoard(playerBoard);