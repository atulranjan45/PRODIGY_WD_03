let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const statusElement = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWin();
        togglePlayer();
        updateStatus();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateStatus() {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            endGame(`${currentPlayer} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        endGame('It\'s a tie!');
    }
}

function endGame(message) {
    gameActive = false;
    statusElement.textContent = message;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
    });

    updateStatus();
}
