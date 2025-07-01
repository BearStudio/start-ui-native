import { useRef, useState } from 'react';

import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { Box, Button, Stack, Text, useDisclosure } from 'react-native-ficus-ui';

import { CardStatus } from '@/components/CardStatus';
import { ConfirmationCodeModal } from '@/components/ConfirmationCodeModal';
import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import {
  useAuthRegister,
  useAuthRegisterValidate,
} from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import { focus } from '@/utils/formUtils';

const CardWarningRegister = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <CardStatus type="warning" title={t('register:card.title')} mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text fontSize="lg" my="sm">
          {t('register:card.description')}
        </Text>
        <Button onPress={() => router.push('/login')} full colorScheme="brand">
          {t('register:card.actions.login')}
        </Button>
      </Box>
    </CardStatus>
  );
};

const Register = () => {
  const { showError, showSuccess } = useToast();
  const { t } = useTranslation();
  const nameRef = useRef<TextInput>(null);
  const validateEmailCodeModal = useDisclosure();
  const [emailToken, setEmailToken] = useState<string | null>(null);

  const submitForm = (values: { email: string; name: string }) => {
    createAccount({
      ...values,
    });
  };

  const registerForm = useForm({ onValidSubmit: submitForm });

  const { email } = useFormFields({
    connect: registerForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const submitValidationCodeEmail = (values: { code: string }) => {
    accountValidate({ ...values });
  };

  const emailValidationCodeForm = useForm({
    onValidSubmit: submitValidationCodeEmail,
  });

  const { createAccount, isLoading } = useAuthRegister({
    onSuccess: (data) => {
      setEmailToken(data.token);
      validateEmailCodeModal.onOpen();
    },
    onError: (err) => {
      showError(
        err.response?.data?.message?.startsWith('[DEMO]')
          ? t('register:feedbacks.createAccount.error.demo')
          : t('register:feedbacks.createAccount.error.default')
      );
    },
  });

  const { accountValidate, isLoading: isLoadingValidate } =
    useAuthRegisterValidate(emailToken as string, {
      onSuccess: () => {
        validateEmailCodeModal.onClose();
        showSuccess(t('register:feedbacks.accountValidate.success'));
      },
      onError: () => {
        emailValidationCodeForm.setValues({
          code: null,
        });
        emailValidationCodeForm.setErrors({
          code: t('register:feedbacks.accountValidate.error'),
        });
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
            isLoading={isLoading}
            isDisabled={registerForm.isSubmitted && !registerForm.isValid}
            colorScheme="brand"
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
        isLoadingConfirm={isLoadingValidate}
      />
    </Container>
  );
};

export default Register;
