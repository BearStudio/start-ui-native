import { ScrollView, View } from 'react-native';

import { useAppForm } from '@/lib/tanstack-form/config';

export default {
  title: 'Form/Fields',
};

export const AllFields = () => {
  const form = useAppForm({ defaultValues: { text: '', otp: '' } });
  return (
    <form.AppForm>
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="gap-4">
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
        </View>
      </ScrollView>
    </form.AppForm>
  );
};
