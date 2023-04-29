import { Directory } from './Directory';
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

  public abstract execute(
    data: Directory,
    traverse: (path: string[], createIfNotExists?: boolean) => Directory
  ): void;

  protected abstract _validate(): ValidatorResult;
}
