import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nConfig } from '@/lib/i18n/config';
import {
  LANGUAGE_STORAGE_KEY,
  zAvailableLanguages,
} from '@/lib/i18n/constants';

const initI18n = async () => {
  const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  i18n
    .use(initReactI18next)
    .init(
      i18nConfig(
        zAvailableLanguages().parse(language ?? getLocales()[0]?.languageCode)
      )
    );
};

initI18n();

export const syncLanguage = (langKey: string) => {
  dayjs.locale(langKey);
  AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, langKey);
};

i18n.on('languageChanged', (langKey) => syncLanguage(langKey));

export default i18n;
