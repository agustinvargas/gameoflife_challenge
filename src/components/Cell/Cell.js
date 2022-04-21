import React from 'react';
import useBoard from '../../hooks/useBoard';
import { arrayClone } from '../../utils/arrayClone';

const Cell = ({ data }) => {
  const { board, setBoard } = useBoard();
  const { isAlive, row, col } = data;

  // Select cells to be alive
  const handleSelectedCell = (row, col) => {
    const boardClone = arrayClone(board.grid); // Clone the board for comparison. Avoid mutating the original board
    boardClone[row][col] = boardClone[row][col] ? 0 : 1; // Toggle the cell's value
    setBoard({ ...board, grid: boardClone }); // Update the board
  };

  return (
    <div
      className={`cell ${isAlive ? 'alive' : 'dead'}`}
      onClick={() => handleSelectedCell(row, col)}
    />
  );
};

export default Cell;
