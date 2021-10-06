import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { Text, Div } from 'react-native-magnus';

import { useCreateAccount } from '@/account/account.service';
import { BackButton } from '@/components/BackButton';
import Button from '@/components/Button';
import { FieldInput } from '@/components/Fields/FieldInput';
import { focus } from '@/services/utils/formUtil';
import { useToast } from '@/services/utils/toastService';
import { whiteColor } from '@/theme';

const Register = () => {
  const registerForm = useForm();
  const navigation = useNavigation();
  const { showError, showSuccess } = useToast();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { mutate: createAccount, isLoading } = useCreateAccount({
    onSuccess: () => {
      navigation.navigate('Login');
      showSuccess('Votre compte a bien été créé, vous pouvez vous connecter');
    },
    onError: (error) => {
      if (
        error?.response?.data?.errorKey &&
        error?.response?.data?.errorKey === 'emailexists'
      ) {
        showError('Un compte existe déjà pour cette adresse mail');
      } else {
        showError(
          'Une erreur est survenue lors de la création de votre compte, veuillez réessayer'
        );
      }
    },
  });

  const submitForm = (values) => {
    createAccount({
      ...values,
      login: values.email,
    });
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
        Inscription
      </Text>

      <Formiz onValidSubmit={submitForm} connect={registerForm}>
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
          onSubmitEditing={focus(passwordRef)}
          returnKeyType="next"
        />

        <FieldInput
          ref={passwordRef}
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          mt="md"
          secureTextEntry
          required="Le mot de passe est requis"
          validations={[
            {
              rule: isMinLength(6),
              message: 'Le mot de passe doit comporter au moins 6 caractères',
            },
          ]}
          onSubmitEditing={focus(confirmPasswordRef)}
          returnKeyType="next"
        />

        <FieldInput
          ref={confirmPasswordRef}
          name="confirmPassword"
          label="Confirmation du mot de passe"
          placeholder="La confirmation de votre mot de passe"
          mt="md"
          secureTextEntry
          required="La confirmation du mot de passe est requise"
          validations={[
            {
              rule: (value) => value === registerForm.values?.password,
              deps: [registerForm.values?.password],
              message: 'La confirmation du mot de passe ne correspond pas',
            },
          ]}
          onSubmitEditing={registerForm.submit}
        />

        <Button
          colorScheme="primary"
          mt="xl"
          block
          disabled={isLoading}
          onPress={registerForm.submit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={whiteColor} />
          ) : (
            "S'inscrire"
          )}
        </Button>
      </Formiz>
    </Div>
  );
};

export default Register;
