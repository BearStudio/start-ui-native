import { useColorScheme } from 'react-native';

const neutral50 = '#fafafa';
const neutral900 = '#171717';
const neutral950 = '#0a0a0a';

export const useThemedStyle = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    backgroundColor: isDark ? neutral950 : 'white',
    color: isDark ? 'white' : neutral950,
    sceneBackgroundColor: isDark ? neutral900 : neutral50,
  };
};
