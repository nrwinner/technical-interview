import { Directory } from '../Directory';
import { printError } from '../outputs/printError';
import { CreateCommand } from './CreateCommand';

jest.mock('../outputs/printError', () => ({
  printError: jest.fn(),
}));

describe('Command - CreateCommand', () => {
  it('should fail validation on missing argument', () => {
    // @ts-expect-error this is testing a run-time edge case and is impossible at compile time
    const command = new CreateCommand('create', []);

    expect(command.validate()).toEqual({
      valid: false,
      message: expect.stringMatching(/^CommandValidationError/),
    });
  });

  it('should pass validation', () => {
    const command = new CreateCommand('create', ['path']);

    expect(command.validate()).toEqual({
      valid: true,
    });
  });

  it('should execute command on given directory', () => {
    const directory = new Directory('_root', null);
    const command = new CreateCommand('create', ['test-dir']);
    command.execute(directory);

    expect(directory.children).toHaveLength(1);
    expect(directory.children[0].name).toBe('test-dir');
  });

  it('should gracefully handle errors during execution', () => {
    const directory = new Directory('_root', null);
    const command = new CreateCommand('create', ['test-dir/does-not-exist']);
    command.execute(directory);

    expect(printError).toBeCalledWith(
      'Cannot create test-dir/does-not-exist - test-dir does not exist.'
    );
  });
});
