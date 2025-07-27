import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { Form, Formiz } from '@formiz/core';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { Box, Text, TouchableOpacity } from 'react-native-ficus-ui';

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
      onClose={onClose}
      h={400}
      isOpen={isOpen}
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
            pinInputProps={{
              InputComponent: BottomSheetTextInput,
            }}
          />
        </Formiz>

        <CardStatus
          type="info"
          title={t('components:ConfirmationCodeModal.card.title')}
          mt="md"
        >
          <Box flexDirection="row" flexWrap="wrap" mt="sm">
            <Text fontSize="lg">
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
