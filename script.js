const cells = document.querySelectorAll("[data-cell]");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameBoard[cellIndex] !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.setAttribute("data-cell", currentPlayer);
  gameBoard[cellIndex] = currentPlayer;

  if (checkGameStatus()) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      location.reload();
    }, 100);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkGameStatus() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      return true;
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    setTimeout(() => {
      alert("It's a draw!");
      location.reload(); 
    }, 100);
  }

  return false;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
