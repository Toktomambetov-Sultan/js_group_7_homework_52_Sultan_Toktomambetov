import { translator } from "./../assets/trasnlator";
export class PokerHandMeneger {
  arrayShift(arr, k) {
    for (let i = 0; i < k; i++) arr.unshift(arr.pop());
    return arr
  }
  getReps(cards) {
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
    return result.sort((a, b) => b.indexes.length - a.indexes.length);
  }
  isOrder(arr) {
    let newArr = [...arr];
    let allRanks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    function GetJsonAns(arr) { return JSON.stringify(arr).slice(1, -1) };
    for (let i = 0; i < newArr.length; i++) {
      for (let k = 0; k < allRanks.length; k++) {
        if (GetJsonAns(allRanks).indexOf(GetJsonAns(newArr)) + 1) {
          return true;
        }
        allRanks = this.arrayShift(allRanks, 1);
      }
      newArr = this.arrayShift(newArr, 1);
    }
    return false;
  }
  funcs = [
    cards => {
      if (new Set(cards.map(card => card.suit)).size === 1) {
        const ranks = cards.map(card=>card.rank).sort((a,b)=>a-b);
        if(ranks[0]===8 && ranks[ranks.length-1]==12 && this.isOrder(ranks)){
          return{
            winning: "Royal flush",
            indexes: [0,1,2,3,4],
          }
        }
      }
    },
    cards => {
      if (new Set(cards.map(card => card.suit)).size === 1
        && this.isOrder(cards.map(card => card.rank).sort((a, b) => a - b))) {
        return {
          winning: "straight flush",
          indexes: [0, 1, 2, 3, 4],
        }
      }
    },
    cards => {
      const entResult = this.getReps(cards);
      if (entResult[0].indexes.length === 4) {
        return {
          winning: "four of a kind " + translator.rank[entResult[0].rank],
          indexes: [...entResult[0].indexes],
        }
      }
    },
    cards => {
      const entResult = this.getReps(cards);
      if (entResult[0].indexes.length === 3 && entResult[1].indexes.length == 2) {
        return {
          winning: "full house " + translator.rank[entResult[0].rank] + " : " + translator.rank[entResult[1].rank],
          indexes: [...entResult[0].indexes, ...entResult[1].indexes],
        }
      }
    },
    cards => new Set(cards.map(card => card.suit)).size === 1 ? {
      winning: "flush " + translator.suit[cards[0].suit][1],
      indexes: [0, 1, 2, 3, 4],
    } : false,
    cards => {
      let ranks = cards.map(card => card.rank).sort((a, b) => a - b);
      if (this.isOrder(ranks)) {
        return {
          winning: "straight",
          indexes: [0, 1, 2, 3, 4],
        }
      } else {
        return false;
      }
    },
    (cards) => {
      const entResult = this.getReps(cards);
      if (entResult[0].indexes.length === 3) {
        return {
          winning: "three of kind " + translator.rank[entResult[0].rank],
          indexes: [...entResult[0].indexes],
        }
      }
      else if (entResult[0].indexes.length === 2 && entResult[1].indexes.length === 2) {
        return {
          winning: "two pairs " + translator.rank[entResult[0].rank] + " : " + translator.rank[entResult[1].rank],
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