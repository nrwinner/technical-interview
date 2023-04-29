export class Directory {
  constructor(
    public readonly key: string,
    public readonly parent: Directory,
    private readonly _children: Array<Directory> = []
  ) {}

  public add(key: string): void {
    this._children.push(new Directory(key, this));
  }

  public addExisting(directory: Directory) {
    this._children.push(
      new Directory(directory.key, this, [...directory.children])
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
