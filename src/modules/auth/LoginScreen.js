import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import {
  Flex,
  Box,
  Heading,
  Stack,
  Button,
  HStack,
  IconButton,
  ArrowBackIcon,
} from 'native-base';

import { FieldInput } from '@/components/Fields/FieldInput';
import { useLogin } from '@/modules/auth/auth.service';
import { focus } from '@/utils/formUtils';

export const LoginScreen = () => {
  const loginForm = useForm();
  const navigation = useNavigation();

  const passwordRef = useRef();

  const { login, isLoading } = useLogin();

  const submitForm = (values) => {
    login(values);
  };

  const handleOpenResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={loginForm}>
        <Stack space="lg">
          <Flex dir="column" h="full" justifyContent="space-between">
            <Stack space="md">
              <HStack alignItems="center" space="xs">
                <IconButton
                  ml={-3}
                  onPress={() => navigation.goBack()}
                  icon={<ArrowBackIcon color="gray.600" size="6" />}
                />
                <Heading textAlign="center">Login</Heading>
              </HStack>
              <FieldInput
                name="username"
                label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                required="Email is required"
                validations={[
                  { rule: isEmail(), message: 'Email is not valid' },
                ]}
                onSubmitEditing={focus(passwordRef)}
                returnKeyType="next"
              />

              <Stack space="2xs">
                <FieldInput
                  ref={passwordRef}
                  name="password"
                  label="Password"
                  secureTextEntry
                  required="Password is required"
                  onSubmitEditing={loginForm.submit}
                />

                <Button
                  variant="link"
                  colorScheme="gray"
                  mt={5}
                  onPress={handleOpenResetPassword}
                >
                  Forgot Password?
                </Button>
              </Stack>
            </Stack>

            <Stack>
              <Button
                size="lg"
                isLoading={isLoading}
                onPress={loginForm.submit}
              >
                Log In
              </Button>
            </Stack>
          </Flex>
        </Stack>
      </Formiz>
    </Box>
  );
};
