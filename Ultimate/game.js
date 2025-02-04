// Intended for Computer Programming 1/2 students
// Vanilla JS implementation of Ultimate TicTacToe, with a simple AI opponent

// Global variables
let boards = []; // 3x3 array representing the game boards, each of which is a 3x3 array; initialized in init()
let mainBoard = []; // 3x3 array representing the main board; initialized in init()
let currentPlayer = 'X';
let currentBoard = [-1, -1]; // [row, col]
let gameOver = false;

// Elements
let playerEl = document.getElementById('player');
let statusEl = document.getElementById('status');
let gameEl = document.getElementById('game');

// Display the game state
let render = () => {
    let boardsEl = document.createElement('table');
    for (let boardRow in boards) {
        let boardRowEl = document.createElement('tr');
        for (let boardCol in boards[boardRow]) {
            let board = boards[boardRow][boardCol];
            let boardEl = document.createElement('td');
            let boardTable = document.createElement('table');
            console.log(currentBoard);
            console.log(boardRow, boardCol);
            let allBoardsActive = currentBoard[0] == -1 
            let unwonBoard = mainBoard[boardRow][boardCol] === '_';
            if (unwonBoard && (allBoardsActive || (currentBoard[0] == boardRow && currentBoard[1] == boardCol))) {
                boardEl.classList.add("active")
                console.log(boardEl);
            }
            for (let row of board) {
                let rowEl = document.createElement('tr');
                for (let cell of row) {
                    let cellEl = document.createElement('td');
                    cellEl.textContent = cell;
                    rowEl.appendChild(cellEl);
                }
                boardTable.appendChild(rowEl);
            }
            boardEl.appendChild(boardTable);
            boardRowEl.appendChild(boardEl);
        }
        boardsEl.appendChild(boardRowEl);
    }
    gameEl.innerHTML = '';
    gameEl.appendChild(boardsEl);
    playerEl.textContent = `Player: ${currentPlayer}`;
}

// Initialize the game
let init = () => {
    // Create 3x3 boards
    for (let i = 0; i < 3; i++) {
        boards[i] = [];
        for (let j = 0; j < 3; j++) {
            boards[i][j] = [];
            for (let k = 0; k < 3; k++) {
                boards[i][j].push([]);
                for (let l = 0; l < 3; l++) {
                    boards[i][j][k].push('_');
                }
            }
        }
    }
    // Create the main board
    for (let i = 0; i < 3; i++) {
        mainBoard[i] = [];
        for (let j = 0; j < 3; j++) {
            mainBoard[i].push('_');
        }
    }
    // Display the board
    render();
}

let checkWin = (board) => {
    // Check rows
    for (let row of board) {
        if (row[0] !== '_' && row[0] === row[1] && row[1] === row[2]) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '_' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return true;
        }
    }
    // Check diagonals
    if (board[0][0] !== '_' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
    }
    if (board[0][2] !== '_' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
    }
    return false;
}

let checkTie = () => {
    for (let row of board) {
        for (let cell of row) {
            if (cell === '_') {
                return false;
            }
        }
    }
    return true;
}

let playTile = (boardRow, boardCol, row, col) => {
    let allBoardsActive = currentBoard[0] == -1 
    let unwonBoard = mainBoard[boardRow][boardCol] === '_';
    if ( !allBoardsActive
        && !unwonBoard
        && (boardRow !== currentBoard[0] || boardCol !== currentBoard[1])) return;
    if (boards[boardRow][boardCol][row][col] === '_') {
        boards[boardRow][boardCol][row][col]  = currentPlayer;
        // Check if the board has been won
        if (checkWin(boards[boardRow][boardCol])) {
            mainBoard[boardRow][boardCol] = currentPlayer;
        }
        // Switch boards
        if (mainBoard[row][col] === '_')
            currentBoard = [row, col];
        else // If the board is won, allow the player to play anywhere
            currentBoard = [-1, -1];
        // Check if the main board has been won
        if (checkWin(mainBoard)) {
            statusEl.textContent = `${currentPlayer} wins!`;
            gameOver = true;
            return;
        }
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        render();
    }
}

let aiMove = () => {
    // Pick the first empty cell
    // for (let y in board) {
    //     for (let x in board[y]) {
    //         if (board[y][x] === '_') {
    //             playTile(y, x);
    //             return;
    //         }
    //     }
    // }
}

let handleClick = (event) => {
    if (gameOver) return;
    // ew
    let boardRow = event.target.parentElement.parentElement.parentElement.parentElement.rowIndex;
    let boardCol = event.target.parentElement.parentElement.parentElement.cellIndex;
    let row = event.target.parentElement.rowIndex;
    let col = event.target.cellIndex;
    console.log(boardRow, boardCol, row, col);
    playTile(boardRow,boardCol,row, col);
    if (currentPlayer === 'O') {
        aiMove();
    }
}

// Init after the DOM is ready
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('click', handleClick);