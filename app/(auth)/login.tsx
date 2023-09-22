import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Button, Box } from 'react-native-ficus-ui';
import { focus } from '@/utils/formUtils';
import { isEmail } from '@formiz/validations';
import { useLogin } from '@/modules/auth/auth.service';

const Login = () => {
  const router = useRouter();
  const loginForm = useForm();

  const passwordRef = useRef<TextInput>(null);

  const { login, isLoading } = useLogin();

  const submitForm = (values: TODO) => {
    login({ username: values.email, password: values.password });
  };

  const handleOpenResetPassword = () => {
    router.push('/reset-password');
  };

  return (
    <Box h="100%">
      <Formiz onValidSubmit={submitForm} connect={loginForm}>
        <Box
          flex={1}
          flexDirection="column"
          p={20}
          justifyContent="space-between"
        >
          <Box>
            <FieldInput
              name="email"
              label="Mail address"
              required="Mail is required"
              validations={[{ rule: isEmail(), message: 'Mail is invalid' }]}
              componentProps={{
                autoCapitalize: 'none',
                keyboardType: 'email-address',
                onSubmitEditing: focus(passwordRef),
                returnKeyType: 'next',
              }}
            />

            <Box>
              <FieldInput
                ref={passwordRef}
                name="password"
                label="Password"
                required="Password is required"
                componentProps={{
                  secureTextEntry: true,
                  onSubmitEditing: () => loginForm.submit(),
                }}
              />

              <Button
                bg="transparent"
                alignSelf="center"
                onPress={handleOpenResetPassword}
                px={0}
                mt={10}
              >
                Forgot password?
              </Button>
            </Box>
          </Box>
          <Button
            bg="brand.500"
            full
            isLoading={isLoading}
            onPress={() => loginForm.submit()}
          >
            Sign in
          </Button>
        </Box>
      </Formiz>
    </Box>
  );
};

export default Login;
