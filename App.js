/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider, Text, Div} from 'react-native-magnus';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClientProvider, QueryClient} from 'react-query';
import THEMES from './constants/themes';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import {ToastProvider} from './src/contexts/ToastContext';
import {useUserConnected} from './src/services/userService';
import Home from './src/screens/Home';
import {GlobalProvider} from './src/contexts/GlobalContext';
import Account from './src/screens/Account';
import ResetPassword from './src/screens/ResetPassword';
import Components from './src/screens/Dev/Components';
import {navigationRef, navigate} from './src/services/rootNavigation';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

if (__DEV__) {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Show components', () => navigate('Components'));
}

const App = () => {
  const {
    isLoading,
    userIsConnected,
    reloadUserInformations,
  } = useUserConnected();

  return (
    <ThemeProvider theme={THEMES.default}>
      <ToastProvider>
        <GlobalProvider
          value={{
            reloadUserInformations,
          }}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef}>
              <StatusBar barStyle="dark-content" />

              {isLoading && (
                <Div h="100%" justifyContent="center" alignItems="center">
                  <Text fontSize="6xl" color="text">
                    📦
                  </Text>
                </Div>
              )}

              {!isLoading && !userIsConnected && (
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                  />
                  {__DEV__ && (
                    <Stack.Screen name="Components" component={Components} />
                  )}
                </Stack.Navigator>
              )}

              {!isLoading && userIsConnected && (
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Account" component={Account} />
                  {__DEV__ && (
                    <Stack.Screen name="Components" component={Components} />
                  )}
                </Stack.Navigator>
              )}
            </NavigationContainer>
          </QueryClientProvider>
        </GlobalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
