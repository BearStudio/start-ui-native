import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Text } from 'native-base';
import { Platform, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { NetworkHelperScreen } from '@/devtools/network-helper/NetworkHelperScreen';
import { StorybookScreen } from '@/devtools/storybook/StorybookScreen';
import { SplashScreen } from '@/layout/SplashScreen';
import { AboutScreen } from '@/modules/about/AboutScreen';
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

import { AccountScreen } from './modules/account/AccountScreen';
import { OnboardingScreen } from './modules/auth/OnboardingScreen';
import { ChangePasswordScreen } from './modules/profile/ChangePasswordScreen';
import { ProfileScreen } from './modules/profile/ProfileScreen';

const Stack = createStackNavigator();

if (__DEV__ && process.env.NODE_ENV !== 'test') {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Storybook', () => navigate('Storybook'));
  DevMenu.addItem('Network helper', () => navigate('NetworkHelper'));
}

const Tab = createBottomTabNavigator();

const AccountStack = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
  </Stack.Navigator>
);

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
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { height: Platform.OS === 'ios' ? 100 : 70 },
            tabBarItemStyle: { margin: 10 },
            tabBarIconStyle: { margin: 10 },
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              }

              // You can return any component that you like here!
              return (
                <Icon as={Feather} name={iconName} color={color} size="md" />
              );
            },
            tabBarLabel: ({ color }) => <Text color={color}>{route.name}</Text>,
            tabBarActiveTintColor: 'blue.600',
            tabBarInactiveTintColor: 'gray.500',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={AccountStack} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routing;
