import {translator} from "./../assets/trasnlator";
console.log(translator);
export class PokerHandMeneger {
  funcs = [
    cards => new Set(cards.map(card => card.suit)).size === 1 ? {
      winning: "flush " + translator.suit[cards[0].suit][1],
      indexes: [0, 1, 2, 3, 4],
    } : false,
    function (cards) {
      const ranks = cards.map(card => card.rank);
      const result = [];
      ranks.forEach((rank, index) => {
        let indexes = [];
        ranks.forEach((newRank, newIndex) => {
          if (newRank === rank && !(ranks.slice(index + 1).indexOf(rank) + 1)) {
            indexes.push(newIndex);
          }
        })
        if (indexes.length) { result.push({ rank, indexes }); }
      })
      const entResult = result.sort((a, b) => b.indexes.length - a.indexes.length);
      if (entResult[0].indexes.length >= 3) {
        return {
          winning: "three of kind " + translator.rank[entResult[0].rank],
          indexes: [...entResult[0].indexes],
        }
      }
      else if (entResult[0].indexes.length === 2 && entResult[1].indexes.length === 2) {
        return {
          winning: "two pairs " + translator.rank[entResult[0].rank] + ":" + translator.rank[entResult[1].rank],
          indexes: [...entResult[0].indexes, ...entResult[1].indexes],
        }
      }
      else if (entResult[0].indexes.length === 2) {
        return {
          winning: "one pair " + translator.rank[entResult[0].rank],
          indexes: [...entResult[0].indexes]
        }
      }
      else {
        return {
          winning: "nothing",
          indexes: [],
        }
      }
    }
  ]
  setCards(cards) {
    const CopyCards = [...cards];
    for (let func of this.funcs) {
      if (func(CopyCards)) {
        return func(CopyCards);
      }
    }
  }
}