import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { Button, Box } from 'react-native-ficus-ui';
import { isMinLength } from '@formiz/validations';
import { useRef } from 'react';
import { useUpdatePassword } from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import { useRouter } from 'expo-router';
import { focus } from '@/utils/formUtils';
import { TextInput } from 'react-native';

type FormValues = TODO;

const Update = () => {
  const router = useRouter();
  const changePasswordForm = useForm();
  const { showError, showSuccess } = useToast();

  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate: updatePassword, isLoading } = useUpdatePassword({
    onError: () => {
      showError('An error occured, please try again');
    },
    onSuccess: () => {
      router.replace('/profile');
      showSuccess('Password updated with success');
    },
  });

  const submitForm = (values: FormValues) => {
    updatePassword(values);
  };

  return (
    <Box h="100%">
      <Formiz onValidSubmit={submitForm} connect={changePasswordForm}>
        <Box
          flex={1}
          flexDirection="column"
          p={20}
          justifyContent="space-between"
        >
          <Box>
            <FieldInput
              name="currentPassword"
              label="Current password"
              required="The current password is required"
              componentProps={{
                secureTextEntry: true,
                onSubmitEditing: focus(newPasswordRef),
                returnKeyType: 'next',
              }}
            />

            <FieldInput
              ref={newPasswordRef}
              name="newPassword"
              label="New password"
              required="New password is required"
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
              ref={confirmPasswordRef}
              name="confirmPassword"
              label="Confirm password"
              required="Password confirmation is required"
              validations={[
                {
                  rule: (value) => value === changePasswordForm.values.password,
                  deps: [changePasswordForm.values.password],
                  message: 'Confirmation does not match the password',
                },
              ]}
              componentProps={{
                secureTextEntry: true,
                onSubmitEditing: () => changePasswordForm.submit(),
                returnKeyType: 'done',
              }}
            />
          </Box>
          <Button
            full
            isLoading={isLoading}
            onPress={() => changePasswordForm.submit()}
          >
            Update
          </Button>
        </Box>
      </Formiz>
    </Box>
  );
};

export default Update;
