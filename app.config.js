import buildConfig from './build.config.json';

export default ({ config }) => ({
  ...config,
  name: 'Start UI Native',
  slug: 'start-ui-native',
  version: '1.0.0',
  newArchEnabled: true,
  orientation: 'portrait',
  icon: './assets/start-ui.png',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.bearstudio.startuinative',
    buildNumber: buildConfig.buildNumber,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/start-ui.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.bearstudio.startuinative',
    versionCode: buildConfig.buildNumber,
  },
  scheme: 'start-ui-native',
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/logo-black-vertical.png',
        backgroundColor: '#FFFFFF',
        dark: {
          image: './assets/logo-white-vertical.png',
          backgroundColor: '#000000',
        },
        resizeMode: 'contain',
        imageWidth: 200,
      },
    ],
    [
      'expo-build-properties',
      {
        ios: {
          flipper: true,
        },
      },
    ],
    'expo-router',
    'expo-font',
    'expo-localization',
  ],
  extra: {
    eas: {
      projectId: 'b5bbd925-db32-4e2b-8f31-cf07e22fa4ef',
    },
  },
  owner: 'bearstudioorg',
  runtimeVersion: '1.1.0',
  updates: {
    url: 'https://u.expo.dev/b5bbd925-db32-4e2b-8f31-cf07e22fa4ef',
  },
});
