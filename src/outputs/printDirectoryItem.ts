import * as chalk from 'chalk';

export const printDirectoryItem = (message: string) => {
  console.error(chalk.blue.italic(message));
};
