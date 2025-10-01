import { ActivityIndicator } from 'react-native';
import { Button, ButtonProps } from 'react-native-ficus-ui';

import { useFormContext } from '@/lib/tanstack-form/context';

export default function FormSubmit({
  submitting,
  children,
  ...props
}: Readonly<
  ButtonProps & {
    submitting?: React.ReactElement;
    children: React.ReactNode;
  }
>) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          isDisabled={!canSubmit || isSubmitting}
          variant="@primary"
          {...props}
          onPress={() => form.handleSubmit()}
        >
          {isSubmitting ? (submitting ?? <ActivityIndicator />) : children}
        </Button>
      )}
    </form.Subscribe>
  );
}
