import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({
  config,
}: Omit<ConfigContext, 'name' | 'slug'> & {
  name: string;
  slug: string;
}): ExpoConfig => {
  return {
    ...config,
    name: 'Start UI Native',
    slug: 'start-ui-native',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.bearstudio.startuinative',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.BLUETOOTH',
        'android.permission.BLUETOOTH_ADMIN',
        'android.permission.BLUETOOTH_CONNECT',
      ],
      package: 'com.bearstudio.startuinative',
    },
    scheme: 'start-ui-native',
    plugins: [
      'expo-router',
      [
        'expo-build-properties',
        {
          ios: {
            flipper: true,
          },
        },
      ],
      [
        '@config-plugins/react-native-ble-plx',
        {
          isBackgroundEnabled: true,
          modes: ['peripheral', 'central'],
          bluetoothAlwaysPermission:
            'Allow $(PRODUCT_NAME) to connect to bluetooth devices',
        },
      ],
    ],
  };
};
