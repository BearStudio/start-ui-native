import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Avatar, Box, Button, Stack, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { useAccount } from '@/account/account.service';
import EmptyState from '@/components/Layout/EmptyState';
import SplashScreen from '@/components/Layout/SplashScreen';

const bugImage = require('@/assets/images/bug-illustration.png');

const Home = () => {
  const navigation = useNavigation();
  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isError || !account) {
    return (
      <EmptyState text="An error occurred" image={bugImage}>
        <Button onPress={refetchAccount}>Retry</Button>
      </EmptyState>
    );
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
