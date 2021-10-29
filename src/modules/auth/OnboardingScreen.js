import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, Box, Button, InfoOutlineIcon } from 'native-base';

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

  return (
    <Box bg="white" h="full" p="6">
      <Text my={5} textAlign="center">
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
    </Box>
  );
};
