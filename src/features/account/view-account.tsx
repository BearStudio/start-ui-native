import { getUiState } from '@bearstudio/ui-state';
import { useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from 'react-native-ficus-ui';
import z from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';

import { BottomSheet, BottomSheetBox } from '@/components/bottom-sheet';
import { FullLoader } from '@/components/full-loader';
import { IconEdit3, IconLogOut } from '@/components/icons/generated';

import { authClient } from '@/features/auth/client';

export const ViewAccount = () => {
  const session = authClient.useSession();
  const queryClient = useQueryClient();

  const signoutSheet = useDisclosure();
  const updateNameSheet = useDisclosure();

  const updateNameForm = useAppForm({
    defaultValues: { name: session.data?.user?.name ?? '' },
    validators: {
      onSubmit: z.object({
        name: z.string().nonempty({ error: 'Name could not be empty' }),
      }),
    },
    onSubmit: async (submission) => {
      await authClient.updateUser({ name: submission.value.name });
      updateNameSheet.onClose();
    },
  });

  const ui = getUiState((set) => {
    if (session.isPending) return set('pending');
    if (session.error) return set('error', { error: session.error });

    if (!session.data) return set('not-logged');

    return set('default', {
      data: session.data,
    });
  });

  return (
    <Box p={16}>
      {ui
        .match('pending', () => <FullLoader />)
        .match('error', () => <></>)
        .match('not-logged', () => <></>)
        .match('default', ({ data }) => (
          <Box
            bg="white"
            borderRadius="md"
            borderWidth={1}
            borderColor="neutral.200"
          >
            <HStack p={16} justifyContent="space-between">
              <HStack alignItems="center" spacing={8}>
                <Avatar name={data.user.name} size="xs" colorScheme="neutral" />
                <Text fontWeight="bold">{data.user.name}</Text>
              </HStack>
              <Button
                variant="@ghost"
                onPress={() => signoutSheet.onOpen()}
                gap={4}
              >
                <IconLogOut width={14} height={14} />
                Sign out
              </Button>
              <BottomSheet
                isOpen={signoutSheet.isOpen}
                onClose={signoutSheet.onClose}
              >
                <BottomSheetBox gap={16}>
                  <Stack gap={4}>
                    <Text fontWeight="bold">Account Sign out</Text>
                    <Text color="neutral.600" fontSize="sm" fontWeight="500">
                      You are about to end your session
                    </Text>
                  </Stack>
                  <Button
                    variant="@secondary"
                    full
                    onPress={() => signoutSheet.onClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      queryClient.clear();
                      authClient.signOut();
                    }}
                    full
                    gap={8}
                  >
                    <IconLogOut width={20} height={20} />
                    Sign out
                  </Button>
                </BottomSheetBox>
              </BottomSheet>
            </HStack>
            <Divider color="neutral.200" />
            <Box p={16}>
              <Stack spacing={2}>
                <Text fontSize="xs" fontWeight="medium" color="neutral.700">
                  Name
                </Text>
                <Button
                  variant="@link"
                  size="xs"
                  fontSize="sm"
                  fontWeight="medium"
                  onPress={() => updateNameSheet.onOpen()}
                >
                  {data.user.name}{' '}
                  <IconEdit3 width={16} height={16} color="neutral.600" />
                </Button>
                <BottomSheet
                  isOpen={updateNameSheet.isOpen}
                  onClose={updateNameSheet.onClose}
                >
                  <BottomSheetBox gap={16}>
                    <Text fontWeight="bold">Update name</Text>
                    <updateNameForm.AppForm>
                      <updateNameForm.AppField name="name">
                        {(field) => (
                          <field.Field>
                            <field.FieldText />
                          </field.Field>
                        )}
                      </updateNameForm.AppField>

                      <Button
                        variant="@secondary"
                        full
                        onPress={() => updateNameSheet.onClose()}
                      >
                        Cancel
                      </Button>
                      <updateNameForm.Submit full>Save</updateNameForm.Submit>
                    </updateNameForm.AppForm>
                  </BottomSheetBox>
                </BottomSheet>
              </Stack>
            </Box>
            <Divider color="neutral.200" />
            <Box p={16}>
              <Stack spacing={2}>
                <Text fontSize="xs" fontWeight="medium" color="neutral.700">
                  Email
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {data.user.email}
                </Text>
              </Stack>
            </Box>
          </Box>
        ))
        .exhaustive()}
    </Box>
  );
};
