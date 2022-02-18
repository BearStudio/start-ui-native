import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, Image, Box, Button, InfoOutlineIcon, Flex } from 'native-base';

export const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleOpenRegister = () => {
    navigation.navigate('Register');
  };

  const handleOpenLogin = () => {
    navigation.navigate('Login');
  };

  const handleOpenAbout = () => {
    navigation.navigate('About');
  };

  const logoImage = require('../../../assets/logo.png');

  return (
    <Flex dir="column" bg="white" p="6" h="full" justifyContent="space-between">
      <Box />
      <Box>
        <Box p={5}>
          <Image source={logoImage} resizeMode="contain" alt="logo" />
        </Box>

        <Text fontSize="md" my={5} textAlign="center">
          An optionated UI starter with React, Native Base, React Query & Formiz
        </Text>

        <Button size="lg" onPress={handleOpenRegister}>
          Sign up with email
        </Button>
        <Button.Group
          mt={10}
          size="lg"
          variant="link"
          colorScheme="gray"
          justifyContent="center"
        >
          <Button onPress={handleOpenLogin} px={0}>
            Already an account?
          </Button>
          <Button colorScheme="primary" onPress={handleOpenLogin} px={0}>
            Log in
          </Button>
        </Button.Group>
      </Box>

      <Button
        size="sm"
        variant="link"
        colorScheme="gray"
        onPress={handleOpenAbout}
        px={0}
        leftIcon={<InfoOutlineIcon size="3" />}
      >
        About this app
      </Button>
    </Flex>
  );
};
