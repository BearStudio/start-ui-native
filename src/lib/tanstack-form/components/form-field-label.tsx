import { Text } from '@/components/ui/text';

type FormFieldLabelProps = React.ComponentProps<typeof Text>;

export const FormFieldLabel = (props: FormFieldLabelProps) => {
  return <Text className="text-sm font-medium text-foreground" {...props} />;
};
