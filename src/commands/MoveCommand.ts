import { Command } from '../Command';
import { Directory } from '../Directory';
import { parsePath } from '../utils/parsePath';
import { printError } from '../outputs/printError';
import { printMessage } from '../outputs/printMessage';
import { ValidatorResult } from '../types/ValidateResult';

export class MoveCommand extends Command {
  constructor(
    public readonly name: 'move',
    public readonly args: [srcPath: string, destinationDirectoryPath: string]
  ) {
    super(name, args);
  }

  protected _validate(): ValidatorResult {
    if (this.args.length === 2) {
      return { valid: true };
    }

    if (this.args.length > 2) {
      printMessage('Additional arguments were found and will be ignored');
      return { valid: true };
    }

    return {
      valid: false,
      message:
        'CommandValidationError: Please provide a target and destination path.',
    };
  }

  public execute(rootDirectory: Directory): void {
    try {
      const sourceDirectory = rootDirectory.search(parsePath(this.args[0]));
      sourceDirectory.parent.delete(sourceDirectory.key);

      const destinationDirectory = rootDirectory.search(
        parsePath(this.args[1])
      );
      destinationDirectory.addExisting(sourceDirectory);
    } catch (e) {
      if (e instanceof Error) {
        printError(
          `Cannot move ${this.args[0]} to ${this.args[1]} - ${e.message}`
        );
      } else {
        printError(`UnknownError: ${e}`);
      }
    }
  }
}
