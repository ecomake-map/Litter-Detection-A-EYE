import React from 'react';
import './Card.css';

const Card = (props) => {

    return (
        <>
            <div className="Backdrop" onClick={props.closeCard}>

            </div>
            <div className="Card">
                <img className="img" src={props.marker.url}></img>
                <div className="CardBody">
                    <p>Hey <span className="tomato">♥</span>(ˆ⌣ˆԅ)...</p>
                    <p>Would be Nice if someone picked up from:</p>
                    <p>{props.marker.position.lat}, {props.marker.position.lng}</p>
                </div>
            </div>
        </>
    );
}

export default Card;