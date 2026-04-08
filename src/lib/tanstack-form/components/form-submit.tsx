import { ActivityIndicator } from 'react-native';

import { cn } from '@/lib/tailwind/utils';
import { useFormContext } from '@/lib/tanstack-form/context';

import { Button, type ButtonProps } from '@/components/ui/button';

export default function FormSubmit({
  submitting,
  children,
  full,
  className,
  ...props
}: Readonly<
  ButtonProps & {
    submitting?: React.ReactElement;
    children: React.ReactNode;
    full?: boolean;
  }
>) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          disabled={!canSubmit || isSubmitting}
          className={cn(full && 'w-full', className)}
          onPress={() => form.handleSubmit()}
          {...props}
        >
          {isSubmitting ? (submitting ?? <ActivityIndicator />) : children}
        </Button>
      )}
    </form.Subscribe>
  );
}
