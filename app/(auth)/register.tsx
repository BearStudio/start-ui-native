import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { focus } from '@/utils/formUtils';
import { FC, useRef, useState } from 'react';
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
import { isEmail } from '@formiz/validations';
import { useRouter } from 'expo-router';
import { useToast } from '@/modules/toast/useToast';
import { useDarkMode } from '@/theme/useDarkMode';
import { CardStatus } from '@/components/CardStatus';
import { useAuthRegister } from '@/modules/account/account.service';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';

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

const CardDemoModeHint: FC<{
  isOpen: boolean;
  onClose: (value: boolean) => void;
}> = ({ isOpen, onClose }) => {
  const { colorModeValue } = useDarkMode();
  return (
    <Modal
      isOpen={isOpen}
      h={200}
      style={{
        bottom: '20%',
      }}
      m="xl"
      borderRadius="xl"
      bg={colorModeValue('gray.50', 'gray.900')}
    >
      <Box>
        <Button
          position="absolute"
          top={4}
          right={4}
          bg="transparent"
          px="xs"
          py="xs"
          zIndex={1}
          onPress={() => onClose(false)}
          underlayColor="transparent"
        >
          <Icon name="closecircle" fontFamily="AntDesign" fontSize="3xl" />
        </Button>
        <Stack p="xl" spacing="lg" position="relative" pt="2xl">
          <Text
            fontWeight="bold"
            fontSize="xl"
            color={colorModeValue('gray.900', 'gray.50')}
          >
            This is a read-only demo, this action is disabled.
          </Text>
          <CardStatus
            type="info"
            title="Need help?"
            bg={colorModeValue('gray.200', 'gray.700')}
          >
            <Text color={colorModeValue('gray.900', 'gray.50')}>
              If you need help, please contact us at{' '}
              <Text
                fontWeight="bold"
                color={colorModeValue('gray.900', 'gray.50')}
              >
                start-ui@bearstudio.fr
              </Text>
            </Text>
          </CardStatus>
        </Stack>
      </Box>
    </Modal>
  );
};

const Register = () => {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const nameRef = useRef<TextInput>(null);

  const { createAccount, isLoading } = useAuthRegister({
    onSuccess: () => {
      router.replace('/login');
      showSuccess('You account has been created with success, you can login');
    },
    onError: (err) => {
      if (err.response?.data?.message?.startsWith('[DEMO]')) {
        setIsModalVisible(true);
      }
      showError('An error occured during your registration, please try again');
    },
  });

  const submitForm = (values: { email: string; name: string }) => {
    createAccount({
      ...values,
    });
  };

  const registerForm = useForm({ onValidSubmit: submitForm });

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

      <CardDemoModeHint
        isOpen={isModalVisible}
        onClose={(value) => setIsModalVisible(value)}
      />
    </Container>
  );
};

export default Register;
