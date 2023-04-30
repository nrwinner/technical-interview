import { Directory } from './Directory';
import { ValidatorResult } from './types/ValidateResult';

export abstract class Command {
  constructor(
    public readonly name: string,
    public readonly args: ReadonlyArray<string>
  ) {}

  /**
   * Test this command for validity
   */
  public validate(): ValidatorResult {
    if (this.name.length === 0) {
      return {
        valid: false,
        message: 'CommandValidationError: Please enter a command.',
      };
    }

    return this._validate();
  }

  /**
   * Execute this command on a provided data set
   *
   * @param rootDirectory - the root directory
   * @param traverse - a function that, given a string path, locates and returns a matching directory
   */
  public abstract execute(rootDirectory: Directory): void;

  protected abstract _validate(): ValidatorResult;
}
