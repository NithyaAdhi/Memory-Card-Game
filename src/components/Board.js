import React from "react";
import Card from "./Card";


//takes an array of card data and renders a grid of Card components on the screen.
function Board({ cards, onCardClick }) {
    return (
        <div className="grid"> 
            {cards.map((card, index) => (
                <Card
                    key={card.id}
                    card={card}
                    index={index}
                    onClick={onCardClick}
                    
                />
            ))}
        </div>
    );
}

export default Board;