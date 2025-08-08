export const initialState = {
  cards: [],
  flippedCards: [],
  matches: 0,
  mismatches: 0,
  timeRemaining: 180, // 3 minutes
  gameStatus: 'idle', // 'idle', 'playing', 'finished'
  lockBoard: false,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        cards: action.payload.cards,
        gameStatus: 'playing',
      };

    case 'FLIP_CARD': {
      const newCards = [...state.cards];
      newCards[action.payload.index].flipped = true;
      return {
        ...state,
        cards: newCards,
        flippedCards: [...state.flippedCards, action.payload.index],
        lockBoard: state.flippedCards.length === 1, // Lock board when 2nd card is flipped
      };
    }

    case 'CHECK_MATCHES': {
      const [firstIdx, secondIdx] = state.flippedCards;
      const first = state.cards[firstIdx];
      const second = state.cards[secondIdx];

      // TRAP CARD LOGIC
      if (first.type === 'trap' || second.type === 'trap') {
        const updatedCards = state.cards.map(card => 
          card.matched ? { ...card, matched: false, flipped: false } : card
        );
        updatedCards[firstIdx].flipped = false;
        updatedCards[secondIdx].flipped = false;
        return {
          ...state,
          cards: updatedCards,
          mismatches: state.mismatches + 1,
          flippedCards: [],
          lockBoard: false,
        };
      }

      // MATCH LOGIC (WILD or SAME LOGO)
      if (first.type === 'wild' || second.type === 'wild' || first.logo === second.logo) {
        const updatedCards = [...state.cards];
        updatedCards[firstIdx].matched = true;
        updatedCards[secondIdx].matched = true;
        return {
          ...state,
          cards: updatedCards,
          matches: state.matches + 1,
          flippedCards: [],
          lockBoard: false,
        };
      }

      // MISMATCH LOGIC
      const updatedCards = [...state.cards];
      updatedCards[firstIdx].flipped = false;
      updatedCards[secondIdx].flipped = false;
      return {
        ...state,
        cards: updatedCards,
        mismatches: state.mismatches + 1,
        flippedCards: [],
        lockBoard: false,
      };
    }

    case 'TICK_TIMER':
      if (state.timeRemaining <= 1) {
        return { ...state, timeRemaining: 0, gameStatus: 'finished' };
      }
      return { ...state, timeRemaining: state.timeRemaining - 1 };

    default:
      return state;
  }
}