import { Command } from './Command';
import { VALID_COMMANDS } from './types/ValidCommands';

import { CreateCommand } from './commands/CreateCommand';
import { DeleteCommand } from './commands/DeleteCommand';
import { ListCommand } from './commands/ListCommand';
import { MoveCommand } from './commands/MoveCommand';

type CommandConstructor = new (
  ...args: ConstructorParameters<typeof Command>
) => Command;

export class CommandFactory {
  private static readonly commandRegistry: Record<string, CommandConstructor> =
    {
      [VALID_COMMANDS.CREATE]: CreateCommand,
      [VALID_COMMANDS.DELETE]: DeleteCommand,
      [VALID_COMMANDS.LIST]: ListCommand,
      [VALID_COMMANDS.MOVE]: MoveCommand,
    };

  public static create(commandString: string): Command {
    const [name, ...args] = commandString.split(' ');

    const nameLower = name.toLowerCase();

    const CommandConstructor = this.commandRegistry[nameLower];

    if (!CommandConstructor) {
      throw new Error(`CommandValidationError: Unknown command '${name}'`);
    }

    const command = new CommandConstructor(nameLower, args);

    const { valid, message } = command.validate();

    if (!valid) {
      throw new Error(message);
    }

    return command;
  }
}
