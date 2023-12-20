import useAuthStore from '@/modules/auth/auth.store';
import {
  Button,
  Box,
  Icon,
  Modal,
  Text,
  Stack,
  useDisclosure,
} from 'react-native-ficus-ui';

import { useAccount } from '@/modules/account/account.service';
import { LoadingScreen } from '@/layout/LoadingScreen';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import { useDarkMode } from '@/theme/useDarkMode';

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  const { colorModeValue } = useDarkMode();

  const { account, isLoading, isError, refetch: refetchAccount } = useAccount();

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
        <ThemeSwitcher />
        {!!account && (
          <Box
            bg={colorModeValue('gray.50', 'gray.700')}
            p={4}
            mt="lg"
            borderRadius="lg"
            shadow="md"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colorModeValue('gray.700', 'gray.50')}
            >
              Name
            </Text>
            <Text
              fontSize="md"
              fontWeight="500"
              mb={4}
              color={colorModeValue('gray.700', 'gray.50')}
            >
              {account.name}
            </Text>

            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colorModeValue('gray.700', 'gray.50')}
            >
              Email
            </Text>
            <Text
              fontSize="md"
              fontWeight="500"
              mb={4}
              color={colorModeValue('gray.700', 'gray.50')}
            >
              {account.email}
            </Text>

            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colorModeValue('gray.700', 'gray.50')}
            >
              Authorities
            </Text>
            <Text
              fontSize="md"
              fontWeight="500"
              mb={4}
              color={colorModeValue('gray.700', 'gray.50')}
            >
              {account?.authorizations?.join(', ')}
            </Text>
          </Box>
        )}
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
            <Button onPress={logout} colorScheme="error" full>
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
        </Stack>
      </Modal>
    </>
  );
};

export default Profile;
