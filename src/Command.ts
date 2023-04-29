import { VALID_COMMANDS } from './types/ValidCommands';
import { ValidatorResult } from './types/ValidateResult';

export class Command {
  private constructor(
    public readonly name: VALID_COMMANDS,
    public readonly args: ReadonlyArray<string>
  ) {}

  public static create(commandString: string) {
    const [name, ...args] = commandString.split(' ');

    const { valid, message } = Command.validate(name, args);

    if (!valid) {
      throw new Error(message);
    }

    return new Command(name.toLowerCase() as VALID_COMMANDS, args);
  }

  public static validate(
    name: string,
    args: ReadonlyArray<string> = []
  ): ValidatorResult {
    if (name.length === 0) {
      return {
        valid: false,
        message: 'CommandValidationError: Please enter a command.',
      };
    }

    const nameLower = name.toLowerCase();

    switch (nameLower) {
      case VALID_COMMANDS.LIST:
        return { valid: true };
      case VALID_COMMANDS.CREATE:
      case VALID_COMMANDS.DELETE:
        return args.length >= 1
          ? { valid: true }
          : {
              valid: false,
              message: `CommandValidationError: Please provide a path at which to ${nameLower} the item.`,
            };
      case VALID_COMMANDS.MOVE:
        return args.length >= 2
          ? { valid: true }
          : {
              valid: false,
              message:
                'CommandValidationError: Please provide a target and destination path.',
            };

      default:
        return {
          valid: false,
          message: `CommandValidationError: Unknown command '${name}'.`,
        };
    }
  }
}
