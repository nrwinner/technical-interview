import { Command } from '../Command';
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
      message: 'CommandValidationError: Please provide a target and destination path.',
    };
  }
}
