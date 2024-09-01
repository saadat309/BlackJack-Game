let reward = {
  title: "Your Balance: ",
  chips: 200,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("card-el");
let playerEl = document.getElementById("reward-el");
updatePlayerBalance();
let startGameEl = document.getElementById("startGame-el");
startGameEl.textContent = "Start Game";
let newCardEl = document.getElementById("newCard-el");
newCardEl.style.display = "none";

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13 + 1);
  if (randomNumber === 1) {
    return 11;
  } else if (randomNumber > 10) {
    return 10;
  } else {
    return randomNumber;
  }
}

function newGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  startGameEl.textContent = "Reset Game";
  newCardEl.style.display = "block";
  newCardEl.textContent = "New Card";

  renderGame();
}

function resetGame() {
  cards = [];
  sum = 0;
  hasBlackJack = false;
  isAlive = false;
  message = "Want to play another round?";
  messageEl.textContent = message;
  cardsEl.textContent = "Cards: ";
  sumEl.textContent = "Sum: ";
  startGameEl.textContent = "Start Game";
  newCardEl.style.display = "none";
}

function startGame() {
  if (startGameEl.textContent === "Start Game") {
    newGame();
  } else {
    resetGame();
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ", ";
  }

  if (sum <= 20) {
    message = "Still in Game! Want to draw new card for $50?";
    updatePlayerBalance();
  } else if (sum === 21) {
    message = "Congrats! You've got Blackjack ($200).";
    hasBlackJack = true;
    reward.chips += 200;
    updatePlayerBalance();
    newCardEl.style.display = "none";
    startGameEl.textContent = "New Round";
  } else {
    message = "You lost the game (-100$)! Want another round?";
    isAlive = false;
    reward.chips -= 100;
    updatePlayerBalance();
    newCardEl.style.display = "none";
    startGameEl.textContent = "Play Again";
  }

  sumEl.textContent = "Sum: " + " " + sum;

  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let newCard = getRandomCard();
    sum += newCard;
    cards.push(newCard);
    renderGame();
    reward.chips -= 50;
    updatePlayerBalance();
  }
}

function updatePlayerBalance() {
  if (reward.chips < 0) {
    playerEl.textContent = "Your Debt: $" + Math.abs(reward.chips);
  } else {
    playerEl.textContent = "Your Balance: $" + reward.chips;
  }
}
