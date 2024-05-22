export const newGame = (): Array<Array<number>> => {
  return new Array(3).fill(null).map(() => new Array(3).fill(-1));
};

export const checkRow = (arr: Array<number>) => {
  if (arr.every((val) => val === 0)) return "O";
  if (arr.every((val) => val === 1)) return "X";
};

export const aboutToWin = (arr: Array<number>, val: number) => {
  if (countOccurrences(arr, val) === 2 && countOccurrences(arr, -1) === 1) {
    return arr.findIndex((num) => num === -1)!;
  }
  return -1;
};

export const setup = (arr: Array<number>, val: number) => {
  if (countOccurrences(arr, val) === 1 && countOccurrences(arr, -1) === 2) {
    return arr.findIndex((num) => num === -1)!;
  }
  return -1;
};

const countOccurrences = (array: Array<number>, value: number) =>
  array.reduce((acc, current) => (current === value ? acc + 1 : acc), 0);
