import { Command } from '../Command';
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
    return { valid: true };
  }
}
