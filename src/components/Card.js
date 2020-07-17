import React from "react";

const translator = {
    "D": ["diams","♦"],
    "H": ["hearts","♥"],
    "C": ["clubs","♣"],
    "S": ["spades","♠"],
}
function Card(props) {
    return (
        <div className={"card" + " " + "rank-" + props.rank.toLowerCase() + " " + translator[props.suit][0]} href="#">
            <span className="rank">{props.rank}</span>
    <span className="suit">{translator[props.suit][1]}</span>
        </div>
    )
}
export default Card