import { useLocalSearchParams } from 'expo-router';
import { Button, Center, HStack, Stack, Text } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { IconArrowLeft, Logo } from '@/components/icons/generated';
import { ThemeToggle } from '@/components/theme-toggle';

import { authClient } from '@/features/auth/client';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewOtpVerification = () => {
  const session = authClient.useSession();
  const { email } = useLocalSearchParams();

  const insets = useSafeAreaInsets();

  const form = useAppForm({
    defaultValues: { code: '' },
    validators: { onSubmit: z.object({ code: z.string().length(6) }) },
    onSubmit: async (submission) => {
      if (typeof email !== 'string') {
        return;
      }
      await authClient.signIn.emailOtp({
        email,
        otp: submission.value.code,
      });

      // Refetch session to update guards and redirect
      session.refetch();
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
        <ThemeToggle />
      </HStack>
      <Center flex={1} p={24}>
        <form.AppForm>
          <Stack spacing={24} w="100%">
            <Button gap={4} variant="@ghost" pl={0}>
              <IconArrowLeft width={18} height={18} />
              Back
            </Button>
            <Stack spacing={8}>
              <Text fontWeight="bold" fontSize="lg">
                Verification
              </Text>
              <Text fontWeight={400} fontSize="sm">
                If you have an account, we have sent a code to{' '}
                <Text fontWeight={800}>{email}</Text>. Enter it below.
              </Text>
            </Stack>
            <Stack spacing={16}>
              <Stack spacing={8}>
                <form.AppField name="code">
                  {(field) => (
                    <field.Field>
                      <field.Label>Verification code</field.Label>
                      <field.FieldOtp codeLength={6} />
                      <field.Helper>
                        The code expires shortly (5 minutes)
                      </field.Helper>
                    </field.Field>
                  )}
                </form.AppField>
              </Stack>
              <form.Submit>Confirm</form.Submit>
            </Stack>
          </Stack>
        </form.AppForm>
      </Center>
    </ViewSafeContent>
  );
};
