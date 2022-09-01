import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  Center,
  Divider,
  HStack,
  Icon,
} from 'native-base';
import { Modal, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { EmptyState, bugIllustration } from '@/components/EmptyState';
import { SplashScreen } from '@/layout/SplashScreen';
import { useAccount } from '@/modules/account/account.service';

import { useAuthContext } from '../auth/AuthContext';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();
  const [modalVisible, setModalVisible] = useState(false);

  const { logout } = useAuthContext();

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

  const handleLogoutModal = () => setModalVisible((current) => !current);

  const handleOpenChangePassword = () => navigation.navigate('ChangePassword');

  return (
    <Box>
      <Stack bg="white" p={5} shadow={1}>
        <Center>
          <Heading>Profile</Heading>
        </Center>
      </Stack>
      <Stack space="md" p={6}>
        <TouchableOpacity onPress={handleOpenAccount}>
          <HStack
            bg="white"
            p={5}
            borderRadius={10}
            shadow={1}
            justifyContent="flex-start"
          >
            <Icon as={Feather} name="edit" color="blue.600" size="sm" mr={3} />

            <Stack>
              {account.firstName && account.lastName && (
                <Heading>{`${account.firstName} ${account.lastName}`}</Heading>
              )}
              <Text>{account.email}</Text>
            </Stack>
          </HStack>
        </TouchableOpacity>
      </Stack>

      <Divider w="100%" />

      <TouchableOpacity onPress={handleOpenChangePassword}>
        <HStack alignItems="center" px={6} py={6}>
          <Icon as={Feather} name="unlock" color="coolGray.600" size="sm" />
          <Text fontSize="lg" ml={3}>
            Change Password
          </Text>
        </HStack>
      </TouchableOpacity>

      <Divider w="100%" />

      <TouchableOpacity onPress={handleLogoutModal}>
        <HStack alignItems="center" px={6} py={6}>
          <Icon as={Feather} name="log-out" color="coolGray.600" size="sm" />
          <Text fontSize="lg" ml={3}>
            Log Out
          </Text>
        </HStack>
      </TouchableOpacity>

      <Divider w="100%" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Box
          borderTopRadius={15}
          shadow={9}
          w="full"
          bg="white"
          position="absolute"
          bottom={0}
          padding={5}
        >
          <Text fontWeight="bold" textAlign="center" fontSize="lg">
            Confirm Logout
          </Text>
          <Text textAlign="center" my={3}>
            You are about to log out of the app and delete all of your
            information from this device
          </Text>

          <Button
            variant="ghost"
            bg="red.50"
            iconLeft
            onPress={logout}
            size="lg"
          >
            <HStack alignItems="center">
              <Icon as={Feather} name="log-out" color="red.600" size="sm" />
              <Text ml={2} color="red.600">
                Log Out
              </Text>
            </HStack>
          </Button>
          <Button
            variant="ghost"
            colorScheme="gray"
            onPress={handleLogoutModal}
            size="lg"
            mt={3}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
