import React from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { ActivityIndicator } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, Div } from 'react-native-magnus';

import { BackButton } from '@/components/BackButton';
import Button from '@/components/Button';
import { FieldInput } from '@/components/Fields/FieldInput';
import { useAuthentication } from '@/contexts/AuthContext';
import { useUpdateAccount } from '@/services/userService';
import { useToast } from '@/services/utils/toastService';
import { primaryColor, whiteColor } from '@/theme';

const Account = () => {
  const accountForm = useForm();
  const { showError, showSuccess } = useToast();
  const {
    logout,
    fetchUserAccount,
    account,
    isRetrievingUserAccount,
  } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  const { mutate: updateAccount, isLoading: updateLoading } = useUpdateAccount({
    onError: (error) => {
      console.log({ error });
      showError('Erreur lors de la mise à jour du profil, veuillez réessayer');
    },
    onSuccess: () => {
      showSuccess('Le profil a bien été mis à jour');
      fetchUserAccount();
    },
  });

  const submitForm = (values) => {
    updateAccount({
      ...values,
      login: values.email,
    });
  };

  if (isRetrievingUserAccount) {
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
            colorScheme="primary"
            mt="xl"
            block
            disabled={updateLoading}
            onPress={accountForm.submit}
          >
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
            block
            variant="outline"
            color="red800"
            borderColor="red800"
            onPress={handleLogout}
          >
            Se déconnecter
          </Button>
        </HideWithKeyboard>
      </Div>
    </Div>
  );
};

export default Account;
