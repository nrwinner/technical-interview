export const insertInAscOrder = <T>(
  value: T,
  arr: T[],
  comparator: (item1: T, item2: T) => number
) => {
  for (let i = 0; i < arr.length; i++) {
    if (comparator(arr[i], value) >= 0) {
      arr.splice(i, 0, value);
      return
    }
  }

  arr.push(value);
};
