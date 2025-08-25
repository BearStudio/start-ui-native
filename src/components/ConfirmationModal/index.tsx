import { FC, PropsWithChildren } from 'react';

import { GestureResponderEvent } from 'react-native';
import {
  Box,
  DraggableModal,
  DraggableModalProps,
  Flex,
  Text,
  VStack,
} from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  onCancel?: (event?: GestureResponderEvent) => void;
  onClose: (event?: GestureResponderEvent) => void;
  snapPoints?: string[];
};

export const ConfirmationModal: FC<
  PropsWithChildren<ConfirmationModalProps>
> = ({
  title,
  description,
  isLoadingConfirm,
  isDisabledConfirm,
  confirmColorScheme = 'neutral',
  confirmLabel,
  confirmIcon,
  confirmIconSet,
  onConfirm,
  onCancel,
  onClose,
  children,
  h = 300,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  return (
    <DraggableModal
      onClose={onClose}
      h={h}
      android_keyboardInputMode="adjustResize"
      {...rest}
    >
      <Flex p="xl" pt="md" pb={insets.bottom}>
        <Box mb="lg">
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          {!!description && (
            <Text mt="sm" fontSize="lg">
              {description}
            </Text>
          )}
        </Box>

        {children}

        <VStack spacing="md" mt="md">
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
        </VStack>
      </Flex>
    </DraggableModal>
  );
};
