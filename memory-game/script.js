// Selectors
const gameBoard = document.getElementById("gameBoard");
const resetBtn = document.getElementById("resetBtn");
const movesText = document.getElementById("moves");
const timeText = document.getElementById("time");

const icons = ["🍎","🍌","🍇","🍉","🍒","🍓","🍍","🥝"];
let cardsArray = [...icons, ...icons];

let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let timer;
let time = 0;
let gameStarted = false;

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create cards
function createBoard() {
  gameBoard.innerHTML = "";
  shuffle(cardsArray).forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${icon}</div>
        <div class="card-back">❓</div>
      </div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  // Reset game stats
  moves = 0;
  matchedPairs = 0;
  movesText.textContent = moves;
  time = 0;
  timeText.textContent = time;
  gameStarted = false;
  clearInterval(timer);
}

// Flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  if (!gameStarted) startTimer();

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesText.textContent = moves;

  checkMatch();
}

// Check match
function checkMatch() {
  let isMatch = firstCard.querySelector(".card-front").textContent === 
                secondCard.querySelector(".card-front").textContent;

  isMatch ? disableCards() : unflipCards();
}

// If match
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedPairs++;
  resetBoard();

  if (matchedPairs === icons.length) {
    clearInterval(timer);
    setTimeout(() => {
      alert(`🎉 You won in ${moves} moves and ${time} seconds!`);
    }, 500);
  }
}

// If not match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

// Reset selection
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Timer
function startTimer() {
  gameStarted = true;
  timer = setInterval(() => {
    time++;
    timeText.textContent = time;
  }, 1000);
}

// Reset button
resetBtn.addEventListener("click", createBoard);

// Init game
createBoard();
