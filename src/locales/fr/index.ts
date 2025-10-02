import 'dayjs/locale/fr.js';

import account from './account.json' with { type: 'json' };
import auth from './auth.json' with { type: 'json' };
import books from './books.json' with { type: 'json' };
import common from './common.json' with { type: 'json' };
import layout from './layout.json' with { type: 'json' };

export default {
  account,
  auth,
  books,
  common,
  layout,
} as const;
