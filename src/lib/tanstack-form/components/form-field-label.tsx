import { Text } from '@/components/ui/text';

type FormFieldLabelProps = React.ComponentProps<typeof Text>;

export const FormFieldLabel = (props: FormFieldLabelProps) => {
  return (
    <Text
      className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
      {...props}
    />
  );
};
