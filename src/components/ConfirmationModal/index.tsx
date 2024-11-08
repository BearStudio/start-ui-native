import { FC, PropsWithChildren } from 'react';

import { useTranslation } from 'react-i18next';
import { GestureResponderEvent } from 'react-native';
import {
  Box,
  Button,
  Center,
  DraggableModal,
  DraggableModalProps,
  Flex,
  Text,
  VStack,
} from 'react-native-ficus-ui';
import {
  BackgroundPropsType,
  BorderPropsType,
  BorderRadiusPropsType,
  DimensionPropsType,
  FlexPropsType,
  SpacingPropsType,
  VariantPropsType,
} from 'react-native-ficus-ui/lib/typescript/types';

import { useDarkMode } from '@/theme/useDarkMode';

import { ButtonIcon } from '../ButtonIcon';

export type ConfirmationModalProps = Partial<DraggableModalProps> &
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
  onConfirm,
  onCancel,
  children,
  snapPoints = ['40%'],
  ...rest
}) => {
  const { colorModeValue, getThemeColor } = useDarkMode();
  const { t } = useTranslation();

  return (
    <DraggableModal
      snapPoints={snapPoints}
      onClose={onCancel}
      bg={colorModeValue('white', getThemeColor('gray.800'))}
      handleComponent={() => (
        <Center h={30}>
          <Box
            bg={colorModeValue(getThemeColor('gray.800'), 'white')}
            h={5}
            w={30}
            borderRadius="xl"
          />
        </Center>
      )}
      backdropComponent={({ style }) => (
        <Box style={style} bg="black" opacity={0.4} />
      )}
      backgroundComponent={({ style }) => (
        <Box
          style={style}
          borderTopRadius="2xl"
          bg={colorModeValue('white', getThemeColor('gray.800'))}
        />
      )}
      h="100%"
      {...rest}
    >
      <Flex p="xl" pt="md" justifyContent="space-between">
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
          <Button
            onPress={onCancel}
            full
            color={colorModeValue(
              getThemeColor('red.500'),
              getThemeColor('red.400')
            )}
            bg={colorModeValue('white', 'gray.700')}
            colorScheme="white"
            borderWidth={1}
            borderColor={colorModeValue('gray.200', 'gray.600')}
          >
            {t('commons:actions.cancel')}
          </Button>
        </VStack>
      </Flex>
    </DraggableModal>
  );
};
