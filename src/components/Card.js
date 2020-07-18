import React from "react";

const translator = {
    suit: [["diams", "♦"], ["hearts", "♥"], ["clubs", "♣"], ["spades", "♠"]],
    rank: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
}
function Card(props) {
    return (
        <div className={"card" + " " + "rank-" + translator.rank[props.rank].toLowerCase()
            + " " + translator.suit[props.suit][0]}>
            <span className="rank">{translator.rank[props.rank]}</span>
            <span className="suit">{translator.suit[props.suit][1]}</span>
        </div>
    )
}
export {translator}
export default Card