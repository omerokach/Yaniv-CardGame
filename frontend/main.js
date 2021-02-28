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
let marked = { markedArray: [], markedStatus: "" };
let lastDrop = [];
let numberOfPlayers;
let currentPlayer = "";

document.addEventListener("click", (e) => {
  const card = e.target;
  const parentNode = card.parentNode;
  //checks if the click was on the currentPlayer
  if (
    card.parentNode.querySelector("span").innerText ===
    playersArray[currentPlayer].name
  ) {
    toggleMark(card);
  }
});

tablePile.addEventListener("click", (e) => {
  const card = e.target;
  const parentNode = card.parentNode;
  //if clicked on the table-pile or the deck pile after picking his cards
  if (parentNode.id === "table-pile" && marked.markedArray.length !== 0) {
    if (card.className === "table-pile") {
      lastDrop = popAndTakeByDrop(marked.markedArray);
      deckPileArray.push(lastDrop);
      playerDrop(playersArray[currentPlayer].playerDeck);
      playersArray[currentPlayer].playerDeck.push(tableDeck.pop());
    }
  }
});

start.addEventListener("click", () => {
  numberOfPlayers = numberPlayerSelection.value;
  creatPlayers();
  deckPileArray.push(tableDeck.cardsArray.pop());
  lastDrop = [...deckPileArray];
  creatCardDiv(deckPileArray[0], deckPile, "deck-pile");
  setCardsToPlayers(playersArray);
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
function setCardsToPlayers(array) {
  let counter = 0;
  for (let player of array) {
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
    if (marked.markedArray.length === 1) {
      marked.markedStatus = "";
    }
    marked.markedArray = removeCardFromArray(marked.markedArray, element);
  } else if (ifCanAddCardToMarkedArray(marked.markedArray, element)) {
    element.classList.add("marked");
    marked.markedArray.push(element);
  }
  console.log(marked);
}

// check if you can pick the card
function ifCanAddCardToMarkedArray(array, card) {
  if (array.length === 0) {
    return true;
  }
  console.log(marked.markedStatus);
  if (
    ifConsecutive(array, card) &&
    marked.markedStatus === "consecutive" &&
    (!ifSameRank(array, card) || rankNumber(card) === 0)
  ) {
    return true;
  } else if (ifSameRank(array, card) && marked.markedStatus === "same-rank") {
    return true;
  }
  return false;
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

//check if the card has the same rank
function ifSameRank(array, card) {
  let rank = 0;
  for (let card of array) {
    if (rankNumber(card) !== 0) {
      rank = rankNumber(card);
    }
  }
  if (rank === rankNumber(card)) {
    marked.markedStatus = "same-rank";
    return true;
  }
  return false;
}

//check if the cards Consecutive
function ifConsecutive(array, card) {
  const numSortArr = [];
  const sortedArray = [];
  // build an array of the ranks of the array
  for (let card of array) {
    numSortArr.push(rankNumber(card));
  }
  numSortArr.sort((a, b) => a - b);

  //build an sorted array of cards by rank array
  for (let i = 0; i < array.length; i++) {
    if (rankNumber(array[i]) === numSortArr[i]) {
      sortedArray.push(array[i]);
    }
  }
  console.log(rankNumber(card));
  console.log(sortedArray[sortedArray.length - 1].id[0]);
  if (
    sortedArray[sortedArray.length - 1].id[0] === card.id[0] ||
    rankNumber(card) === 0 ||
    rankNumber(sortedArray[sortedArray.length - 1]) === 0
  ) {
    console.log("pass");
    console.log(rankNumber(card));
    console.log(rankNumber(sortedArray[sortedArray.length - 1]));
    if (
      rankNumber(card) - rankNumber(sortedArray[sortedArray.length - 1]) ===
        1 ||
      rankNumber(card) - rankNumber(sortedArray[sortedArray.length - 1]) ===
        rankNumber(card) ||
      rankNumber(card) - rankNumber(sortedArray[sortedArray.length - 1]) < 0
    ) {
      marked.markedStatus = "consecutive";
      return true;
    }
  }
  return false;
}

//last drop takes all the pop from marked
function popAndTakeByDrop(arr) {
  const TemLastDrop = [];
  for (let i = 0; i < arr.length; i++) {
    TemLastDrop.push(arr.pop);
  }
  return TemLastDrop;
}

//removing the cards from player after play
function playerDrop(arr) {
  for (let card of arr) {
    if (lastDrop.contains(card)) {
      arr.pop();
    }
  }
}
