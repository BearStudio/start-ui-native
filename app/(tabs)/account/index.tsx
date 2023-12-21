import { Formiz, useForm, useFormFields } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { FieldInput } from '@/components/FieldInput';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { LoadingScreen } from '@/layout/LoadingScreen';
import {
  useAccount,
  useAccountUpdate,
} from '@/modules/account/account.service';
import useAuthStore from '@/modules/auth/auth.store';
import { useToast } from '@/modules/toast/useToast';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useDarkMode } from '@/theme/useDarkMode';

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const { colorModeValue } = useDarkMode();

  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();

  const { showError, showSuccess } = useToast();

  const logoutModal = useDisclosure();
  const deleteAccountModal = useDisclosure();

  const { updateAccount, isLoading: isUpdatingAccount } = useAccountUpdate({
    onSuccess: () => {
      showSuccess('Account updated');
    },
    onError: (err) => {
      showError(
        err.response?.data?.message?.startsWith('[DEMO]')
          ? 'This is a read-only demo, this action is disabled.'
          : 'An error occured during account update, please try again'
      );
    },
  });

  const submitProfile = (values: { name: string }) => {
    updateAccount({ ...values });
  };

  const submitEmail = (values: { email: string }) => {
    return null;
  };

  const profileForm = useForm({ onValidSubmit: submitProfile });
  const emailForm = useForm({ onValidSubmit: submitEmail });

  const { name } = useFormFields({
    connect: profileForm,
    selector: (field) => field.value,
    fields: ['name'] as const,
  });

  const { email } = useFormFields({
    connect: emailForm,
    selector: (field) => field.value,
    fields: ['email'] as const,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !account) {
    return (
      <Box flex={1} p={20}>
        <Button onPress={() => refetchAccount()}>Retry</Button>
      </Box>
    );
  }

  return (
    <>
      <Container>
        <Content>
          <VStack spacing="xl">
            <Box>
              <SectionTitle>Profile informations</SectionTitle>
              <Box mt="lg">
                <Formiz connect={profileForm}>
                  <FieldInput
                    name="name"
                    label="Name"
                    required="Name is required"
                    defaultValue={account.name}
                    componentProps={{
                      autoCapitalize: 'none',
                      returnKeyType: 'next',
                    }}
                  />
                  <Button
                    mt="md"
                    onPress={() => profileForm.submit()}
                    colorScheme="brand"
                    isDisabled={name === account.name}
                    isLoading={isUpdatingAccount}
                    full
                  >
                    Update
                  </Button>
                </Formiz>
              </Box>
              <Divider mt="xl" borderColor="gray.300" />
            </Box>
            <Box>
              <SectionTitle>Update your email</SectionTitle>
              <Box mt="lg">
                <Formiz connect={emailForm}>
                  <FieldInput
                    name="email"
                    label="Mail address"
                    required="Mail is required"
                    defaultValue={account.email}
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
                      returnKeyType: 'done',
                    }}
                  />
                  <Button
                    mt="md"
                    onPress={() => emailForm.submit()}
                    colorScheme="brand"
                    isDisabled={email === account.email}
                    full
                  >
                    Update
                  </Button>
                </Formiz>
              </Box>
              <Divider mt="xl" borderColor="gray.300" />
            </Box>
            <Box>
              <SectionTitle>Preferences</SectionTitle>
              <VStack spacing="lg">
                <ThemeSwitcher />
                <ButtonIcon icon="logout" onPress={logoutModal.onOpen} full>
                  Logout
                </ButtonIcon>
              </VStack>
            </Box>
          </VStack>
        </Content>
      </Container>

      <Modal
        animationIn="slideInUp"
        isVisible={logoutModal.isOpen}
        h={250}
        onBackdropPress={logoutModal.onClose}
      >
        <Flex p="xl" justifyContent="space-between">
          <Box>
            <Text
              fontWeight="bold"
              fontSize="3xl"
              color={colorModeValue('gray.900', 'gray.50')}
            >
              Logout
            </Text>
            <Text
              mt="sm"
              fontSize="lg"
              color={colorModeValue('gray.900', 'gray.50')}
            >
              Do you really want to logout from the application?
            </Text>
          </Box>

          <Stack spacing="md">
            <ButtonIcon icon="logout" colorScheme="error" onPress={logout} full>
              Logout
            </ButtonIcon>
            <Button colorScheme="gray" onPress={logoutModal.onClose} full>
              Cancel
            </Button>
          </Stack>
        </Flex>
      </Modal>

      <Modal
        animationIn="slideInUp"
        isVisible={deleteAccountModal.isOpen}
        h={380}
        onBackdropPress={deleteAccountModal.onClose}
      >
        <Stack p="xl" spacing="lg">
          <Stack>
            <Text
              fontWeight="bold"
              fontSize="3xl"
              color={colorModeValue('gray.900', 'gray.50')}
            >
              Account deletion
            </Text>
            <Text fontSize="lg" color={colorModeValue('gray.900', 'gray.50')}>
              Do you really want to delete your account?
            </Text>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default Profile;
