import { useStore } from '@tanstack/react-form';
import { View } from 'react-native';

import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

import { IconAlertCircle } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Text } from '@/components/ui/text';

export const FormFieldError = (props: React.ComponentProps<typeof Text>) => {
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
    <View className="flex flex-row items-center gap-0.5">
      <Icon icon={IconAlertCircle} className="text-negative-500" />
      <Text id={meta.errorId} className="font-medium text-red-500" {...props}>
        {meta.errorMessage}
      </Text>
    </View>
  );
};
