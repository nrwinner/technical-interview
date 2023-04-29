import { insertInAscOrder } from './utils/insertInOrder';

const directoryComparator = (item1: Directory, item2: Directory) => {
  if (item1.key < item2.key) {
    return -1;
  }

  if (item1.key > item2.key) {
    return 1;
  }

  return 0;
};

export class Directory {
  constructor(
    public readonly key: string,
    public readonly parent: Directory,
    private readonly _children: Array<Directory> = []
  ) {}

  public add(key: string): void {
    insertInAscOrder(
      new Directory(key, this),
      this._children,
      directoryComparator
    );
  }

  public addExisting(directory: Directory) {
    insertInAscOrder(
      new Directory(directory.key, this, [...directory.children]),
      this._children,
      directoryComparator
    );
  }

  public delete(key: string) {
    const index = this._children.findIndex((dir) => dir.key === key);
    if (index < 0) {
      throw new Error(`${key} does not exist`);
    }

    this._children.splice(index, 1);
  }

  public get children(): ReadonlyArray<Directory> {
    return this._children;
  }
}
