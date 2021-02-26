// creates new deck of cards and assigns it to deck object
const cards = createDeck();
const cardsNumber = 54;
const deck = new Deck(cards, cardsNumber);
const tableDeck = createsTableDeck();
const numberPlayerSelection = document.getElementById("number-of-players");
const startButton = document.getElementById("start");
const deckPile = document.getElementById("deck-pile");
const tablePile = document.getElementById("mainTable");
const playersDOM = document.querySelectorAll(".players");
const playerName = document.querySelectorAll(".playerName");
let numberOfPlayers;
const playersArray = [];

start.addEventListener("click", () => {
  numberOfPlayers = numberPlayerSelection.value;
  creatPlayers();
  console.log(playersArray);
  console.log(tableDeck.cardsArray.pop());
  creatCardDiv(tableDeck.cardsArray.pop(), deckPile);
  console.log(playersArray);
  setCardsToPlayers();
  playersArray[0].sumPlayerScore();
  console.log(playersArray[0].playerScore);
});

//creates a new deck
function createDeck() {
  const deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      deck.push(new Card(suits[i], values[x], false));
    }
  }
  deck.push(new Card(null, "0", true));
  deck.push(new Card(null, "0", true));
  return deck;
}

//creates a shuffled new table Deck
function createsTableDeck() {
  const cards = createDeck();
  const deckShuffle = new Deck(cards);
  deckShuffle.shuffle();
  return deckShuffle;
}

//creat an array of players
function creatPlayers() {
  for (let i = 0; i < numberOfPlayers; i++) {
    const cards = [];
    for (let i = 0; i < 5; i++) {
      cards.push(tableDeck.cardsArray.pop());
    }
    const player = new Player(prompt(`player ${i + 1} name`), cards);
    playersArray.push(player);
    for (let i = 0; i < playersArray.length; i++) {
      playerName[i].innerHTML = playersArray[i].name;
    }
  }
}

//creating a card div from card object
function creatCardDiv(card, parent) {
  const { suit } = card;
  const { rank } = card;
  const { isJoker } = card;
  const cardImg = document.createElement("img");
  cardImg.setAttribute("id", `${suit}_${rank}`);
  if (isJoker) {
    cardImg.src = `./imgs/cardsFront/joker_red.png`;
    cardImg.setAttribute("id", `joker_joker`);
  } else {
    cardImg.src = `./imgs/cardsFront/${card.suit}_${card.rank}.png`;
  }
  parent.appendChild(cardImg);
}

// set cards to player
function setCardsToPlayers() {
  let counter = 0;
  for (let player of playersArray) {
    for (let i = 0; i < player.playerDeck.length; i++) {
      creatCardDiv(player.playerDeck[i], playersDOM[counter]);
    }
    counter++;
  }
}
