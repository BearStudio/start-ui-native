import { Center, HStack, Stack, Text } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import z from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { Logo } from '@/components/icons/generated';
import { ThemeToggle } from '@/components/ui/theme-toggle';

import { authClient } from '@/features/auth/client';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const ViewOnboarding = () => {
  const insets = useSafeAreaInsets();

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
        <Stack spacing={24} w="100%">
          <Stack spacing={8}>
            <Text fontWeight="bold" fontSize="lg">
              Welcome
            </Text>
            <Text fontWeight={400} fontSize="sm">
              Let's personalize your experience
            </Text>
          </Stack>
          <form.AppForm>
            <Stack spacing={16}>
              <Stack spacing={8}>
                <form.AppField name="name">
                  {(field) => (
                    <field.Field>
                      <field.Label>What is your name?</field.Label>
                      <field.FieldText />
                    </field.Field>
                  )}
                </form.AppField>
              </Stack>
              <form.Submit>Continue</form.Submit>
            </Stack>
          </form.AppForm>
        </Stack>
      </Center>
    </ViewSafeContent>
  );
};
