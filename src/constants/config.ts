import expoConfig from 'app.config';
import Constants from 'expo-constants';

if (!Constants.expoConfig) {
  throw new Error('Expo config not found');
}

export const appConfig = Constants.expoConfig as ReturnType<typeof expoConfig>;
