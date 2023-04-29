import * as chalk from 'chalk';

export const printDirectoryItem = (message: string) => {
  console.log(chalk.blue.italic(message));
};
