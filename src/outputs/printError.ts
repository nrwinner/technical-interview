import * as chalk from 'chalk'

export const printError = (message: string) => {
  console.error(chalk.red.italic(message));
}