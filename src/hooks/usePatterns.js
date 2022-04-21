import useBoard from './useBoard';

export const usePatterns = () => {
  const { board, setBoard } = useBoard();

  const centerRow = Math.floor(board.rows / 2); // Calculate the center row
  const centerCol = Math.floor(board.cols / 2); // Calculate the center col

  const spaceships = () => {
    const spaceshipsBoard = board.grid?.map((row, rowIndex) => {
      // In this case, it is mapping the board to a new array
      return row.map((cell, colIndex) => {
        if (
          // print the spaceships
          (rowIndex === centerRow && colIndex === centerCol) ||
          (rowIndex === centerRow + 1 && colIndex === centerCol) ||
          (rowIndex === centerRow + 2 && colIndex === centerCol) ||
          (rowIndex === centerRow + 2 && colIndex === centerCol - 1) ||
          (rowIndex === centerRow + 1 && colIndex === centerCol - 2)
        ) {
          return 1;
        }
        return 0;
      });
    });
    setBoard(prev => ({ ...prev, grid: spaceshipsBoard }));
  };

  const oscillators = () => {
    const oscillatorBoard = board.grid?.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        // print the oscillators
        if (
          (rowIndex === centerRow && colIndex === centerCol) ||
          (rowIndex === centerRow + 1 && colIndex === centerCol) ||
          (rowIndex === centerRow + 2 && colIndex === centerCol)
        ) {
          return 1;
        }
        return 0;
      });
    });
    setBoard(prev => ({ ...prev, grid: oscillatorBoard }));
  };

  const stillLifes = () => {
    const stillLifeBoard = board.grid?.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (
          // print the still lifes
          (rowIndex === centerRow && colIndex === centerCol) ||
          (rowIndex === centerRow + 1 && colIndex === centerCol + 1) ||
          (rowIndex === centerRow + 1 && colIndex === centerCol) ||
          (rowIndex === centerRow && colIndex === centerCol + 1)
        ) {
          return 1; // Set the cell to alive
        }
        return 0; // Set the cell to dead
      });
    });
    setBoard(prev => ({ ...prev, grid: stillLifeBoard }));
  };

  const patterns = [
    {
      title: 'Spaceships',
      description:
        'A finite pattern is called a spaceship if it reappears after a certain number of generations in the same orientation but in a different position.',
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Game_of_life_animated_glider.gif',
      fc: spaceships,
    },
    {
      title: 'Oscillators',
      description:
        'An oscillator is a pattern that returns to its original state, in the same orientation and position, after a finite number of generations. Thus the evolution of such a pattern repeats itself indefinitely.',
      img: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif',
      fc: oscillators,
    },
    {
      title: 'Still lifes',
      description:
        'A still life is a pattern that does not change from one generation to the next.',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Game_of_life_block_with_border.svg/99px-Game_of_life_block_with_border.svg.png',
      fc: stillLifes,
    },
  ];

  return patterns;
};
