import { InitOptions } from 'i18next';

import { DEFAULT_LANGUAGE_KEY, DEFAULT_NAMESPACE } from '@/lib/i18n/constants';

import locales from '@/locales';

export const i18nConfig = (
  language: keyof typeof locales | undefined
): InitOptions => ({
  compatibilityJSON: 'v4',
  defaultNS: DEFAULT_NAMESPACE,
  ns: Object.keys(locales[DEFAULT_LANGUAGE_KEY]),
  lng: language,
  resources: locales,
  fallbackLng: DEFAULT_LANGUAGE_KEY,
  supportedLngs: Object.keys(locales),

  // Fix issue with i18next types
  // https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
  returnNull: false,

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
