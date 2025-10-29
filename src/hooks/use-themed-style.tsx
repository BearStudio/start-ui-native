import { useColorModeValue } from 'react-native-ficus-ui';

import theme from '@/lib/ficus-ui/theme';

export const useThemedStyle = () => {
  return useColorModeValue(
    {
      backgroundColor: 'white',
      color: theme.colors.neutral[950],
      sceneBackgroundColor: theme.colors.neutral[50],
    },
    {
      backgroundColor: theme.colors.neutral[950],
      color: 'white',
      sceneBackgroundColor: theme.colors.neutral[900],
    }
  );
};
