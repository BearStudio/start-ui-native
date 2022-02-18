import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import {
  Flex,
  Box,
  Stack,
  Button,
  HStack,
  IconButton,
  ArrowBackIcon,
  Heading,
} from 'native-base';

import { FieldInput } from '@/components/Fields/FieldInput';
import { useToast } from '@/components/Toast';
import { useCreateAccount } from '@/modules/account/account.service';
import { focus } from '@/utils/formUtils';

export const RegisterScreen = () => {
  const registerForm = useForm();
  const navigation = useNavigation();
  const { showError, showSuccess } = useToast();

  const passwordRef = useRef();
  const lastNameRef = useRef();
  const emailAddressRef = useRef();

  const { createAccount, isLoading } = useCreateAccount({
    onSuccess: () => {
      navigation.navigate('Login');
      showSuccess(
        'Your account has been created successfully. You can now log in'
      );
    },
    onError: (error) => {
      if (error?.response?.data?.errorKey === 'emailexists') {
        showError('This email is already used by another account');
      } else {
        showError(
          'An error occurred while trying to create your account, please retry'
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
          <Flex dir="column" h="full" justifyContent="space-between">
            <Stack space="md">
              <HStack alignItems="center" space="xs">
                <IconButton
                  ml={-3}
                  onPress={() => navigation.goBack()}
                  icon={<ArrowBackIcon color="gray.600" size="6" />}
                />
                <Heading textAlign="center">Create account</Heading>
              </HStack>
              <FieldInput
                name="firstName"
                label="First Name"
                required="First Name is required"
                onSubmitEditing={focus(lastNameRef)}
                returnKeyType="next"
              />

              <FieldInput
                ref={lastNameRef}
                name="lastName"
                label="Last Name"
                required="Last Name is required"
                onSubmitEditing={focus(emailAddressRef)}
                returnKeyType="next"
              />

              <FieldInput
                ref={emailAddressRef}
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
                onSubmitEditing={registerForm.submit}
                returnKeyType="next"
              />
            </Stack>

            <Stack>
              <Button
                size="lg"
                isLoading={isLoading}
                onPress={registerForm.submit}
              >
                Register
              </Button>
            </Stack>
          </Flex>
        </Stack>
      </Formiz>
    </Box>
  );
};
