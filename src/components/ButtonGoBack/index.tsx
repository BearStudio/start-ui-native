import { useDarkMode } from '@/theme/useDarkMode';
import { useNavigation } from 'expo-router';
import { FC } from 'react';
import { Button, ButtonProps, Icon } from 'react-native-ficus-ui';

export const ButtonGoBack: FC<ButtonProps> = (props) => {
  const navigation = useNavigation();
  const { colorModeValue } = useDarkMode();
  return (
    <Button
      underlayColor={colorModeValue('gray.200', 'gray.700')}
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
        color={colorModeValue('gray.700', 'gray.50')}
        fontSize={23}
      />
    </Button>
  );
};
