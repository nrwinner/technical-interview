import { Command, CommandValidationResult } from './Command';
import { Directory } from './Directory';

describe('Command', () => {
  it('should fail validation when an empty command is specified', () => {
    class TestCommand extends Command {
      public execute(): void {
        throw new Error('Method not implemented.');
      }
      protected _validate(): CommandValidationResult {
        throw new Error('Method not implemented.');
      }
    }

    const c = new TestCommand('', []);
    expect(c.validate()).toEqual({
      valid: false,
      message: expect.stringMatching(/^CommandValidationError/),
    });
  });

  it('should run validation on instance', () => {
    const testInstanceValidation = jest.fn();
    class TestCommand extends Command {
      public execute(): void {
        throw new Error('Method not implemented.');
      }

      protected _validate(): CommandValidationResult {
        testInstanceValidation();
        return { valid: true };
      }
    }

    const c = new TestCommand('test-command', []);
    expect(c.validate()).toEqual({
      valid: true,
    });

    expect(testInstanceValidation).toBeCalledTimes(1);
  });
});
