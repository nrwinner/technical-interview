import { createInterface } from 'readline';
import { printMessage } from '../outputs/printMessage';

export const listenForCommands = async (
  stream: NodeJS.ReadableStream,
  callback: (command: string) => void,
  echoInput = false
) => {
  const readlineInterface = createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  readlineInterface.on('line', (string) => {
    if (echoInput) {
      printMessage(string);
    }
    callback(string);
  });

  return;
};
