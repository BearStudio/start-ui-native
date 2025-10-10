import { useTranslation } from 'react-i18next';
import { Center, Stack, Text } from 'react-native-ficus-ui';
import z from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { AuthHeader } from '@/features/auth/auth-header';
import { authClient } from '@/features/auth/client';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewOnboarding = () => {
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
      <Center flex={1} p={24}>
        <Stack spacing={24} w="100%">
          <Stack spacing={8}>
            <Text fontWeight="bold" fontSize="lg">
              {t('auth:onboarding.title')}
            </Text>
            <Text fontWeight={400} fontSize="sm">
              {t('auth:onboarding.subtitle')}
            </Text>
          </Stack>
          <form.AppForm>
            <Stack spacing={16}>
              <Stack spacing={8}>
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
              </Stack>
              <form.Submit>{t('auth:onboarding.continue')}</form.Submit>
            </Stack>
          </form.AppForm>
        </Stack>
      </Center>
    </ViewSafeContent>
  );
};
