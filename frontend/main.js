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
const imgs = document.querySelectorAll("img");
const deckPileArray = [];
const playersArray = [];
let marked = [];
let numberOfPlayers;
let currentPlayer = "";

document.addEventListener("click", (e) => {
  const card = e.target;
  const playerNode = card.parentNode;
  //checks if the click was on the currentPlayer
  ifCanPick(card);
  if (
    card.parentNode.querySelector("span").innerText ===
    playersArray[currentPlayer].name
  ) {
    toggleMark(card);
  }
  if (card.className === "player-card") {
  }
});

start.addEventListener("click", () => {
  numberOfPlayers = numberPlayerSelection.value;
  creatPlayers();
  deckPileArray.push(tableDeck.cardsArray.pop());
  creatCardDiv(deckPileArray[0], deckPile, "deck-pile");
  setCardsToPlayers();
  const randomNum = Math.floor(Math.random() * playersArray.length);
  currentPlayerTurn(randomNum);
});

//=========================================================functions============================================================

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
function creatCardDiv(card, parent, className) {
  const { suit } = card;
  const { rank } = card;
  const { isJoker } = card;
  const cardImg = document.createElement("img");
  cardImg.setAttribute("id", `${suit}_${rank}`);
  cardImg.setAttribute("class", "player-card");
  if (isJoker) {
    cardImg.src = `./imgs/cardsFront/joker_red.png`;
    cardImg.setAttribute("id", `joker_card`);
  } else {
    cardImg.src = `./imgs/cardsFront/${card.suit}_${card.rank}.png`;
  }
  if (className) {
    cardImg.setAttribute("class", className);
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

//updating who's turn div
function currentPlayerTurn(playerNum) {
  currentPlayer = playerNum;
  const currentPlayerDOM = document.querySelector(".currentPlayer");
  currentPlayerDOM.innerText = `turn of: ${playersArray[playerNum].name}`;
}

//toggle mark function
function toggleMark(element) {
  if (element.classList.contains("marked")) {
    element.classList.remove("marked");
    marked = removeCardFromArray(marked, element);
  } else {
    element.classList.add("marked");
    marked.push(element);
  }
  console.log(marked);
}

//check if you can pick the card
function ifCanAddCardToMarkedArray(array, card){
  const cardLastChar = card.id[card.id.length-1];
  for(let item of array){
    if(cardLastChar = item.id[item.id.length -1]){
      return true;
    } else if ()
  }
}


//if array has the card img
function ifArrayHasCardImg(array, img) {
  for (let card of array) {
    if (card.id === img.id || card.id === `joker_card`) {
      return true;
    }
  }
  return false;
}

//removes specific img from array
function removeCardFromArray(arr, card) {
  const newArr = [];
  for (let item of arr) {
    if (item.id !== card.id) {
      newArr.push(item);
    }
  }
  return newArr;
}
