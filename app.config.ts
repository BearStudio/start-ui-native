import { ConfigContext, ExpoConfig } from 'expo/config';

const BUILD_NUMBER: `${number}` = '1';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Start UI [native]',
  slug: 'start-ui-native',
  scheme: 'startuinative',
  owner: 'bearstudio',
  version: '1.0.0',
  runtimeVersion: '1.0.0',
  platforms: ['android', 'ios'],
  orientation: 'default',
  icon: './src/assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#FFFFFF',
  experiments: { typedRoutes: true, reactCompiler: true, tsconfigPaths: true },
  ios: {
    bundleIdentifier: 'com.bearstudio.startuinative',
    buildNumber: BUILD_NUMBER,
    supportsTablet: true,
    // appStoreUrl: 'https://apps.apple.com/fr/app/bearstudio/xxxx',
  },
  android: {
    package: 'com.bearstudio.startuinative',
    versionCode: +BUILD_NUMBER,
    adaptiveIcon: {
      backgroundColor: '#FFFFFF',
      foregroundImage: './src/assets/images/android-icon-foreground.png',
      backgroundImage: './src/assets/images/android-icon-background.png',
      monochromeImage: './src/assets/images/android-icon-monochrome.png',
    },
    edgeToEdgeEnabled: true,
    // playStoreUrl:
    // 'https://play.google.com/store/apps/details?id=com.yummix.app',
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
  ],
  githubUrl: 'https://github.com/bearstudio/start-ui-native',
});
