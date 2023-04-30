import { Command } from '../Command';
import { Directory } from '../Directory';
import { parsePath } from '../utils/parsePath';
import { printError } from '../outputs/printError';
import { printMessage } from '../outputs/printMessage';
import { ValidatorResult } from '../types/ValidateResult';

export class DeleteCommand extends Command {
  constructor(
    public readonly name: 'delete',
    public readonly args: [path: string]
  ) {
    super(name, args);
  }

  protected _validate(): ValidatorResult {
    if (this.args.length === 1) {
      return { valid: true };
    }

    if (this.args.length > 1) {
      printMessage(
        `Additional arguments were found and will be ignored: [${this.args
          .slice(1)
          .join(', ')}]`
      );
      return { valid: true };
    }

    return {
      valid: false,
      message: 'CommandValidationError: Please provide a path to delete.',
    };
  }

  public execute(rootDirectory: Directory): void {
    const parsedPath = parsePath(this.args[0]);

    const hostDirectoryPath = parsedPath.slice(0, parsedPath.length - 1);
    const targetName = parsedPath[parsedPath.length - 1];

    try {
      const hostDirectory = rootDirectory.search(hostDirectoryPath);
      hostDirectory.delete(targetName);
    } catch (e) {
      if (e instanceof Error) {
        printError(`Cannot delete ${this.args[0]} - ${e.message}`);
      } else {
        printError(`UnknownError: ${e}`);
      }
    }
  }
}
