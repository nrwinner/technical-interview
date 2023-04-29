import { Command } from '../Command';
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
      // TODO(nrwinner) print message here?
      return { valid: true };
    }

    return {
      valid: false,
      message:
        'CommandValidationError: Please provide a path at which to delete the item.',
    };
  }
}
