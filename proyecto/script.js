let currentPlayer = "X";
let board = Array(9).fill("");
let gameActive = true;
let mode = "2";
let player1 = "Jugador 1";
let player2 = "Bot";
let score = { X: 0, O: 0 };

function startGame() {
  player1 = document.getElementById("name1").value || "Jugador 1";
  player2 = document.getElementById("name2").value || "Bot";
  mode = document.getElementById("mode").value;

  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";

  createGrid();
  updateTurn();
  updateScore();
}

function createGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  board.forEach((_, i) => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.onclick = () => makeMove(i);
    grid.appendChild(cell);
  });
}

function makeMove(i) {
  if (board[i] !== "" || !gameActive) return;

  document.getElementById("clickSound").play();

  board[i] = currentPlayer;
  render();

  if (checkWinner(currentPlayer)) {
    document.getElementById("winSound").play();
    document.getElementById("result").innerText = currentPlayer + " gana!";
    score[currentPlayer]++;
    updateScore();
    gameActive = false;

    // Reinicia automáticamente después de un pequeño delay
    setTimeout(restart, 1500);
    return;
  }

  if (!board.includes("")) {
    document.getElementById("result").innerText = "Empate";
    gameActive = false;

    // Reinicia automáticamente después de un pequeño delay
    setTimeout(restart, 1500);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurn();

  if (mode === "bot" && currentPlayer === "O") {
    setTimeout(botMove, 300);
  }
}

function botMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  makeMove(move);
}

function minimax(board, depth, isMaximizing) {
  if (checkWinner("O")) return 10 - depth;
  if (checkWinner("X")) return depth - 10;
  if (!board.includes("")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function render() {
  document.querySelectorAll(".cell").forEach((c, i) => {
    c.innerText = board[i];
  });
}

function updateTurn() {
  let name = currentPlayer === "X" ? player1 : player2;
  document.getElementById("turn").innerText = "Turno: " + name;
}

function updateScore() {
  document.getElementById("score").innerText = `Puntaje → X: ${score.X} | O: ${score.O}`;
}

function checkWinner(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return wins.some(c => c.every(i => board[i] === player));
}

function restart() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("result").innerText = "";
  createGrid();
  updateTurn();
}

function backMenu() {
  document.getElementById("game").style.display = "none";
  document.getElementById("menu").style.display = "block";
  restart();
}