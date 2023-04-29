import { beginEventLoop } from '../src';

const MOCK_TEST_COMMANDS = [
  'CREATE fruits',
  'CREATE vegetables',
  'CREATE fruits/apples',
  'CREATE fruits/apples/fuji',
  'LIST',
  'CREATE grains/squash',
  'MOVE grains/squash vegetables',
  'CREATE foods',
  'MOVE grains foods',
  'MOVE fruits foods',
  'MOVE vegetables foods',
  'LIST',
  // 'DELETE fruits/apples',
  // 'DELETE foods/fruits/apples',
  // 'LIST',
];

let mockTestIndex = 0;

jest.mock('readline', () => ({
  createInterface: jest
    .fn()
    .mockReturnValue({
      question: jest
        .fn()
        .mockImplementation((_, cb: (answer: string) => void) => {
          cb(MOCK_TEST_COMMANDS[mockTestIndex++]);
        }),
      close: jest.fn(),
    }),
}));

describe('Integration Test', () => {
  it('should match output', () => {
    beginEventLoop();

    console.log('HI THERE');
  });
});
