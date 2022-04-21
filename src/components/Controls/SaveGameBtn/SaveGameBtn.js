import React, { useState } from 'react';
import useBoard from '../../../hooks/useBoard';
import DeleteIcons from '../../Icons/DeleteIcons';
import SaveIcon from '../../Icons/SaveIcon';

const SaveGameBtn = ({ isRunningRef, setIsRunning }) => {
  const { isEmpty, board } = useBoard();

  const [isSaving, setIsSaving] = useState(localStorage.getItem('board'));

  const handleSaveModal = () => {
    if (!isSaving) {
      // If the board is not being saved, save it
      if (isEmpty) return; // Avoid saving an empty board
      if (isRunningRef.current) {
        isRunningRef.current = false;
        setIsRunning(false);
      } // Stop the game and save the board
      const data = {
        speed: board.speed,
        grid: board.grid,
        generation: board.generation,
        rows: board.rows,
        cols: board.cols,
      };
      localStorage.setItem('board', JSON.stringify(data));
      setIsSaving(true);
    } else {
      // If the board is being saved, remove it
      localStorage.removeItem('board');
      setIsSaving(false);
    }
  };

  return !isSaving ? (
    <button
      disabled={isEmpty}
      className='btn-success'
      onClick={handleSaveModal}
    >
      <>
        <SaveIcon />
        Save current game
      </>
    </button>
  ) : (
    <button onClick={handleSaveModal} className='btn-danger'>
      <>
        <DeleteIcons />
        Delete last game
      </>
    </button>
  );
};

export default SaveGameBtn;
