import { useStore } from '@tanstack/react-form';

import { FieldContextMeta } from '@/lib/tanstack-form/components/form-field';
import { useFieldContext } from '@/lib/tanstack-form/context';

import { IconAlertCircle } from '@/components/icons/generated';
import { HStack } from '@/components/ui/stack';
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
    <HStack spacing={2} alignItems="center">
      <IconAlertCircle width={16} height={16} color="#ef4444" />
      <Text id={meta.errorId} className="font-medium text-red-500" {...props}>
        {meta.errorMessage}
      </Text>
    </HStack>
  );
};
