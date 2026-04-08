import {
  BottomSheetTextInput,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { useStore } from '@tanstack/react-form';
import { View, type ViewProps } from 'react-native';

import { FormFieldError } from '@/lib/tanstack-form/components';
import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

import { Input } from '@/components/ui/input';

type FieldTextProps = React.ComponentProps<typeof Input> & {
  containerProps?: ViewProps;
};

export default function FieldText(props: FieldTextProps) {
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
    <View className="gap-1" {...containerProps}>
      <Input
        as={isBottomSheet ? BottomSheetTextInput : undefined}
        id={meta.id}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={
          !meta.error
            ? `${meta.descriptionId}`
            : `${meta.descriptionId} ${meta.errorId}`
        }
        className={meta.error ? 'border-destructive' : undefined}
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
    </View>
  );
}
