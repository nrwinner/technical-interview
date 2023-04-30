import { insertInAscOrder } from './utils/insertInOrder';

const directoryComparator = (item1: Directory, item2: Directory) => {
  if (item1.name < item2.name) {
    return -1;
  }

  if (item1.name > item2.name) {
    return 1;
  }

  return 0;
};

export class Directory {
  constructor(
    public readonly name: string,
    public readonly parent: Directory,
    private readonly _children: Array<Directory> = []
  ) {}

  public get children(): ReadonlyArray<Directory> {
    return this._children;
  }

  /**
   * Create an empty sub-directory with the provided name
   * @param name - the name of the directory to create
   */
  public createSubdirectory(name: string): void {
    insertInAscOrder(
      new Directory(name, this),
      this._children,
      directoryComparator
    );
  }

  /**
   * Add an existing directory as a sub-directory
   * @param directory - the directory to nest
   */
  public addExisting(directory: Directory) {
    insertInAscOrder(
      new Directory(directory.name, this, [...directory.children]),
      this._children,
      directoryComparator
    );
  }

  /**
   * Delete a sub-directory by name
   * @param name - the name of the sub-directory to delete
   */
  public delete(name: string) {
    const index = this._children.findIndex((dir) => dir.name === name);
    if (index < 0) {
      throw new Error(`${name} does not exist.`);
    }

    this._children.splice(index, 1);
  }

  /**
   * Locates and returns a directory matching the provided path
   * @param path - an array of strings representing a path from the root to the desired directory
   */
  public search(path: string[]): Directory {
    const currentPath = path[0];

    const pathIsThisDirectory = path.length === 1 && currentPath === '.';
    const pathIsEmpty = path.length === 0;
    if (pathIsThisDirectory || pathIsEmpty) {
      return this;
    }

    const matchingSubDirectory = this.children.find(
      (subDirectory) => subDirectory.name === currentPath
    );
    if (matchingSubDirectory) {
      return matchingSubDirectory.search(path.slice(1));
    }

    throw new Error(`${currentPath} does not exist.`);
  }
}
