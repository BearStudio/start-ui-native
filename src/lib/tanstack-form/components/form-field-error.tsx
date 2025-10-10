import { useStore } from '@tanstack/react-form';
import { HStack, Text, TextProps } from 'react-native-ficus-ui';

import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

import { IconAlertCircle } from '@/components/icons/generated';

export const FormFieldError = (props: TextProps) => {
  const field = useFieldContext<unknown>();

  const meta = useStore(field.store, (state) => {
    const fieldMeta = state.meta as FieldContextMeta;
    return {
      errorMessage: fieldMeta.errors[0]?.message,
      errorId: fieldMeta.errorId,
    };
  });

  if (!meta.errorMessage) {
    return null;
  }

  return (
    <HStack gap={2} alignItems="center">
      <IconAlertCircle width={16} height={16} color="red.500" />
      <Text
        id={meta.errorId}
        gap={4}
        alignItems="center"
        color="red.500"
        fontWeight="medium"
        {...props}
      >
        {meta.errorMessage}
      </Text>
    </HStack>
  );
};
