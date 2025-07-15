import { FC, PropsWithChildren } from 'react';

import { useTranslation } from 'react-i18next';
import { GestureResponderEvent } from 'react-native';
import {
  Box,
  Button,
  DraggableModal,
  DraggableModalProps,
  Flex,
  Text,
  VStack,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '../ButtonIcon';

export type ConfirmationModalProps = Partial<DraggableModalProps> & {
  title: string;
  description?: string;
  confirmColorScheme?: string;
  confirmLabel: string;
  confirmIcon?: string;
  confirmIconSet?:
    | 'Ionicons'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Foundation'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'Zocial'
    | 'Fontisto'
    | 'SimpleLineIcons';
  isLoadingConfirm?: boolean;
  isDisabledConfirm?: boolean;
  onConfirm: (event?: GestureResponderEvent) => void;
  onCancel: (event?: GestureResponderEvent) => void;
  snapPoints?: string[];
};

export const ConfirmationModal: FC<
  PropsWithChildren<ConfirmationModalProps>
> = ({
  title,
  description,
  isLoadingConfirm,
  isDisabledConfirm,
  confirmColorScheme = 'brand',
  confirmLabel,
  confirmIcon,
  confirmIconSet,
  onConfirm,
  onCancel,
  children,
  h = 300,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <DraggableModal
      onClose={onCancel}
      h={h}
      android_keyboardInputMode="adjustResize"
      {...rest}
    >
      <Flex p="xl" pt="md" justifyContent="space-between">
        <Box>
          <Text fontWeight="bold" fontSize="3xl">
            {title}
          </Text>
          <Text mt="sm" fontSize="lg">
            {description}
          </Text>
        </Box>

        {children}

        <VStack spacing="md">
          <ButtonIcon
            icon={confirmIcon}
            iconSet={confirmIconSet}
            colorScheme={confirmColorScheme}
            onPress={onConfirm}
            isLoading={isLoadingConfirm}
            isDisabled={isDisabledConfirm}
            full
          >
            {confirmLabel}
          </ButtonIcon>
          <Button onPress={onCancel} variant="outline" full>
            {t('commons:actions.cancel')}
          </Button>
        </VStack>
      </Flex>
    </DraggableModal>
  );
};
