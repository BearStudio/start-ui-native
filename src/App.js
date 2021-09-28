import React from 'react';

import Providers from '@/Providers';
import Routing from '@/Routing';

const App = () => {
  return (
    <Providers>
      <Routing />
    </Providers>
  );
};

export default App;
