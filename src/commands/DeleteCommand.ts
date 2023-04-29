import { Command } from '../Command';
import { printMessage } from '../outputs/printMessage';
import { VALID_COMMANDS } from '../types/ValidCommands';
import { ValidatorResult } from '../types/ValidateResult';

export class DeleteCommand extends Command {
  constructor(
    public readonly name: VALID_COMMANDS.DELETE,
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
        'CommandValidationError: Please provide a path at which to delete the item.',
    };
  }
}
