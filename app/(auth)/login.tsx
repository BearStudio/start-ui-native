import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  TouchableOpacity,
  useToast,
} from 'react-native-ficus-ui';
import {
  Formiz,
  useForm,
  FormizStep,
  useFormFields,
  useFormContext,
} from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { FieldInput } from '@/components/FieldInput';
import {
  useAuthLogin,
  useAuthLoginValidate,
} from '@/modules/auth/auth.service';
import { useDarkMode } from '@/theme/useDarkMode';
import { useNavigation } from 'expo-router';
import { ButtonGoBack } from '@/components/ButtonGoBack';
import { BackHandler } from 'react-native';
import { CardStatus } from '@/components/CardStatus';

const CardInfoAuthStep = () => {
  const loginForm = useFormContext();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text fontSize="lg" color={colorModeValue('gray.800', 'gray.50')}>
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

const CardInfoValidateStep = () => {
  const loginForm = useFormContext();
  const { colorModeValue } = useDarkMode();

  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
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
  const [firstToken, setFirstToken] = useState('');

  const loginForm = useForm<{
    email: string;
    code: string;
  }>({
    onValidSubmit: (values) => {
      loginValidate({ code: values.code });
    },
  });

  const { email } = useFormFields({
    connect: loginForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const navigation = useNavigation();
  const goBack = useCallback(() => {
    if (loginForm.isLastStep) {
      loginForm.goToPreviousStep();
      return true;
    }
    navigation.goBack();
    return false;
  }, [loginForm, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ButtonGoBack onPress={goBack} />,
      headerTitle: loginForm?.isLastStep ? 'Validate Email' : 'Login',
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [navigation, loginForm]);
  const { show } = useToast();

  const { colorModeValue } = useDarkMode();

  const { login: loginValidate, isLoading: isLoadingValidate } =
    useAuthLoginValidate(firstToken, {
      onSuccess: () => loginForm.goToNextStep(),
      onError: (err) => console.error('Login validation error:', err),
    });

  const { authLogin, isLoadingAuth } = useAuthLogin({
    onSuccess: (data) => {
      setFirstToken(data.token);
      loginForm.submitStep();
    },
    onError: (err) => {
      show({
        text1: 'Failed to log in. Please try again.',
        type: 'error',
      });
      console.error('Authentication error:', err);
    },
  });

  const handleSubmitButton = () => {
    if (loginForm.isStepValid && loginForm.isFirstStep) {
      authLogin({ email, language: 'en' });
      return;
    }
    loginForm.submitStep();
  };

  return (
    <Formiz connect={loginForm}>
      <Stack
        h="100%"
        flexDirection="column"
        p={20}
        justifyContent="space-between"
      >
        <Box>
          <FormizStep name="step1" as={Box}>
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
          </FormizStep>
          <FormizStep name="step2" as={Box}>
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
          </FormizStep>
        </Box>
        <Button
          onPress={handleSubmitButton}
          isLoading={isLoadingAuth || isLoadingValidate}
          isDisabled={isLoadingAuth || isLoadingValidate}
          colorScheme="brand"
          full
        >
          {loginForm.isLastStep ? 'Sign in' : 'Validate Email'}
        </Button>
      </Stack>
    </Formiz>
  );
};

export default Login;
