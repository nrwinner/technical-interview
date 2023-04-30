import { Command } from './Command';

import { CreateCommand } from './commands/CreateCommand';
import { DeleteCommand } from './commands/DeleteCommand';
import { ListCommand } from './commands/ListCommand';
import { MoveCommand } from './commands/MoveCommand';

type CommandConstructor = new (
  ...args: ConstructorParameters<typeof Command>
) => Command;

export class CommandFactory {
  private readonly commandRegistry: Record<string, CommandConstructor> = {
    create: CreateCommand,
    delete: DeleteCommand,
    list: ListCommand,
    move: MoveCommand,
  };

  /**
   * Register a command for use within the factory
   * @param name - the name of the command (i.e. "create")
   * @param commandConstructor - a class that extends Command
   */
  public registerCommand(name: string, commandConstructor: CommandConstructor) {
    this.commandRegistry[name] = commandConstructor;
  }

  /**
   * Create and validate a new command from a given string
   * @param commandString - a string representing the command to create
   */
  public create(commandString: string): Command {
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
