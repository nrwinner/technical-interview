import { VALID_COMMANDS } from './types/ValidCommands';
import { ValidatorResult } from './types/ValidateResult';

export abstract class Command {
  constructor(
    public readonly name: string,
    public readonly args: ReadonlyArray<string>
  ) {}

  public validate(): ValidatorResult {
    if (this.name.length === 0) {
      return {
        valid: false,
        message: 'CommandValidationError: Please enter a command.',
      };
    }

    return this._validate();
  }

  protected abstract _validate(): ValidatorResult;
}
