export const defaultGeneration = 0;

const smallGrid = {
  label: 'Small',
  size: {
    rows: 10,
    cols: 30,
  },
};

export const regularGrid = {
  label: 'Default',
  size: {
    rows: 30,
    cols: 50,
  },
};

const bigGrid = {
  label: 'Big',
  size: {
    rows: 50,
    cols: 70,
  },
};

export const gridOpt = [smallGrid, regularGrid, bigGrid];

const slowSpeed = {
  label: 'Slow',
  speed: 900,
};

export const regularSpeed = {
  label: 'Default',
  speed: 300,
};

const fastSpeed = {
  label: 'Fast',
  speed: 100,
};

export const speedOpt = [slowSpeed, regularSpeed, fastSpeed];
