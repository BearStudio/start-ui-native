import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { Form, Formiz } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { Box, Text, TouchableOpacity } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

import { CardStatus } from '../CardStatus';
import { ConfirmationModal } from '../ConfirmationModal';
import { FieldCodeInput } from '../FieldCodeInput';

export type ConfirmationCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  form: Form;
  isLoadingConfirm?: boolean;
};

export const ConfirmationCodeModal: FC<
  PropsWithChildren<ConfirmationCodeModalProps>
> = ({ isOpen, onClose, form, email, isLoadingConfirm = false }) => {
  const { colorModeValue } = useDarkMode();
  const { t } = useTranslation();
  const codeInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isOpen) {
      codeInputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <ConfirmationModal
      title={t('components:ConfirmationCodeModal.title')}
      description={t('components:ConfirmationCodeModal.description', { email })}
      confirmLabel={t('components:ConfirmationCodeModal.confirmLabel')}
      isLoadingConfirm={isLoadingConfirm}
      onConfirm={() => form.submit()}
      onCancel={onClose}
      h={400}
      isVisible={isOpen}
      avoidKeyboard
    >
      <Box my="lg">
        <Formiz connect={form}>
          <FieldCodeInput
            ref={codeInputRef}
            name="code"
            required={t('components:ConfirmationCodeModal.required')}
            codeLength={6}
            onValueChange={(code) => {
              if (code?.length === 6) {
                form.submit();
              }
            }}
          />
        </Formiz>

        <CardStatus
          type="info"
          title={t('components:ConfirmationCodeModal.card.title')}
        >
          <Box flexDirection="row" flexWrap="wrap" mt="sm">
            <Text fontSize="lg" color={colorModeValue('gray.800', 'gray.50')}>
              {t('components:ConfirmationCodeModal.card.description')}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                form.setValues({ code: '000000' });
                form.submit();
              }}
            >
              <Text
                fontSize="lg"
                fontWeight="700"
                color={colorModeValue('gray.800', 'gray.50')}
                textDecorationLine="underline"
                style={{ textDecorationLine: 'underline' }}
              >
                000000
              </Text>
            </TouchableOpacity>
          </Box>
        </CardStatus>
      </Box>
    </ConfirmationModal>
  );
};
