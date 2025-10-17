import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Center, Stack, Text } from 'react-native-ficus-ui';
import { toast } from 'sonner-native';
import { z } from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { IconArrowLeft } from '@/components/icons/generated';

import { AuthHeader } from '@/features/auth/auth-header';
import { authClient } from '@/features/auth/client';
import { LoginOtpHint } from '@/features/devtools/login-hint';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewOtpVerification = () => {
  const session = authClient.useSession();
  const { email } = useLocalSearchParams();

  const { t } = useTranslation(['auth']);

  const router = useRouter();

  const form = useAppForm({
    defaultValues: { code: '' },
    validators: { onSubmit: z.object({ code: z.string().length(6) }) },
    onSubmit: async (submission) => {
      if (typeof email !== 'string') {
        return;
      }
      await authClient.signIn.emailOtp(
        {
          email,
          otp: submission.value.code,
        },
        {
          onError: ({ error }) => {
            toast.error(error.message);
          },
        }
      );

      // Refetch session to update guards and redirect
      session.refetch();
    },
  });

  return (
    <ViewSafeContent>
      <AuthHeader />
      <Center flex={1} p={24}>
        <form.AppForm>
          <Stack spacing={24} w="100%">
            <Button variant="@ghost" pl={0} onPress={router.back}>
              <IconArrowLeft width={18} height={18} />
              {t('auth:verification.back')}
            </Button>
            <Stack spacing={8}>
              <Text fontWeight="bold" fontSize="lg">
                {t('auth:verification.title')}
              </Text>
              <Text fontWeight={400} fontSize="sm">
                {t('auth:verification.description')}
                <Text fontWeight={800}>{email}</Text>.{' '}
                {t('auth:verification.enterItBelow')}
              </Text>
            </Stack>
            <Stack spacing={16}>
              <Stack spacing={8}>
                <form.AppField name="code">
                  {(field) => (
                    <field.Field>
                      <field.Label>
                        {t('auth:verification.verificationCode.label')}
                      </field.Label>
                      <field.FieldOtp codeLength={6} />
                      <field.Helper>
                        {t('auth:verification.expireHint')}
                      </field.Helper>
                    </field.Field>
                  )}
                </form.AppField>
              </Stack>
              <form.Submit>{t('auth:verification.confirm')}</form.Submit>
            </Stack>
            <LoginOtpHint />
          </Stack>
        </form.AppForm>
      </Center>
    </ViewSafeContent>
  );
};
