import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';
import { Text, TextProps } from 'react-native-ficus-ui';

export const Version = (props: TextProps) => {
  return (
    <Text fontSize="xs" fontWeight="300" color="gray.600" {...props}>
      Version {nativeApplicationVersion} • {nativeBuildVersion}
    </Text>
  );
};
