import { useFormContext } from '@formiz/core';
import { TerminalIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  Box,
  BoxProps,
  HStack,
  Text,
  TouchableOpacity,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { LucideIcon } from '@/components/LucideIcon';

export const CardInfoAuthStep = ({
  type,
  ...rest
}: BoxProps & {
  type: 'email' | 'code';
}) => {
  const form = useFormContext();
  const { t } = useTranslation();
  const handlePress = () => {
    if (type === 'email') {
      form.setValues({ email: 'admin@admin.com' });
      return;
    }
    if (type === 'code') {
      form.setValues({ code: '000000' });
    }
  };

  return (
    <Box
      alignItems="center"
      flexWrap="wrap"
      borderWidth={1}
      borderColor="neutral.200"
      borderRadius="lg"
      px={16}
      py={12}
      w="100%"
      {...rest}
    >
      <Box flexDirection="row">
        <Box mt={4}>
          <LucideIcon icon={TerminalIcon} size={16} color="black" />
        </Box>
        <Box>
          <Text fontSize="sm" variant="medium">
            Dev mode
          </Text>
          {type === 'email' && (
            <HStack spacing="sm">
              <Text
                fontSize="sm"
                color="neutral.600"
                _dark={{ color: 'neutral.300' }}
              >
                {t('login:verify.addEmail')}
              </Text>
              <TouchableOpacity onPress={handlePress}>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color={useColorModeValue('neutral.800', 'neutral.50')}
                  style={{ textDecorationLine: 'underline' }}
                >
                  admin@admin.com
                </Text>
              </TouchableOpacity>
            </HStack>
          )}
          {type === 'code' && (
            <HStack spacing="sm">
              <Text
                fontSize="sm"
                color="neutral.600"
                _dark={{ color: 'neutral.300' }}
              >
                {t('login:verify.addCode')}
              </Text>
              <TouchableOpacity onPress={handlePress}>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color={useColorModeValue('neutral.800', 'neutral.50')}
                  style={{ textDecorationLine: 'underline' }}
                >
                  000000
                </Text>
              </TouchableOpacity>
            </HStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};
