import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { focus } from '@/utils/formUtils';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { Button, Box } from 'react-native-ficus-ui';
import { isEmail, isMinLength } from '@formiz/validations';
import { useCreateAccount } from '@/modules/account/account.service';
import { useRouter } from 'expo-router';
import { useToast } from '@/modules/toast/useToast';

const Register = () => {
  const router = useRouter();
  const registerForm = useForm();
  const { showError, showSuccess } = useToast();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate: createAccount, isLoading } = useCreateAccount({
    onSuccess: () => {
      router.replace('/login');
      showSuccess('You account has been created with success, you can login');
    },
    onError: (error) => {
      if (error?.response?.data?.errorKey === 'emailexists') {
        showError('This mail address is already used by another user');
      } else {
        showError(
          'An error occured during your registration, please try again'
        );
      }
    },
  });

  const submitForm = (values: TODO) => {
    createAccount({
      ...values,
      login: values.email,
    });
  };

  return (
    <Box h="100%">
      <Formiz onValidSubmit={submitForm} connect={registerForm}>
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
              validations={[
                {
                  rule: isEmail(),
                  message: 'Mail is invalid',
                },
              ]}
              componentProps={{
                textContentType: 'emailAddress',
                autoCapitalize: 'none',
                autoComplete: 'email',
                keyboardType: 'email-address',
                onSubmitEditing: focus(passwordRef),
                returnKeyType: 'next',
              }}
            />

            <FieldInput
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={passwordRef}
              name="password"
              label="Password"
              required="Password is required"
              validations={[
                {
                  rule: isMinLength(6),
                  message: 'Password must contains at least 6 characters',
                },
              ]}
              componentProps={{
                secureTextEntry: true,
                onSubmitEditing: focus(confirmPasswordRef),
                returnKeyType: 'next',
              }}
            />

            <FieldInput
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={confirmPasswordRef}
              name="confirmPassword"
              label="Confirm password"
              required="Password confirmation is required"
              validations={[
                {
                  rule: (value) => value === registerForm.values.password,
                  deps: [registerForm.values.password],
                  message: 'Confirmation does not match the password',
                },
              ]}
              componentProps={{
                secureTextEntry: true,
                onSubmitEditing: () => registerForm.submit(),
                returnKeyType: 'done',
              }}
            />
          </Box>

          <Button
            bg="brand.500"
            full
            isLoading={isLoading}
            onPress={() => registerForm.submit()}
          >
            Sign up
          </Button>
        </Box>
      </Formiz>
    </Box>
  );
};

export default Register;
