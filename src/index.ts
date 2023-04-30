import { CommandFactory } from './CommandFactory';
import { Directory } from './Directory';
import { listenForCommands } from './utils/listenForCommands';
import { printError } from './outputs/printError';

import { createReadStream } from 'fs';

const rootDirectory = new Directory('_root', null);

const processCommand = (rawCommand: string) => {
  try {
    const command = CommandFactory.create(rawCommand);
    command.execute(rootDirectory);
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(`UnknownError: ${e}`);
      return false;
    }
  }
};

const inputPath: string | undefined = process.argv[2];

listenForCommands(
  inputPath ? createReadStream(inputPath) : process.stdin,
  processCommand,
  Boolean(inputPath)
);
