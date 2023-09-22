import { useRouter } from 'expo-router';
import { useAuthContext } from '@/modules/auth/AuthContext';
import { Button, Box, Icon, Modal, Text } from 'react-native-ficus-ui';
import { Formiz, useForm } from '@formiz/core';
import { FieldInput } from '@/components/FieldInput';
import {
  useAccount,
  useDeleteAccount,
} from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';
import { useState } from 'react';
import { LoadingScreen } from '@/layout/LoadingScreen';
import ThemeSwitcher from '@/theme/ThemeSwitcher';

const Profile = () => {
  const router = useRouter();
  const { logout } = useAuthContext();

  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

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

  const handleLogoutModal = () => setModalVisible((current) => !current);

  const handleDeleteAccountModal = () =>
    setDeleteAccountModalVisible((current) => !current);

  const handleOpenChangePassword = () =>
    router.push('/profile/profile-password');

  return (
    <>
      <Box flex={1} p={20}>
        <Box>
          <Button onPress={handleOpenChangePassword} full>
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
            <Button onPress={handleLogoutModal} full>
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
            <Button onPress={handleDeleteAccountModal} full>
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
        isVisible={modalVisible}
        h={200}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Box w="100%" position="absolute">
          <Text fontWeight="bold" textAlign="center" fontSize="3xl">
            Logout
          </Text>
          <Text textAlign="center" fontSize="lg" my={10}>
            Do you really want to logout from the application?
          </Text>

          <Box mt="xl" m="lg">
            <Button onPress={logout} full>
              <Icon name="logout" fontSize="lg" fontFamily="AntDesign" />
              <Text ml={10} fontSize="lg">
                Logout
              </Text>
            </Button>
            <Button onPress={handleLogoutModal} mt={10} mb={20} full>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        animationIn="slideInUp"
        isVisible={deleteAccountModalVisible}
        h={200}
        onBackdropPress={handleDeleteAccountModal}
      >
        <Box
          borderRadius={15}
          shadow="md"
          w="100%"
          position="absolute"
          bottom={0}
          p={10}
          pt={20}
        >
          <Text fontWeight="bold" textAlign="center" fontSize="3xl">
            Account deletion
          </Text>

          <Text textAlign="center" fontSize="lg" my={10}>
            Do you really want to delete your account?
          </Text>

          <Box mt="xl" m="lg">
            <Text fontSize="lg" mt={10} mb={20}>
              This action is irreversible and immediate. All your data will be
              will be deleted immediately. You will have to recreate an account.
            </Text>
            <Formiz connect={confirmationForm}>
              <FieldInput
                name="confirmation"
                label={'Enter "DELETION"'}
                required="Confirmation required"
                validations={[
                  {
                    rule: (value) => value === 'DELETION',
                    message: 'Please enter "DELETION" to validate',
                  },
                ]}
              />

              <Button
                onPress={deleteAccount}
                isLoading={isDeletingAccount}
                full
                mt={10}
                disabled={!confirmationForm.isValid}
              >
                <Text ml={10} fontSize="lg">
                  Confirm the deletion of account
                </Text>
              </Button>
            </Formiz>

            <Button onPress={handleDeleteAccountModal} mt={10} mb={20} full>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
