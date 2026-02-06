import { useAppForm } from '@/lib/tanstack-form/config';

import { ScrollBox } from '@/components/ui/scroll-box';
import { Stack } from '@/components/ui/stack';

export default {
  title: 'Form/Fields',
};

export const AllFields = () => {
  const form = useAppForm({ defaultValues: { text: '', otp: '' } });
  return (
    <form.AppForm>
      <ScrollBox className="flex-1 p-4">
        <Stack spacing={16}>
          <form.AppField name="text">
            {(field) => (
              <field.Field>
                <field.Label>FieldText</field.Label>
                <field.FieldText />
              </field.Field>
            )}
          </form.AppField>
          <form.AppField name="otp">
            {(field) => (
              <field.Field>
                <field.Label>FieldOtp</field.Label>
                <field.FieldOtp codeLength={6} />
              </field.Field>
            )}
          </form.AppField>
        </Stack>
      </ScrollBox>
    </form.AppForm>
  );
};
