import React, { useReducer, useEffect } from "react";
import { generateShuffledCards } from "../utils/Utils";
import { gameReducer, initialState } from './gameReducer';
import Board from "./Board";
import GameInfo from "./GameInfo"; // Import the new component

function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { cards, flippedCards, lockBoard, matches, mismatches, timeRemaining, gameStatus } = state;

  // Effect to start the game on first render
  useEffect(() => {
    dispatch({ type: 'START_GAME', payload: { cards: generateShuffledCards() } });
  }, []);

  // Effect to handle the countdown timer
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timerId = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => clearInterval(timerId); // Cleanup function
  }, [gameStatus]);

  // Effect to check for matches after two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      // Use setTimeout to create a delay for the user to see the cards
      setTimeout(() => {
        dispatch({ type: 'CHECK_MATCHES' });
      }, 1000); // 1-second delay before checking
    }
  }, [flippedCards]);

  // Handler for when a card is clicked
  const handleCardClick = (index) => {
    if (lockBoard || cards[index].flipped || cards[index].matched) return;
    dispatch({ type: 'FLIP_CARD', payload: { index } });
  };

  return (
    <div className="game-container">
      <h1 className="title">Memory Card Game</h1>

      <GameInfo
        matches={matches}
        mismatches={mismatches}
        timeRemaining={timeRemaining}
      />
      
      {gameStatus === 'finished' && (
        <div className="message">
          Game Over! Your final score is {(matches * 100) - (mismatches * 20)}.
        </div>
      )}

      {gameStatus !== 'idle' && (
        <Board cards={cards} onCardClick={handleCardClick} />
      )}
    </div>
  );
}

export default Game;




























// import { generateShuffledCards } from "../utils/Utils";
// import { cardTypes } from "../utils/CardTypes";
// import Board from "./Board";
// import { useReducer, useEffect } from "react";
// import { gameReducer, initialState } from './gameReducer'; 

// function Game() {
//     const [state, dispatch] = useReducer(gameReducer, initialState);
//   const { cards, flippedCards, lockBoard, timeRemaining, score, gameStatus } = state;

//   // Start the game on the first render
//   useEffect(() => {
//     dispatch({ type: 'START_GAME', payload: { cards: generateShuffledCards(logos) } });
//   }, []);

//   const handleCardClick = (index) => {
//     // Instead of calling multiple set... functions, you just dispatch one action
//     if (!lockBoard && !cards[index].flipped) {
//       dispatch({ type: 'FLIP_CARD', payload: { index } });
//     }
//   };

//     //
//     useEffect(() => {
//         if (isGameOver) return; // prevent a new timer from starting after the game has already ended.
//         const interval  = setInterval(() => {
//             setSeconds((prev) => prev + 1);
//         }, 1000); 
//         // THE CLEANUP FUNCTION
//     return () => {
//       // This will run when the component unmounts or when the effect re-runs.
//       clearInterval(interval); 
//     };
//     }, [isGameOver]); //Re-run this effect only if the value of isGameOver changes between renders.


    
//     useEffect(() => {
//         if (flippedCards.length === 2) {
//             const [firstIdx, secondIdx] = flippedCards; // Destructure the indices of the flipped cards
//             const first = cards[firstIdx]; 
//             const second = cards[secondIdx];
//             setLockBoard(true);

        

//             if (first.type === cardTypes.TRAP || second.type === cardTypes.TRAP) {
//                 //setTimeout to wait for 1 second. This delay lets the user see that they hit a trap.
//                 setTimeout(
//                     () => {
//                         setCards(cards.map(
//                             (card) => ({...card, flipped: false })
//                         ))
//                         setFlippedCards([]);//resets the flippedCards array back to being empty
//                         setLockBoard(false);
//                     }, 1000
//                 ); return;
//             }
//             if(first.type === cardTypes.WILD || second.type === cardTypes.WILD || first.logo === second.logo) {
//                 const newCards = [...cards];
//                 newCards[firstIdx].matched = true 
//                 newCards[secondIdx].matched = true;
//             setTimeout(() => {
//                 setCards(newCards);
//                 setFlippedCards([]);
//                 setLockBoard(false);},500);
//             }
//             else {
//                 setTimeout(() => {
//                     const newCards = [...cards];
//                     newCards[firstIdx].flipped = false;
//                     newCards[secondIdx].flipped = false;
//                     setCards(newCards);
//                     setFlippedCards([]);
//                     setLockBoard(false);
//                 }, 1000);
//             }
//             setFlippedCards([]);
//             setLockBoard(false);
//         }
//     }, [flippedCards, cards]);

//     const handleCardClick = (index) => {
//         if (lockBoard || cards[index].flipped || cards[index].matched) return;

//         const newCards = [...cards];
//         newCards[index].flipped = true;
//         setCards(newCards);
//         setFlippedCards((prev)=> [...prev, index]);
//     };

//     const formatTime = (s) => {
//         const mins = Math.floor(s / 60).toString().padStart(2, '0');
//         const secs = (s % 60).toString().padStart(2, '0');
//         return `${mins}:${secs}`;
//     };

//     return (
//         <div className="game-container">
//             <h1 className="title">Memory Card Game</h1>
//              {/*  NEW: ADD THIS TIMER DISPLAY  */}
//         <div className="timer">
//             Time: {formatTime(seconds)}
//         </div>
   

//             <Board cards={cards} onCardClick={handleCardClick} />

//         </div>
//     );
// }

// export default Game;



// //setInterval is a browser API (not a React function) that repeatedly calls a function after a specific time interval.
// //setInterval(() => {...}, 1000) calls the function every 1000 milliseconds (1 second).
// //setInterval returns an ID for this timer, which we store in the interval constant. This ID is important for stopping the timer later.
// //setIsGameOver(true) is called.
// //React sees that the isGameOver dependency has changed.
// //Before it runs the effect again, it executes the cleanup function from the previous run. It calls clearInterval(interval), which finds the original timer by its ID and stops it.
// //Then, it runs the effect's setup function again. The if (isGameOver) is true, and it returns.
// //const firstIdx = flippedCards[0];
// //const secondIdx = flippedCards[1];