import { useRef } from 'react';

import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isMinLength } from '@formiz/validations';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';
import { Box, Button } from 'react-native-ficus-ui';

import { FieldInput } from '@/components/FieldInput';
import { useUpdatePassword } from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import { focus } from '@/utils/formUtils';

type FormValues = TODO;

const Update = () => {
  const router = useRouter();
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

  const changePasswordForm = useForm({ onValidSubmit: submitForm });
  const values = useFormFields({
    connect: changePasswordForm,
    selector: 'value',
    fields: ['newPassword'] as const,
  });

  return (
    <Box h="100%">
      <Formiz connect={changePasswordForm}>
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
                  handler: isMinLength(6),
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
                  handler: (value) => value === values.newPassword,
                  deps: [values.newPassword],
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
            onPress={() => changePasswordForm.submit()}
            isLoading={isLoading}
            isDisabled={
              changePasswordForm.isSubmitted && !changePasswordForm.isValid
            }
            colorScheme="brand"
            full
          >
            Update
          </Button>
        </Box>
      </Formiz>
    </Box>
  );
};

export default Update;
