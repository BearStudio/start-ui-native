import { useMutation } from '@tanstack/react-query';
import appConfig from 'app.config';
import { useRouter } from 'expo-router';
import {
  Button,
  Center,
  Divider,
  HStack,
  IconButton,
  Stack,
  Text,
} from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import { z } from 'zod';

import { Form } from '@/lib/tanstack-form/components';
import { useAppForm } from '@/lib/tanstack-form/config';

import { IconSun, Logo } from '@/components/icons/generated';
import { Version } from '@/components/version';

import { authClient } from '@/features/auth/client';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewSignIn = () => {
  const insets = useSafeAreaInsets();

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
      <HStack
        justifyContent="space-between"
        p={24}
        alignItems="center"
        position="absolute"
        top={insets.top}
        left={0}
        right={0}
      >
        <Logo color="black" _dark={{ color: 'white' }} width={96} height={22} />
        <IconButton icon={<IconSun />} variant="@ghost" />
      </HStack>
      <Center flex={1} p={24}>
        <Stack spacing={24} w="100%">
          <Stack align="center" spacing={8}>
            <Text fontWeight="bold" fontSize="2xl">
              Login to your account
            </Text>
            <Text fontWeight={400} fontSize="sm">
              Enter your email to login to your account
            </Text>
          </Stack>
          <Form form={form}>
            <Stack spacing={16}>
              <form.AppField name="email">
                {(field) => (
                  <field.Field>
                    <field.FieldText
                      placeholder="Email"
                      autoCapitalize="none"
                      placeholderTextColor="neutral.600"
                    />
                  </field.Field>
                )}
              </form.AppField>
              <form.Submit full>Login with email</form.Submit>
            </Stack>
          </Form>
          <HStack alignItems="center" spacing={16}>
            <Divider color="neutral.200" flex={1} orientation="horizontal" />
            <Text color="neutral.600" fontSize="sm">
              OR
            </Text>
            <Divider color="neutral.200" flex={1} orientation="horizontal" />
          </HStack>
          <Button
            full
            variant="@secondary"
            onPress={() => social.mutate('github')}
          >
            Login with GitHub
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
