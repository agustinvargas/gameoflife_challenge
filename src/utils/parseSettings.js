export function parseSettings() {
  if (localStorage.getItem('settings') === null) return;

  let [grid, speed] = JSON.parse(localStorage.getItem('settings'));
  const gridSize = JSON.parse(grid?.gridSize);
  speed = parseFloat(speed?.speed);
  return {
    gridSize,
    speed,
  };
}
