let board = ["", "", "", "", "", "", "", "", ""];
let player = 1; // 1 for Player 1 (X), 0 for Player 2 (O)

const gameBoard = () => {
    for (let i = 0; i < board.length; i++) {
        let cell = document.getElementById(`cell-${i}`);
        if (cell) {
            cell.innerText = ""; // Clear previous cell values for a new game
            cell.addEventListener('click', play);
        }
    }
    document.getElementById("message").innerText = "Player 1's Turn";
};

const checkWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes("") ? null : "Tie";
};

const nextTurn = () => {
    player = 1 - player; // Toggle between 1 and 0
    return player === 1 ? "Player 1's Turn" : "Player 2's Turn";
};

const play = (event) => {
    let cell = event.target;
    let cellIndex = parseInt(cell.id.split('-')[1]);

    if (board[cellIndex] === "") {
        board[cellIndex] = player === 1 ? "X" : "O";
        cell.innerText = board[cellIndex];
        let winner = checkWinner(board);

        if (winner) {
            document.getElementById("message").innerText = winner === "Tie" ? "It is a Tie!" : `${winner === "X" ? "Player 1" : "Player 2"} Wins!!`;
            disableBoard();
        } else {
            document.getElementById("message").innerText = nextTurn();
        }
    }
};

const disableBoard = () => {
    for (let i = 0; i < board.length; i++) {
        let cell = document.getElementById(`cell-${i}`);
        cell.removeEventListener('click', play);
    }
};

// Ensure the game starts with the button click
document.querySelector("button").addEventListener('click', () => {
    // Reset the board
    board = ["", "", "", "", "", "", "", "", ""];
    gameBoard();
});
