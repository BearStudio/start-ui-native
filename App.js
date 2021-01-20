/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Div, Text} from 'react-native-magnus';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Div h="100%" alignItems="center" justifyContent="center">
          <Text fontSize={40}>📦 Start UI Native</Text>
        </Div>
      </SafeAreaView>
    </>
  );
};

export default App;
