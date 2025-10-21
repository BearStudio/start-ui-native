import { ScrollBox, Stack } from 'react-native-ficus-ui';

import { useAppForm } from '@/lib/tanstack-form/config';

export default {
  title: 'Form/Fields',
};

export const AllFields = () => {
  const form = useAppForm({ defaultValues: { text: '', otp: '' } });
  return (
    <form.AppForm>
      <ScrollBox p={16}>
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
