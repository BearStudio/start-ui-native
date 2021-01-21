import React, {useContext} from 'react';
import {Text, Div} from 'react-native-magnus';
import {BackButton} from '../../components/BackButton';
import Button from '../../components/Button';
import GlobalContext from '../../contexts/GlobalContext';
import {removeAuthenticationToken} from '../../services/securityService';

const Account = () => {
  const {reloadUserInformations} = useContext(GlobalContext);

  const handleLogout = () => {
    removeAuthenticationToken();
    reloadUserInformations();
  };

  return (
    <Div bg="body" h="100%" p="xl">
      <BackButton />
      <Text fontSize="6xl" color="text" mt="lg">
        Mon compte
      </Text>

      <Div flex={1} justifyContent="flex-end">
        <Button
          size="full"
          variant="outline"
          color="red800"
          borderColor="red800"
          onPress={handleLogout}>
          Se déconnecter
        </Button>
      </Div>
    </Div>
  );
};

export default Account;
