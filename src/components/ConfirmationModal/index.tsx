import { FC, PropsWithChildren } from 'react';

import { GestureResponderEvent } from 'react-native';
import { Box, Button, Flex, Modal, Text, VStack } from 'react-native-ficus-ui';
import {
  BackgroundPropsType,
  BorderPropsType,
  BorderRadiusPropsType,
  DimensionPropsType,
  FlexPropsType,
  SpacingPropsType,
  VariantPropsType,
} from 'react-native-ficus-ui/lib/typescript/types';
import { ModalProps as RNModalProps } from 'react-native-modal';

import { useDarkMode } from '@/theme/useDarkMode';

import { ButtonIcon } from '../ButtonIcon';

export type ConfirmationModalProps = Partial<RNModalProps> &
  BorderPropsType &
  SpacingPropsType &
  BorderRadiusPropsType &
  Pick<BackgroundPropsType, 'bg'> &
  Pick<DimensionPropsType, 'h'> &
  Pick<FlexPropsType, 'justifyContent'> &
  VariantPropsType & {
    title: string;
    description?: string;
    confirmColorScheme?: string;
    confirmLabel: string;
    confirmIcon?: string;
    isLoadingConfirm?: boolean;
    isDisabledConfirm?: boolean;
    onConfirm: (event?: GestureResponderEvent) => void;
    onCancel: (event?: GestureResponderEvent) => void;
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
  onConfirm,
  onCancel,
  children,
  ...rest
}) => {
  const { colorModeValue } = useDarkMode();

  return (
    <Modal animationIn="slideInUp" h={260} onBackdropPress={onCancel} {...rest}>
      <Flex p="xl" justifyContent="space-between">
        <Box>
          <Text
            fontWeight="bold"
            fontSize="3xl"
            color={colorModeValue('gray.900', 'gray.50')}
          >
            {title}
          </Text>
          <Text
            mt="sm"
            fontSize="lg"
            color={colorModeValue('gray.900', 'gray.50')}
          >
            {description}
          </Text>
        </Box>

        {children}

        <VStack spacing="md">
          <ButtonIcon
            icon={confirmIcon}
            colorScheme={confirmColorScheme}
            onPress={onConfirm}
            isLoading={isLoadingConfirm}
            isDisabled={isDisabledConfirm}
            full
          >
            {confirmLabel}
          </ButtonIcon>
          <Button colorScheme="gray" onPress={onCancel} full>
            Cancel
          </Button>
        </VStack>
      </Flex>
    </Modal>
  );
};
