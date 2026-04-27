import { useMutation } from '@tanstack/react-query';
import appConfig from 'app.config';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import { z } from 'zod';

import { Form } from '@/lib/tanstack-form/components';
import { useAppForm } from '@/lib/tanstack-form/config';

import { Text } from '@/components/ui/text';
import { Version } from '@/components/version';

import { useOnboardingStore } from '@/features/app-onboarding/store';
import { ViewOnboarding } from '@/features/app-onboarding/view-app-onboarding';
import { AuthHeader } from '@/features/auth/auth-header';
import { authClient } from '@/features/auth/client';
import { LoginEmailHint } from '@/features/devtools/login-hint';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewSignIn = () => {
  const insets = useSafeAreaInsets();

  const { t } = useTranslation(['auth']);

  const router = useRouter();

  const form = useAppForm({
    defaultValues: { email: '' },
    validators: { onSubmit: z.object({ email: z.email() }) },
    onSubmit: (submission) => {
      authClient.emailOtp.sendVerificationOtp({
        email: submission.value.email,
        type: 'sign-in',
      });
      router.push({
        pathname: '/(public)/otp-verification',
        params: { email: submission.value.email },
      });
    },
  });

  // For social sign in integration
  const _social = useMutation({
    mutationFn: async (
      provider: Parameters<typeof authClient.signIn.social>[0]['provider']
    ) => {
      const response = await authClient.signIn.social({
        provider,
        callbackURL: `${appConfig.scheme}//home`,
        errorCallbackURL: `${appConfig.scheme}//sign-in`,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isOnboarded = useOnboardingStore((state) => state.done);

  return (
    <View className="h-screen w-screen">
      {!isOnboarded && (
        <View className="absolute inset-0 z-100">
          <ViewOnboarding />
        </View>
      )}
      <ViewSafeContent className="justify-center">
        <AuthHeader />
        <View className="items-center justify-center p-8">
          <Form form={form}>
            <View className="w-full max-w-[400px] gap-6">
              <View className="items-center gap-2">
                <Text variant="h2">{t('auth:signin.title')}</Text>
                <Text className="text-muted-foreground text-center text-sm font-normal">
                  {t('auth:signin.subtitle')}
                </Text>
              </View>
              <View className="gap-4">
                <form.AppField name="email">
                  {(field) => (
                    <field.Field>
                      <field.FieldText
                        placeholder={t('auth:signin.email.placeholder')}
                        autoCapitalize="none"
                        placeholderTextColor="neutral.600"
                        keyboardType="email-address"
                        returnKeyType="done"
                        onSubmitEditing={form.handleSubmit}
                      />
                    </field.Field>
                  )}
                </form.AppField>
                <form.Submit full>
                  {t('auth:signin.loginWithEmail')}
                </form.Submit>
                {/* For social sign in integration */}
                {/* <HStack alignItems="center" spacing={16}>
            <Divider color="neutral.200" flex={1} orientation="horizontal" />
            <Text
              fontSize="sm"
              variant="muted"
              textTransform="uppercase"
              textAlign="center"
              w={24}
            >
              {t('auth:signin.or')}
            </Text>
            <Divider color="neutral.200" flex={1} orientation="horizontal" />
          </HStack> */}
                {/* <Button
            full
            variant="@secondary"
            onPress={() => social.mutate('github')}
          >
            {t('auth:signin.loginWithGithub')}
          </Button> */}
                <LoginEmailHint />
              </View>
            </View>
          </Form>
        </View>
        <View
          className="absolute right-0 left-0 flex flex-row items-center justify-center p-6"
          style={{ bottom: insets.bottom }}
        >
          <Version className="text-center" />
        </View>
      </ViewSafeContent>
    </View>
  );
};
