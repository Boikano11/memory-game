const cards = document.querySelectorAll(".card-container");

let gameCards = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];
let flippedCards = [];
let flippedCardsId = [];
let matchedCards = 0;
let matchedCardsId = [];

const newGame = () => {
  //Randomize array
  for (let i = gameCards.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [gameCards[i], gameCards[random]] = [gameCards[random], gameCards[i]];
  }

  for (let i = 0; i < cards.length; i++) {
    const card = document.getElementById(cards[i].firstElementChild.id);
    card.firstElementChild.nextElementSibling.firstElementChild.innerHTML = "";
    card.firstElementChild.nextElementSibling.firstElementChild.innerHTML +=
      gameCards[i];
  }
};
newGame();

const gameStatus = () => {
  if (matchedCardsId.length === 16) {
    setTimeout(() => {
      alert("Congratulations. You have won!");
      matchedCardsId.forEach((card) => {
        document.getElementById(card).style.transform = "rotateY(0deg)";
      });
      matchedCardsId = [];
      newGame();
    }, 300);
  }
};

const isFlipped = (card) => {
  if (card.firstElementChild.className === "card flipped") {
    const flippedValue = document.querySelector(
      `#${card.firstElementChild.id} .card-back h3`
    ).innerHTML;
    flippedCards.push(flippedValue);
    flippedCardsId.push(card.firstElementChild.id);

    if (flippedCards.length === 2) {
      if (flippedCards[0] === flippedCards[1]) {
        matchedCards++;
        matchedCardsId.push(flippedCardsId[0], flippedCardsId[1]);
        flippedCards = [];
        flippedCardsId = [];
        gameStatus();
      } else {
        setTimeout(() => {
          flippedCardsId.forEach((card) => {
            document.getElementById(card).style.transform = "rotateY(0deg)";
          });

          flippedCards = [];
          flippedCardsId = [];
        }, 500);
      }
    }
  }
};

const flipCard = (e) => {
  const card = document.getElementById(e.currentTarget.id);
  card.firstElementChild.style.transform = "rotateY(180deg)";
  card.firstElementChild.classList.add("flipped");
  isFlipped(card);
};

for (let i = 0; i < cards.length; i++) {
  const card = document.getElementById(cards[i].id);
  card.addEventListener("click", flipCard);
}
