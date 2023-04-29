import { createInterface } from 'readline';

export const requestUserInput: (prompt: string) => Promise<string> = (
  prompt: string
) => {
  return new Promise((resolve) => {
    const readlineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readlineInterface.question(prompt, (response: string) => {
      readlineInterface.close();
      resolve(response);
    });
  });
};
