import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
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
import { LoadingScreen } from '@/layout/LoadingScreen';
import {
  useAccount,
  useUpdateAccount,
} from '@/modules/account/account.service';
import { focus } from '@/utils/formUtils';

export const AccountScreen = () => {
  const accountForm = useForm();
  const navigation = useNavigation();
  const { showError, showSuccess } = useToast();

  const { account, isFetching: isFetchingAccount } = useAccount();

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { updateAccount, isLoading } = useUpdateAccount({
    onError: () => {
      showError('An error occurred while updating your profile, please retry');
    },
    onSuccess: () => {
      showSuccess('Your profile has been updated');
    },
  });

  const submitForm = (values) => {
    updateAccount({
      ...values,
      login: values.email,
    });
  };

  if (isFetchingAccount) {
    return <LoadingScreen />;
  }

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={accountForm}>
        <Stack space="lg">
          <Flex dir="column" h="full" justifyContent="space-between">
            <Stack space="md">
              <HStack alignItems="center" space="xs">
                <IconButton
                  ml={-3}
                  onPress={() => navigation.goBack()}
                  icon={<ArrowBackIcon color="gray.600" size="6" />}
                />
                <Heading textAlign="center">Update Profile</Heading>
              </HStack>
              <FieldInput
                ref={firstNameRef}
                name="firstName"
                defaultValue={account?.firstName}
                label="First Name"
                placeholder="John"
                autoCapitalize="none"
                onSubmitEditing={focus(lastNameRef)}
                returnKeyType="next"
              />

              <FieldInput
                ref={lastNameRef}
                name="lastName"
                defaultValue={account?.lastName}
                label="Last Name"
                placeholder="Doe"
                autoCapitalize="none"
                onSubmitEditing={accountForm.submit}
              />

              <FieldInput
                name="email"
                defaultValue={account?.email}
                label="Email"
                placeholder="email@example.com"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                required="Email address is required"
                validations={[
                  {
                    rule: isEmail(),
                    message: 'Email is invalid',
                  },
                ]}
                onSubmitEditing={focus(firstNameRef)}
                returnKeyType="next"
              />
            </Stack>

            <Stack>
              <Button
                size="lg"
                isLoading={isLoading}
                onPress={accountForm.submit}
              >
                Update
              </Button>
            </Stack>
          </Flex>
        </Stack>
      </Formiz>
    </Box>
  );
};
