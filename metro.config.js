/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false, // false because of hermes issue https://github.com/storybookjs/react-native/issues/152
      },
    }),
  },
};
