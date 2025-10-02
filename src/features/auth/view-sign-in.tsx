import { useMutation } from '@tanstack/react-query';
import appConfig from 'app.config';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
} from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import { z } from 'zod';

import { Form } from '@/lib/tanstack-form/components';
import { useAppForm } from '@/lib/tanstack-form/config';

import { Version } from '@/components/version';

import { AuthHeader } from '@/features/auth/auth-header';
import { authClient } from '@/features/auth/client';
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

  const social = useMutation({
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

  return (
    <ViewSafeContent>
      <AuthHeader />
      <Center flex={1} p={24}>
        <Stack spacing={24} w="100%">
          <Stack align="center" spacing={8}>
            <Text fontWeight="bold" fontSize="2xl" textAlign="center">
              {t('auth:signin.title')}
            </Text>
            <Text
              fontWeight={400}
              fontSize="sm"
              variant="muted"
              textAlign="center"
            >
              {t('auth:signin.subtitle')}
            </Text>
          </Stack>
          <Form form={form}>
            <Stack spacing={16}>
              <form.AppField name="email">
                {(field) => (
                  <field.Field>
                    <field.FieldText
                      placeholder={t('auth:signin.email.placeholder')}
                      autoCapitalize="none"
                      placeholderTextColor="neutral.600"
                    />
                  </field.Field>
                )}
              </form.AppField>
              <form.Submit full>{t('auth:signin.loginWithEmail')}</form.Submit>
            </Stack>
          </Form>
          <HStack alignItems="center" spacing={16}>
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
          </HStack>
          <Button
            full
            variant="@secondary"
            onPress={() => social.mutate('github')}
          >
            {t('auth:signin.loginWithGithub')}
          </Button>
        </Stack>
      </Center>
      <HStack
        p={24}
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bottom={insets.bottom}
        left={0}
        right={0}
      >
        <Version textAlign="center" />
      </HStack>
    </ViewSafeContent>
  );
};
