import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { useAuthContext } from '@/auth/AuthContext';
import SplashScreen from '@/components/Layout/SplashScreen';
import Account from '@/screens/Account';
import AboutScreen from '@/screens/Dev/About';
import NetworkHelperScreen from '@/screens/Dev/NetworkHelper';
import Storybook from '@/screens/Dev/Storybook';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import {
  navigate,
  navigationRef,
  useScreenFocus,
} from '@/services/rootNavigation';

const Stack = createStackNavigator();

if (__DEV__ && process.env.NODE_ENV !== 'test') {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Storybook', () => navigate('Storybook'));
  DevMenu.addItem('Network helper', () => navigate('NetworkHelper'));
}

const Routing = () => {
  const { isAuthenticated, isAuthenticating } = useAuthContext();
  useScreenFocus();

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" />

      {isAuthenticating && <SplashScreen />}

      {!isAuthenticating && !isAuthenticated && (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="About" component={AboutScreen} />
          {__DEV__ && <Stack.Screen name="Storybook" component={Storybook} />}
          {__DEV__ && (
            <Stack.Screen
              name="NetworkHelper"
              component={NetworkHelperScreen}
            />
          )}
        </Stack.Navigator>
      )}

      {!isAuthenticating && isAuthenticated && (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Account" component={Account} />
          {__DEV__ && <Stack.Screen name="Storybook" component={Storybook} />}
          {__DEV__ && (
            <Stack.Screen
              name="NetworkHelper"
              component={NetworkHelperScreen}
            />
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routing;
