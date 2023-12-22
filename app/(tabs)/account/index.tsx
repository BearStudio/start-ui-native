import { useState } from 'react';

import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import {
  Box,
  Button,
  Divider,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { CardStatus } from '@/components/CardStatus';
import { ConfirmationCodeModal } from '@/components/ConfirmationCodeModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { FieldInput } from '@/components/FieldInput';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { LoadingScreen } from '@/layout/LoadingScreen';
import {
  useAccount,
  useAccountUpdate,
  useAccountUpdateEmail,
  useAccountUpdateEmailValidate,
} from '@/modules/account/account.service';
import useAuthStore from '@/modules/auth/auth.store';
import { useToast } from '@/modules/toast/useToast';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useDarkMode } from '@/theme/useDarkMode';

const Account = () => {
  const logout = useAuthStore((state) => state.logout);
  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();
  const { showError, showSuccess, showInfo } = useToast();

  const logoutModal = useDisclosure();
  const deleteAccountModal = useDisclosure();
  const updateEmailCodeModal = useDisclosure();

  const { colorModeValue } = useDarkMode();

  const [emailToken, setEmailToken] = useState<string | null>(null);

  const submitValidationCodeEmail = (values: { code: string }) => {
    updateAccountEmailValidate({ ...values, token: emailToken ?? '' });
  };

  const emailValidationCodeForm = useForm({
    onValidSubmit: submitValidationCodeEmail,
  });

  const { updateAccount, isLoading: isUpdatingAccount } = useAccountUpdate({
    onSuccess: () => {
      showSuccess('Account updated');
      refetchAccount();
    },
    onError: (err) => {
      showError(
        err.response?.data?.message?.startsWith('[DEMO]')
          ? 'This is a read-only demo, this action is disabled.'
          : 'An error occured during account update, please try again'
      );
    },
  });

  const { updateAccountEmail, isLoading: isUpdatingAccountEmail } =
    useAccountUpdateEmail({
      onSuccess: (data) => {
        setEmailToken(data.token);
        updateEmailCodeModal.onOpen();
      },
      onError: (err) => {
        showError(
          err.response?.data?.message?.startsWith('[DEMO]')
            ? 'This is a read-only demo, this action is disabled.'
            : 'An error occured during account email update, please try again'
        );
      },
    });

  const { updateAccountEmailValidate, isLoading: isValidatingAccountEmail } =
    useAccountUpdateEmailValidate({
      onSuccess: () => {
        updateEmailCodeModal.onClose();
        refetchAccount();
        showSuccess('Account email updated');
      },
      onError: () => {
        emailValidationCodeForm.setValues({
          code: null,
        });
        emailValidationCodeForm.setErrors({
          code: 'Code is incorrect, please try again',
        });
      },
    });

  const submitProfile = (values: { name: string }) => {
    updateAccount({ ...values });
  };

  const submitEmail = (values: { email: string }) => {
    updateAccountEmail({ ...values });
  };

  const profileForm = useForm({ onValidSubmit: submitProfile });
  const emailForm = useForm({ onValidSubmit: submitEmail });
  const deleteAccountForm = useForm({
    onValidSubmit: () => {
      deleteAccountModal.onClose();
      showInfo('No delete account api yet on Start UI V2');
    },
  });

  const { name } = useFormFields({
    connect: profileForm,
    selector: (field) => field.value,
    fields: ['name'] as const,
  });

  const { email } = useFormFields({
    connect: emailForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const { confirmation } = useFormFields({
    connect: deleteAccountForm,
    selector: (field) => field.isValid,
    fields: ['confirmation'] as const,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !account) {
    return (
      <Box flex={1} p={20}>
        <Button onPress={() => refetchAccount()}>Retry</Button>
      </Box>
    );
  }

  return (
    <>
      <Container>
        <Content>
          <VStack spacing="xl">
            <Box>
              <SectionTitle>Profile informations</SectionTitle>
              <Box mt="lg">
                <Formiz connect={profileForm}>
                  <FieldInput
                    name="name"
                    label="Name"
                    required="Name is required"
                    defaultValue={account.name}
                    componentProps={{
                      autoCapitalize: 'none',
                      returnKeyType: 'next',
                    }}
                  />
                  <Button
                    mt="md"
                    onPress={() => profileForm.submit()}
                    colorScheme="brand"
                    isDisabled={name === account.name}
                    isLoading={isUpdatingAccount}
                    full
                  >
                    Update
                  </Button>
                </Formiz>
              </Box>
              <Divider mt="xl" borderColor="gray.300" />
            </Box>
            <Box>
              <SectionTitle>Update your email</SectionTitle>
              <Box mt="lg">
                <Formiz connect={emailForm}>
                  <FieldInput
                    name="email"
                    label="Mail address"
                    required="Mail is required"
                    defaultValue={account.email}
                    validations={[
                      {
                        handler: isEmail(),
                        message: 'Mail is invalid',
                      },
                    ]}
                    componentProps={{
                      textContentType: 'emailAddress',
                      autoCapitalize: 'none',
                      autoComplete: 'email',
                      keyboardType: 'email-address',
                      returnKeyType: 'done',
                    }}
                  />
                  <Button
                    mt="md"
                    onPress={() => emailForm.submit()}
                    colorScheme="brand"
                    isLoading={isUpdatingAccountEmail}
                    isDisabled={email === account.email}
                    full
                  >
                    Update
                  </Button>
                </Formiz>
              </Box>
              <Divider mt="xl" borderColor="gray.300" />
            </Box>
            <Box>
              <SectionTitle>Preferences</SectionTitle>
              <VStack spacing="lg">
                <ThemeSwitcher />
                <ButtonIcon icon="logout" onPress={logoutModal.onOpen} full>
                  Logout
                </ButtonIcon>
                <ButtonIcon
                  icon="trash"
                  iconFamily="Feather"
                  onPress={deleteAccountModal.onOpen}
                  colorScheme="error"
                  full
                >
                  Delete account
                </ButtonIcon>
              </VStack>
            </Box>
          </VStack>

          <Box h={50} />
        </Content>
      </Container>

      <ConfirmationCodeModal
        isOpen={updateEmailCodeModal.isOpen}
        onClose={updateEmailCodeModal.onClose}
        form={emailValidationCodeForm}
        email={account.email}
        isLoadingConfirm={isValidatingAccountEmail}
      />

      <ConfirmationModal
        title="Logout"
        description="Do you really want to logout from the application?"
        confirmColorScheme="error"
        confirmLabel="Logout"
        confirmIcon="logout"
        onConfirm={logout}
        onCancel={logoutModal.onClose}
        isVisible={logoutModal.isOpen}
      />

      <ConfirmationModal
        title="Delete account"
        description="Do you really want to delete your account?"
        confirmColorScheme="error"
        confirmLabel="Confirm the deletion of account"
        isDisabledConfirm={!confirmation}
        onConfirm={() => deleteAccountForm.submit()}
        onCancel={deleteAccountModal.onClose}
        isVisible={deleteAccountModal.isOpen}
        h={420}
      >
        <Formiz connect={deleteAccountForm}>
          <Stack spacing="lg">
            <CardStatus type="warning" title="Warning">
              <Text
                color={colorModeValue('gray.800', 'gray.100')}
                fontWeight="bold"
                mt="lg"
              >
                This action is irreversible and immediate. All your data will be
                will be deleted immediately. You will have to recreate an
                account.
              </Text>
            </CardStatus>

            <FieldInput
              name="confirmation"
              label='Enter "DELETION"'
              required="Confirmation required"
              validations={[
                {
                  handler: (value) => value === 'DELETION',
                  message: 'Please enter "DELETION" to validate',
                },
              ]}
            />
          </Stack>
        </Formiz>
      </ConfirmationModal>
    </>
  );
};

export default Account;
