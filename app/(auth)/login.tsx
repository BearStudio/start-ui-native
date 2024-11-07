import { useState } from 'react';

import { Formiz, useForm, useFormContext, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Text,
  TouchableOpacity,
  useDisclosure,
} from 'react-native-ficus-ui';

import { CardStatus } from '@/components/CardStatus';
import { ConfirmationCodeModal } from '@/components/ConfirmationCodeModal';
import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import {
  useAuthLogin,
  useAuthLoginValidate,
} from '@/modules/auth/auth.service';
import { useToast } from '@/modules/toast/useToast';
import { useDarkMode } from '@/theme/useDarkMode';

const CardInfoAuthStep = () => {
  const { t } = useTranslation();
  const loginForm = useFormContext();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="info" title={t('login:card.title')} mt="md">
      <Box flexDirection="row" alignItems="center" flexWrap="wrap">
        <Text
          fontSize="lg"
          color={colorModeValue('gray.800', 'gray.50')}
          my="sm"
        >
          {t('login:card.description')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => loginForm.setValues({ email: 'admin@admin.com' })}
        >
          <Text
            fontSize="lg"
            fontWeight="700"
            color={colorModeValue('gray.800', 'gray.50')}
            style={{ textDecorationLine: 'underline' }}
          >
            admin@admin.com
          </Text>
        </TouchableOpacity>
      </Box>
    </CardStatus>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const loginForm = useForm<{
    email: string;
    code: string;
  }>({
    onValidSubmit: ({ email }) => {
      authLogin({ email, language: 'en' });
    },
  });
  const [emailToken, setEmailToken] = useState<string | null>(null);

  const { showError, showSuccess } = useToast();
  const validateEmailCodeModal = useDisclosure();

  const submitValidationCodeEmail = (values: { code: string }) => {
    loginValidate({ ...values });
  };

  const emailValidationCodeForm = useForm({
    onValidSubmit: submitValidationCodeEmail,
  });

  const { email } = useFormFields({
    connect: loginForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const { authLogin, isLoadingAuth } = useAuthLogin({
    onSuccess: (data) => {
      setEmailToken(data.token);
      validateEmailCodeModal.onOpen();
    },
    onError: (err) => {
      showError(t('login:feedbacks.error'));
      console.error('Authentication error:', err);
    },
  });

  const { login: loginValidate, isLoading: isLoadingValidate } =
    useAuthLoginValidate(emailToken as string, {
      onSuccess: () => {
        validateEmailCodeModal.onClose();
        showSuccess(t('login:validation.success'));
      },
      onError: () => {
        emailValidationCodeForm.setValues({
          code: null,
        });
        emailValidationCodeForm.setErrors({
          code: t('login:validation.error'),
        });
      },
    });

  return (
    <Container>
      <Formiz connect={loginForm}>
        <Content>
          <FieldInput
            name="email"
            label={t('login:input.label')}
            required={t('login:input.required')}
            validations={[
              {
                handler: isEmail(),
                message: t('login:input.validations.email'),
              },
            ]}
            componentProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              returnKeyType: 'next',
            }}
          />
          <CardInfoAuthStep />
        </Content>

        <Footer>
          <Button
            onPress={() => loginForm.submit()}
            isLoading={isLoadingAuth}
            colorScheme="brand"
            full
          >
            {t('login:actions.login')}
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

export default Login;
