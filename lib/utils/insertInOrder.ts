export const insertInAscOrder = <T>(
  value: T,
  arr: T[],
  comparator: (item1: T, item2: T) => number
) => {
  const indexOfAdjacentChild = arr.findIndex(
    (next) => comparator(next, value) >= 0
  );

  if (indexOfAdjacentChild >= 0) {
    arr.splice(indexOfAdjacentChild, 0, value);
    return;
  }

  arr.push(value);
};
