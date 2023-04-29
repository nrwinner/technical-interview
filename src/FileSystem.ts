import { Command } from './Command';
import { Directory } from './Directory';

export class FileSystem {
  private data = new Directory('_root', null);

  public processCommand(command: Command): void {
    command.execute(this.data, this.traverse.bind(this));
  }

  private traverse(path: string[], createIfNotExists = false): Directory {
    let currentPathSegmentIndex = 0;
    let currentlyVisitedDirectory = this.data;

    const specifiedPathIsRoot =
      path.length === 0 || (path.length === 1 && path[0] === '.');

    if (specifiedPathIsRoot) {
      return this.data;
    }

    const createNotFoundError = () =>
      new Error(`${path[currentPathSegmentIndex]} does not exist`);

    while (currentPathSegmentIndex < path.length) {
      let indexOfKey = currentlyVisitedDirectory.children.findIndex(
        (next) => next.key === path[currentPathSegmentIndex]
      );

      if (indexOfKey < 0) {
        if (!createIfNotExists) {
          throw createNotFoundError();
        }

        currentlyVisitedDirectory.add(path[currentPathSegmentIndex]);
        indexOfKey = currentlyVisitedDirectory.children.length - 1;
      }

      const nextDirectory = currentlyVisitedDirectory.children[indexOfKey];

      const nextDirectoryIsTarget = currentPathSegmentIndex === path.length - 1;
      if (nextDirectoryIsTarget) {
        return nextDirectory;
      }

      currentlyVisitedDirectory = nextDirectory;
      currentPathSegmentIndex++;
    }

    throw createNotFoundError();
  }
}
