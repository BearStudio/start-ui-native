import React from 'react';
import {StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import {useUserConnected} from './services/userService';
import Home from './screens/Home';
import Account from './screens/Account';
import ResetPassword from './screens/ResetPassword';
import Storybook from './screens/Dev/Storybook';
import {navigate, navigationRef} from './services/rootNavigation';
import AboutScreen from "./screens/Dev/About";

const Stack = createStackNavigator();

if (__DEV__) {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Storybook', () => navigate('Storybook'));
}

const Routing = () => {
  const {isLoading, userIsConnected} = useUserConnected();

  return (
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
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="About" component={AboutScreen} />
          {__DEV__ && <Stack.Screen name="Storybook" component={Storybook} />}
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
          {__DEV__ && <Stack.Screen name="Storybook" component={Storybook} />}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routing;
