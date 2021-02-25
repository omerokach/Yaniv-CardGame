// creates new deck of cards and assigns it to deck object
const cards = createDeck();
const cardsNumber = 54;
const deck = new Deck(cards, cardsNumber);

const numberPlayerSelection = document.getElementById("number-of-players");
const startButton = document.getElementById("start");
let numberOfPlayers;
const players = [];

start.addEventListener("click", () => {
    
  numberOfPlayers = numberPlayerSelection.value;
  console.log(numberOfPlayers);
});

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
//creat an array of players
function creatPlayers() {
  for (let i = 0; i < numberOfPlayers; i++) {
    const playerDeck = new PlayerDeck(null);
    const player = new Player(prompt(`player ${i + 1} name`), playerDeck);
    players.push(player);
  }
}
