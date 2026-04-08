import { Image as ExpoImage, ImageProps } from 'expo-image';
import { StyleSheet } from 'react-native';

const imageStyles = StyleSheet.create({
  flex: { flex: 1 },
});

export const Image = (props: ImageProps) => {
  return <ExpoImage style={imageStyles.flex} {...props} />;
};
