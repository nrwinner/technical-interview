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

    // const nameLower = this.name.toLowerCase();

    // switch (nameLower) {
    //   case VALID_COMMANDS.LIST:
    //     return { valid: true };
    //   case VALID_COMMANDS.CREATE:
    //   case VALID_COMMANDS.DELETE:
    //     return this.args.length >= 1
    //       ? { valid: true }
    //       : {
    //           valid: false,
    //           message: `CommandValidationError: Please provide a path at which to ${nameLower} the item.`,
    //         };
    //   case VALID_COMMANDS.MOVE:
    //     return this.args.length >= 2
    //       ? { valid: true }
    //       : {
    //           valid: false,
    //           message:
    //             'CommandValidationError: Please provide a target and destination path.',
    //         };

    //   default:
    //     return {
    //       valid: false,
    //       message: `CommandValidationError: Unknown command '${this.name}'.`,
    //     };
    // }
  }

  protected abstract _validate(): ValidatorResult;
}
