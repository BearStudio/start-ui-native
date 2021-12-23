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
import { focus } from '@/utils/formUtils';

export const ChangePasswordScreen = () => {
  const changePasswordForm = useForm();
  const navigation = useNavigation();

  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitForm = () => {};

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={changePasswordForm}>
        <Stack space="lg">
          <Flex direction="column" h="full" justifyContent="space-between">
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
                name="current-password"
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
                name="new-password"
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
                name="confirm-password"
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
                // isLoading={isLoading}
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
