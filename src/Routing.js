import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Div, Text } from 'react-native-magnus';

import { useAuthentication } from '@/contexts/AuthContext';
import Account from '@/screens/Account';
import AboutScreen from '@/screens/Dev/About';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import { navigationRef, useScreenFocus } from '@/services/rootNavigation';

const Stack = createStackNavigator();

const Routing = () => {
  const {
    isAuthenticated,
    checkAuthentication,
    isLoading,
  } = useAuthentication();
  useScreenFocus();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={checkAuthentication}
    >
      <StatusBar barStyle="dark-content" />

      {isLoading && (
        <Div h="100%" justifyContent="center" alignItems="center">
          <Text fontSize="6xl" color="text">
            📦
          </Text>
        </Div>
      )}

      {!isLoading && !isAuthenticated && (
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
        </Stack.Navigator>
      )}

      {!isLoading && isAuthenticated && (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routing;
