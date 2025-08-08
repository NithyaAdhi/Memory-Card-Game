import { type } from "@testing-library/user-event/dist/type";
import { cardTypes } from "./CardTypes";

const logos = ["React", "Angular", "Vue", "Node", "JavaScript", "Python", "Java"];

    //creating the entire deck of cards for one round of the memory game
    export const generateShuffledCards = () => {
        // Creating the Regular Card Pairs
        const pairs = [...logos, ...logos].map((logo, i) => ({
            id : i, //Assigns a unique ID to each card
            logo, //shorthand for logo: logo. It assigns the name of the logo (e.g., "React") to the logo property
            flipped: false,//Sets the initial state of the card
            matched: false,
            type: cardTypes.REGULAR
        }));

        // Adding Special Cards (Wild and Trap)
        const specialCards = [
            {type: cardTypes.WILD},
            {type: cardTypes.TRAP}
        ];

        // Randomly inserting special cards into the pairs array
        specialCards.forEach((special) => {
            
            const index = Math.floor(Math.random() * pairs.length);
            pairs.splice(index, 0, {
                id : `special-${Math.random()}`,
                logo: special.type === cardTypes.WILD ? "WILD" : "TRAP",
                flipped: false,
                matched: false,
                type: special.type
            });
        });

        // Shuffling the entire deck of cards
        return pairs.sort(() => Math.random() - 0.5);
    };

    // Example with a professional library
//import { v4 as uuidv4 } from 'uuid';
// ... inside the splice
//id: uuidv4(), // This generates a truly unique ID like "f8a4a5b0-..."