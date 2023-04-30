import { Command, CommandValidationResult } from './Command';
import { CommandFactory } from './CommandFactory';
import { Directory } from './Directory';
import { CreateCommand } from './commands/CreateCommand';
import { DeleteCommand } from './commands/DeleteCommand';
import { ListCommand } from './commands/ListCommand';
import { MoveCommand } from './commands/MoveCommand';

describe('CommandFactory', () => {
  it("should create  a new 'CREATE' command", () => {
    const factory = new CommandFactory();
    const command = factory.create('CREATE test/path');
    expect(command).toBeInstanceOf(CreateCommand);
    expect(command.args).toEqual(['test/path']);
  });

  it("should create  a new 'DELETE' command", () => {
    const factory = new CommandFactory();
    const command = factory.create('DELETE test/path');
    expect(command).toBeInstanceOf(DeleteCommand);
    expect(command.args).toEqual(['test/path']);
  });

  it("should create  a new 'MOVE' command", () => {
    const factory = new CommandFactory();
    const command = factory.create('MOVE source/path destination/path');
    expect(command).toBeInstanceOf(MoveCommand);
    expect(command.args).toEqual(['source/path', 'destination/path']);
  });

  it("should create  a new 'LIST' command", () => {
    const factory = new CommandFactory();
    const command = factory.create('LIST');
    expect(command).toBeInstanceOf(ListCommand);
    expect(command.args).toEqual([]);
  });

  it('should allow registration of custom commands', () => {
    class TestCommand extends Command {
      public execute(rootDirectory: Directory): void {
        throw new Error('Method not implemented.');
      }
      protected _validate(): CommandValidationResult {
        return { valid: true };
      }
    }

    const factory = new CommandFactory();
    factory.registerCommand('test-command', TestCommand);

    const command = factory.create('test-command');
    expect(command).toBeInstanceOf(TestCommand);
  });
});
