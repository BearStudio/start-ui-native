import { useRouter } from 'expo-router';
import { useAuthContext } from '@/modules/auth/AuthContext';
import {
  Button,
  Box,
  Icon,
  Modal,
  Text,
  Stack,
  useDisclosure,
} from 'react-native-ficus-ui';
import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import {
  useAccount,
  useDeleteAccount,
} from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import { LoadingScreen } from '@/layout/LoadingScreen';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useDarkMode } from '@/theme/useDarkMode';

const Profile = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const { colorModeValue } = useDarkMode();

  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();

  const confirmationForm = useForm();
  const { showError, showSuccess } = useToast();

  const { mutate: deleteAccount, isLoading: isDeletingAccount } =
    useDeleteAccount({
      onSuccess: async () => {
        showSuccess('Account deleted with success');
        logout();
      },
      onError: () => {
        showError(
          'An error occured while deleting your acount, please try again'
        );
      },
    });

  const logoutModal = useDisclosure();
  const deleteAccountModal = useDisclosure();

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
      <Box flex={1} p={20}>
        <Box>
          <Button onPress={() => router.push('/profile/profile-password')} full>
            <Icon
              name="unlock"
              fontSize="lg"
              fontFamily="Feather"
              color="gray.50"
            />
            <Text ml={10} fontSize="lg" color="gray.50">
              Update password
            </Text>
          </Button>
        </Box>
        <ThemeSwitcher />
        <Box position="absolute" left={20} bottom={20}>
          <Box mt={10}>
            <Button onPress={logoutModal.onOpen} full>
              <Icon
                name="logout"
                fontSize="lg"
                fontFamily="AntDesign"
                color="gray.50"
              />
              <Text ml={10} fontSize="lg" color="gray.50">
                Logout
              </Text>
            </Button>
          </Box>
          <Box mt={10}>
            <Button onPress={deleteAccountModal.onOpen} colorScheme="red" full>
              <Icon
                name="deleteuser"
                fontSize="lg"
                fontFamily="AntDesign"
                color="gray.50"
              />
              <Text ml={10} fontSize="lg" color="gray.50">
                Delete account
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        animationIn="slideInUp"
        isVisible={logoutModal.isOpen}
        h={220}
        onBackdropPress={logoutModal.onClose}
      >
        <Stack p="xl" spacing="lg">
          <Stack>
            <Text
              fontWeight="bold"
              fontSize="3xl"
              color={colorModeValue('gray.900', 'gray.50')}
            >
              Logout
            </Text>
            <Text fontSize="lg" color={colorModeValue('gray.900', 'gray.50')}>
              Do you really want to logout from the application?
            </Text>
          </Stack>

          <Stack spacing="md">
            <Button onPress={logout} colorScheme="red" full>
              <Icon
                name="logout"
                fontSize="lg"
                fontFamily="AntDesign"
                color="gray.50"
              />
              <Text ml={10} fontSize="lg" color="gray.50">
                Logout
              </Text>
            </Button>
            <Button onPress={logoutModal.onClose} colorScheme="gray" full>
              Cancel
            </Button>
          </Stack>
        </Stack>
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

          <Formiz connect={confirmationForm} onValidSubmit={deleteAccount}>
            <Stack spacing="lg">
              <Text
                fontSize="lg"
                p="lg"
                borderRadius="lg"
                bg={colorModeValue('red.500', 'red.600')}
                color={colorModeValue('white', 'gray.50')}
              >
                This action is irreversible and immediate. All your data will be
                will be deleted immediately. You will have to recreate an
                account.
              </Text>
              <FieldInput
                name="confirmation"
                label='Enter "DELETION"'
                required="Confirmation required"
                validations={[
                  {
                    rule: (value) => value === 'DELETION',
                    message: 'Please enter "DELETION" to validate',
                  },
                ]}
              />

              <Stack spacing="md">
                <Button
                  onPress={() => confirmationForm.submit()}
                  isLoading={isDeletingAccount}
                  isDisabled={
                    confirmationForm.isSubmitted && !confirmationForm.isValid
                  }
                  colorScheme="red"
                  full
                >
                  Confirm the deletion of account
                </Button>
                <Button
                  onPress={deleteAccountModal.onClose}
                  colorScheme="gray"
                  full
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Formiz>
        </Stack>
      </Modal>
    </>
  );
};

export default Profile;
