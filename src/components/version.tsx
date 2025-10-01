import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';
import { Text, TextProps } from 'react-native-ficus-ui';

export const Version = (props: TextProps) => {
  return (
    <Text fontSize="xs" fontWeight="400" variant="muted" {...props}>
      Version {nativeApplicationVersion} • {nativeBuildVersion}
    </Text>
  );
};
