/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const {
  withStorybook,
} = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// withUniwindConfig must be outermost (Uniwind requirement)
const storybookEnabled = process.env.APP_ENV === 'storybook';

const storybookConfig = withStorybook(config, {
  enabled: storybookEnabled,
  configPath: path.resolve(__dirname, '.rnstorybook'),
});

module.exports = withUniwindConfig(storybookConfig, {
  cssEntryFile: './src/app.css',
});
