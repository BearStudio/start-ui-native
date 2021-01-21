import React from 'react';

const GlobalContext = React.createContext({});
export const GlobalProvider = GlobalContext.Provider;
export const GlobalConsumer = GlobalContext.Consumer;
export default GlobalContext;
