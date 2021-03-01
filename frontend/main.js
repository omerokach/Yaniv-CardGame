const cards = createDeck();
const cardsNumber = 54;
const deck = new Deck(cards, cardsNumber);
const tableDeck = createsTableDeck();
const numberPlayerSelection = document.getElementById("number-of-players");
const startButton = document.getElementById("start");
const deckPile = document.getElementById("deck-pile");
const tablePile = document.getElementById("table-pile");
const playersDOM = document.querySelectorAll(".players");
const playerName = document.querySelectorAll(".playerName");
const imgs = document.querySelectorAll("img");
const yanivButton = document.getElementById("yaniv");
const deckPileArray = [];
const playersArray = [];
let marked = { markedArray: [], markedStatus: "" };
let lastDrop = [];
let numberOfPlayers;
let currentPlayer = 1;

document.addEventListener("click", (e) => {
  const card = e.target;
  const parentNode = card.parentNode;
  //checks if the click was on the currentPlayer
  if (
    parentNode.querySelector("span").innerText ===
    playersArray[currentPlayer].name
  ) {
    toggleMark(card);
  }
});

tablePile.addEventListener("click", (e) => {
  const card = e.target;
  const parentNode = card.parentNode;
  //if clicked on the table-pile or the deck pile after picking his cards
  if (marked.markedArray.length !== 0) {
    lastDrop = [...popAndTakeByDrop(marked.markedArray)];
    deckPileArray.push(...lastDrop);
    playersArray[currentPlayer].playerDeck = [
      ...playerDrop(playersArray[currentPlayer].playerDeck),
    ];
    playersArray[currentPlayer].playerDeck.push(tableDeck.cardsArray.pop());
    console.log(playersArray[currentPlayer]);
    removeAndAddCardDiv(playersArray[currentPlayer], lastDrop);
    console.log("player length", playersArray.length);
    if (playersArray.length - currentPlayer === 1) {
      currentPlayer = 0;
    } else {
      currentPlayer++;
    }
    currentPlayerTurn(currentPlayer);
  }
});

start.addEventListener("click", () => {
  console.log(tableDeck);
  numberOfPlayers = numberPlayerSelection.value;
  creatPlayers();
  deckPileArray.push(tableDeck.cardsArray.pop());
  lastDrop = [...deckPileArray];
  creatCardDiv(deckPileArray[0], deckPile, "deck-pile");
  setCardsToPlayers(playersArray);
  const randomNum = Math.floor(Math.random() * playersArray.length);
  currentPlayerTurn(randomNum);
  console.log(tableDeck);
});

yanivButton.addEventListener("click", () => {
  if (playersArray.forEach((player) => ifYaniv(player))) {
    alert("Yaniv!!!!");
  }
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
      playerName[i].innerText = playersArray[i].name;
    }
  }
}

//creating a card div from card object
function creatCardDiv(card, parent, className) {
  const { suit } = card;
  const rank = rankIntToStr(card.rank);
  console.log(rank);
  const { isJoker } = card;
  const cardImg = document.createElement("img");
  cardImg.setAttribute("id", `${suit}_${rank}`);
  cardImg.setAttribute("class", "player-card");
  if (isJoker) {
    cardImg.src = `./imgs/cardsFront/joker_red.png`;
    cardImg.setAttribute("id", `joker_card`);
  } else {
    cardImg.src = `./imgs/cardsFront/${card.suit}_${rank}.png`;
  }
  if (className) {
    cardImg.setAttribute("class", className);
  }
  parent.appendChild(cardImg);
}

//remove card img div
function removeAndAddCardDiv(player, cards) {
  let playerIndex = playersArray.indexOf(player) + 1;
  let playerDiv = document.querySelector(`#player${playerIndex}`);
  let markedImgs = document.querySelectorAll(".marked");
  for (var child of markedImgs) {
    for (let card of cards) {
      let cardRankStr = rankIntToStr(card.rank);
      console.log(cardRankStr);
      if (card.suit === "joker") {
        cardToRemove = document.getElementById(`joker_card`);
      }
      console.log(`${card.suit}_${cardRankStr}`);
      cardToRemove = document.getElementById(`${card.suit}_${cardRankStr}`);
      if (child === cardToRemove || cardToRemove === null) {
        child.remove();
      }
    }
  }
  console.log(cards);
  creatCardDiv(tableDeck.cardsArray.pop(), playerDiv);
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
  console.log(playerNum);
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
  } else if (ifCanAddCardToMarkedArray(marked, element)) {
    element.classList.add("marked");
    marked.markedArray.push(element);
  }
}

// check if you can pick the card
function ifCanAddCardToMarkedArray(marked, card) {
  if (marked.markedArray.length === 0) {
    return true;
  }
  if (
    ifConsecutive(marked.markedArray, card) &&
    marked.markedStatus === "consecutive" &&
    (!ifSameRank(marked.markedArray, card) || rankNumber(card) === 0)
  ) {
    return true;
  } else if (
    ifSameRank(marked.markedArray, card) &&
    marked.markedStatus === "same-rank"
  ) {
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
  let newArr = [];
  for (let item of arr) {
    if (!compareObjects(card, item)) {
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
  if (
    sortedArray[sortedArray.length - 1].id[0] === card.id[0] ||
    rankNumber(card) === 0 ||
    rankNumber(sortedArray[sortedArray.length - 1]) === 0
  ) {
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
  for (let i = 0; i <= arr.length; i++) {
    TemLastDrop.push(imgToObject(arr.pop()));
  }
  return TemLastDrop;
}

//removing the cards from player after play
function playerDrop(arr) {
  let newArr = [];
  for (let card of arr) {
    for (let cardDrop of lastDrop) {
      if (compareObjects(cardDrop, card)) {
        newArr = removeCardFromArray(arr, card);
      }
    }
  }
  return newArr;
}

//transform img tag to card object
function imgToObject(img) {
  let card;
  if (findSuit(img) === "joker") {
    card = new Card(findSuit(img), rankNumber(img), true);
  } else {
    card = new Card(findSuit(img), rankNumber(img), false);
  }
  return card;
}

//function that compare between two objects
function compareObjects(cardObj1, cardObj2) {
  if (cardObj1.suit === cardObj2.suit) {
    if (rankStrToNum(cardObj1.rank) === rankStrToNum(cardObj2.rank)) {
      return true;
    }
  }
  return false;
}

//check if the player score is 7 or under
function ifYaniv(player) {
  if (player.sumPlayerScore() === 7 || player.sumPlayerScore() < 7) {
    return true;
  }
  return false;
}
