import languageDetector from '@os-team/i18next-react-native-language-detector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '@/locales';

i18n.use(initReactI18next).use(languageDetector).init({
  resources,
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
});

export default i18n;
