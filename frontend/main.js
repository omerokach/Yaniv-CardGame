// creates new deck of cards and assigns it to deck object
const cards = createDeck();
const cardsNumber = 54;
const deck = new Deck(cards, cardsNumber);
const tableDeck = createsTableDeck();
const numberPlayerSelection = document.getElementById("number-of-players");
const startButton = document.getElementById("start");
const pileDeck = document.getElementById("deck-pile");
let numberOfPlayers;
const players = [];

start.addEventListener("click", () => {
  numberOfPlayers = numberPlayerSelection.value;
  creatPlayers();
  console.log(tableDeck.cardsArray.pop());
  creatCardDiv(tableDeck.cardsArray.pop());
});

//creates a new deck
function createDeck() {
  const deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      deck.push(new Card(suits[i], values[x], false));
    }
  }
  deck.push(new Card(null, 0, true));
  deck.push(new Card(null, 0, true));
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
    players.push(player);
  }
}

//creating a card div from card object
function creatCardDiv(card) {
  const div = document.createElement("div");
  const { suit } = card;
  const { rank } = card;
  const { isJoker } = card;
  if (isJoker) {
    div.innerText = "Joker";
  } else {
    div.innerText = suit + rank;
  }
  pileDeck.appendChild(div);
}
