function getComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'rock';
  if (randomNumber < 2 / 3) return 'paper';
  return 'scissors';
}

function determineResult(playerMove, computerMove) {
  if (playerMove === computerMove) return 'Tie.';
  if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'You win.';
  }
  return 'You lose.';
}

function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = determineResult(playerMove, computerMove);
  alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}`);
}