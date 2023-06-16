import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { Button, Div } from 'react-native-magnus';
import { isEmail } from '@formiz/validations';
import { useResetPasswordInit } from '@/modules/account/account.service';
import { useRouter } from 'expo-router';
import { useToast } from '@/modules/toast/useToast';

type FormValues = TODO;

const ResetPassword = () => {
  const router = useRouter();
  const resetPasswordForm = useForm();
  const { showSuccess, showError } = useToast();

  const { mutate: resetPasswordInit, isLoading: isLoadingResetPasswordInit } =
    useResetPasswordInit({
      onSuccess: () => {
        router.replace('/login');
        showSuccess('A mail to reset your password has been sent');
      },
      onError: () => {
        showError('An error occured, please try again');
      },
    });

  const submitForm = (values: FormValues) => {
    resetPasswordInit(values.email);
  };

  return (
    <Div bg="body" h="100%">
      <Formiz onValidSubmit={submitForm} connect={resetPasswordForm}>
        <Div flex={1} flexDir="column" p={20} justifyContent="space-between">
          <FieldInput
            name="email"
            label="Mail address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            // helper="Please enter the mail address that you use for your registration" TODO: fix TS
            required="Mail address is required"
            validations={[
              {
                rule: isEmail(),
                message: 'Mail address is invalid',
              },
            ]}
          />

          <Button
            bg="primary500"
            block
            loading={isLoadingResetPasswordInit}
            onPress={() => resetPasswordForm.submit()}
          >
            Send mail
          </Button>
        </Div>
      </Formiz>
    </Div>
  );
};

export default ResetPassword;
