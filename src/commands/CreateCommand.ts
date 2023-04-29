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

  public execute(
    _: Directory,
    traverse: (path: string[], insertIfNotExists?: boolean) => Directory
  ): void {
    try {
      traverse(parsePath(this.args[0]), true);
    } catch (e) {
      if (e instanceof Error) {
        printError(`Cannot create ${this.args[0]} - ${e.message}`);
      } else {
        console.error(e);
      }
    }
  }
}
