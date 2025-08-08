# Memory-Card-Game

A dynamic and interactive Memory Card Game built with React, designed to test a player's memory and strategy. This application features a clean UI, smooth animations, and advanced game mechanics including special card types for an extra layer of challenge.

### Key Features

-   **Classic Memory Game Logic:** A 4x4 grid of cards is dynamically generated and shuffled, challenging the user to find matching pairs.
-   **Advanced Game Mechanics:**
    -   **Wild Card:** A special card that can be matched with any other card on the board.
    -   **Trap Card:** A challenge card that, when revealed, flips all previously matched pairs face-down, forcing the player to re-evaluate their strategy.
-   **Timer & Scoring System:**
    -   A 3-minute countdown timer creates a sense of urgency.
    -   A dynamic score is calculated based on successful matches and penalties for mismatches.
-   **Engaging User Experience:**
    -   Smooth 3D card flip animations provide clear visual feedback.
    -   Interactive tap animations on cards enhance the user's sense of control.
-   **Responsive Design:** The layout is fully responsive and provides an optimal experience on various screen sizes.

### Technical Implementation

This project was built with a focus on modern React best practices.

-   **State Management:** The entire game state is managed predictably using the **`useReducer`** hook, which centralizes all state transition logic into a single reducer function. 
-   **Component Architecture:** The application is structured with a clean separation of concerns:
    -   A "smart" **container component** (`Game.js`) that manages all logic.
    -   "Dumb" **presentational components** (`Board.js`, `Card.js`, `GameInfo.js`) that are reusable and only responsible for rendering the UI.
-   **Side Effects:** The `useEffect` hook is used to handle side effects like the countdown timer and the delay for checking card matches.
-   **Styling:** Styled with pure CSS, utilizing **CSS Grid** for the board layout and **CSS Transforms/Transitions** for the 3D animations.

### Technologies Used

-   **React** 
-   **JavaScript (ES6+)**
-   **CSS3** (Grid, Flexbox, Transforms)
-   **Framer Motion** (for tap animations)

  <img width="804" height="783" alt="image" src="https://github.com/user-attachments/assets/b1017387-6241-474a-8070-2db332c20486" />

