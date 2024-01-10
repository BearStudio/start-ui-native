import { useState } from 'react';

import { Formiz, useForm, useFormContext, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
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
  const loginForm = useFormContext();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" alignItems="center" flexWrap="wrap">
        <Text
          fontSize="lg"
          color={colorModeValue('gray.800', 'gray.50')}
          my="sm"
        >
          Enjoy the features! You can sign in with{' '}
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
      showError('Failed to log in. Please try again');
      console.error('Authentication error:', err);
    },
  });

  const { login: loginValidate, isLoading: isLoadingValidate } =
    useAuthLoginValidate(emailToken as string, {
      onSuccess: () => {
        validateEmailCodeModal.onClose();
        showSuccess('Successfully logged in');
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

  return (
    <Container>
      <Formiz connect={loginForm}>
        <Content>
          <FieldInput
            name="email"
            label="Mail address"
            required="Mail is required"
            validations={[{ handler: isEmail(), message: 'Mail is invalid' }]}
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
            Sign in
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
