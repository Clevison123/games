const gameBoard = document.querySelector("#gameBoard"); 
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

// Botões mobile
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";

const ballRadius = 12.5;
const paddleSpeed = 50;

let intervalID;
let ballSpeed = 1;
let ballx = gameWidth / 2;
let bally = gameHeight /2;
let ballxDirection = 0;
let ballyDirection = 0;

let player1Score = 0;
let player2Score = 0;

let paddle1 = { width: 25, height: 100, x: 0, y: 0 };
let paddle2 = { width: 25, height: 100, x: gameWidth - 25, y: gameHeight/2 - 50 };

// Eventos desktop
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Eventos mobile
upBtn.addEventListener("click", () => movePaddle("UP"));
downBtn.addEventListener("click", () => movePaddle("DOWN"));

// Swipe para mobile
let touchStartY = 0;
gameBoard.addEventListener("touchstart", e => touchStartY = e.touches[0].clientY);
gameBoard.addEventListener("touchend", e => {
  let dy = e.changedTouches[0].clientY - touchStartY;
  if(dy < -10) movePaddle("UP");
  else if(dy > 10) movePaddle("DOWN");
});

gameStart();

// ====== Iniciar Jogo ======
function gameStart() {
  createBall();
  nextTick();
};

// ====== Loop do jogo ======
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    moveAI();
    drawBall(ballx, bally);
    checkCollision();
    nextTick();
  }, 10)
};

// ====== Limpar o tabuleiro ======
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
};

// ====== Desenhar raquetes ======
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;
  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
};

// ====== Criar bola ======
function createBall() {
  ballSpeed = 1;
  ballxDirection = Math.random() < 0.5 ? 1 : -1;
  ballyDirection = Math.random() < 0.5 ? 1 : -1;
  ballx = gameWidth / 2;
  bally = gameHeight /2;
  drawBall(ballx, bally);
};

// ====== Mover bola ======
function moveBall() {
  ballx += (ballSpeed * ballxDirection);
  bally += (ballSpeed * ballyDirection);
};

// ====== Desenhar bola ======
function drawBall(ballx, bally) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballx, bally, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
};

// ====== Colisões ======
function checkCollision() {
  if(bally <= 0 + ballRadius || bally >= gameHeight - ballRadius){
    ballyDirection *= -1;
  }

  if(ballx <= 0){
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }

  if(ballx >= gameWidth){
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }

  if(ballx <= (paddle1.x + paddle1.width + ballRadius)){
    if(bally > paddle1.y && bally < paddle1.y + paddle1.height){
      ballx = (paddle1.x + paddle1.width) + ballRadius;
      ballxDirection *= -1;
      ballSpeed += 0.2;
    }
  }

  if(ballx >= (paddle2.x - ballRadius)){
    if(bally > paddle2.y && bally < paddle2.y + paddle2.height){
      ballx = paddle2.x - ballRadius;
      ballxDirection *= -1;
      ballSpeed += 0.2;
    }
  }
};

// ====== Controle jogador 1 desktop ======
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;   // W
  const paddle1Down = 83; // S
  if(keyPressed === paddle1Up) movePaddle("UP");
  if(keyPressed === paddle1Down) movePaddle("DOWN");
}

// ====== Movimento paddle1 ======
function movePaddle(direction){
  if(direction === "UP" && paddle1.y > 0) paddle1.y -= paddleSpeed;
  if(direction === "DOWN" && paddle1.y < gameHeight - paddle1.height) paddle1.y += paddleSpeed;
}

// ====== Controle IA (paddle2) ======
function moveAI() {
  const paddleCenter = paddle2.y + paddle2.height / 2;
  if(paddleCenter < bally) paddle2.y += 3;
  if(paddleCenter > bally) paddle2.y -= 3;
  if(paddle2.y < 0) paddle2.y = 0;
  if(paddle2.y > gameHeight - paddle2.height) paddle2.y = gameHeight - paddle2.height;
}

// ====== Atualizar pontuação ======
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
};

// ====== Resetar jogo ======
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1.y = 0;
  paddle2.y = gameHeight/2 - paddle2.height/2;
  ballSpeed = 1;
  ballx = gameWidth / 2;
  bally = gameHeight /2;
  ballxDirection = 0;
  ballyDirection = 0;
  updateScore();
  clearTimeout(intervalID);
  gameStart();
};
