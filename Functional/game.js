// Intended for Computer Programming 1/2 students
// Vanilla JS implementation of TicTacToe, with a simple AI opponent

// Global variables
let board = []; // 3x3 array representing the game board; initialized in init()
let currentPlayer = 'X';
let gameOver = false;

// Elements
let statusEl = document.getElementById('status');
let gameEl = document.getElementById('game');

// Display the game state
let render = () => {
    let boardEl = document.createElement('table');
    for (let row of board) {
        let rowEl = document.createElement('tr');
        for (let cell of row) {
            let cellEl = document.createElement('td');
            cellEl.textContent = cell;
            rowEl.appendChild(cellEl);
        }
        boardEl.appendChild(rowEl);
    }
    gameEl.innerHTML = '';
    gameEl.appendChild(boardEl);
}

// Initialize the game
let init = () => {
    let board = [];
    // Create a 3x3 board
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push('_');
        }
    }
}

let checkWin = () => {
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

let playTile = (row, col) => {
    if (board[row][col] === '_') {
        board[row][col] = currentPlayer;
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        render();
    }
}

let aiMove = () => {
    // Pick the first empty cell
    for (let y in board) {
        for (let x in board[y]) {
            if (board[y][x] === '_') {
                playTile(y, x);
                return;
            }
        }
    }
}

let handleClick = (event) => {
    if (gameOver) return;
    let row = event.target.parentElement.rowIndex;
    let col = event.target.cellIndex;
    playTile(row, col);
    if (checkWin()) {
        statusEl.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        gameOver = true;
        return;
    }
    if (checkTie()) {
        statusEl.textContent = 'It\'s a tie!';
        gameOver = true;
        return;
    }
    if (currentPlayer === 'O') {
        aiMove();
    }
    if (checkWin()) {
        statusEl.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        gameOver = true;
        return;
    }
    if (checkTie()) {
        statusEl.textContent = 'It\'s a tie!';
        gameOver = true;
        return;
    }
}

// Init after the DOM is ready
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('click', handleClick);