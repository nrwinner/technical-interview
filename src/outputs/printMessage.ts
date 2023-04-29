import * as chalk from 'chalk';

export const printMessage = (message: string) => {
  console.log(chalk.gray.italic(message));
};
