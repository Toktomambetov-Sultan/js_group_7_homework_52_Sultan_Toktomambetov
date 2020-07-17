import React, { Component } from 'react';
import Card from "./components/Card";
import './assets/cards.css'
function random(max) {
  return Math.floor(Math.random() * max);
}
class CardDeck {
  constructor(state) {
    this.deck = this.updateNewDeck();
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
    return cards;
  }
  _getCard() {
    return this.deck.splice(random(this.deck.length), 1);
  }
  getCards(int = 5) {
    const cards = [];
    for (let i = 0; i < int; i++) { cards.push(this._getCard(cards)[0]); }
    console.log(cards);
    return cards;
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }
    this.deck = new CardDeck();
  }
  generate = () => {
    const cards = [...this.state.cards, ...this.deck.getCards()];
    this.setState({ cards });
  }
  render() {
    return (
      <div>
        <button onClick={this.generate}>generate</button>
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
