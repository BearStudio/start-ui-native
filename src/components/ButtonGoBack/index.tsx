import { useNavigation } from 'expo-router';
import { FC } from 'react';
import { Button, ButtonProps, Icon } from 'react-native-ficus-ui';

export const ButtonGoBack: FC<ButtonProps> = (props) => {
  const navigation = useNavigation();
  return (
    <Button
      underlayColor="gray.900"
      borderRadius="full"
      bg="transparent"
      px="xs"
      py="xs"
      mr={28} // to get the same spacing as the header of expo router
      ml={-3}
      onPress={() => navigation.goBack()}
      {...props}
    >
      <Icon
        name="arrow-left"
        fontFamily="Feather"
        color="white"
        fontSize={23}
      />
    </Button>
  );
};
