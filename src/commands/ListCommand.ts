import { Command } from '../Command';
import { Directory } from '../Directory';
import { printDirectoryItem } from '../outputs/printDirectoryItem';
import { printMessage } from '../outputs/printMessage';
import { ValidatorResult } from '../types/ValidateResult';

export class ListCommand extends Command {
  constructor(public readonly name: 'list', public readonly args: []) {
    super(name, args);
  }

  protected _validate(): ValidatorResult {
    if (this.args.length) {
      printMessage('Additional arguments were found and will be ignored.');
    }

    return { valid: true };
  }

  public execute(rootDirectory: Directory): void {
    const listDirectory = (directory: Directory, level: number = 0) => {
      printDirectoryItem(new Array(level).fill('  ').join('') + directory.key);

      directory.children.forEach((directory) =>
        listDirectory(directory, level + 1)
      );
    };

    rootDirectory.children.forEach((directory) => listDirectory(directory, 0));
  }
}
