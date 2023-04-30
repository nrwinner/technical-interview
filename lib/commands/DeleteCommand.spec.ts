import { Directory } from '../Directory';
import { printError } from '../outputs/printError';
import { DeleteCommand } from './DeleteCommand';

jest.mock('../outputs/printError', () => ({
  printError: jest.fn(),
}));

describe('Command - DeleteCommand', () => {
  it('should fail validation on missing argument', () => {
    // @ts-expect-error this is testing a run-time edge case and is impossible at compile time
    const command = new DeleteCommand('delete', []);

    expect(command.validate()).toEqual({
      valid: false,
      message: expect.stringMatching(/^CommandValidationError/),
    });
  });

  it('should pass validation', () => {
    const command = new DeleteCommand('delete', ['path']);

    expect(command.validate()).toEqual({
      valid: true,
    });
  });

  it('should execute command on given directory', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('test-dir');

    expect(directory.children).toHaveLength(1);

    const command = new DeleteCommand('delete', ['test-dir']);
    command.execute(directory);

    expect(directory.children).toHaveLength(0);
  });

  it('should gracefully handle errors during execution', () => {
    const directory = new Directory('_root', null);
    const command = new DeleteCommand('delete', ['does-not-exist']);
    command.execute(directory);

    expect(printError).toBeCalledWith(
      'Cannot delete does-not-exist - does-not-exist does not exist.'
    );
  });
});
