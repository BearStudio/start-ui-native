const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config'); // eslint-disable-line @typescript-eslint/no-var-requires
const withStorybook = require('@storybook/react-native/metro/withStorybook'); // eslint-disable-line @typescript-eslint/no-var-requires

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withStorybook(config, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.storybook'),

  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});
