import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@storybook/react-native', () => ({
  getStorybookUI: jest.fn(),
  addDecorator: jest.fn(),
  configure: jest.fn(),
}));
