import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { toast } from 'sonner-native';
import { z } from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { IconArrowLeft } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

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
      <View className="flex-1 items-center justify-center p-6">
        <form.AppForm>
          <View className="w-full max-w-[400px] gap-6">
            <Button variant="ghost" className="pl-0" onPress={router.back}>
              <Icon
                icon={IconArrowLeft}
                className="text-foreground size-[18px]"
              />
              {t('auth:verification.back')}
            </Button>
            <View className="gap-2">
              <Text className="text-lg font-bold">
                {t('auth:verification.title')}
              </Text>
              <Text className="text-sm font-normal">
                {t('auth:verification.description')}
                <Text className="font-extrabold">{email}</Text>.{' '}
                {t('auth:verification.enterItBelow')}
              </Text>
            </View>
            <View className="gap-4">
              <View className="gap-2">
                <form.AppField name="code">
                  {(field) => (
                    <field.Field>
                      <field.Label>
                        {t('auth:verification.verificationCode.label')}
                      </field.Label>
                      <field.FieldOtp codeLength={6} autoFocus />
                      <field.Helper>
                        {t('auth:verification.expireHint')}
                      </field.Helper>
                    </field.Field>
                  )}
                </form.AppField>
              </View>
              <form.Submit>{t('auth:verification.confirm')}</form.Submit>
            </View>
            <LoginOtpHint />
          </View>
        </form.AppForm>
      </View>
    </ViewSafeContent>
  );
};
