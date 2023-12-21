import useAuthStore from '@/modules/auth/auth.store';
import {
  Button,
  Box,
  Modal,
  Text,
  Stack,
  useDisclosure,
  VStack,
  Flex,
  Divider,
} from 'react-native-ficus-ui';

import { useAccount } from '@/modules/account/account.service';
import { LoadingScreen } from '@/layout/LoadingScreen';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useDarkMode } from '@/theme/useDarkMode';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import { ButtonIcon } from '@/components/ButtonIcon';
import { SectionTitle } from '@/components/SectionTitle';
import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import { isEmail } from '@formiz/validations';

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const { colorModeValue } = useDarkMode();

  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();

  const logoutModal = useDisclosure();
  const deleteAccountModal = useDisclosure();

  const submitProfile = (values: { name: string }) => {
    return null;
  };
  const submitEmail = (values: { email: string }) => {
    return null;
  };

  const profileForm = useForm({ onValidSubmit: submitProfile });
  const emailForm = useForm({ onValidSubmit: submitEmail });

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
          <VStack mt="lg" spacing="2xl">
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
                    onPress={() => profileForm.submit()}
                    mt="lg"
                    colorScheme="brand"
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
                    onPress={() => emailForm.submit()}
                    mt="lg"
                    colorScheme="brand"
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
              <ThemeSwitcher />
            </Box>
            <Box>
              <ButtonIcon icon="logout" onPress={logoutModal.onOpen} full>
                Logout
              </ButtonIcon>
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
