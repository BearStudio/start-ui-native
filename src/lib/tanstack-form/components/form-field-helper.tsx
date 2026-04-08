import { Text } from '@/components/ui/text';

export const FormFieldHelper = (props: React.ComponentProps<typeof Text>) => {
  return (
    <Text className="text-sm font-normal text-muted-foreground" {...props} />
  );
};
