import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  TouchableOpacity,
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
import { useAuthLogin, useLoginValide } from '@/modules/auth/auth.service';
import { useDarkMode } from '@/theme/useDarkMode';
import { useNavigation } from 'expo-router';
import { ButtonGoBack } from '@/components/ButtonGoBack';
import { BackHandler } from 'react-native';
import { CardStatus } from '@/components/CardStatus';

const CardInfoAuthStep = () => {
  const myForm = useFormContext();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text fontSize="lg" color={colorModeValue('gray.800', 'gray.50')}>
          Enjoy the features! You can sign in with
        </Text>
        <TouchableOpacity
          onPress={() => myForm.setValues({ email: 'admin@admin.com' })}
        >
          <Text
            fontSize="lg"
            fontWeight="700"
            color={colorModeValue('gray.800', 'gray.50')}
            textDecorationLine="underline"
          >
            {' '}
            admin@admin.com
          </Text>
        </TouchableOpacity>
      </Box>
    </CardStatus>
  );
};

const CardInfoValidateStep = () => {
  const myForm = useFormContext();
  const { colorModeValue } = useDarkMode();

  return (
    <CardStatus type="info" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text fontSize="lg" color={colorModeValue('gray.800', 'gray.50')}>
          To quickly connect, use the code
        </Text>
        <TouchableOpacity onPress={() => myForm.setValues({ code: '000000' })}>
          <Text
            fontSize="lg"
            fontWeight="700"
            color={colorModeValue('gray.800', 'gray.50')}
            textDecorationLine="underline"
          >
            {' '}
            000000
          </Text>
        </TouchableOpacity>
      </Box>
    </CardStatus>
  );
};

const Login = () => {
  const [firstToken, setFirstToken] = useState('');

  const myForm = useForm<{
    email: string;
    code: string;
  }>({
    onValidSubmit: (values) => {
      loginValidate({ token: firstToken, code: values.code });
    },
  });

  const { email } = useFormFields({
    connect: myForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const navigation = useNavigation();
  const goBack = useCallback(() => {
    if (myForm.isLastStep) {
      myForm.goToPreviousStep();
      return true;
    }
    navigation.goBack();
    return false;
  }, [myForm, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ButtonGoBack onPress={goBack} />,
      headerTitle: myForm?.isLastStep ? 'Validate Email' : 'Login',
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [navigation, myForm]);

  const { login: loginValidate, isLoading: isLoadingValidate } = useLoginValide(
    {
      onSuccess: () => myForm.goToNextStep(),
      onError: (err) => console.error('Login validation error:', err),
    }
  );

  const { login: authLogin, isLoading: isLoadingAuth } = useAuthLogin({
    onSuccess: (data) => {
      setFirstToken(data.token);
      myForm.submitStep();
    },
    onError: (err) => console.error('Authentication error:', err),
  });

  return (
    <Formiz connect={myForm}>
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
            <Text fontSize="2xl" fontWeight="bold">
              Check your inbox for the code
            </Text>
            <Text mt="md">
              We've sent a 6-character code to{' '}
              <Text fontWeight="bold">{email}</Text> The code expires shortly (5
              minutes).
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
          onPress={() =>
            myForm.isLastStep
              ? myForm.submitStep()
              : authLogin({ email, language: 'en' })
          }
          isLoading={myForm.isLastStep ? isLoadingAuth : isLoadingValidate}
          isDisabled={isLoadingAuth || isLoadingValidate}
          colorScheme="brand"
          full
        >
          {myForm.isLastStep ? 'Sign in' : 'Validate Email'}
        </Button>
      </Stack>
    </Formiz>
  );
};

export default Login;
