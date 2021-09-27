import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { ThemeProvider, Text, Div } from 'react-native-magnus';
import { QueryClientProvider, QueryClient } from 'react-query';

import THEMES from '@/constants/themes';
import { GlobalProvider } from '@/contexts/GlobalContext';
import { ToastProvider } from '@/contexts/ToastContext';
import Account from '@/screens/Account';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import { useUserConnected } from '@/services/userService';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App: React.FC = () => {
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
          }}
        >
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
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
                  }}
                >
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                  />
                </Stack.Navigator>
              )}

              {!isLoading && userIsConnected && (
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
          </QueryClientProvider>
        </GlobalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
