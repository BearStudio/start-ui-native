import { Formiz, useForm, useFormContext } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useRouter } from 'expo-router';
import { Box, Button, Text, TouchableOpacity } from 'react-native-ficus-ui';

import { CardStatus } from '@/components/CardStatus';
import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import { useAuthLogin } from '@/modules/auth/auth.service';
import { useToast } from '@/modules/toast/useToast';
import { useDarkMode } from '@/theme/useDarkMode';

const CardInfoAuthStep = () => {
  const loginForm = useFormContext();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
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

  const { showError } = useToast();

  const router = useRouter();

  const { authLogin, isLoadingAuth } = useAuthLogin({
    onSuccess: (data) => {
      router.push({
        pathname: '/confirm-login',
        params: { token: data.token },
      });
    },
    onError: (err) => {
      showError('Failed to log in. Please try again');
      console.error('Authentication error:', err);
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
    </Container>
  );
};

export default Login;
