import React from 'react';
import { AiFillPlayCircle, AiFillStop } from 'react-icons/ai';
import useBoard from '../../../hooks/useBoard';
const RunningBtn = ({ runGame }) => {
  const { isRunning, isRunningRef, isEmpty } = useBoard();
  return (
    <button
      onClick={runGame}
      disabled={isEmpty && !isRunningRef.current}
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
