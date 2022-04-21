import React from 'react';
import { generatesGrid } from '../../../contexts/BoardCtx';
import useBoard from '../../../hooks/useBoard';
import ClearIcon from '../../Icons/ClearIcon';
const ClearBtn = ({ isRunningRef, setIsRunning }) => {
  const { board, setBoard } = useBoard();

  // Reset the board
  const handleCleanBoard = () => {
    isRunningRef.current = false;
    setIsRunning(false); // Stop the game
    setBoard({
      ...board,
      grid: generatesGrid(board.rows, board.cols, 0),
      generation: 0, // Reset the generation
    });
  };
  return (
    <button onClick={handleCleanBoard} className='btn-warning'>
      <>
        <ClearIcon />
        Clear
      </>
    </button>
  );
};

export default ClearBtn;
