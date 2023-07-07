import { Formiz, useForm, useFormFields } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { Button, Div } from 'react-native-magnus';
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
    fields: ['password'] as const,
  });

  return (
    <Div bg="body" h="100%">
      <Formiz connect={changePasswordForm}>
        <Div flex={1} flexDir="column" p={20} justifyContent="space-between">
          <Div>
            <FieldInput
              name="currentPassword"
              label="Current password"
              secureTextEntry
              required="The current password is required"
              onSubmitEditing={focus(newPasswordRef)}
              returnKeyType="next"
            />

            <FieldInput
              ref={newPasswordRef}
              name="newPassword"
              label="New password"
              secureTextEntry
              required="New password is required"
              validations={[
                {
                  handler: isMinLength(6),
                  message: 'Password must contains at least 6 characters',
                },
              ]}
              onSubmitEditing={focus(confirmPasswordRef)}
              returnKeyType="next"
            />

            <FieldInput
              ref={confirmPasswordRef}
              name="confirmPassword"
              label="Confirm password"
              secureTextEntry
              required="Password confirmation is required"
              validations={[
                {
                  handler: (value) => value === values.password,
                  deps: [values.password],
                  message: 'Confirmation does not match the password',
                },
              ]}
              onSubmitEditing={() => changePasswordForm.submit()}
              returnKeyType="next"
            />
          </Div>
          <Button
            block
            bg="primary500"
            loading={isLoading}
            onPress={() => changePasswordForm.submit()}
          >
            Update
          </Button>
        </Div>
      </Formiz>
    </Div>
  );
};

export default Update;
