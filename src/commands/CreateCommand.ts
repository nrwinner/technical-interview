import { Command } from '../Command';
import { Directory } from '../Directory';
import { parsePath } from '../utils/parsePath';
import { printError } from '../outputs/printError';
import { printMessage } from '../outputs/printMessage';
import { ValidatorResult } from '../types/ValidateResult';

export class CreateCommand extends Command {
  constructor(
    public readonly name: 'create',
    public readonly args: [path: string]
  ) {
    super(name, args);
  }

  protected _validate(): ValidatorResult {
    if (this.args.length === 1) {
      return { valid: true };
    }

    if (this.args.length > 1) {
      printMessage('Additional arguments were found and will be ignored');
      return { valid: true };
    }

    return {
      valid: false,
      message:
        'CommandValidationError: Please provide a path at which to create the item.',
    };
  }

  public execute(rootDirectory: Directory): void {
    try {
      const path = parsePath(this.args[0]);

      const containingDirectoryPath = path.slice(0, path.length - 1);
      const targetDirectoryName = path[path.length - 1];

      const containingDirectory = rootDirectory.search(containingDirectoryPath);
      containingDirectory.createSubdirectory(targetDirectoryName);
    } catch (e) {
      if (e instanceof Error) {
        printError(`Cannot create ${this.args[0]} - ${e.message}`);
      } else {
        console.error(e);
      }
    }
  }
}
