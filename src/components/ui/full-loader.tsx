import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

export const FullLoader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator />
    </View>
  );
};
