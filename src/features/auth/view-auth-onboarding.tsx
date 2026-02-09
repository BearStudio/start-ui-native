import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import z from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { Text } from '@/components/ui/text';

import { AuthHeader } from '@/features/auth/auth-header';
import { authClient } from '@/features/auth/client';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewAuthOnboarding = () => {
  const { t } = useTranslation(['auth']);

  const form = useAppForm({
    defaultValues: { name: '' },
    validators: {
      onSubmit: z.object({
        name: z.string().nonempty({ error: 'Name could not be empty' }),
      }),
    },
    onSubmit: async (submission) => {
      await authClient.updateUser({ name: submission.value.name });
    },
  });

  return (
    <ViewSafeContent>
      <AuthHeader />
      <View className="flex-1 p-6 max-w-[400px] items-center justify-center w-full">
        <View className="w-full gap-6">
          <View className="gap-2">
            <Text className="text-lg font-bold">
              {t('auth:onboarding.title')}
            </Text>
            <Text className="text-sm font-normal">
              {t('auth:onboarding.subtitle')}
            </Text>
          </View>
          <form.AppForm>
            <View className="gap-4">
              <View className="gap-2">
                <form.AppField name="name">
                  {(field) => (
                    <field.Field>
                      <field.Label>
                        {t('auth:onboarding.name.label')}
                      </field.Label>
                      <field.FieldText
                        autoFocus
                        returnKeyType="done"
                        onSubmitEditing={form.handleSubmit}
                      />
                    </field.Field>
                  )}
                </form.AppField>
              </View>
              <form.Submit>{t('auth:onboarding.continue')}</form.Submit>
            </View>
          </form.AppForm>
        </View>
      </View>
    </ViewSafeContent>
  );
};
