import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { NetworkHelperScreen } from '@/devtools/network-helper/NetworkHelperScreen';
import { StorybookScreen } from '@/devtools/storybook/StorybookScreen';
import { SplashScreen } from '@/layout/SplashScreen';
import { AboutScreen } from '@/modules/about/AboutScreen';
import { AccountScreen } from '@/modules/account/AccountScreen';
import { RegisterScreen } from '@/modules/account/RegisterScreen';
import { ResetPasswordScreen } from '@/modules/account/ResetPasswordScreen';
import { useAuthContext } from '@/modules/auth/AuthContext';
import { LoginScreen } from '@/modules/auth/LoginScreen';
import { HomeScreen } from '@/modules/home/HomeScreen';
import {
  navigate,
  navigationRef,
  useScreenFocus,
} from '@/utils/rootNavigation';

import { OnboardingScreen } from './modules/auth/OnboardingScreen';

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
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          {__DEV__ && (
            <Stack.Screen name="Storybook" component={StorybookScreen} />
          )}
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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          {__DEV__ && (
            <Stack.Screen name="Storybook" component={StorybookScreen} />
          )}
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
