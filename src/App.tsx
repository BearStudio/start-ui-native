import React from 'react';

import Providers from '@/Providers';
import Routing from '@/Routing';

// Remove this import once your API is ready ;)
import '../mirage/mockApiServer';

const App = () => {
  return (
    <Providers>
      <Routing />
    </Providers>
  );
};

export default App;
