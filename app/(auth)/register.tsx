import { Formiz, useForm, useFormContext, useFormFields } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { focus } from '@/utils/formUtils';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import {
  Box,
  Button,
  Icon,
  Modal,
  Stack,
  Text,
  TouchableOpacity,
} from 'react-native-ficus-ui';
import { isEmail, isMinLength } from '@formiz/validations';
import { useCreateAccount } from '@/modules/account/account.service';
import { useRouter } from 'expo-router';
import { useToast } from '@/modules/toast/useToast';
import { useDarkMode } from '@/theme/useDarkMode';
import { CardStatus } from '@/components/CardStatus';

const CardWarningRegister = () => {
  const router = useRouter();
  const { colorModeValue } = useDarkMode();
  return (
    <CardStatus type="warning" title="Demo mode" mt="md">
      <Box flexDirection="row" flexWrap="wrap">
        <Text fontSize="lg" color={colorModeValue('gray.800', 'gray.50')}>
          This is a read-only demo, but you can Sign in to test some of the
          features. Just remember, no changes can be made. Enjoy the features!
        </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text
            fontSize="lg"
            fontWeight="700"
            color={colorModeValue('gray.800', 'gray.50')}
            textDecorationLine="underline"
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </Box>
    </CardStatus>
  );
};

const Register = () => {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const nameRef = useRef<TextInput>(null);

  const { mutate: createAccount, isLoading } = useCreateAccount({
    onSuccess: () => {
      router.replace('/login');
      showSuccess('You account has been created with success, you can login');
    },
    onError: (error) => {
      showError('An error occured during your registration, please try again');
      setIsModalVisible(true);
    },
  });

  const submitForm = (values: { email: string; name: string }) => {
    createAccount({
      ...values,
    });
  };

  const registerForm = useForm({ onValidSubmit: submitForm });

  return (
    <Formiz connect={registerForm}>
      <Stack h="100%" p={20} justifyContent="space-between">
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
            required="name is required"
            componentProps={{
              autoCapitalize: 'none',
              returnKeyType: 'next',
            }}
          />

          <CardWarningRegister />
        </Stack>

        <Button
          onPress={() => registerForm.submit()}
          isLoading={isLoading}
          isDisabled={registerForm.isSubmitted && !registerForm.isValid}
          colorScheme="brand"
          full
        >
          Sign up
        </Button>
      </Stack>

      <Modal isOpen={isModalVisible} h={200} mb={200} m="xl" borderRadius="xl">
        <Box>
          <Button
            position="absolute"
            top={4}
            right={4}
            bg="transparent"
            px="xs"
            py="xs"
            onPress={() => setIsModalVisible(false)}
          >
            <Icon name="closecircle" fontFamily="AntDesign" fontSize="3xl" />
          </Button>
          <Stack p="xl" spacing="lg" position="relative" pt="2xl">
            <Text fontWeight="bold" fontSize="xl" color="gray.900">
              This is a read-only demo, this action is disabled.
            </Text>
            <CardStatus type="info" title="Need help?">
              <Text>
                If you need help, please contact us at{' '}
                <Text fontWeight="bold">start-ui@bearstudio.fr</Text>
              </Text>
            </CardStatus>
          </Stack>
        </Box>
      </Modal>
    </Formiz>
  );
};

export default Register;
