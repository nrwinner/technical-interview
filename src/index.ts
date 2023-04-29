import { Command } from './Command';
import { FileSystem } from './FileSystem';
import { parseInput } from './utils/parseInput';
import { printError } from './outputs/printError';

import { createReadStream } from 'fs';

const fs = new FileSystem();

const processCommand = (rawCommand: string) => {
  try {
    const command = Command.create(rawCommand);
    fs.processCommand(command);
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

parseInput(
  inputPath ? createReadStream(inputPath) : process.stdin,
  processCommand,
  Boolean(inputPath)
);
