import { useStore } from '@tanstack/react-form';
import { useCallback, useEffect } from 'react';
import { View, type ViewProps } from 'react-native';

import { FormFieldError } from '@/lib/tanstack-form/components';
import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

import { PinInput } from '@/components/ui/pin-input';

type FieldOtpProps = React.ComponentProps<typeof PinInput> & {
  autoSubmit?: boolean;
  containerProps?: ViewProps;
  codeLength: number;
};

export default function FieldOtp(props: FieldOtpProps) {
  const { containerProps, autoSubmit = true, codeLength, ...rest } = props;

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
    <View className="gap-1" {...containerProps}>
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
    </View>
  );
}
