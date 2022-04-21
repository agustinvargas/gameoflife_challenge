export const neighborsPositions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]; // [row, col]. Each cell has 8 neighbors

export const calcEdgeNeightborsPosition = (rows, cols) => {
  const edgePositions = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
        neighborsPositions.forEach(([neighborRow, neighborCol]) => {
          const newRow = row + neighborRow;
          const newCol = col + neighborCol;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            edgePositions.push([newRow, newCol]);
          }
        });
      }
    }
  }
  return edgePositions;
};
