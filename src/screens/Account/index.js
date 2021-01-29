import {Formiz, useForm} from '@formiz/core';
import {isEmail} from '@formiz/validations';
import React, {useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {Text, Div} from 'react-native-magnus';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {primaryColor, whiteColor} from '../../../constants/themes';
import {BackButton} from '../../components/BackButton';
import Button from '../../components/Button';
import {FieldInput} from '../../components/Fields/FieldInput';
import GlobalContext from '../../contexts/GlobalContext';
import {removeAuthenticationToken} from '../../services/securityService';
import {useAccount, useUpdateAccount} from '../../services/userService';
import {useToast} from '../../services/utils/toastService';

const Account = () => {
  const {isLoading, data: account} = useAccount();
  const accountForm = useForm();
  const {reloadUserInformations} = useContext(GlobalContext);
  const {showError, showSuccess} = useToast();

  const handleLogout = () => {
    removeAuthenticationToken();
    reloadUserInformations();
  };

  const {mutate: updateAccount, isLoading: updateLoading} = useUpdateAccount({
    onError: (error) => {
      console.log({error});
      showError('Erreur lors de la mise à jour du profil, veuillez réessayer');
    },
    onSuccess: () => {
      showSuccess('Le profil a bien été mis à jour');
      reloadUserInformations();
    },
  });

  const submitForm = (values) => {
    updateAccount({
      ...values,
      login: values.email,
    });
  };

  if (isLoading) {
    return (
      <Div h="100%" justifyContent="center" alignItems="center">
        <Text fontSize="6xl" color="text" mt="lg">
          📦
        </Text>
        <ActivityIndicator size="large" color={primaryColor} />
      </Div>
    );
  }

  return (
    <Div bg="body" h="100%" p="xl">
      <BackButton />
      <Text fontSize="6xl" color="text" mt="lg">
        Mon compte
      </Text>

      <Div>
        <Formiz onValidSubmit={submitForm} connect={accountForm}>
          <FieldInput
            name="email"
            defaultValue={account?.email}
            label="Adresse mail"
            placeholder="Votre adresse mail"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            mt="md"
            required="L'adresse mail est requise"
            validations={[
              {
                rule: isEmail(),
                message: "L'adresse mail n'est pas valide",
              },
            ]}
          />
          <FieldInput
            name="firstName"
            defaultValue={account?.firstName}
            label="Prénom"
            placeholder="Votre prénom"
            autoCapitalize="none"
            mt="md"
          />
          <FieldInput
            name="lastName"
            defaultValue={account?.lastName}
            label="Nom"
            placeholder="Votre nom"
            autoCapitalize="none"
            mt="md"
          />

          <Button
            mt="xl"
            size="full"
            disabled={updateLoading}
            onPress={accountForm.submit}>
            {updateLoading ? (
              <ActivityIndicator size="small" color={whiteColor} />
            ) : (
              'Sauvegarder'
            )}
          </Button>
        </Formiz>
      </Div>

      <Div flex={1} justifyContent="flex-end">
        <HideWithKeyboard>
          <Button
            size="full"
            variant="outline"
            color="red800"
            borderColor="red800"
            onPress={handleLogout}>
            Se déconnecter
          </Button>
        </HideWithKeyboard>
      </Div>
    </Div>
  );
};

export default Account;
