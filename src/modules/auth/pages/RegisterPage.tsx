import { useRef } from 'react';

import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import {
  Box,
  Button,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from 'react-native-ficus-ui';

import { CardStatus } from '@/components/CardStatus';
import { ConfirmationCodeModal } from '@/components/ConfirmationCodeModal';
import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import { authClient } from '@/lib/auth-client';
import { useToast } from '@/modules/toast/useToast';
import { focus } from '@/utils/formUtils';

const CardWarningRegister = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <CardStatus type="warning" title={t('register:card.title')} mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text
          fontSize="lg"
          color={useColorModeValue('neutral.800', 'neutral.50')}
          my="sm"
        >
          {t('register:card.description')}
        </Text>
        <Button
          onPress={() => router.push('/login')}
          full
          colorScheme="neutral"
          bg={useColorModeValue(undefined, 'neutral.800')}
          variant={useColorModeValue('outline', 'solid')}
        >
          {t('register:card.actions.login')}
        </Button>
      </Box>
    </CardStatus>
  );
};

const RegisterPage = () => {
  const { showError, showSuccess } = useToast();
  const { t } = useTranslation();
  const nameRef = useRef<TextInput>(null);
  const validateEmailCodeModal = useDisclosure();
  const registerForm = useForm<{ email: string; name: string }>({
    onValidSubmit: async ({ email, name }) => {
      try {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'sign-in',
        });
        if (error) {
          showError(
            error.code
              ? t(
                  `auth:errorCode.${error.code as unknown as keyof typeof authClient.$ERROR_CODES}`
                )
              : t('register:feedbacks.createAccount.error.default')
          );
          return;
        }
        validateEmailCodeModal.onOpen();
      } catch (err) {
        showError(t('register:feedbacks.createAccount.error.default'));
        console.error('sendVerificationOtp error:', err);
      }
    },
  });

  const { email } = useFormFields({
    connect: registerForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const emailValidationCodeForm = useForm({
    onValidSubmit: async (values: { code: string }) => {
      try {
        const { error } = await authClient.signIn.emailOtp({
          email,
          otp: values.code,
        });
        if (error) {
          emailValidationCodeForm.setValues({ code: '' });
          emailValidationCodeForm.setErrors({
            code: t('register:feedbacks.accountValidate.error'),
          });
          return;
        }
        validateEmailCodeModal.onClose();
        showSuccess(t('register:feedbacks.accountValidate.success'));
      } catch (err) {
        emailValidationCodeForm.setValues({ code: '' });
        emailValidationCodeForm.setErrors({
          code: t('register:feedbacks.accountValidate.error'),
        });
        console.error('verify emailOtp error:', err);
      }
    },
  });

  return (
    <Container>
      <Formiz connect={registerForm}>
        <Content>
          <Stack spacing="md">
            <FieldInput
              name="email"
              label={t('register:inputs.email.label')}
              required={t('register:inputs.email.required')}
              validations={[
                {
                  handler: isEmail(),
                  message: t('register:inputs.email.validations.email'),
                },
              ]}
              componentProps={{
                textContentType: 'emailAddress',
                autoCapitalize: 'none',
                autoComplete: 'email',
                keyboardType: 'email-address',
                onSubmitEditing: focus(nameRef),
                returnKeyType: 'next',
              }}
            />

            <FieldInput
              ref={nameRef}
              name="name"
              label={t('register:inputs.name.label')}
              required={t('register:inputs.name.required')}
              componentProps={{
                autoCapitalize: 'none',
                returnKeyType: 'next',
              }}
            />

            <CardWarningRegister />
          </Stack>
        </Content>

        <Footer>
          <Button
            onPress={() => registerForm.submit()}
            isLoading={registerForm.isValidating}
            isDisabled={registerForm.isSubmitted && !registerForm.isValid}
            colorScheme="neutral"
            full
          >
            {t('register:actions.register')}
          </Button>
        </Footer>
      </Formiz>

      <ConfirmationCodeModal
        isOpen={validateEmailCodeModal.isOpen}
        onClose={validateEmailCodeModal.onClose}
        form={emailValidationCodeForm}
        email={email}
        isLoadingConfirm={emailValidationCodeForm.isValidating}
      />
    </Container>
  );
};

export default RegisterPage;
