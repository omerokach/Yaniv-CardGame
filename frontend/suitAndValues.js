const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "King",
];

//function that gives back the rank by the last char in the img id as number
function rankNumber(cardImg) {
  rank = cardImg.id[cardImg.id.length - 1];
  switch (rank) {
    case "e": {
      rank = 1;
      break;
    }
    case "2": {
      rank = 2;
      break;
    }
    case "3": {
      rank = 3;
      break;
    }
    case "4": {
      rank = 4;
      break;
    }
    case "5": {
      rank = 5;
      break;
    }
    case "6": {
      rank = 6;
      break;
    }
    case "7": {
      rank = 7;
      break;
    }
    case "8": {
      rank = 8;
      break;
    }
    case "9": {
      rank = 9;
      break;
    }
    case "0": {
      rank = 10;
      break;
    }
    case "k": {
      rank = 11;
      break;
    }
    case "n": {
      rank = 12;
      break;
    }
    case "g": {
      rank = 13;
      break;
    }
    case "d": {
      rank = 0;
      break;
    }
  }
  return rank;
}
//function that gives back the rank by the last char in the img id as number
function findSuit(cardImg) {
  suit = cardImg.id[0];
  switch (suit) {
    case "c": {
      suit = "clubs";
      break;
    }
    case "d": {
      suit = "diamonds";
      break;
    }
    case "h": {
      suit = "hearts";
      break;
    }
    case "j": {
      suit = "joker";
      break;
    }
    case "s": {
      suit = "spades";
      break;
    }
  }
  return suit;
}
function rankStrToNum(str) {
  let numStr = str;
  switch (numStr) {
    case "2": {
      numStr = 2;
      break;
    }
    case "3": {
      numStr = 3;
      break;
    }
    case "4": {
      numStr = 4;
      break;
    }
    case "5": {
      numStr = 5;
      break;
    }
    case "6": {
      numStr = 6;
      break;
    }
    case "7": {
      numStr = 7;
      break;
    }
    case "8": {
      numStr = 8;
      break;
    }
    case "9": {
      numStr = 9;
      break;
    }
    case "10": {
      numStr = 10;
      break;
    }
    case "ace": {
      numStr = 1;
      break;
    }
    case "jack": {
      numStr = 11;
      break;
    }
    case "queen": {
      numStr = 12;
      break;
    }
    case "King": {
      numStr = 13;
      break;
    }
  }
  return numStr;
}
function rankIntToStr(int) {
  let numStr = int;
  switch (numStr) {
    case 2: {
      numStr = "2";
      break;
    }
    case 3: {
      numStr = "3";
      break;
    }
    case 4: {
      numStr = "4";
      break;
    }
    case 5: {
      numStr = "5";
      break;
    }
    case 6: {
      numStr = "6";
      break;
    }
    case 7: {
      numStr = "7";
      break;
    }
    case 8: {
      numStr = "8";
      break;
    }
    case 9: {
      numStr = "9";
      break;
    }
    case 10: {
      numStr = "10";
      break;
    }
    case 1: {
      numStr = "ace";
      break;
    }
    case 11: {
      numStr = "jack";
      break;
    }
    case 12: {
      numStr = "queen";
      break;
    }
    case 13: {
      numStr = "king";
      break;
    }
  }
  return numStr;
}