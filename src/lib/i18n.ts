/* eslint-disable @typescript-eslint/no-empty-function */
import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import resources from '@/locales';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => getLocales()?.[0]?.languageCode,
  cacheUserLanguage: () => {},
};

i18n.use(initReactI18next).use(languageDetector).init({
  resources,
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
});

export default i18n;
