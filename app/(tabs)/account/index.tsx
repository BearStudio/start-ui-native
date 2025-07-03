import { useState } from 'react';

import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useTranslation } from 'react-i18next';
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
import { DraggableModalInput } from '@/components/DraggableModalInput';
import { FieldInput } from '@/components/FieldInput';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { LoadingScreen } from '@/layout/LoadingScreen';
import { authClient } from '@/lib/auth-client';
import { useAccountUpdate } from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useDarkMode } from '@/theme/useDarkMode';

const Account = () => {
  const { t } = useTranslation();
  const session = authClient.useSession();
  const { showError, showSuccess, showInfo } = useToast();

  const logoutModal = useDisclosure();
  const deleteAccountModal = useDisclosure();
  const updateEmailCodeModal = useDisclosure();

  const { colorModeValue, getThemeColor } = useDarkMode();

  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const { updateAccount: updateProfile, isLoading: isUpdatingProfile } =
    useAccountUpdate({
      onSuccess: () => {
        showSuccess(t('account:feedbacks.updateAccount.success'));
      },
      onError: (err) => {
        showError(
          err.response?.data?.message?.startsWith('[DEMO]')
            ? t('account:feedbacks.updateAccount.error.demo')
            : t('account:feedbacks.updateAccount.error.default')
        );
      },
    });

  const { updateAccount: updateEmail, isLoading: isUpdatingEmail } =
    useAccountUpdate({
      onSuccess: () => {
        if (pendingEmail) {
          authClient.emailOtp
            .sendVerificationOtp({
              email: pendingEmail,
              type: 'email-verification',
            })
            .catch((otpErr) => {
              // Swallow the "not implemented" server‐side stub; otherwise show an error toast
              if (
                !/email-verification email not implemented/.test(otpErr.message)
              ) {
                showError(
                  t('account:feedbacks.updateAccountEmail.error.otpSend')
                );
              }
            })
            .finally(() => {
              updateEmailCodeModal.onOpen();
            });
        }
      },
      onError: (err) => {
        showError(
          err.response?.data?.message?.startsWith('[DEMO]')
            ? t('account:feedbacks.updateAccountEmail.error.demo')
            : t('account:feedbacks.updateAccountEmail.error.default')
        );
      },
    });

  const submitProfile = (values: { name: string }) => {
    updateProfile({ name: values.name });
  };

  const submitEmail = (values: { email: string }) => {
    // Store the new email so that onSuccess we know where to send the OTP
    setPendingEmail(values.email);
    updateEmail({ email: values.email });
  };

  const profileForm = useForm({ onValidSubmit: submitProfile });
  const emailForm = useForm({ onValidSubmit: submitEmail });

  const { email } = useFormFields({
    connect: emailForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const deleteAccountForm = useForm({
    onValidSubmit: () => {
      deleteAccountModal.onClose();
      showInfo(t('account:confirmationModals.deleteAccount.submit'));
    },
  });

  const { confirmation } = useFormFields({
    connect: deleteAccountForm,
    selector: (field) => field.isValid,
    fields: ['confirmation'] as const,
  });

  const handlerValue = t(
    'account:confirmationModals.deleteAccount.input.validations.isValid.handlerValue'
  );

  const submitValidationCodeEmail = (values: { code: string }) => {
    if (!pendingEmail) {
      // Should never happen, but guard just in case
      showError(t('account:feedbacks.updateAccountEmailValidate.error'));
      return;
    }
    authClient.emailOtp
      .verifyEmail({
        email: pendingEmail,
        otp: values.code,
      })
      .then(() => {
        updateEmailCodeModal.onClose();
        showSuccess(t('account:feedbacks.updateAccountEmailValidate.success'));
      })
      .catch(() => {
        // Clear the field and show an error message under it
        emailValidationCodeForm.setValues({ code: '' });
        emailValidationCodeForm.setErrors({
          code: t('account:feedbacks.updateAccountEmailValidate.error'),
        });
      });
  };

  const emailValidationCodeForm = useForm({
    onValidSubmit: submitValidationCodeEmail,
  });

  if (session.isPending) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container>
        <Content>
          <VStack spacing="xl">
            {/* === PROFILE SECTION === */}
            <Box>
              <SectionTitle>{t('account:sections.profile.title')}</SectionTitle>
              <Box mt="lg">
                <Formiz connect={profileForm}>
                  <Stack spacing="md">
                    <FieldInput
                      name="name"
                      label={t('account:sections.profile.input.label')}
                      required={t('account:sections.profile.input.required')}
                      defaultValue={session.data?.user.name}
                      componentProps={{
                        autoCapitalize: 'none',
                        returnKeyType: 'next',
                      }}
                    />
                    <Button
                      onPress={() => profileForm.submit()}
                      colorScheme="brand"
                      isLoading={isUpdatingProfile}
                      full
                    >
                      {t('commons:actions.update')}
                    </Button>
                  </Stack>
                </Formiz>
              </Box>
              <Divider
                mt="xl"
                borderColor={colorModeValue('gray.200', 'gray.700')}
              />
            </Box>

            {/* === EMAIL SECTION === */}
            <Stack spacing="md">
              <SectionTitle>{t('account:sections.email.title')}</SectionTitle>
              <Formiz connect={emailForm}>
                <Stack spacing="md">
                  <FieldInput
                    name="email"
                    label={t('account:sections.email.input.label')}
                    required={t('account:sections.email.input.required')}
                    defaultValue={(session.data?.user.email as string) || ''}
                    validations={[
                      {
                        handler: isEmail(),
                        message: t(
                          'account:sections.email.input.validations.email'
                        ),
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
                      isLoading={isUpdatingEmail}
                      isDisabled={email === session.data?.user.email}
                      full
                    >
                      {t('commons:actions.update')}
                    </Button>
                    {email === session.data?.user.email ? (
                      <Text
                        fontSize="lg"
                        color={colorModeValue('gray.500', 'gray.300')}
                      >
                        {t('account:sections.email.feedbacks.isEmail')}
                      </Text>
                    ) : (
                      <Button
                        onPress={() =>
                          emailForm.reset({
                            email: session.data?.user.email as string,
                          } as ExplicitAny)
                        }
                        isDisabled={isUpdatingEmail}
                        color={colorModeValue(
                          getThemeColor('gray.500'),
                          getThemeColor('gray.200')
                        )}
                        bg={colorModeValue('white', 'gray.700')}
                        borderWidth={1}
                        borderColor={colorModeValue('gray.200', 'gray.600')}
                        full
                      >
                        {t('commons:actions.cancel')}
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

            {/* === PREFERENCES & LOGOUT/DELETE === */}
            <Box>
              <SectionTitle>
                {t('account:sections.preferences.title')}
              </SectionTitle>
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
                  {t('account:actions.logout')}
                </ButtonIcon>
                <ButtonIcon
                  icon="trash"
                  iconFamily="Feather"
                  onPress={deleteAccountModal.onOpen}
                  colorScheme="error"
                  full
                >
                  {t('account:actions.deleteAccount')}
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
        email={pendingEmail || (session.data?.user.email as string)}
        isLoadingConfirm={emailValidationCodeForm.isValidating}
      />

      <ConfirmationModal
        title={t('account:confirmationModals.logout.title')}
        description={t('account:confirmationModals.logout.description')}
        confirmColorScheme="error"
        confirmLabel={t('account:confirmationModals.logout.confirmLabel')}
        confirmIcon="logout"
        onConfirm={() => authClient.signOut()}
        onCancel={logoutModal.onClose}
        isOpen={logoutModal.isOpen}
        h={250}
      />

      <ConfirmationModal
        title={t('account:confirmationModals.deleteAccount.title')}
        description={t('account:confirmationModals.deleteAccount.description')}
        confirmColorScheme="error"
        confirmLabel={t(
          'account:confirmationModals.deleteAccount.confirmLabel'
        )}
        isDisabledConfirm={!confirmation}
        onConfirm={() => deleteAccountForm.submit()}
        onCancel={deleteAccountModal.onClose}
        isOpen={deleteAccountModal.isOpen}
        h={450}
      >
        <Formiz connect={deleteAccountForm}>
          <Stack spacing="lg">
            <CardStatus
              type="warning"
              title={t('account:confirmationModals.deleteAccount.card.title')}
            >
              <Text
                color={colorModeValue('gray.800', 'gray.100')}
                fontWeight="bold"
                mt="lg"
              >
                {t('account:confirmationModals.deleteAccount.card.description')}
              </Text>
            </CardStatus>

            <FieldInput
              name="confirmation"
              label={t('account:confirmationModals.deleteAccount.input.label', {
                handlerValue,
              })}
              required={t(
                'account:confirmationModals.deleteAccount.input.required'
              )}
              validations={[
                {
                  handler: (value: string) => value === handlerValue,
                  message: t(
                    'account:confirmationModals.deleteAccount.input.validations.isValid.message',
                    {
                      handlerValue,
                    }
                  ),
                },
              ]}
              InputComponent={DraggableModalInput}
            />
          </Stack>
        </Formiz>
      </ConfirmationModal>
    </>
  );
};

export default Account;
