import { parsePath } from './parsePath';

describe('Util - parsePath', () => {
  it("should split a path by the '/' character", () => {
    expect(parsePath('test/test2')).toEqual(['test', 'test2']);
  });

  it('should handle empty paths', () => {
    expect(parsePath('')).toEqual(['']);
  });
});
