import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Stack,
  Button,
  HStack,
  IconButton,
  ArrowBackIcon,
  Heading,
} from 'native-base';

import { useCreateAccount } from '@/account/account.service';
import { FieldInput } from '@/components/Fields/FieldInput';
import { focus } from '@/services/utils/formUtil';
import { useToast } from '@/services/utils/toastService';

const Register = () => {
  const registerForm = useForm();
  const navigation = useNavigation();
  const { showError, showSuccess } = useToast();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { createAccount, isLoading } = useCreateAccount({
    onSuccess: () => {
      navigation.navigate('Login');
      showSuccess('Votre compte a bien été créé, vous pouvez vous connecter');
    },
    onError: (error) => {
      if (error?.response?.data?.errorKey === 'emailexists') {
        showError('Un compte existe déjà pour cette adresse mail');
      } else {
        showError(
          'Une erreur est survenue lors de la création de votre compte, veuillez réessayer'
        );
      }
    },
  });

  const submitForm = (values) => {
    createAccount({
      ...values,
      login: values.email,
    });
  };

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={registerForm}>
        <Stack space="lg">
          <Stack space="md">
            <HStack alignItems="center" space="xs">
              <IconButton
                ml={-3}
                onPress={() => navigation.goBack()}
                icon={<ArrowBackIcon color="gray.600" size="6" />}
              />
              <Heading>Register</Heading>
            </HStack>
            <FieldInput
              name="email"
              label="Email"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              required="Email is required"
              validations={[
                {
                  rule: isEmail(),
                  message: 'Email is invalid',
                },
              ]}
              onSubmitEditing={focus(passwordRef)}
              returnKeyType="next"
            />

            <FieldInput
              ref={passwordRef}
              name="password"
              label="Password"
              secureTextEntry
              required="Password is required"
              validations={[
                {
                  rule: isMinLength(6),
                  message: 'Password should have at least 6 characters',
                },
              ]}
              onSubmitEditing={focus(confirmPasswordRef)}
              returnKeyType="next"
            />

            <FieldInput
              ref={confirmPasswordRef}
              name="confirmPassword"
              label="Confirm Password"
              secureTextEntry
              required="Password confirmation is required"
              validations={[
                {
                  rule: (value) => value === registerForm.values?.password,
                  deps: [registerForm.values?.password],
                  message: 'Passwords do not match',
                },
              ]}
              onSubmitEditing={registerForm.submit}
            />
          </Stack>

          <Button size="lg" isLoading={isLoading} onPress={registerForm.submit}>
            Register
          </Button>
        </Stack>
      </Formiz>
    </Box>
  );
};

export default Register;
