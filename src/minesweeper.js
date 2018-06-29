
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

    // The first element is a row
    const numberOfRows = bombBoard.length;

    // The number of entries in a row represents the total number of columns
     const numberOfColumns = bombBoard[0].length;

    // Stores the number of bombs adjacent to a flipped tile
    let numberOfBombs = 0;

    // Use the row and column offsets to check the neighbors around a flipped tile
    neighborOffsets.forEach( offset => {


        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];

        if ( neighborRowIndex >= 0  && neighborRowIndex < rowIndex && 
            neighborColumnIndex >= 0 && neighborColumnIndex <= columnIndex ) {
            if ( bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ) {
                numberOfBombs++;
            }
        } 

    });
    
    console.log(`I found ${numberOfBombs} bombs`);
    return numberOfBombs;

};


// iterate through each board row
// join individual board elements with line separator
// join all rows together with enter separator
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);

let bombBoard = generateBombBoard(3, 3, 6);

getNumberOfNeighborBombs(bombBoard, 3, 1);


console.log('Player Board: ');

printBoard(playerBoard);

console.log('Bomb Board: ');

printBoard(bombBoard);

