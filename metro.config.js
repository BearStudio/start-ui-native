const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 1. Remove "svg" from assetExts so Metro doesn’t treat them as plain images:
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);

// 2. Add "svg" to sourceExts so Metro will run them through the transformer:
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// 3. Tell Metro to use react-native-svg-transformer for `.svg` files:
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);

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
