import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Stack, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { useAccount } from '@/account/account.service';
import SplashScreen from '@/components/Layout/SplashScreen';

const Home = () => {
  const navigation = useNavigation();
  const { account, isLoading, isError } = useAccount();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isError || !account) {
    return <Text>An error occurred</Text>;
  }

  const handleOpenAccount = () => navigation.navigate('Account');

  return (
    <Box bg="white" h="full" p="6">
      <Stack space="md">
        <TouchableOpacity onPress={handleOpenAccount}>
          <Avatar bg="primary.500">
            {account.email.charAt(0).toUpperCase()}
          </Avatar>
        </TouchableOpacity>
        <Text fontSize="3xl">📦 Welcome</Text>
      </Stack>
    </Box>
  );
};

export default Home;
