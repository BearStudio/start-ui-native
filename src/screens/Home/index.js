import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {Text, Div, Avatar} from 'react-native-magnus';
import {primaryColor} from '../../../constants/themes';
import {useAccount} from '../../services/userService';

const Home = () => {
  const {isLoading, isError, data: account} = useAccount();
  const navigation = useNavigation();

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

  if (isError) {
    return <Text>Erreur</Text>;
  }

  const {email} = account;

  const handleOpenAccount = () => navigation.navigate('Account');

  return (
    <Div bg="body" h="100%" p="xl">
      <TouchableOpacity onPress={handleOpenAccount}>
        <Avatar bg="green800" size={50} fontSize="4xl" color="white">
          {email.charAt(0).toUpperCase()}
        </Avatar>
      </TouchableOpacity>
      <Text fontSize="6xl" color="text" mt="lg">
        📦 Bienvenue
      </Text>
    </Div>
  );
};

export default Home;
