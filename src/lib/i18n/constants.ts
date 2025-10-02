import z from 'zod';

import locales from '@/locales';

export type Language = {
  key: keyof typeof locales;
  dir?: 'ltr' | 'rtl';
  fontScale?: number;
};

export const DEFAULT_NAMESPACE = 'common';

export const DEFAULT_LANGUAGE_KEY: Language['key'] = 'en';

export type LanguageKey = (typeof AVAILABLE_LANGUAGES)[number]['key'];
export const AVAILABLE_LANGUAGES = [
  {
    key: 'en',
  } as const,
  {
    key: 'fr',
  } as const,
] satisfies Language[];

export const zAvailableLanguages = () =>
  z
    .enum(AVAILABLE_LANGUAGES.map((lang) => lang.key))
    .default(DEFAULT_LANGUAGE_KEY);

export const LANGUAGE_STORAGE_KEY = 'language';
