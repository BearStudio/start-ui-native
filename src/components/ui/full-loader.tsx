import { ActivityIndicator } from 'react-native';
import { Center } from 'react-native-ficus-ui';

export const FullLoader = () => {
  return (
    <Center flex={1}>
      <ActivityIndicator />
    </Center>
  );
};
