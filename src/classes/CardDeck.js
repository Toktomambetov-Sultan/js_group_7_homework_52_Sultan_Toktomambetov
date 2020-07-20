import { random } from "./../assets/MathFunctions";
export class CardDeck {
  constructor() {
    this.updateNewDeck();
  }
  updateNewDeck() {
    let cards = [];
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