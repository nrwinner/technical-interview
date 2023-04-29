import { CommandFactory } from './CommandFactory';
import { DirectoryManager } from './DirectoryManager';
import { listenForCommands } from './utils/listenForCommands';
import { printError } from './outputs/printError';

import { createReadStream } from 'fs';

const directoryManager = new DirectoryManager();

const processCommand = (rawCommand: string) => {
  try {
    const command = CommandFactory.create(rawCommand);
    directoryManager.processCommand(command);
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
