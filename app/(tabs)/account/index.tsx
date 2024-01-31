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

  const { colorModeValue, getThemeColor } = useDarkMode();

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
                  <Stack spacing="md">
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
                      onPress={() => profileForm.submit()}
                      colorScheme="brand"
                      isLoading={isUpdatingAccount}
                      full
                    >
                      Update
                    </Button>
                  </Stack>
                </Formiz>
              </Box>
              <Divider
                mt="xl"
                borderColor={colorModeValue('gray.200', 'gray.700')}
              />
            </Box>
            <Stack spacing="md">
              <SectionTitle>Update your email</SectionTitle>
              <Formiz connect={emailForm}>
                <Stack spacing="md">
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
                  <VStack spacing="md" alignItems="center">
                    <Button
                      onPress={() => emailForm.submit()}
                      colorScheme="brand"
                      isLoading={isUpdatingAccountEmail}
                      isDisabled={email === account.email}
                      full
                    >
                      Update
                    </Button>
                    {email === account.email ? (
                      <Text
                        fontSize="lg"
                        color={colorModeValue('gray.500', 'gray.300')}
                      >
                        This is your current email
                      </Text>
                    ) : (
                      <Button
                        onPress={() => emailForm.submit()}
                        isLoading={isUpdatingAccountEmail}
                        isDisabled={email === account.email}
                        color={colorModeValue(
                          getThemeColor('gray.500'),
                          getThemeColor('gray.200')
                        )}
                        bg={colorModeValue('white', 'gray.700')}
                        borderWidth={1}
                        borderColor={colorModeValue('gray.200', 'gray.600')}
                      >
                        Cancel
                      </Button>
                    )}
                  </VStack>
                </Stack>
              </Formiz>
              <Divider
                mt="xl"
                borderColor={colorModeValue('gray.200', 'gray.700')}
              />
            </Stack>
            <Box>
              <SectionTitle>Preferences</SectionTitle>
              <VStack spacing="lg">
                <ThemeSwitcher />
                <Divider
                  my="lg"
                  borderColor={colorModeValue('gray.200', 'gray.700')}
                />
                <ButtonIcon
                  icon="logout"
                  onPress={logoutModal.onOpen}
                  full
                  iconColor={colorModeValue('red.500', 'red.400')}
                  color={colorModeValue(
                    getThemeColor('red.500'),
                    getThemeColor('red.400')
                  )}
                  bg={colorModeValue('white', 'gray.700')}
                  colorScheme="white"
                  borderWidth={1}
                  borderColor={colorModeValue('gray.200', 'gray.600')}
                >
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
