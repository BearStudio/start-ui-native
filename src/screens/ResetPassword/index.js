import React from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Heading,
  Stack,
  Button,
  IconButton,
  ArrowBackIcon,
  HStack,
} from 'native-base';

import { useResetPasswordInit } from '@/account/account.service';
import { FieldInput } from '@/components/Fields/FieldInput';
import { useToast } from '@/components/Toast';

const ResetPassword = () => {
  const resetPasswordForm = useForm();
  const navigation = useNavigation();
  const { showSuccess, showError } = useToast();

  const {
    resetPasswordInit,
    isLoading: isLoadingResetPasswordInit,
  } = useResetPasswordInit({
    onSuccess: () => {
      navigation.navigate('Login');
      showSuccess('Reset password email sent with success!');
    },
    onError: () => {
      showError(
        'An error has occurred while resetting your password, please retry'
      );
    },
  });

  const submitForm = async (values) => {
    resetPasswordInit(values.email);
  };

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={resetPasswordForm}>
        <Stack space="md">
          <HStack alignItems="center" space="xs">
            <IconButton
              ml={-3}
              onPress={() => navigation.goBack()}
              icon={<ArrowBackIcon color="gray.600" size="6" />}
            />
            <Heading>Reset Password</Heading>
          </HStack>
          <FieldInput
            name="email"
            label="Email"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            helper="Enter the email address you used to register"
            required="Email is required"
            validations={[
              {
                rule: isEmail(),
                message: 'Email is invalid',
              },
            ]}
          />

          <Button
            size="lg"
            isLoading={isLoadingResetPasswordInit}
            onPress={resetPasswordForm.submit}
          >
            Send Email
          </Button>
        </Stack>
      </Formiz>
    </Box>
  );
};

export default ResetPassword;
