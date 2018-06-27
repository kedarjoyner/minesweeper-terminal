
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



// iterate through each board row
// join individual board elements with line separator
// join all rows together with enter separator
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');

printBoard(playerBoard);

console.log('Bomb Board: ');

printBoard(bombBoard);