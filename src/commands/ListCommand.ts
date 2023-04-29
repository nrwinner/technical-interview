import { Command } from '../Command';
import { printMessage } from '../outputs/printMessage';
import { VALID_COMMANDS } from '../types/ValidCommands';
import { ValidatorResult } from '../types/ValidateResult';

export class ListCommand extends Command {
  constructor(
    public readonly name: VALID_COMMANDS.LIST,
    public readonly args: []
  ) {
    super(name, args);
  }

  protected _validate(): ValidatorResult {
    if (this.args.length) {
      printMessage('Additional arguments were found and will be ignored');
    }

    return { valid: true };
  }
}
