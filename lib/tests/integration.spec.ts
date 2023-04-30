import { CommandFactory } from '../CommandFactory';
import { Directory } from '../Directory';
import { listenForCommands } from '../utils/listenForCommands';
import { printDirectoryItem } from '../outputs/printDirectoryItem';
import { printError } from '../outputs/printError';
import { printMessage } from '../outputs/printMessage';

import { PassThrough } from 'stream';

type MockFunction = ReturnType<typeof jest.fn>;

jest.mock('../outputs/printError');
jest.mock('../outputs/printDirectoryItem');
jest.mock('../outputs/printMessage');

const mockInputStream = new PassThrough();

const commands = [
  'CREATE fruits',
  'CREATE vegetables',
  'CREATE grains',
  'CREATE fruits/apples',
  'CREATE fruits/apples/fuji',
  'LIST',
  'CREATE grains/squash',
  'MOVE grains/squash vegetables',
  'CREATE foods',
  'MOVE grains foods',
  'MOVE fruits foods',
  'MOVE vegetables foods',
  'LIST',
  'DELETE fruits/apples',
  'DELETE foods/fruits/apples',
  'LIST',
];

const expectedResult = `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist.
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
`;

describe('Integration Test', () => {
  it('should match expected output', () => {
    let ledger = '';

    (printError as MockFunction).mockImplementation(
      (output: string) => (ledger += `${output}\n`)
    );

    (printMessage as MockFunction).mockImplementation(
      (output: string) => (ledger += `${output}\n`)
    );

    (printDirectoryItem as MockFunction).mockImplementation(
      (output: string) => (ledger += `${output}\n`)
    );

    const rootDirectory = new Directory('_root', null);
    const commandFactory = new CommandFactory();

    listenForCommands(
      mockInputStream,
      (commandString: string) => {
        const command = commandFactory.create(commandString);
        command.execute(rootDirectory);
      },
      true
    );

    commands.forEach((commandString) => {
      mockInputStream.write(`${commandString}\n`);
    });

    expect(ledger).toEqual(expectedResult);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
