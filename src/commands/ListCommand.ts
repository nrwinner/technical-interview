import { Command } from '../Command';
import { printMessage } from '../outputs/printMessage';
import { ValidatorResult } from '../types/ValidateResult';

export class ListCommand extends Command {
  constructor(
    public readonly name: 'list',
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
