/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const uniwindConfig = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
});

module.exports = withStorybook(uniwindConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, './.rnstorybook'),
});
