import React from 'react';

function GameInfo({ score, timeRemaining }) {
  const formatTime = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="game-info">
      <div className="score">Score: {score}</div>
      <div className="timer">Time Left: {formatTime(timeRemaining)}</div>
    </div>
  );
}

export default GameInfo;