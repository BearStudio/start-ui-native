import React from 'react';
import {Text, Div} from 'react-native-magnus';
import {Formiz, useForm} from '@formiz/core';
import {FieldInput} from '../../components/Fields/FieldInput';
import {isEmail} from '@formiz/validations';
import Button from '../../components/Button';
import {BackButton} from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../services/utils/toastService';
import {useResetPasswordInit} from '../../services/userService';
import {ActivityIndicator} from 'react-native';
import {whiteColor} from '../../../constants/themes';

const ResetPassword = () => {
  const resetPasswordForm = useForm();
  const navigation = useNavigation();
  const {showSuccess, showError} = useToast();

  const {
    mutate: resetPasswordInit,
    isLoading: resetPasswordLoading,
  } = useResetPasswordInit({
    onSuccess: () => {
      navigation.navigate('Login');
      showSuccess(
        'La demande de réinitialisation du mot de passe a bien été envoyée',
      );
    },
    onError: () => {
      showError(
        'Une erreur est survenue lors de la réinitialisation du mot de passe, veuillez réessayer',
      );
    },
  });

  const submitForm = async (values) => {
    resetPasswordInit(values);
  };

  return (
    <Div bg="body" h="100%" p="xl">
      <BackButton />
      <Div my="xl">
        <Text fontSize="6xl" color="text">
          📦 Start UI Native
        </Text>
      </Div>

      <Text fontWeight="bold" fontSize="2xl" color="text" mb={5}>
        Réinitialisation du mot de passe
      </Text>

      <Formiz onValidSubmit={submitForm} connect={resetPasswordForm}>
        <FieldInput
          name="email"
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

        <Button
          mt="xl"
          size="full"
          disabled={resetPasswordLoading}
          onPress={resetPasswordForm.submit}>
          {resetPasswordLoading ? (
            <ActivityIndicator size="small" color={whiteColor} />
          ) : (
            'Réinitialiser'
          )}
        </Button>
      </Formiz>
    </Div>
  );
};

export default ResetPassword;
