import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { focus } from '@/utils/formUtils';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { Button, Div } from 'react-native-magnus';
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
    <Div bg="body" h="100%">
      <Formiz onValidSubmit={submitForm} connect={registerForm}>
        <Div flex={1} flexDir="column" p={20} justifyContent="space-between">
          <Div>
            <FieldInput
              name="email"
              label="Mail address"
              textContentType="emailAddress"
              autoCapitalize="none"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              autoCompleteType="email"
              keyboardType="email-address"
              required="Mail is required"
              validations={[
                {
                  rule: isEmail(),
                  message: 'Mail is invalid',
                },
              ]}
              onSubmitEditing={focus(passwordRef)}
              returnKeyType="next"
            />

            <FieldInput
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={passwordRef}
              name="password"
              label="Password"
              secureTextEntry
              required="Password is required"
              validations={[
                {
                  rule: isMinLength(6),
                  message: 'Password must contains at least 6 characters',
                },
              ]}
              onSubmitEditing={focus(confirmPasswordRef)}
              returnKeyType="next"
            />

            <FieldInput
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={confirmPasswordRef}
              name="confirmPassword"
              label="Confirm password"
              secureTextEntry
              required="Password confirmation is required"
              validations={[
                {
                  rule: (value) => value === registerForm.values.password,
                  deps: [registerForm.values.password],
                  message: 'Confirmation does not match the password',
                },
              ]}
              onSubmitEditing={() => registerForm.submit()}
              returnKeyType="done"
            />
          </Div>

          <Button
            bg="primary500"
            block
            loading={isLoading}
            onPress={() => registerForm.submit()}
          >
            Sign up
          </Button>
        </Div>
      </Formiz>
    </Div>
  );
};

export default Register;
