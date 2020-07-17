import React, { Component } from 'react';
import Card from "./components/Card";
import './assets/cards.css'

class App extends Component {
  state={
    deck: (function(){
      const cards=[],
      suits=["D","H","C","S"],
      ranks=["6","7","8","9","10","J","Q","K","A"]
      for(let suit=0; suit< 4; suit++){
        for(let rank=0; rank<9; rank++){
          cards.push({rank: ranks[rank],suit: suits[suit]});
        }
      }
      return cards;
    })()
  }
  render() {
    console.log(this.state);
    return (
      <button onClick="">generate</button>
      <div className="playingCards">
        <Card rank="A" suit="D"/>
      </ div>
    )
  }
}

export default App;
