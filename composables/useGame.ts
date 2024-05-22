export const newGame = (): Array<Array<number>> => {
  return new Array(3).fill(null).map(() => new Array(3).fill(-1));
};

export const checkRow = (arr: Array<number>) => {
  if (arr.every((val) => val === 0)) return "O";
  if (arr.every((val) => val === 1)) return "X";
};
