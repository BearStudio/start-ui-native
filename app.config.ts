import { ConfigContext, ExpoConfig } from 'expo/config';

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = 'af6ae74c-f04d-497a-9733-b2b7539f77c5';
const PROJECT_SLUG = 'start-ui-native-v9iizxkbojzedvpfkfzcq';
const OWNER = 'bearstudio';

// App production config
const APP_NAME = 'Start UI [native]';
const BUNDLE_IDENTIFIER = 'com.bearstudio.startuinative';
const PACKAGE_NAME = 'com.bearstudio.startuinative';
const ICON = './src/assets/images/icon.png';
const ADAPTIVE_ICON_FOREGROUND =
  './src/assets/images/android-icon-foreground.png';
const ADAPTIVE_ICON_MONOCHROME =
  './src/assets/images/android-icon-monochrome.png';
const SCHEME = 'start-ui-native';

const expoConfig = ({ config }: ConfigContext) => {
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(process.env.APP_ENV);

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    owner: OWNER,

    scheme,
    version: '1.0.0',
    runtimeVersion: {
      policy: 'appVersion',
    },
    platforms: ['android', 'ios'],
    orientation: 'default',
    icon,
    userInterfaceStyle: 'automatic',
    backgroundColor: '#FFFFFF',
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
      tsconfigPaths: true,
    },
    ios: {
      bundleIdentifier,
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      // appStoreUrl: 'https://apps.apple.com/fr/app/bearstudio/startuinative',
    },
    android: {
      package: packageName,
      adaptiveIcon: {
        ...adaptiveIcon,
        backgroundColor: '#FFFFFF',
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
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    extra: {
      isStorybook: process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook',
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
  } as const satisfies ExpoConfig;
};

export const getDynamicAppConfig = (
  environment: 'development' | 'preview' | 'production'
) => {
  switch (environment) {
    case 'development':
      return {
        name: `${APP_NAME} • DEV`,
        bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
        packageName: `${PACKAGE_NAME}.dev`,
        icon: ICON,
        adaptiveIcon: {
          foregroundImage: ADAPTIVE_ICON_FOREGROUND,
          monochromeImage: ADAPTIVE_ICON_MONOCHROME,
        },
        scheme: `${SCHEME}-dev`,
      };

    case 'preview':
      return {
        name: `${APP_NAME} • PREVIEW`,
        bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
        packageName: `${PACKAGE_NAME}.preview`,
        icon: ICON,
        adaptiveIcon: {
          foregroundImage: ADAPTIVE_ICON_FOREGROUND,
          monochromeImage: ADAPTIVE_ICON_MONOCHROME,
        },
        scheme: `${SCHEME}-preview`,
      };

    case 'production':
    default:
      return {
        name: APP_NAME,
        bundleIdentifier: BUNDLE_IDENTIFIER,
        packageName: PACKAGE_NAME,
        icon: ICON,
        adaptiveIcon: {
          foregroundImage: ADAPTIVE_ICON_FOREGROUND,
          monochromeImage: ADAPTIVE_ICON_MONOCHROME,
        },
        scheme: SCHEME,
      };
  }
};

export default expoConfig;
