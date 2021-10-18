import React from 'react';

import Providers from '@/Providers';
import Routing from '@/Routing';

import './config/i18n';

const App = () => {
  return (
    <Providers>
      <Routing />
    </Providers>
  );
};

export default App;
