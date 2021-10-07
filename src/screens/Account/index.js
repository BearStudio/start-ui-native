import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { ActivityIndicator } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, Div } from 'react-native-magnus';

import { useAccount, useUpdateAccount } from '@/account/account.service';
import { useAuthContext } from '@/auth/AuthContext';
import { BackButton } from '@/components/BackButton';
import Button from '@/components/Button';
import { FieldInput } from '@/components/Fields/FieldInput';
import { focus } from '@/services/utils/formUtil';
import { useToast } from '@/services/utils/toastService';
import { primaryColor, whiteColor } from '@/theme';

const Account = () => {
  const accountForm = useForm();
  const { showError, showSuccess } = useToast();
  const { logout } = useAuthContext();

  const { account, isFetching: isFetchingAccount } = useAccount();

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const { updateAccount, isLoading: isLoadingUpdateAccount } = useUpdateAccount(
    {
      onError: () => {
        showError(
          'Erreur lors de la mise à jour du profil, veuillez réessayer'
        );
      },
      onSuccess: () => {
        showSuccess('Le profil a bien été mis à jour');
      },
    }
  );

  const submitForm = (values) => {
    updateAccount({
      ...values,
      login: values.email,
    });
  };

  if (isFetchingAccount) {
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
            onSubmitEditing={focus(firstNameRef)}
            returnKeyType="next"
          />
          <FieldInput
            ref={firstNameRef}
            name="firstName"
            defaultValue={account?.firstName}
            label="Prénom"
            placeholder="Votre prénom"
            autoCapitalize="none"
            mt="md"
            onSubmitEditing={focus(lastNameRef)}
            returnKeyType="next"
          />
          <FieldInput
            ref={lastNameRef}
            name="lastName"
            defaultValue={account?.lastName}
            label="Nom"
            placeholder="Votre nom"
            autoCapitalize="none"
            onSubmitEditing={accountForm.submit}
            mt="md"
          />

          <Button
            colorScheme="primary"
            mt="xl"
            block
            disabled={isLoadingUpdateAccount}
            onPress={accountForm.submit}
          >
            {isLoadingUpdateAccount ? (
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
            onPress={logout}
          >
            Se déconnecter
          </Button>
        </HideWithKeyboard>
      </Div>
    </Div>
  );
};

export default Account;
