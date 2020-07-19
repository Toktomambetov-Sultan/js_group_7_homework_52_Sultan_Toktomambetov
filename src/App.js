import React, { Component } from 'react';
import Card, { translator } from "./components/Card";
import {PokerHandMeneger} from "./classes/PokerHandManager";
import  {CardDeck} from "./classes/CardDeck";
import './assets/cards.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      foundResult: {},
    }
    this.deck = new CardDeck();
    this.PokerHandMeneger = new PokerHandMeneger();
  }
  generate = () => {
    const cards = [...this.deck.getCards()];
    const foundResult = this.PokerHandMeneger.setCards(cards);
    this.setState({ cards, foundResult });
    this.deck.updateNewDeck();
  }
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="playingCards Cards">
            {this.state.cards.map((cards, index) => (<Card key={index} suit={cards.suit} rank={cards.rank} active={Boolean(this.state.foundResult.indexes.indexOf(index) + 1)} />))}
          </div>
          <p className="winning">{this.state.foundResult.winning}</p>
          <button onClick={this.generate} className="generate-btn">generate</button>
        </div>
      </div>
    )
  }
}

export default App;
