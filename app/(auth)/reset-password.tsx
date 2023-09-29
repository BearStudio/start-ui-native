import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { Button, Box } from 'react-native-ficus-ui';
import { isEmail } from '@formiz/validations';
import { useResetPasswordInit } from '@/modules/account/account.service';
import { useRouter } from 'expo-router';
import { useToast } from '@/modules/toast/useToast';

type FormValues = TODO;

const ResetPassword = () => {
  const router = useRouter();
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

  const resetPasswordForm = useForm({ onValidSubmit: submitForm });

  return (
    <Box h="100%">
      <Formiz connect={resetPasswordForm}>
        <Box
          flex={1}
          flexDirection="column"
          p={20}
          justifyContent="space-between"
        >
          <FieldInput
            name="email"
            label="Mail address"
            helper="Please enter the mail address that you use for your registration"
            required="Mail address is required"
            validations={[
              {
                handler: isEmail(),
                message: 'Mail address is invalid',
              },
            ]}
            componentProps={{
              textContentType: 'emailAddress',
              autoCapitalize: 'none',
              autoComplete: 'email',
              keyboardType: 'email-address',
            }}
          />

          <Button
            onPress={() => resetPasswordForm.submit()}
            isLoading={isLoadingResetPasswordInit}
            isDisabled={
              resetPasswordForm.isSubmitted && !resetPasswordForm.isValid
            }
            full
          >
            Send mail
          </Button>
        </Box>
      </Formiz>
    </Box>
  );
};

export default ResetPassword;
