import { Text } from '@/components/ui/text';

export const FormFieldHelper = (props: React.ComponentProps<typeof Text>) => {
  return (
    <Text className="text-muted-foreground text-sm font-normal" {...props} />
  );
};
