import React from "react";
import "./Card.css"

function Card(props){
    const classes = 'card '+ props.className //to add whatever set as a ClassName on card on this div className
    return <div className={classes}>{props.children}</div>

}

export default Card;