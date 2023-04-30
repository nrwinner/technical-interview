# Technical Project - Directory Manager
A [NodeJS](https://nodejs.org) implementation of a simple directory structure.
- :label: Leverages [Typescript](https://www.typescriptlang.org)
- :building_construction: Extensible by design
- :white_check_mark: Thoroughly tested

## Getting Started
#### Installing dependencies
We use [yarn](https://classic.yarnpkg.com) when developing this project. To get started, first install the project's dependencies:
```bash
yarn
```
#### Running the project
This project ships with two different operating modes. To run through a standard list of options (the provided test cases), run...
```bash
yarn start
```
There is also an interactive version which can be run via...
```bash
yarn start:interactive
```
To run the included  test cases with [Jest](https://jestjs.io), run...
```bash
yarn test
```

## Example Usage
```typescript
const rootDirectory = new Directory('_root', null);
const commandFactory = new CommandFactory();

listenForCommands(
  process.stdin,
  (commandString: string) => {
    const command = commandFactory.create(commandString);
    command.execute(rootDirectory);
  }
);
```


## Default Commands
This project supports the following commands by default:
| Command | Description | Example |
| -- | -- | -- |
| Create | Create a new directory at the specified path. All parent directories between the root and destination must exist. | `CREATE dir1/dir2` |
| Move | Move an existing directory from one location to another. Both source and destination directories must already exist. | `MOVE dir1/dir2 dir3` |
| Delete | Delete a directory at a specified path. | `DELETE dir1/dir2` |
| List | Recursively print the directory structure. | `LIST` | 
*Note: command names are always interpreted case-insensitively.*

## Extension
This project can be extended to include new commands by extending the `Command` class and registering it with the command factory prior to listening for input.
```typescript
const commandFactory = new CommandFactory();

class CountChildren extends Command {
  constructor(public readonly name = 'count-children', public readonly args: []) {
    super(name, args);
  }

  public execute(rootDirectory: Directory): void {
    printMessage(
      `Directory at: ${rootDirectory.name} with ${rootDirectory.children.length} children`
    );
  }

  protected _validate(): ValidatorResult {
    return { valid: true };
  }
}

commandFactory.registerCommand('count-children', CountChildren);
```