import { Command } from './Command';
import { Directory } from './Directory';

import { VALID_COMMANDS } from './types/ValidCommands';
import { parsePath } from './utils/parsePath';
import { printDirectoryItem } from './outputs/printDirectoryItem';
import { printError } from './outputs/printError';

export class FileSystem {
  private data = new Directory('_root', null);

  public processCommand(command: Command): void {
    switch (command.name) {
      case VALID_COMMANDS.LIST:
        return this.list();
      case VALID_COMMANDS.CREATE:
        // @ts-ignore
        return this.create(...command.args);
      case VALID_COMMANDS.MOVE:
        // @ts-ignore
        return this.move(...command.args);
      case VALID_COMMANDS.DELETE:
        // @ts-ignore
        return this.delete(...command.args);
    }
  }

  private create(path: string) {
    try {
      this.traverse(parsePath(path), true);
    } catch (e) {
      if (e instanceof Error) {
        printError(`Cannot create ${path} - ${e.message}`);
      } else {
        console.error(e);
      }
    }
  }

  private list() {
    const listDirectory = (directory: Directory, level: number = 0) => {
      printDirectoryItem(new Array(level).fill('  ').join('') + directory.key);

      directory.children.forEach((directory) =>
        listDirectory(directory, level + 1)
      );
    };

    this.data.children.forEach((directory) => listDirectory(directory, 0));
  }

  private move(origin: string, destination: string) {
    try {
      const sourceDirectory = this.traverse(parsePath(origin));
      sourceDirectory.parent.delete(sourceDirectory.key);

      const destinationDirectory = this.traverse(parsePath(destination));
      destinationDirectory.addExisting(sourceDirectory);
    } catch (e) {
      if (e instanceof Error) {
        printError(`Cannot move ${origin} to ${destination} - ${e.message}`);
      } else {
        console.error(e);
      }
    }
  }

  private delete(path: string) {
    const parsedPath = parsePath(path);

    const hostDirectoryPath = parsedPath.slice(0, parsedPath.length - 1);
    const targetName = parsedPath[parsedPath.length - 1];

    try {
      const hostDirectory = this.traverse(hostDirectoryPath);
      hostDirectory.delete(targetName);
    } catch (e) {
      if (e instanceof Error) {
        printError(`Cannot delete ${path} - ${e.message}`);
      } else {
        console.error(e);
      }
    }
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
