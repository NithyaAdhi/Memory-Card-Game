import React from "react";
import {motion} from "framer-motion";

//display a single card on the game board
function Card( { card, index, onClick }) {
  
  return (
    <motion.div
      className={`card ${card.flipped || card.matched ?  "flipped" : ""} ${card.type}`}
        onClick={() => onClick(index)}
        whileTap={{ scale: 0.95 }}>
        

        <div className="card-inner">
            <div className="card-front"></div> 
            <div className="card-back">
                {
                    card.flipped || card.matched ? card.logo : ""}
                
            </div>
            </div>
        </motion.div>

  );
}

export default Card;








//onClick={...}: This is a standard React prop for handling click events on an element.
//second onClick is the function that was passed down as a prop from the Game component.
//If you wrote it without the arrow function, onClick(index) would be called immediately when the component renders, not when the user clicks. The arrow function () => ... ensures the code inside it only runs after the click happens.
//scale the element down to 95% of its original size.