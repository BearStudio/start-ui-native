/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-magnus';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClientProvider, QueryClient} from 'react-query';
import THEMES from './constants/themes';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import {ToastProvider} from './src/contexts/ToastContext';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={THEMES.default}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
