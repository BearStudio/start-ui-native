import { ExpoConfig } from 'expo/config';

const EXPO_PROJECT_ID = 'af6ae74c-f04d-497a-9733-b2b7539f77c5';

const appPrefix =
  process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook' ? 'Storybook • ' : '';

export default {
  name: appPrefix + 'Start UI [native]',
  slug: 'start-ui-native-v9iizxkbojzedvpfkfzcq',
  scheme: 'start-ui-native',
  owner: 'bearstudio',
  version: '1.0.0',
  runtimeVersion: {
    policy: 'appVersion',
  },
  platforms: ['android', 'ios'],
  orientation: 'default',
  icon: './src/assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#FFFFFF',
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
    tsconfigPaths: true,
  },
  ios: {
    bundleIdentifier: 'com.bearstudio.startuinative',
    supportsTablet: true,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    // appStoreUrl: 'https://apps.apple.com/fr/app/bearstudio/startuinative',
  },
  android: {
    package: 'com.bearstudio.startuinative',
    adaptiveIcon: {
      backgroundColor: '#FFFFFF',
      foregroundImage: './src/assets/images/android-icon-foreground.png',
      monochromeImage: './src/assets/images/android-icon-monochrome.png',
    },
    edgeToEdgeEnabled: true,
    // playStoreUrl:
    // 'https://play.google.com/store/apps/details?id=com.bearstudio.startuinative',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
        dark: {
          image: './src/assets/images/splash-icon-dark.png',
          backgroundColor: '#000000',
        },
      },
    ],
    'expo-web-browser',
    'expo-secure-store',
    'expo-localization',
    'expo-font',
  ],
  githubUrl: 'https://github.com/bearstudio/start-ui-native',
  updates: {
    url: `https://u.expo.dev/${EXPO_PROJECT_ID}`,
  },
  extra: {
    isStorybook: process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook',
    eas: {
      projectId: EXPO_PROJECT_ID,
    },
  },
} as const satisfies ExpoConfig;
