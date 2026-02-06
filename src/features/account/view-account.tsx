import { getUiState } from '@bearstudio/ui-state';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';
import z from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';
import { useDisclosure } from '@/hooks/use-disclosure';

import { IconEdit3, IconLogOut } from '@/components/icons/generated';
import { AvatarWithFallback } from '@/components/ui/avatar';
import { BottomSheet, BottomSheetBox } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { FullLoader } from '@/components/ui/full-loader';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { HStack, Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Version } from '@/components/version';

import { authClient } from '@/features/auth/client';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewAccount = () => {
  const session = authClient.useSession();
  const queryClient = useQueryClient();
  const { t } = useTranslation(['account', 'auth']);

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
      await authClient.updateUser(
        { name: submission.value.name },
        {
          onError: () => {
            toast.error(t('account:user.updateName.error'));
          },
        }
      );
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
    <ViewTabContent>
      <Stack spacing={16} className="flex-1">
        {ui
          .match('pending', () => <FullLoader />)
          .match('error', () => <></>)
          .match('not-logged', () => <></>)
          .match('default', ({ data }) => (
            <Card>
              <CardHeader>
                <HStack spacing={8} alignItems="center">
                  <AvatarWithFallback
                    name={data.user.name}
                    size="xs"
                    image={data.user.image}
                  />
                  <CardTitle>{data.user.name}</CardTitle>
                </HStack>
                <Button variant="ghost" onPress={() => signoutSheet.onOpen()}>
                  <IconLogOut width={14} height={14} />
                  {t('account:user.signOut')}
                </Button>
                <BottomSheet
                  isOpen={signoutSheet.isOpen}
                  onClose={signoutSheet.onClose}
                >
                  <BottomSheetBox gap={16}>
                    <Stack spacing={4}>
                      <Text className="font-bold">
                        {t('auth:signOut.confirm.title')}
                      </Text>
                      <Text className="text-sm font-medium" variant="muted">
                        {t('auth:signOut.confirm.description')}
                      </Text>
                    </Stack>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onPress={() => signoutSheet.onClose()}
                    >
                      {t('auth:signOut.confirm.cancel')}
                    </Button>
                    <Button
                      onPress={() => {
                        queryClient.clear();
                        authClient.signOut();
                      }}
                      className="w-full gap-2"
                    >
                      <IconLogOut width={20} height={20} />
                      {t('auth:signOut.confirm.signOut')}
                    </Button>
                  </BottomSheetBox>
                </BottomSheet>
              </CardHeader>
              <Divider />
              <CardBody>
                <Stack spacing={2}>
                  <Text className="text-xs font-medium" variant="muted">
                    {t('account:user.name')}
                  </Text>
                  <Button
                    variant="link"
                    size="sm"
                    className="font-medium"
                    onPress={() => updateNameSheet.onOpen()}
                  >
                    {data.user.name}{' '}
                    <IconEdit3 width={16} height={16} color="#525252" />
                  </Button>
                  <BottomSheet
                    isOpen={updateNameSheet.isOpen}
                    onClose={updateNameSheet.onClose}
                  >
                    <BottomSheetBox gap={16}>
                      <Text className="font-bold">
                        {t('account:user.updateName.title')}
                      </Text>
                      <updateNameForm.AppForm>
                        <updateNameForm.AppField name="name">
                          {(field) => (
                            <field.Field>
                              <field.FieldText
                                autoFocus
                                returnKeyType="done"
                                onSubmitEditing={updateNameForm.handleSubmit}
                              />
                            </field.Field>
                          )}
                        </updateNameForm.AppField>

                        <Button
                          variant="secondary"
                          className="w-full"
                          onPress={() => updateNameSheet.onClose()}
                        >
                          {t('account:user.updateName.cancel')}
                        </Button>
                        <updateNameForm.Submit full>
                          {t('account:user.updateName.save')}
                        </updateNameForm.Submit>
                      </updateNameForm.AppForm>
                    </BottomSheetBox>
                  </BottomSheet>
                </Stack>
              </CardBody>
              <Divider />
              <CardBody>
                <Stack spacing={2}>
                  <Text className="text-xs font-medium" variant="muted">
                    {t('account:user.email')}
                  </Text>
                  <Text className="text-sm font-medium">{data.user.email}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))
          .exhaustive()}
        <Card>
          <CardHeader>
            <CardTitle>{t('account:displayPreferences.title')}</CardTitle>
          </CardHeader>
          <Divider />
          <CardBody className="p-4">
            <Stack spacing={2}>
              <Text className="text-xs font-medium" variant="muted">
                {t('account:displayPreferences.theme')}
              </Text>
              <ThemeSwitcher />
            </Stack>
          </CardBody>
          <Divider />
          <CardBody className="p-4">
            <Stack spacing={2}>
              <Text className="text-xs font-medium" variant="muted">
                {t('account:displayPreferences.language')}
              </Text>
              <LocaleSwitcher />
            </Stack>
          </CardBody>
        </Card>
        <Version className="text-center" />
      </Stack>
    </ViewTabContent>
  );
};
