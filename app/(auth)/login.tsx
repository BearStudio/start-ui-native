import { Formiz, useForm, useFormContext, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Icon,
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
import { authClient } from '@/lib/auth-client';
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
  const { showError, showSuccess } = useToast();
  const validateEmailCodeModal = useDisclosure();
  const loginForm = useForm<{ email: string; code: string }>({
    onValidSubmit: async ({ email, code }) => {
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
              : t('login:feedbacks.error')
          );
          return;
        }
        validateEmailCodeModal.onOpen();
      } catch (err) {
        showError(t('login:feedbacks.error'));
        console.error('sendVerificationOtp error:', err);
      }
    },
  });

  const submitValidationCodeEmail = async (values: { code: string }) => {
    try {
      const { error } = await authClient.signIn.emailOtp({
        email,
        otp: values.code,
      });
      if (error) {
        emailValidationCodeForm.setValues({ code: '' });
        emailValidationCodeForm.setErrors({
          code: t('login:validation.error'),
        });
        return;
      }
      validateEmailCodeModal.onClose();
      showSuccess(t('login:validation.success'));
    } catch (err) {
      emailValidationCodeForm.setValues({ code: '' });
      emailValidationCodeForm.setErrors({
        code: t('login:validation.error'),
      });
      console.error('verify emailOtp error:', err);
    }
  };

  const emailValidationCodeForm = useForm({
    onValidSubmit: submitValidationCodeEmail,
  });

  const { email } = useFormFields({
    connect: loginForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const social = useMutation({
    mutationFn: async (
      provider: Parameters<typeof authClient.signIn.social>[0]['provider']
    ) => {
      const response = await authClient.signIn.social({
        provider: provider,
        callbackURL: 'start-ui-native://login',
        errorCallbackURL: 'start-ui-native://login',
      });

      console.log(response);

      if (response.error) {
        console.log(JSON.stringify(response.error, null, 2));

        throw new Error(response.error.message);
      }
      return response.data;
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
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

          <Button
            mt="xl"
            variant="ghost"
            full
            isLoading={social.isLoading}
            onPress={() => social.mutate('github')}
            prefix={<Icon name="github" fontFamily="AntDesign" mr="md" />}
          >
            {t('login:actions.loginWithGitHub', { provider: 'GitHub' })}
          </Button>
        </Content>

        <Footer>
          <Button
            onPress={() => loginForm.submit()}
            isLoading={false}
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
        isLoadingConfirm={emailValidationCodeForm.isValidating}
      />
    </Container>
  );
};

export default Login;
