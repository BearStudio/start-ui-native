import {
  BottomSheetTextInput,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { useStore } from '@tanstack/react-form';
import { Box, BoxProps, Input, InputProps } from 'react-native-ficus-ui';

import { FormFieldError } from '@/lib/tanstack-form/components';
import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

export default function FieldText(
  props: InputProps & { containerProps?: BoxProps }
) {
  const field = useFieldContext<string>();

  const meta = useStore(field.store, (state) => {
    const fieldMeta = state.meta as FieldContextMeta;
    return {
      id: fieldMeta.id,
      descriptionId: fieldMeta.descriptionId,
      errorId: fieldMeta.errorId,
      error: fieldMeta.errors[0],
    };
  });

  const { containerProps, ...componentProps } = props;

  const isBottomSheet = useBottomSheetInternal(true);

  return (
    <Box gap={4} {...containerProps}>
      <Input
        as={isBottomSheet ? BottomSheetTextInput : undefined}
        id={meta.id}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={
          !meta.error
            ? `${meta.descriptionId}`
            : `${meta.descriptionId} ${meta.errorId}`
        }
        borderColor={meta.error ? 'red.600' : undefined}
        {...componentProps}
        value={field.state.value}
        onChangeText={(value) => {
          field.handleChange(value);
        }}
        onBlur={(e) => {
          field.handleBlur();
          props.onBlur?.(e);
        }}
      />
      <FormFieldError />
    </Box>
  );
}
