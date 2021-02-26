class Card {
  constructor(suit, rank, isJoker) {
    this.suit = suit;
    this.rank = rank;
    this.isJoker = isJoker;
  }
}

class Deck {
  constructor(cards) {
    this.cardsArray = cards;
  }
  shuffle() {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * this.cardsArray.length);
      let location2 = Math.floor(Math.random() * this.cardsArray.length);
      let tmp = this.cardsArray[location1];

      this.cardsArray[location1] = this.cardsArray[location2];
      this.cardsArray[location2] = tmp;
    }
  }
}

class TableDeck extends Deck {
  constructor(cards) {
    super();
    this.cardsArray = cards;
  }
}

class PlayerDeck extends Deck {
  constructor(cards) {
    super();
    this.cardsArray = cards;
  }
}
class PileDeck extends Deck {
  constructor(cards) {
    super();
    this.cardsArray = cards;
  }
}
class Player {
  constructor(name, playerDeck) {
    this.name = name;
    this.playerDeck = playerDeck;
    this.playerScore = 0;
  }
  sumPlayerScore() {
    let sum = 0;
    for (let card of this.playerDeck) {
      let rank = card.rank;
      switch (rank) {
        case "ace": {
          rank = "1";
          break;
        }
        case "jack": {
          rank = "11";
          break;
        }
        case "queen": {
          rank = "12";
          break;
        }
        case "king": {
          rank = "13";
          break;
        }
      }
      sum += Number(rank);
    }
    this.playerScore = sum;
  }
}
