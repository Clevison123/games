function getComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'rock';
  if (randomNumber < 2 / 3) return 'paper';
  return 'scissors';
}

function determineResult(playerMove, computerMove) {
  if (playerMove === computerMove) return 'Tie';
  if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'You Win!';
  }
  return 'You Lose!';
}

function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = determineResult(playerMove, computerMove);

  // Atualiza o conteúdo do modal
  document.getElementById("resultText").textContent = result;
  document.getElementById("playerChoice").textContent = `You picked: ${playerMove}`;
  document.getElementById("computerChoice").textContent = `Computer picked: ${computerMove}`;

  // Exibe o modal
  document.getElementById("resultModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("resultModal").style.display = "none";
}