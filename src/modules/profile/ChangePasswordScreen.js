import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isMinLength } from '@formiz/validations';
import { useNavigation } from '@react-navigation/core';
import {
  ArrowBackIcon,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
} from 'native-base';

import { FieldInput } from '@/components/Fields/FieldInput';
import { useToast } from '@/components/Toast';
import { focus } from '@/utils/formUtils';

import { useUpdatePassword } from '../account/account.service';

export const ChangePasswordScreen = () => {
  const changePasswordForm = useForm();
  const navigation = useNavigation();
  const { showError, showSuccess } = useToast();

  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const { updatePassword, isLoading } = useUpdatePassword({
    onError: () => {
      showError('An error occurred while updating your password, please retry');
    },
    onSuccess: () => {
      showSuccess('Your password has been updated');
    },
  });

  const submitForm = (values) => {
    updatePassword(values);
  };

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={changePasswordForm}>
        <Stack space="lg">
          <Flex dir="column" h="full" justifyContent="space-between">
            <Stack space="md">
              <HStack alignItems="center" space="xs">
                <IconButton
                  ml={-3}
                  onPress={() => navigation.goBack()}
                  icon={<ArrowBackIcon color="gray.600" size="6" />}
                />
                <Heading textAlign="center">Change Password</Heading>
              </HStack>
              <FieldInput
                name="currentPassword"
                label="Current Password"
                secureTextEntry
                required="Current Password is required"
                validations={[
                  {
                    rule: isMinLength(6),
                    message:
                      'Current Password should have at least 6 characters',
                  },
                ]}
                onSubmitEditing={focus(newPasswordRef)}
                returnKeyType="next"
              />

              <FieldInput
                ref={newPasswordRef}
                name="newPassword"
                label="New Password"
                secureTextEntry
                required="New Password is required"
                validations={[
                  {
                    rule: isMinLength(6),
                    message: 'New Password should have at least 6 characters',
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
                required="Password is required"
                validations={[
                  {
                    rule: isMinLength(6),
                    message: 'Password should have at least 6 characters',
                  },
                ]}
                onSubmitEditing={changePasswordForm.submit}
                returnKeyType="next"
              />
            </Stack>

            <Stack>
              <Button
                size="lg"
                isLoading={isLoading}
                onPress={changePasswordForm.submit}
              >
                Update Password
              </Button>
            </Stack>
          </Flex>
        </Stack>
      </Formiz>
    </Box>
  );
};
