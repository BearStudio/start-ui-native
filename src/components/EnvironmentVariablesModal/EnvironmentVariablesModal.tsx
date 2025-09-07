import React from 'react';

import { AlertTriangle, ExternalLink } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import {
  Box,
  DraggableModal,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '../ButtonIcon';
import { LucideIcon } from '../LucideIcon';

interface EnvironmentVariablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingVariables: string[];
}

export const EnvironmentVariablesModal: React.FC<
  EnvironmentVariablesModalProps
> = ({ isOpen, onClose, missingVariables }) => {
  const { t } = useTranslation();
  const warningColor = useColorModeValue('orange.500', 'orange.400');
  const textColor = useColorModeValue('neutral.700', 'neutral.200');
  const codeColor = useColorModeValue('neutral.100', 'neutral.700');
  const infoBgColor = useColorModeValue('blue.50', 'blue.900');

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      h={500}
      android_keyboardInputMode="adjustResize"
    >
      <Flex p="xl" pt="md">
        <Box mb="lg">
          <Box flexDirection="row" alignItems="center" mb="sm">
            <LucideIcon
              icon={AlertTriangle}
              color={warningColor}
              size={20}
              style={{ marginRight: 8 }}
            />
            <Text fontWeight="bold" fontSize="xl">
              {t('auth:environmentModal.title')}
            </Text>
          </Box>
        </Box>

        <ScrollView style={{ maxHeight: 300 }}>
          <VStack spacing="md">
            <Text color={textColor}>
              {t('auth:environmentModal.description')}
            </Text>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb="xs">
                {t('auth:environmentModal.missingVariables')}:
              </Text>
              <VStack spacing="xs">
                {missingVariables.map((variable, index) => (
                  <Box key={index} bg={codeColor} p="sm" borderRadius="md">
                    <Text fontFamily="mono" fontSize="sm">
                      {variable}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb="xs">
                {t('auth:environmentModal.howToFix')}:
              </Text>
              <VStack spacing="xs" pl="sm">
                <Text fontSize="sm" color={textColor}>
                  1. {t('auth:environmentModal.step1')}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  2. {t('auth:environmentModal.step2')}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  3. {t('auth:environmentModal.step3')}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  4. {t('auth:environmentModal.step4')}
                </Text>
              </VStack>
            </Box>

            <Box bg={infoBgColor} p="sm" borderRadius="md">
              <Box flexDirection="row" alignItems="center">
                <LucideIcon
                  icon={ExternalLink}
                  color="blue.500"
                  size={16}
                  style={{ marginRight: 4 }}
                />
                <Text fontSize="xs" color="blue.600">
                  {t('auth:environmentModal.documentation')}
                </Text>
              </Box>
            </Box>
          </VStack>
        </ScrollView>

        <VStack spacing="md" mt="md">
          <ButtonIcon colorScheme="neutral" onPress={onClose} full>
            {t('auth:environmentModal.understand')}
          </ButtonIcon>
        </VStack>
      </Flex>
    </DraggableModal>
  );
};
