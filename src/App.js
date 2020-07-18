import React, { Component } from 'react';
import Card, { translator } from "./components/Card";
import './assets/cards.css'
function random(max) {
  return Math.floor(Math.random() * max);
}
class CardDeck {
  constructor(state) {
    this.updateNewDeck();
  }
  updateNewDeck() {
    const cards = [];
    for (let rank = 0; rank < 13; rank++) {
      for (let suit = 0; suit < 4; suit++) {
        cards.push({
          rank, suit
        });
      }
    }
    this.deck = cards;
  }
  _getCard() {
    return this.deck.splice(random(this.deck.length), 1);
  }
  getCards(int = 5) {
    const cards = [];
    for (let i = 0; i < int; i++) { cards.push(this._getCard(cards)[0]); }
    return cards;
  }
}
class PokerHandMeneger {
  funcs = [
    cards => new Set(cards.map(card => card.suit)).size == 1 ? "flush" : false,
    function (cards) {
      const ranks = cards.map(card => card.rank);
      const copyRanks = [...ranks];
      const result = {};
      ranks.forEach((rank) => {
        let repeat = 0;
        while (copyRanks.indexOf(rank) + 1) {
          repeat++;
          copyRanks.splice(copyRanks.indexOf(rank), 1);
        }
        if (repeat) {
          result[rank] = repeat;
        }
      })
      const entResult = Object.entries(result).sort((a, b) => b[1] - a[1]);
      if (entResult[0][1] >= 3) { return "three of a kind " + translator.rank[entResult[0][0]] }
      else if (entResult[0][1] === 2 && entResult[1][1] === 2) { return "two pairs " + translator.rank[entResult[0][0]] + ":" + translator.rank[entResult[1][0]] }
      else if (entResult[0][1] === 2) { return "one pair " + translator.rank[entResult[0][0]] }
      else { return "ничего" }
    }
  ]
  setCards(cards) {
    const CopyCards = [...cards];
    this.funcs.forEach((func) => {
      if (func(CopyCards)) { console.log(func(CopyCards)); }
    })
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }
    this.deck = new CardDeck();
    this.PokerHandMeneger = new PokerHandMeneger();
  }
  generate = () => {
    const cards = [...this.deck.getCards()];
    this.PokerHandMeneger.setCards(cards);
    this.setState({ cards });
    this.deck.updateNewDeck();
  }
  render() {
    return (
      <div>
        <button onClick={this.generate} >generate</button>
        <div className="playingCards">
          {this.state.cards.map((cards, index) => (
            <Card key={index} suit={cards.suit} rank={cards.rank} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
