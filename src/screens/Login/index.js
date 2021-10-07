import React, { useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { Div, Text } from 'react-native-magnus';

import { useLogin } from '@/auth/auth.service';
import Button from '@/components/Button';
import { FieldInput } from '@/components/Fields/FieldInput';
import { focus } from '@/services/utils/formUtil';
import { whiteColor } from '@/theme';

const Login = () => {
  const loginForm = useForm();
  const navigation = useNavigation();

  const passwordRef = useRef();

  const { login, isLoading } = useLogin();

  const submitForm = (values) => {
    login(values);
  };

  const handleOpenRegister = () => {
    navigation.navigate('Register');
  };

  const handleOpenResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleOpenAbout = () => {
    navigation.navigate('About');
  };

  return (
    <Div bg="body" h="100%" p="xl">
      <Div my="2xl">
        <Text fontSize="6xl" color="text">
          📦 Start UI Native
        </Text>
      </Div>

      <Text fontWeight="bold" fontSize="2xl" color="text" mb={5}>
        Connexion
      </Text>

      <Formiz onValidSubmit={submitForm} connect={loginForm}>
        <FieldInput
          name="username"
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
          onSubmitEditing={loginForm.submit}
        />

        <Button
          colorScheme="primary"
          variant="link"
          p="lg"
          mt="sm"
          alignSelf="flex-end"
          onPress={handleOpenResetPassword}
        >
          Mot de passe oublié
        </Button>

        <Button
          colorScheme="primary"
          mt="xl"
          block
          disabled={isLoading}
          onPress={loginForm.submit}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={whiteColor} />
          ) : (
            'Se connecter'
          )}
        </Button>
      </Formiz>

      <Button
        colorScheme="primary"
        variant="outline"
        mt="lg"
        block
        disabled={isLoading}
        onPress={handleOpenRegister}
      >
        Créer un compte
      </Button>

      <Button
        colorScheme="dark"
        variant="link"
        mt="lg"
        block
        onPress={handleOpenAbout}
      >
        À propos
      </Button>
    </Div>
  );
};

export default Login;
