import { Directory } from '../Directory';
import { printDirectoryItem } from '../outputs/printDirectoryItem';
import { ListCommand } from './ListCommand';

jest.mock('../outputs/printDirectoryItem', () => ({
  printDirectoryItem: jest.fn(),
}));

const stdOutSpy = jest.spyOn(process.stdout, 'write');

describe('Command - ListCommand', () => {
  it('should pass validation', () => {
    const command = new ListCommand('list', []);

    expect(command.validate()).toEqual({
      valid: true,
    });
  });

  it('should execute command on given directory', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('test-dir');
    directory.createSubdirectory('test-dir-2');
    directory.children[1].createSubdirectory('test-dir-3');

    const command = new ListCommand('list', []);
    command.execute(directory);

    expect(printDirectoryItem).toBeCalledTimes(3);
    expect(printDirectoryItem).toHaveBeenNthCalledWith(1, 'test-dir');
    expect(printDirectoryItem).toHaveBeenNthCalledWith(2, 'test-dir-2');
    expect(printDirectoryItem).toHaveBeenNthCalledWith(3, '  test-dir-3');
  });
});
