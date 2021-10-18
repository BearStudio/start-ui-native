**Description:**
Add traduction feature, and add select language to  user profile in both english and french languages.

**Type of change**
New feature ( breaking change with adds functionality )

**Platform tests**
- [] Android
- [] Iphone

**Checklist:**
- [] Add libs  `react-i18next i18next`
- [] Add new file `i18n.ts` in the `src/config` folder
- [] Add `locales` folder in the src directory
- [] Add `index.ts` in `locales` containing
```

export * as en from './en';
export * as fr from './fr';
```
- [] Add both `es` and `fr` in the `locales` folder
- [] Add trads for text that will be translated in both `fr` and `en` texts
- [] Update get account query 
```
export const useAccount = (config: UseQueryOptions<Account> = {}) => {
  const { i18n } = useTranslation();
  ...
  const { data: account, ...rest } = useQuery(
    ['account'],
    (): Promise<Account> => axios.get('/account'),
    {
      onSuccess: (data) => {
        i18n.changeLanguage(data?.langKey);

        if (config?.onSuccess) {
          config?.onSuccess(data);
        }
      },
      ...
};
```

- [] Change Update Account query 
```
export const useUpdateAccount = (
  config: UseMutationOptions<Account, unknown, Account> = {}
) => {
  const { i18n } = useTranslation();
  ...
  {
      onMutate: (data) => {
        i18n.changeLanguage(data?.langKey);

        if (config?.onMutate) {
          config.onMutate(data);
        }
      },
      ...config,
    }
    ...
```

- [] Add th configuration 
```

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as locales from '../locales';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE_KEY } from '../constants/i18n';

i18n
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    resources: locales,
    lng: DEFAULT_LANGUAGE_KEY,
    fallbackLng: DEFAULT_LANGUAGE_KEY,
    interpolation: {
      escapeValue: false
    },
  });

i18n.on('languageChanged', (langKey) => {
// store langukey in the smartphone local storage
});

export default i18n;
```