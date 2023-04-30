import { Directory } from '../Directory';
import { printError } from '../outputs/printError';
import { MoveCommand } from './MoveCommand';

jest.mock('../outputs/printError', () => ({
  printError: jest.fn(),
}));

describe('Command - MoveCommand', () => {
  it('should fail validation on missing argument', () => {
    // @ts-expect-error this is testing a run-time edge case and is impossible at compile time
    const command = new MoveCommand('move', ['test/test2']);

    expect(command.validate()).toEqual({
      valid: false,
      message: expect.stringMatching(/^CommandValidationError/),
    });
  });

  it('should pass validation', () => {
    const command = new MoveCommand('move', [
      'source/path',
      'destination/path',
    ]);

    expect(command.validate()).toEqual({
      valid: true,
    });
  });

  it('should execute command on given directory', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('alpha');
    directory.createSubdirectory('beta');
    directory.children[0].createSubdirectory('i-move');

    expect(directory.children).toHaveLength(2);

    expect(directory.children[0].children).toHaveLength(1);
    expect(directory.children[1].children).toHaveLength(0);

    const command = new MoveCommand('move', ['alpha/i-move', 'beta']);
    command.execute(directory);

    expect(directory.children[0].children).toHaveLength(0);
    expect(directory.children[1].children).toHaveLength(1);
  });

  it('should gracefully handle errors during execution', () => {
    const directory = new Directory('_root', null);
    const command = new MoveCommand('move', ['alpha/not-real', 'beta']);
    command.execute(directory);

    expect(printError).toBeCalledWith(
      'Cannot move alpha/not-real to beta - alpha does not exist.'
    );
  });
});
