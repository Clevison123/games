const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
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
let player2score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0
}
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();


function gameStart() {
  createBall();
  nextTick();
};
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballx, bally);
    checkCollision();
    nextTick();
  }, 10)
};
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
};
function createBall() {
  ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
      ballxDirection = 1;
    }
    else{
      ballxDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
      ballyDirection = 1;
    }
    else{
      ballyDirection = -1;
    }
    ballx = gameWidth / 2;
    bally = gameHeight /2;
    drawBall(ballx, bally);
};
function moveBall() {
  ballx += (ballSpeed * ballxDirection);
  bally += (ballSpeed * ballyDirection);
};
function drawBall(ballx, bally) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballx, bally, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
};
function checkCollision() {
  if(bally <= 0 + ballRadius){
    ballyDirection *= -1;
  }
  if(bally >= gameHeight - ballRadius) {
    ballyDirection *= -1;
  }
  if(ballx <= 0){
    player2score += 1;
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
      ballx = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
      ballxDirection *= -1;
      ballSpeed += 1;
    }
  }
  if(ballx >= (paddle2.x - ballRadius)){
    if(bally > paddle2.y && bally < paddle2.y + paddle2.height){
      ballx = paddle2.x - ballRadius; // if ball gets stuck
      ballxDirection *= -1;
      ballSpeed += 1;
    }
  }
};
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch(keyPressed) {
    case(paddle1Up):
        if (paddle1.y > 0){
          paddle1.y -= paddleSpeed; 
        }
        break;

    case(paddle1Down):
        if (paddle1.y < gameHeight - paddle1.height){
          paddle1.y += paddleSpeed; 
        }
        break;

    case(paddle2Up):
        if (paddle2.y > 0){
          paddle2.y -= paddleSpeed; 
        }
        break;

    case(paddle2Down):
        if (paddle2.y < gameHeight - paddle2.height){
          paddle2.y += paddleSpeed; 
        }
        break;
  }
};
function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2score}`;
};
function resetGame() {
  player1Score = 0;
  player2score = 0; 
  paddle1 = {
    width: 25, 
    height: 100,
    x: 0,
    y: 0
  };
  paddle2 = {
    width: 25, 
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
  };
  ballSpeed = 1;
  ballx = 0;
  bally = 0;
  ballxDirection = 0;
  ballyDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
};
