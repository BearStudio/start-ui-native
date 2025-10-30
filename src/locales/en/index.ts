import 'dayjs/locale/en.js';

import account from './account.json' with { type: 'json' };
import appOnboarding from './app-onboarding.json' with { type: 'json' };
import auth from './auth.json' with { type: 'json' };
import books from './books.json' with { type: 'json' };
import common from './common.json' with { type: 'json' };
import home from './home.json' with { type: 'json' };
import layout from './layout.json' with { type: 'json' };

export default {
  account,
  books,
  auth,
  common,
  home,
  layout,
  appOnboarding,
} as const;
