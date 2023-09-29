import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Button, Stack } from 'react-native-ficus-ui';
import { focus } from '@/utils/formUtils';
import { isEmail } from '@formiz/validations';
import { useLogin } from '@/modules/auth/auth.service';

const Login = () => {
  const router = useRouter();

  const passwordRef = useRef<TextInput>(null);

  const { login, isLoading } = useLogin();

  const submitForm = (values: { email: string; password: string }) => {
    login({ username: values.email, password: values.password });
  };

  const loginForm = useForm({ onValidSubmit: submitForm });

  return (
    <Formiz connect={loginForm}>
      <Stack
        h="100%"
        flexDirection="column"
        p={20}
        justifyContent="space-between"
      >
        <Stack spacing="md">
          <FieldInput
            name="email"
            label="Mail address"
            required="Mail is required"
            validations={[{ handler: isEmail(), message: 'Mail is invalid' }]}
            componentProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              onSubmitEditing: focus(passwordRef),
              returnKeyType: 'next',
            }}
          />

          <FieldInput
            ref={passwordRef}
            name="password"
            label="Password"
            required="Password is required"
            componentProps={{
              secureTextEntry: true,
              onSubmitEditing: () => loginForm.submit(),
              returnKeyType: 'done',
            }}
          />

          <Button
            onPress={() => router.push('/reset-password')}
            colorScheme="transparent"
            textDecorLine="underline"
            fontWeight="500"
            p={0}
          >
            Forgot password?
          </Button>
        </Stack>
        <Button
          onPress={() => loginForm.submit()}
          isLoading={isLoading}
          isDisabled={loginForm.isSubmitted && !loginForm.isValid}
          colorScheme="blue"
          full
        >
          Sign in
        </Button>
      </Stack>
    </Formiz>
  );
};

export default Login;
