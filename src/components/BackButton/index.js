import React from 'react';
import {Icon} from 'react-native-magnus';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';

export const BackButton = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Button
      variant="link"
      onPress={handleGoBack}
      prefix={
        <Icon
          name="angle-left"
          mr="lg"
          fontSize="6xl"
          fontFamily="FontAwesome"
          color="button"
        />
      }
      p={5}>
      Retour
    </Button>
  );
};
