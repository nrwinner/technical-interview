import { Directory } from './Directory';

export interface CommandValidationResult {
  valid: boolean;
  message?: string;
}

export abstract class Command {
  constructor(
    public readonly name: string,
    public readonly args: ReadonlyArray<string>
  ) {}

  /**
   * Test this command for validity
   */
  public validate(): CommandValidationResult {
    if (this.name.length === 0) {
      return {
        valid: false,
        message: 'CommandValidationError: Please enter a command.',
      };
    }

    return this._validate();
  }

  /**
   * Execute this command on a provided directory
   *
   * @param rootDirectory - the root directory
   */
  public abstract execute(rootDirectory: Directory): void;

  protected abstract _validate(): CommandValidationResult;
}
