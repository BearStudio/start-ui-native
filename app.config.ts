import { ExpoConfig } from 'expo/config';

// ─── Project config ─────────────────────────────────────────────────────────
const EAS_PROJECT_ID = 'af6ae74c-f04d-497a-9733-b2b7539f77c5';
const PROJECT_SLUG = 'start-ui-native-v9iizxkbojzedvpfkfzcq';
const OWNER = 'bearstudio';

// ─── App production config ─────────────────────────────────────────────────
const APP_NAME = 'Start UI [native]';
const BUNDLE_IDENTIFIER = 'com.bearstudio.startuinative';
const PACKAGE_NAME = 'com.bearstudio.startuinative';
const SCHEME = 'start-ui-native';

// ─── Env-based config ───────────────────────────────────────────────────────
type AppEnv = 'development' | 'staging' | 'production' | 'storybook';
const APP_ENV = (process.env.APP_ENV ?? 'production') as AppEnv;

const getDynamicAppConfig = (environment?: AppEnv) => {
  switch (environment) {
    case 'development':
      return {
        /** App name used for Xcode target; must be ASCII and match EAS lookup. */
        name: 'StartUINativeDev',
        /** User-visible name on device. */
        displayName: `${APP_NAME} [Dev]`,
        bundleIdentifier: `${BUNDLE_IDENTIFIER}.development`,
        packageName: `${PACKAGE_NAME}.development`,
        icon: './src/assets/images/icon-dev.png',
        adaptiveIcon: {
          foregroundImage:
            './src/assets/images/android-icon-foreground-dev.png',
          monochromeImage:
            './src/assets/images/android-icon-monochrome-dev.png',
          backgroundColor: '#FFFFFF',
        },
        scheme: `${SCHEME}-development`,
      };
    case 'staging':
      return {
        name: 'StartUINativeStaging',
        displayName: `${APP_NAME} [Staging]`,
        bundleIdentifier: `${BUNDLE_IDENTIFIER}.staging`,
        packageName: `${PACKAGE_NAME}.staging`,
        icon: './src/assets/images/icon-staging.png',
        adaptiveIcon: {
          foregroundImage:
            './src/assets/images/android-icon-foreground-staging.png',
          monochromeImage:
            './src/assets/images/android-icon-monochrome-staging.png',
          backgroundColor: '#FFFFFF',
        },
        scheme: `${SCHEME}-staging`,
      };
    case 'storybook':
      return {
        name: 'StartUINativeStorybook',
        displayName: `Storybook • ${APP_NAME}`,
        bundleIdentifier: `${BUNDLE_IDENTIFIER}.development`,
        packageName: `${PACKAGE_NAME}.development`,
        icon: './src/assets/images/icon.png',
        adaptiveIcon: {
          foregroundImage: './src/assets/images/android-icon-foreground.png',
          monochromeImage: './src/assets/images/android-icon-monochrome.png',
          backgroundColor: '#FFFFFF',
        },
        scheme: `${SCHEME}-storybook`,
      };
    case 'production':
    default:
      return {
        name: APP_NAME,
        displayName: undefined,
        bundleIdentifier: BUNDLE_IDENTIFIER,
        packageName: PACKAGE_NAME,
        icon: './src/assets/images/icon.png',
        adaptiveIcon: {
          foregroundImage: './src/assets/images/android-icon-foreground.png',
          monochromeImage: './src/assets/images/android-icon-monochrome.png',
          backgroundColor: '#FFFFFF',
        },
        scheme: SCHEME,
      };
  }
};

const appConfig = getDynamicAppConfig(APP_ENV);

export default {
  /** User-visible name on device; use displayName when set, else internal name */
  name: appConfig.displayName ?? appConfig.name,
  slug: PROJECT_SLUG,
  scheme: appConfig.scheme,
  owner: OWNER,
  version: '1.0.0',
  runtimeVersion: { policy: 'appVersion' },
  platforms: ['android', 'ios'],
  orientation: 'default',
  icon: appConfig.icon,
  userInterfaceStyle: 'automatic',
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
    tsconfigPaths: true,
  },
  ios: {
    bundleIdentifier: appConfig.bundleIdentifier,
    supportsTablet: true,
  },
  android: {
    package: appConfig.packageName,
    adaptiveIcon: appConfig.adaptiveIcon,
  },
  plugins: [
    '@react-native-community/datetimepicker',
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
    isStorybook: APP_ENV === 'storybook',
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
} as const satisfies ExpoConfig;
