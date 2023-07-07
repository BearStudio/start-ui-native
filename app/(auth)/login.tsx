import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Button, Div } from 'react-native-magnus';
import { focus } from '@/utils/formUtils';
import { isEmail } from '@formiz/validations';
import { useLogin } from '@/modules/auth/auth.service';

const Login = () => {
  const router = useRouter();

  const passwordRef = useRef<TextInput>(null);

  const { login, isLoading } = useLogin();

  const submitForm = (values: TODO) => {
    login({ username: values.email, password: values.password });
  };

  const loginForm = useForm({ onValidSubmit: submitForm });

  const handleOpenResetPassword = () => {
    router.push('/reset-password');
  };

  return (
    <Div bg="body" h="100%">
      <Formiz connect={loginForm}>
        <Div flex={1} flexDir="column" p={20} justifyContent="space-between">
          <Div>
            <FieldInput
              name="email"
              label="Mail address"
              autoCapitalize="none"
              keyboardType="email-address"
              required="Mail is required"
              validations={[{ handler: isEmail(), message: 'Mail is invalid' }]}
              onSubmitEditing={focus(passwordRef)}
              returnKeyType="next"
            />

            <Div>
              <FieldInput
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={passwordRef}
                name="password"
                label="Password"
                secureTextEntry
                required="Password is required"
                onSubmitEditing={() => loginForm.submit()}
              />

              <Button
                bg="transparent"
                color="pText"
                alignSelf="center"
                onPress={handleOpenResetPassword}
                px={0}
                mt={10}
              >
                Forgot password?
              </Button>
            </Div>
          </Div>
          <Button
            bg="primary500"
            block
            loading={isLoading}
            onPress={() => loginForm.submit()}
          >
            Sign in
          </Button>
        </Div>
      </Formiz>
    </Div>
  );
};

export default Login;
