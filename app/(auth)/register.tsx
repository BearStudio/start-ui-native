import { useRef, useState } from 'react';

import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native';
import { Box, Button, Stack, Text, useDisclosure } from 'react-native-ficus-ui';

import { CardStatus } from '@/components/CardStatus';
import { ConfirmationCodeModal } from '@/components/ConfirmationCodeModal';
import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import {
  useAuthRegister,
  useAuthRegisterValidate,
} from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import { useDarkMode } from '@/theme/useDarkMode';
import { focus } from '@/utils/formUtils';

const CardWarningRegister = () => {
  const router = useRouter();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="warning" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text
          fontSize="lg"
          color={colorModeValue('gray.800', 'gray.50')}
          my="sm"
        >
          This is a read-only demo, but you can Sign in to test some of the
          features. Just remember, no changes can be made. Enjoy the features!
        </Text>
        <Button
          onPress={() => router.push('/login')}
          full
          bg="transparent"
          borderColor={colorModeValue('gray.800', 'gray.200')}
          borderWidth={1}
          borderRadius="md"
          py={6}
          mt={6}
          mb={4}
        >
          Sign in
        </Button>
      </Box>
    </CardStatus>
  );
};

const Register = () => {
  const { showError, showSuccess } = useToast();
  const nameRef = useRef<TextInput>(null);
  const validateEmailCodeModal = useDisclosure();
  const [emailToken, setEmailToken] = useState<string | null>(null);

  const submitForm = (values: { email: string; name: string }) => {
    createAccount({
      ...values,
    });
  };

  const registerForm = useForm({ onValidSubmit: submitForm });

  const { email } = useFormFields({
    connect: registerForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  const submitValidationCodeEmail = (values: { code: string }) => {
    accountValidate({ ...values });
  };

  const emailValidationCodeForm = useForm({
    onValidSubmit: submitValidationCodeEmail,
  });

  const { createAccount, isLoading } = useAuthRegister({
    onSuccess: (data) => {
      setEmailToken(data.token);
      validateEmailCodeModal.onOpen();
    },
    onError: (err) => {
      showError(
        err.response?.data?.message?.startsWith('[DEMO]')
          ? 'This is a read-only demo, this action is disabled.'
          : 'An error occured during your registration, please try again'
      );
    },
  });

  const { accountValidate, isLoading: isLoadingValidate } =
    useAuthRegisterValidate(emailToken as string, {
      onSuccess: () => {
        validateEmailCodeModal.onClose();
        showSuccess('Successfully logged in');
      },
      onError: () => {
        emailValidationCodeForm.setValues({
          code: null,
        });
        emailValidationCodeForm.setErrors({
          code: 'Code is incorrect, please try again',
        });
      },
    });

  return (
    <Container>
      <Formiz connect={registerForm}>
        <Content>
          <Stack spacing="md">
            <FieldInput
              name="email"
              label="Mail address"
              required="Mail is required"
              validations={[
                {
                  handler: isEmail(),
                  message: 'Mail is invalid',
                },
              ]}
              componentProps={{
                textContentType: 'emailAddress',
                autoCapitalize: 'none',
                autoComplete: 'email',
                keyboardType: 'email-address',
                onSubmitEditing: focus(nameRef),
                returnKeyType: 'next',
              }}
            />

            <FieldInput
              ref={nameRef}
              name="name"
              label="Name"
              required="Name is required"
              componentProps={{
                autoCapitalize: 'none',
                returnKeyType: 'next',
              }}
            />

            <CardWarningRegister />
          </Stack>
        </Content>

        <Footer>
          <Button
            onPress={() => registerForm.submit()}
            isLoading={isLoading}
            isDisabled={registerForm.isSubmitted && !registerForm.isValid}
            colorScheme="brand"
            full
          >
            Sign up
          </Button>
        </Footer>
      </Formiz>

      <ConfirmationCodeModal
        isOpen={validateEmailCodeModal.isOpen}
        onClose={validateEmailCodeModal.onClose}
        form={emailValidationCodeForm}
        email={email}
        isLoadingConfirm={isLoadingValidate}
      />
    </Container>
  );
};

export default Register;
