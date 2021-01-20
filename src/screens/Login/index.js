import React from 'react';
import {Text, Div} from 'react-native-magnus';
import {Formiz, useForm} from '@formiz/core';
import {isEmail} from '@formiz/validations';
import {FieldInput} from '../../components/Fields/FieldInput';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {useLogin, useUserConnected} from '../../services/userService';
import {storeAuthenticationToken} from '../../services/securityService';
import {useToast} from '../../services/utils/toastService';

const Login = () => {
  const loginForm = useForm();
  const navigation = useNavigation();
  const {reloadUserInformations} = useUserConnected();
  const {showError} = useToast();

  const {mutate: loginUser, isLoading} = useLogin({
    onSuccess: async ({id_token}) => {
      await storeAuthenticationToken(id_token);
      reloadUserInformations();
    },
    onError: () => {
      showError(
        'Une erreur est survenue lors de la conexion, veuillez réessayer',
      );
    },
  });

  const submitForm = async (values) => {
    await loginUser(values);
  };

  const handleOpenRegister = () => {
    navigation.navigate('Register');
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

        <FieldInput
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          mt="md"
          secureTextEntry
          required="Le mot de passe est requis"
        />

        <Button variant="link" p="lg" mt="sm" alignSelf="flex-end">
          Mot de passe oublié
        </Button>

        <Button mt="xl" size="full" onPress={loginForm.submit}>
          Se connecter
        </Button>
      </Formiz>

      <Button
        variant="outline"
        mt="lg"
        size="full"
        disabled={isLoading}
        onPress={handleOpenRegister}>
        Créer un compte
      </Button>
    </Div>
  );
};

export default Login;
