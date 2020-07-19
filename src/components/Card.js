import React from "react";
import {translator} from "./../assets/trasnlator";

function Card(props) {
    return (
        <div className={"card" + " " + "rank-" + translator.rank[props.rank].toLowerCase()
            + " " + translator.suit[props.suit][0] + " " + translator.active[props.active]}>
            <span className="rank">{translator.rank[props.rank]}</span>
            <span className="suit">{translator.suit[props.suit][1]}</span>
        </div>
    )
}
export default Card