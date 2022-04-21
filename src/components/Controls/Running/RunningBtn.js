import React from 'react';
import { AiFillPlayCircle, AiFillStop } from 'react-icons/ai';
const RunningBtn = ({ isRunning, runGame, disabled }) => {
  return (
    <button
      onClick={runGame}
      disabled={disabled}
      className={isRunning ? 'btn-danger' : 'btn-success'}
    >
      {isRunning ? (
        <>
          <AiFillStop />
          Stop
        </>
      ) : (
        <>
          <AiFillPlayCircle />
          Play
        </>
      )}
    </button>
  );
};

export default RunningBtn;
