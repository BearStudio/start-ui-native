import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Box, Button, Stack, Text, Heading, Center } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { EmptyState, bugIllustration } from '@/components/EmptyState';
import { SplashScreen } from '@/layout/SplashScreen';
import { useAccount } from '@/modules/account/account.service';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isError || !account) {
    return (
      <EmptyState text="An error occurred" image={bugIllustration}>
        <Button onPress={refetchAccount}>Retry</Button>
      </EmptyState>
    );
  }

  const handleOpenAccount = () => navigation.navigate('Account');

  return (
    <Box>
      <Stack bg="white" p={5} shadow={9}>
        <Center>
          <Heading>Profile</Heading>
        </Center>
      </Stack>
      <Stack space="md" p={6}>
        <TouchableOpacity onPress={handleOpenAccount}>
          <Stack bg="white" p={5} borderRadius={10} shadow={1}>
            <Heading>{`${account.firstName} ${account.lastName}`}</Heading>
            <Text>{account.email}</Text>
          </Stack>
        </TouchableOpacity>
      </Stack>
    </Box>
  );
};
