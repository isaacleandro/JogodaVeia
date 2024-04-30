
const board = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';
let gameActive = true;
let winnerHistory = [];

function updateGameHistory(winner) {
 winnerHistory.push(winner);

 renderGameHistory();
}

function renderGameHistory() {
  const gameHistoryElement = document.getElementById('winnerHistory');
  
  winnerHistoryElement.innerHTML = '';

  winnerHistory.forEach((winner, index) => {
      const winnerElement = document.createElement('li');
      winnerElement.innerText = `Jogo ${index + 1}: ${winner}`;
      winnerHistoryElement.appendChild(winnerElement);
  });
}

const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6], //diagonal
]

function resetGame() {
    board.fill('');

    document.getElementById("status").innerText = `Jogador ${currentPlayer} é sua vez!`;

    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");

    gameActive = true;
}
function checkWinner() {
    for (let i = 0; i < winningCombination.length; i++) {
        const [a, b, c] = winningCombination[i];

        if (board[a] && (board[a] === board[b] && board[a] === board[c])) {
            return board[a];
        }
    }
    return null;
}
    function handleClick(index) {
        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;

        document.getElementById(`cell-${index}`).innerText = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            document.getElementById("status").innerText = `Jogador ${winner} venceu!`;
            gameActive = false;

            updateGameHistory(winner);
        } else if (!board.includes("")) {
            document.getElementById("status").innerText = `Empate!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            document.getElementById("status").innerText = `Jogador ${currentPlayer} é sua vez!`;
        }

        console.log("ganhador: ", winner);
        
    }

