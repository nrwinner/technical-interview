import { CommandFactory } from '../lib/CommandFactory';
import { Directory } from '../lib/Directory';
import { listenForCommands } from '../lib/utils/listenForCommands';
import { printError } from '../lib/outputs/printError';

import { createReadStream } from 'fs';

const rootDirectory = new Directory('_root', null);
const commandFactory = new CommandFactory();

const processCommand = (rawCommand: string) => {
  try {
    const command = commandFactory.create(rawCommand);
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

const inputPath = process.argv[2];

listenForCommands(
  inputPath ? createReadStream(inputPath) : process.stdin,
  processCommand,
  Boolean(inputPath)
);
