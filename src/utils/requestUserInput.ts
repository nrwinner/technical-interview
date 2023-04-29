import { createInterface } from 'readline';

const ONE_MINUTE = 60000;

export const requestUserInput: (prompt: string) => Promise<string> = (
  prompt: string
) => {
  return new Promise((resolve, reject) => {
    const readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const requestTimeout = setTimeout(() => {
      readlineInterface.close();
      reject('Request for user input timed out.');
    }, ONE_MINUTE);

    readlineInterface.question(prompt, (response: string) => {
      clearTimeout(requestTimeout);
      readlineInterface.close();
      resolve(response);
    });
  });
};
