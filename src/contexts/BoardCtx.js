import React, { createContext, useEffect, useState } from 'react';
import { parseSettings } from '../utils/parseSettings';
import {
  defaultGeneration,
  regularGrid,
  regularSpeed,
} from '../utils/settingsContent';

export const BoardContext = createContext({});

export const generatesGrid = (rows, cols, fill) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill(fill));

const BoardCtx = ({ children }) => {
  const initialValues = {
    generation: defaultGeneration, // Initial generation
    speed: regularSpeed.speed, // default speed
    rows: regularGrid?.size?.rows, // default grid size
    cols: regularGrid?.size?.cols, // default grid size
    // Abstract the board into a 2D array. Init with all dead cells (0)
    grid: generatesGrid(regularGrid?.size?.rows, regularGrid?.size?.cols, 0),
  };

  const [board, setBoard] = useState(initialValues); // handle board state

  const isEmpty = board?.grid?.every(row => row.every(cell => cell === 0)); // Check if the board is empty

  useEffect(() => {
    const hasGameSaved = localStorage.getItem('board');
    const hasCustomSettings = localStorage.getItem('settings');

    if (hasGameSaved) {
      // If there is a game saved, load it
      const data = JSON.parse(localStorage.getItem('board'));
      setBoard(data);
    } else if (hasCustomSettings) {
      // If there is a custom settings saved, load it
      const { gridSize, speed } = parseSettings();
      setBoard({
        speed,
        generation: defaultGeneration,
        rows: gridSize?.rows,
        cols: gridSize?.cols,
        grid: generatesGrid(gridSize?.rows, gridSize?.cols, 0),
      });
    }
  }, []);

  // Pass the board state to the context
  return (
    <BoardContext.Provider value={{ initialValues, isEmpty, board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardCtx;