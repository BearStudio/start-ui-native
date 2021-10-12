import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Stack, Button, InfoOutlineIcon } from 'native-base';

import { useLogin } from '@/auth/auth.service';
import { FieldInput } from '@/components/Fields/FieldInput';
import { focus } from '@/services/utils/formUtil';

const Login = () => {
  const loginForm = useForm();
  const navigation = useNavigation();

  const passwordRef = useRef();

  const { login, isLoading } = useLogin();

  const submitForm = (values) => {
    login(values);
  };

  const handleOpenRegister = () => {
    navigation.navigate('Register');
  };

  const handleOpenResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleOpenAbout = () => {
    navigation.navigate('About');
  };

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={loginForm}>
        <Stack space="lg">
          <Stack space="md">
            <Heading>Log In</Heading>
            <FieldInput
              name="username"
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              required="Email is required"
              validations={[{ rule: isEmail(), message: 'Email is not valid' }]}
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
                onPress={handleOpenResetPassword}
              >
                Forgot Password?
              </Button>
            </Stack>

            <Button size="lg" isLoading={isLoading} onPress={loginForm.submit}>
              Log In
            </Button>
          </Stack>

          <Button.Group
            size="lg"
            variant="link"
            colorScheme="gray"
            justifyContent="center"
          >
            <Button onPress={handleOpenRegister} px={0}>
              Need an Account?
            </Button>
            <Button colorScheme="primary" onPress={handleOpenRegister} px={0}>
              Register Now!
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
        </Stack>
      </Formiz>
    </Box>
  );
};

export default Login;
