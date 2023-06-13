import { useRouter } from 'expo-router';
import { useAuthContext } from '@/modules/auth/AuthContext';
import { Button, Div, Icon, Modal, Text, useTheme } from 'react-native-magnus';
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
  const { theme } = useTheme();

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
      <Div bg="body" flex={1} p={20}>
        <Button onPress={() => refetchAccount()}>Retry</Button>
      </Div>
    );
  }

  const handleLogoutModal = () => setModalVisible((current) => !current);

  const handleDeleteAccountModal = () =>
    setDeleteAccountModalVisible((current) => !current);

  const handleOpenChangePassword = () =>
    router.push('/profile/profile-password');

  return (
    <>
      <Div bg="body" flex={1} p={20}>
        <Div>
          <Button
            onPress={handleOpenChangePassword}
            bg={theme.colors?.cancelButtonBg}
            color={theme.colors?.cancelButtonColor}
            block
          >
            <Icon
              name="unlock"
              color={theme.colors?.cancelButtonColor}
              fontSize="lg"
              fontFamily="Feather"
            />
            <Text ml={10} fontSize="lg" color={theme.colors?.cancelButtonColor}>
              Update password
            </Text>
          </Button>
        </Div>
        <ThemeSwitcher />
        <Div position="absolute" left={20} bottom={20}>
          <Div mt={10}>
            <Button
              bg={theme.colors?.dangerButtonBg}
              onPress={handleLogoutModal}
              block
            >
              <Icon
                name="logout"
                color={theme.colors?.dangerButtonColor}
                fontSize="lg"
                fontFamily="AntDesign"
              />
              <Text
                ml={10}
                fontSize="lg"
                color={theme.colors?.dangerButtonColor}
              >
                Logout
              </Text>
            </Button>
          </Div>
          <Div mt={10}>
            <Button
              bg={theme.colors?.dangerButtonBg}
              onPress={handleDeleteAccountModal}
              block
            >
              <Icon
                name="deleteuser"
                color={theme.colors?.dangerButtonColor}
                fontSize="lg"
                fontFamily="AntDesign"
              />
              <Text
                ml={10}
                fontSize="lg"
                color={theme.colors?.dangerButtonColor}
              >
                Delete account
              </Text>
            </Button>
          </Div>
        </Div>
      </Div>
      <Modal
        animationIn="slideInUp"
        // transparent
        isVisible={modalVisible}
        h={200}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Div
          // borderRadius={15}
          shadow={9}
          w="100%"
          bg="body"
          position="absolute"
          bottom={0}
          p={10}
          pt={20}
        >
          <Text fontWeight="bold" textAlign="center" fontSize="3xl">
            Logout
          </Text>
          <Text textAlign="center" fontSize="lg" my={10}>
            Do you really want to logout from the application?
          </Text>

          <Div mt="xl" m="lg">
            <Button bg={theme.colors?.dangerButtonBg} onPress={logout} block>
              <Icon
                name="logout"
                color={theme.colors?.dangerButtonColor}
                fontSize="lg"
                fontFamily="AntDesign"
              />
              <Text
                ml={10}
                fontSize="lg"
                color={theme.colors?.dangerButtonColor}
              >
                Logout
              </Text>
            </Button>
            <Button
              onPress={handleLogoutModal}
              mt={10}
              mb={20}
              bg={theme.colors?.cancelButtonBg}
              color={theme.colors?.cancelButtonColor}
              block
            >
              Cancel
            </Button>
          </Div>
        </Div>
      </Modal>

      <Modal
        animationIn="slideInUp"
        isVisible={deleteAccountModalVisible}
        h={200}
        onBackdropPress={handleDeleteAccountModal}
      >
        <Div
          // borderRadius={15}
          shadow={9}
          w="100%"
          bg="body"
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

          <Div mt="xl" m="lg">
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
                bg={theme.colors?.dangerButtonBg}
                onPress={deleteAccount}
                loading={isDeletingAccount}
                block
                mt={10}
                disabled={!confirmationForm.isValid}
              >
                <Text
                  ml={10}
                  fontSize="lg"
                  color={theme.colors?.dangerButtonColor}
                >
                  Confirm the deletion of account
                </Text>
              </Button>
            </Formiz>

            <Button
              onPress={handleDeleteAccountModal}
              mt={10}
              mb={20}
              bg={theme.colors?.cancelButtonBg}
              color={theme.colors?.cancelButtonColor}
              block
            >
              Cancel
            </Button>
          </Div>
        </Div>
      </Modal>
    </>
  );
};

export default Profile;
