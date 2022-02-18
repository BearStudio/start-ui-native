import React from 'react';

import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  Center,
  Divider,
  Icon,
  HStack,
  InfoOutlineIcon,
} from 'native-base';
import { Linking, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { EmptyState, bugIllustration } from '@/components/EmptyState';
import { SplashScreen } from '@/layout/SplashScreen';
import { useAccount } from '@/modules/account/account.service';

export const HomeScreen = () => {
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

  const handleOpenGithub = () => {
    Linking.openURL('https://github.com/BearStudio/start-ui-native');
  };

  const handleOpenIssueGithub = () => {
    Linking.openURL(
      'https://github.com/BearStudio/start-ui-native/issues/new/choose'
    );
  };

  return (
    <Box>
      <Stack bg="white" p={5} shadow={1}>
        <Center>
          <Heading>Home</Heading>
        </Center>
      </Stack>
      <Stack space="md">
        <Stack p={6}>
          <Heading>Welcome to 🚀 Start UI [native]</Heading>
          <Text fontSize="lg" mt={5}>
            An optionated UI starter with React Native, Native Base, React Query
            & Formiz
          </Text>
          <Text fontSize="lg" mt={3}>
            - From the{' '}
            <Text bold fontSize="lg">
              BearStudio Team
            </Text>
          </Text>
        </Stack>

        <Divider w="100%" />

        <TouchableOpacity onPress={handleOpenGithub}>
          <HStack alignItems="center" px={6} py={3}>
            <Icon as={AntDesign} name="github" color="coolGray.600" size="sm" />
            <Text fontSize="lg" ml={3}>
              Github Repository
            </Text>
          </HStack>
        </TouchableOpacity>

        <Divider w="100%" />

        <TouchableOpacity onPress={handleOpenIssueGithub}>
          <HStack alignItems="center" px={6} py={3}>
            <InfoOutlineIcon color="coolGray.600" size="sm" />
            <Text fontSize="lg" ml={3}>
              Open Issue
            </Text>
          </HStack>
        </TouchableOpacity>

        <Divider w="100%" />
      </Stack>
    </Box>
  );
};
