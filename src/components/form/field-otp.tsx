import { useStore } from '@tanstack/react-form';
import {
  ComponentProps,
  ComponentRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Box, BoxProps, PinInput } from 'react-native-ficus-ui';

import { FormFieldError } from '@/lib/tanstack-form/components';
import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

export default function FieldOtp(
  props: Omit<ComponentProps<typeof PinInput>, 'children'> & {
    autoSubmit?: boolean;
    containerProps?: BoxProps;
    codeLength: number;
  }
) {
  const { containerProps, autoSubmit = true, codeLength, ...rest } = props;

  const containerRef = useRef<ComponentRef<typeof Box>>(null);
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

  const shouldAutoSubmit =
    autoSubmit && field.state.value?.length === codeLength;

  const submitForm = useCallback(() => {
    if (!field.form.state.isSubmitted) {
      field.form.handleSubmit();
    }
  }, [field.form]);

  useEffect(() => {
    if (shouldAutoSubmit) {
      submitForm();
    }
  }, [shouldAutoSubmit, submitForm]);

  return (
    <Box {...containerProps} ref={containerRef}>
      <PinInput
        id={meta.id}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={
          !meta.error
            ? `${meta.descriptionId}`
            : `${meta.descriptionId} ${meta.errorId}`
        }
        cellCount={codeLength}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        {...rest}
        value={field.state.value}
        onChangeText={(value) => {
          field.handleChange(value);
        }}
        onBlur={(e) => {
          field.handleBlur();
          rest.onBlur?.(e);
        }}
      />
      <FormFieldError />
    </Box>
  );
}
