import React, { useCallback, useEffect, useRef, useState } from 'react';
import { generatesGrid } from '../../contexts/BoardCtx';
import useBoard from '../../hooks/useBoard';
import { arrayClone } from '../../utils/arrayClone';
import { neighborsPositions } from '../../utils/neighborsPositions';
import Cell from '../Cell/Cell';
import ClearBtn from '../Controls/Clear/ClearBtn';
import PatternBtn from '../Controls/Pattern/PatternBtn';
import RunningBtn from '../Controls/Running/RunningBtn';
import SaveGameBtn from '../Controls/SaveGameBtn/SaveGameBtn';

const Board = () => {
  const { isEmpty, board, setBoard } = useBoard(); // Get the board state from the context

  const [isRunning, setIsRunning] = useState(false); // Is the game running?
  const isRunningRef = useRef(isRunning); // Ref to the isRunning state
  isRunningRef.current = isRunning; // Set the running state to the ref

  // Handle the game logic
  const handleRunGame = () => {
    if (isEmpty && !isRunningRef.current) return; // If the board is empty and the game is not running, return
    setIsRunning(!isRunning); // Toggle the game's running state
    if (!isRunning) {
      isRunningRef.current = true;
    }
  };

  const runGame = useCallback(
    grid => {
      const boardClone = arrayClone(grid); // Clone the board for comparison and avoid mutating the original board. Avoid spread operator

      for (let originRow = 0; originRow < board.rows; originRow++) {
        // Loop through the rows
        for (let originCol = 0; originCol < board.cols; originCol++) {
          // Loop through the columns
          let neighbors = 0; // Count the number of neighbors the cell has

          neighborsPositions.forEach(([neighborRow, neighborCol]) => {
            // Iterate through the neighbors positions for calculating the number of neighbors
            const targetRow = originRow + neighborRow; // Calculate the target row
            const targetCol = originCol + neighborCol; // Calculate the target col
            if (
              targetRow >= 0 &&
              targetRow < board.rows &&
              targetCol >= 0 &&
              targetCol < board.cols
            ) {
              // Check if the target cell is within the board's boundaries
              neighbors += grid[targetRow][targetCol]; // Add the neighbor's value to the count. If the neighbor is alive, add 1. If not, add 0.
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            boardClone[originRow][originCol] = 0; // Kill the cell if it has less than 2 or more than 3 neighbors
          }
          if (grid[originRow][originCol] === 0 && neighbors === 3) {
            boardClone[originRow][originCol] = 1; // Birth the cell if it has exactly 3 neighbors
          }
        }
      }

      setBoard(prevBoard => ({
        ...prevBoard,
        generation: prevBoard.generation + 1,
        grid: boardClone,
      })); // Update the board
    },
    [board.rows, board.cols, setBoard]
  );

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      // Set the interval to run the game
      runGame(board.grid);
    }, board.speed);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts. Avoid memory leaks and unexpected behavior
    };
  }, [board.grid, board.speed, runGame, isRunning]);

  // const handlePattern = pattern => {
  //   resetBoard();
  //   pattern();
  // };

  // const stillLifes = () => {
  //   const centerRow = Math.floor(rows / 2); // Calculate the center row
  //   const centerCol = Math.floor(cols / 2); // Calculate the center col

  //   const stillLifeBoard = board.map((row, rowIndex) => {
  //     // In this case, it is mapping the board to a new array
  //     return row.map((cell, colIndex) => {
  //       if (
  //         (rowIndex === centerRow && colIndex === centerCol) ||
  //         (rowIndex === centerRow + 1 && colIndex === centerCol + 1) ||
  //         (rowIndex === centerRow + 1 && colIndex === centerCol) ||
  //         (rowIndex === centerRow && colIndex === centerCol + 1)
  //       ) {
  //         return 1; // Set the cell to alive
  //       }
  //       return 0; // Set the cell to dead
  //     });
  //   });
  //   setBoard(stillLifeBoard);
  // };

  // const oscillators = () => {
  //   const centerRow = Math.floor(rows / 2); // Calculate the center row
  //   const centerCol = Math.floor(cols / 2); // Calculate the center col

  //   const oscillatorBoard = board.map((row, rowIndex) => {
  //     // In this case, it is mapping the board to a new array
  //     return row.map((cell, colIndex) => {
  //       if (
  //         (rowIndex === centerRow && colIndex === centerCol) ||
  //         (rowIndex === centerRow + 1 && colIndex === centerCol) ||
  //         (rowIndex === centerRow + 2 && colIndex === centerCol)
  //       ) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   });
  //   setBoard(oscillatorBoard);
  // };

  // const spaceships = () => {
  //   const centerRow = Math.floor(rows / 2); // Calculate the center row
  //   const centerCol = Math.floor(cols / 2); // Calculate the center col

  //   const spaceshipsBoard = board.map((row, rowIndex) => {
  //     // In this case, it is mapping the board to a new array
  //     return row.map((cell, colIndex) => {
  //       if (
  //         (rowIndex === centerRow && colIndex === centerCol) ||
  //         (rowIndex === centerRow + 1 && colIndex === centerCol) ||
  //         (rowIndex === centerRow + 2 && colIndex === centerCol) ||
  //         (rowIndex === centerRow + 2 && colIndex === centerCol - 1) ||
  //         (rowIndex === centerRow + 1 && colIndex === centerCol - 2)
  //       ) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   });
  //   setBoard(spaceshipsBoard);
  // };

  return (
    <main>
      {/* Controls  */}
      <div className='controls-container'>
        <div className='controls-left'>
          <RunningBtn
            runGame={handleRunGame}
            disabled={isEmpty && !isRunningRef.current}
            isRunning={isRunning}
          />
          <ClearBtn isRunningRef={isRunningRef} setIsRunning={setIsRunning} />
        </div>
        <div className='controls-rigth'>
          {/* <PatternBtn stillLifes={() => handlePattern(spaceships)} /> */}
          <SaveGameBtn
            isRunningRef={isRunningRef}
            setIsRunning={setIsRunning}
          />
        </div>
      </div>
      <small className='generation'>
        Generation: <span>{board.generation}</span>
      </small>
      {/* Grid */}
      <div className='grid-overlow'>
        <div
          className={`grid-wrapper ${
            board.cols === 70
              ? 'isBig'
              : board.cols === 50
              ? 'isDefault'
              : 'isSmall'
          }`}
        >
          <div>
            {/* Iterates through the board and creates a new array with the cells' values  */}
            {board.grid?.map((row, rowIndex) => {
              return row.map((cell, colIndex) => {
                // cell is the value of the cell
                return (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    data={{
                      isAlive: cell, // Check if the cell is alive (1 is can be used as a boolean)
                      row: rowIndex,
                      col: colIndex,
                    }}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Board;
