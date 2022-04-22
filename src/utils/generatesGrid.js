export const generatesGrid = (rows, cols, fill) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill(fill));
