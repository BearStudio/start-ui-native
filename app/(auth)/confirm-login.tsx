import { Box, Button, Text, TouchableOpacity } from 'react-native-ficus-ui';
import { Formiz, useForm, useFormContext, useFormFields } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { useAuthLoginValidate } from '@/modules/auth/auth.service';
import { useDarkMode } from '@/theme/useDarkMode';
import { CardStatus } from '@/components/CardStatus';
import { useLocalSearchParams } from 'expo-router';
import { useToast } from '@/modules/toast/useToast';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';

const CardInfoValidateStep = () => {
  const loginForm = useFormContext();
  const { colorModeValue } = useDarkMode();

  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap" mt="sm">
        <Text fontSize="lg" color={colorModeValue('gray.800', 'gray.50')}>
          To quickly connect, use the code{' '}
        </Text>
        <TouchableOpacity
          onPress={() => loginForm.setValues({ code: '000000' })}
        >
          <Text
            fontSize="lg"
            fontWeight="700"
            color={colorModeValue('gray.800', 'gray.50')}
            textDecorationLine="underline"
            style={{ textDecorationLine: 'underline' }}
          >
            000000
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
    onValidSubmit: (values) => {
      loginValidate({ code: values.code });
    },
  });

  const { token } = useLocalSearchParams();

  const { showError, showSuccess } = useToast();

  const { email } = useFormFields({
    connect: loginForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const { colorModeValue } = useDarkMode();

  const { login: loginValidate, isLoading: isLoadingValidate } =
    useAuthLoginValidate(token as string, {
      onSuccess: () => {
        showSuccess('Successfully logged in');
      },
      onError: (err) => {
        showError('Failed to validate code. Please try again');
        console.error('Login validation error:', err);
      },
    });

  return (
    <Container>
      <Formiz connect={loginForm}>
        <Content>
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={colorModeValue('gray.700', 'gray.50')}
            >
              Check your inbox for the code
            </Text>
            <Text mt="md" color={colorModeValue('gray.700', 'gray.50')}>
              We've sent a 6-character code to{' '}
              <Text
                fontWeight="bold"
                color={colorModeValue('gray.700', 'gray.50')}
              >
                {email}
              </Text>{' '}
              The code expires shortly (5 minutes).
            </Text>
            <FieldInput
              name="code"
              label="Verification code"
              mt="lg"
              required="Code is required"
              componentProps={{
                keyboardType: 'number-pad',
                returnKeyType: 'done',
              }}
              isRequired
            />
            <CardInfoValidateStep />
          </Box>
        </Content>

        <Footer>
          <Button
            onPress={() => loginForm.submit()}
            isLoading={isLoadingValidate}
            colorScheme="brand"
            full
          >
            Validate Email
          </Button>
        </Footer>
      </Formiz>
    </Container>
  );
};

export default Login;
