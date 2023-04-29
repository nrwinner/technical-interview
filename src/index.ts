import { requestUserInput } from './utils/requestUserInput';
import { FileSystem } from './FileSystem';
import { Command } from './Command';
import { printError } from './outputs/printError';

const fs = new FileSystem();

const waitForCommand = async () => {
  try {
    const rawCommand = await requestUserInput('');
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

  return true;
};

export const beginEventLoop = async () => {
  while (await waitForCommand());
};

beginEventLoop();
