import { ActivityIndicator } from 'react-native';
import { Box, Dict, useColorModeValue, useTheme } from 'react-native-ficus-ui';

export const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <Box h="100%" p={5} justifyContent="center" alignItems="center">
      <ActivityIndicator
        color={useColorModeValue(
          (theme?.colors?.neutral as Dict)?.[600],
          (theme?.colors?.neutral as Dict)?.[400]
        )}
        size="large"
      />
    </Box>
  );
};
