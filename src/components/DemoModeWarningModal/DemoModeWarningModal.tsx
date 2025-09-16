import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  Box,
  DraggableModal,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '../ButtonIcon';

interface DemoModeWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModeWarningModal: React.FC<DemoModeWarningModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const textColor = useColorModeValue('neutral.700', 'neutral.200');
  const sectionBgColor = useColorModeValue('neutral.50', 'neutral.800');

  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      h={450}
      android_keyboardInputMode="adjustResize"
    >
      <Flex p="xl" pt="md">
        <Box mb="lg">
          <Text fontWeight="bold" fontSize="xl" mb="sm">
            👋 {t('auth:demoMode.title')}
          </Text>
        </Box>

        <VStack spacing="md">
          <Text color={textColor} fontSize="md">
            {t('auth:demoMode.description')}
          </Text>

          <Text color={textColor} fontSize="md" fontWeight="semibold">
            {t('auth:demoMode.enableGithub')}
          </Text>

          {/* Option 1 */}
          <Box bg={sectionBgColor} p="md" borderRadius="md">
            <Text fontWeight="bold" fontSize="sm" color={textColor} mb="xs">
              {t('auth:demoMode.option1Title')}
            </Text>
            <VStack spacing="xs">
              <Text fontSize="sm" color={textColor}>
                {t('auth:demoMode.option1Step1')}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {t('auth:demoMode.option1Step2')}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {t('auth:demoMode.option1Step3')}
              </Text>
            </VStack>
          </Box>

          {/* Option 2 */}
          <Box bg={sectionBgColor} p="md" borderRadius="md">
            <Text fontWeight="bold" fontSize="sm" color={textColor} mb="xs">
              {t('auth:demoMode.option2Title')}
            </Text>
            <VStack spacing="xs">
              <Text fontSize="sm" color={textColor}>
                {t('auth:demoMode.option2Step1')}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {t('auth:demoMode.option2Step2')}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {t('auth:demoMode.option2Step3')}
              </Text>
            </VStack>
          </Box>
        </VStack>

        <VStack spacing="md" mt="lg">
          <ButtonIcon colorScheme="blue" onPress={onClose} full>
            {t('auth:demoMode.understand')}
          </ButtonIcon>
        </VStack>
      </Flex>
    </DraggableModal>
  );
};
