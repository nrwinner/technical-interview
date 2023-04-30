import { insertInAscOrder } from './insertInOrder';

const stringComparator = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return -0;
};

describe('Util - insertInOrder', () => {
  it('should insert an element into an empty array', () => {
    const payload: string[] = [];
    insertInAscOrder('apple', payload, stringComparator);
    expect(payload).toEqual(['apple']);
  });

  it('should insert an element into end of array', () => {
    const payload: string[] = ['apple'];
    insertInAscOrder('banana', payload, stringComparator);
    expect(payload).toEqual(['apple', 'banana']);
  });

  it('should insert an element into start of array', () => {
    const payload: string[] = ['banana', 'cherry'];
    insertInAscOrder('apple', payload, stringComparator);
    expect(payload).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should insert an element into middle of array', () => {
    const payload: string[] = ['apple', 'cherry', 'date', 'eggplant'];
    insertInAscOrder('banana', payload, stringComparator);
    expect(payload).toEqual(['apple', 'banana', 'cherry', 'date', 'eggplant']);
  });
});
