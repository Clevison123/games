// ====== Seletores ======
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");

// ====== Variáveis do Jogo ======
const gameWidth = 500;
const gameHeight = 500;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;

let running = false;
let xvelocity = unitSize;
let yvelocity = 0;
let foodX, foodY;
let score = 0;
let snake = [];

// ====== Inicializar Jogo ======
function initializeGame() {
  running = true;
  score = 0;
  scoreText.textContent = score;

  // Criar cobrinha inicial
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
  ];

  createFood();
  drawFood();
  nextTick();
}

// ====== Loop do Jogo ======
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 85);
  } else {
    displayGameOver();
  }
}

// ====== Funções de Desenho ======
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, unitSize, unitSize);
    ctx.strokeRect(part.x, part.y, unitSize, unitSize);
  });
}

// ====== Movimento da Cobrinha ======
function moveSnake() {
  const head = { x: snake[0].x + xvelocity, y: snake[0].y + yvelocity };
  snake.unshift(head);

  // Comer comida
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

// ====== Controle com Teclado ======
window.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  const goingUP = yvelocity === -unitSize;
  const goingDOWN = yvelocity === unitSize;
  const goingRIGHT = xvelocity === unitSize;
  const goingLEFT = xvelocity === -unitSize;

  switch (true) {
    case key === 37 && !goingRIGHT: xvelocity = -unitSize; yvelocity = 0; break;
    case key === 38 && !goingDOWN: xvelocity = 0; yvelocity = -unitSize; break;
    case key === 39 && !goingLEFT: xvelocity = unitSize; yvelocity = 0; break;
    case key === 40 && !goingUP: xvelocity = 0; yvelocity = unitSize; break;
  }
}

// ====== Controle Mobile (Botões) ======
upBtn.addEventListener("click", () => changeDirectionTouch("UP"));
downBtn.addEventListener("click", () => changeDirectionTouch("DOWN"));
leftBtn.addEventListener("click", () => changeDirectionTouch("LEFT"));
rightBtn.addEventListener("click", () => changeDirectionTouch("RIGHT"));

function changeDirectionTouch(direction) {
  const goingUP = yvelocity === -unitSize;
  const goingDOWN = yvelocity === unitSize;
  const goingRIGHT = xvelocity === unitSize;
  const goingLEFT = xvelocity === -unitSize;

  switch (direction) {
    case "LEFT": if (!goingRIGHT) { xvelocity = -unitSize; yvelocity = 0; } break;
    case "UP": if (!goingDOWN) { xvelocity = 0; yvelocity = -unitSize; } break;
    case "RIGHT": if (!goingLEFT) { xvelocity = unitSize; yvelocity = 0; } break;
    case "DOWN": if (!goingUP) { xvelocity = 0; yvelocity = unitSize; } break;
  }
}

// ====== Swipe Touch ======
let touchStartX = 0, touchStartY = 0;

gameBoard.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

gameBoard.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && xvelocity !== -unitSize) { xvelocity = unitSize; yvelocity = 0; }
    else if (dx < 0 && xvelocity !== unitSize) { xvelocity = -unitSize; yvelocity = 0; }
  } else {
    if (dy > 0 && yvelocity !== -unitSize) { xvelocity = 0; yvelocity = unitSize; }
    else if (dy < 0 && yvelocity !== unitSize) { xvelocity = 0; yvelocity = -unitSize; }
  }
});

// ====== Checar Game Over ======
function checkGameOver() {
  const head = snake[0];
  if (head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight) running = false;

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) running = false;
  }
}

// ====== Game Over ======
function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  running = false;
}

// ====== Reset ======
resetBtn.addEventListener("click", initializeGame);

// ====== Iniciar ======
initializeGame();
