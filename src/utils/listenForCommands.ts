import { createInterface } from 'readline';

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
      console.log(string);
    }
    callback(string);
  });

  return;
};
