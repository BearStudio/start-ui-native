import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useNavigation } from '@react-navigation/core';
import {
  ArrowBackIcon,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Stack,
} from 'native-base';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import { useAccount, useUpdateAccount } from '@/account/account.service';
import { useAuthContext } from '@/auth/AuthContext';
import { FieldInput } from '@/components/Fields/FieldInput';
import SplashScreen from '@/components/Layout/SplashScreen';
import { useToast } from '@/components/Toast';
import { focus } from '@/services/utils/formUtil';

const Account = () => {
  const accountForm = useForm();
  const navigation = useNavigation();
  const { showError, showSuccess } = useToast();
  const { logout } = useAuthContext();

  const { account, isFetching: isFetchingAccount } = useAccount();

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { updateAccount, isLoading: isLoadingUpdateAccount } = useUpdateAccount(
    {
      onError: () => {
        showError(
          'An error occurred while updating your profile, please retry'
        );
      },
      onSuccess: () => {
        showSuccess('Your profile has been updated');
      },
    }
  );

  const submitForm = (values) => {
    updateAccount({
      ...values,
      login: values.email,
    });
  };

  if (isFetchingAccount) {
    return <SplashScreen />;
  }

  return (
    <Box bg="white" h="full" p="6">
      <Formiz onValidSubmit={submitForm} connect={accountForm}>
        <Stack space="md">
          <HStack alignItems="center" space="xs">
            <IconButton
              ml={-3}
              onPress={() => navigation.goBack()}
              icon={<ArrowBackIcon color="gray.600" size="6" />}
            />
            <Heading>My account</Heading>
          </HStack>

          <FieldInput
            name="email"
            defaultValue={account?.email}
            label="Email address"
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

          <Button
            size="lg"
            isLoading={isLoadingUpdateAccount}
            onPress={accountForm.submit}
          >
            Update
          </Button>
        </Stack>
      </Formiz>

      <Box flex={1} justifyContent="flex-end">
        <HideWithKeyboard>
          <Button colorScheme="danger" variant="outline" onPress={logout}>
            Logout
          </Button>
        </HideWithKeyboard>
      </Box>
    </Box>
  );
};

export default Account;
