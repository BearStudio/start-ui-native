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
      borderColor="brand.200"
      borderRadius="lg"
      px={16}
      py={12}
      w="100%"
      {...rest}
    >
      <Box flexDirection="row" gap="md">
        <Box mt={8}>
          <LucideIcon icon={TerminalIcon} size={16} color="black" />
        </Box>
        <Box>
          <Text fontSize="lg" my="sm">
            Dev mode
          </Text>
          {type === 'email' && (
            <TouchableOpacity onPress={handlePress}>
              <Text
                fontSize="lg"
                fontWeight="700"
                color={useColorModeValue('gray.800', 'gray.50')}
                style={{ textDecorationLine: 'underline' }}
              >
                admin@admin.com
              </Text>
            </TouchableOpacity>
          )}
          {type === 'code' && (
            <HStack spacing="md">
              <Text fontSize="sm" color="brand.500">
                {t('login:verify.addCode')}
              </Text>
              <TouchableOpacity onPress={handlePress}>
                <Text
                  fontSize="lg"
                  fontWeight="700"
                  color={useColorModeValue('gray.800', 'gray.50')}
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
