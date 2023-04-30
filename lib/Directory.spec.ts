import { Directory } from './Directory';

describe('Directory', () => {
  it('should create a subdirectory', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('sub');

    expect(directory.children).toHaveLength(1);
    expect(directory.children[0]).toBeInstanceOf(Directory);
    expect(directory.children[0].name).toBe('sub');
  });

  it('should add an existing directory as a subdirectory', () => {
    const directory = new Directory('_root', null);

    const directoryToMove = new Directory('i-move', null);
    directoryToMove.createSubdirectory('sub-1');

    directoryToMove.createSubdirectory('sub-2');

    expect(directoryToMove.children).toHaveLength(2);
    expect(directoryToMove.children.map((dir) => dir.name)).toEqual([
      'sub-1',
      'sub-2',
    ]);

    directory.addExisting(directoryToMove);

    expect(directory.children).toHaveLength(1);
    expect(directory.children[0].name).toBe('i-move');
    expect(directory.children[0].children).toHaveLength(2);
    expect(directory.children[0].children.map((dir) => dir.name)).toEqual([
      'sub-1',
      'sub-2',
    ]);
  });

  it('should delete a nested directory', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('sub-1');
    directory.children[0].createSubdirectory('sub-2');

    expect(directory.children[0].children[0].name).toBe('sub-2');
    directory.children[0].delete('sub-2');
    expect(directory.children[0].children).toHaveLength(0);
  });

  it('should locate a directory at a path', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('sub-1');
    directory.children[0].createSubdirectory('sub-2');

    const needle1 = directory.search(['sub-1']);
    expect(needle1.name).toBe('sub-1');
    expect(needle1.children).toHaveLength(1);

    const needle2 = directory.search(['sub-1', 'sub-2']);
    expect(needle2.name).toBe('sub-2');
    expect(needle2.children).toHaveLength(0);
  });

  it('should throw an error when searching if a directory does not exist', () => {
    const directory = new Directory('_root', null);
    directory.createSubdirectory('sub-1');
    directory.children[0].createSubdirectory('sub-2');

    expect(() => directory.search(['sub-3'])).toThrowError(
      'sub-3 does not exist'
    );

    expect(() => directory.search(['sub-2', 'sub-3'])).toThrowError(
      'sub-2 does not exist'
    );
  });
});
