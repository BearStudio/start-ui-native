import { getUiState } from '@bearstudio/ui-state';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { toast } from 'sonner-native';
import z from 'zod';

import { useAppForm } from '@/lib/tanstack-form/config';
import { useDisclosure } from '@/hooks/use-disclosure';

import { IconEdit3, IconLogOut } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { AvatarWithFallback } from '@/components/ui/avatar';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { FullLoader } from '@/components/ui/full-loader';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { Text } from '@/components/ui/text';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Version } from '@/components/version';

import { authClient } from '@/features/auth/client';
import { ViewSafeContent } from '@/layout/view-safe-content';
import { ViewSafeScrollContent } from '@/layout/view-safe-scroll-content';

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
        name: z
          .string()
          .nonempty({ error: t('account:user.updateName.required') }),
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
      handleCloseNameSheet();
    },
  });

  const handleCloseNameSheet = () => {
    updateNameForm.reset();
    updateNameSheet.onClose();
  };

  const ui = getUiState((set) => {
    if (session.isPending) return set('pending');
    if (session.error) return set('error', { error: session.error });

    if (!session.data) return set('not-logged');

    return set('default', {
      data: session.data,
    });
  });

  return (
    <ViewSafeScrollContent>
      <View className="flex-1 gap-4">
        <View className="flex flex-1 flex-col gap-4 md:flex-row md:items-start">
          <View className="flex md:flex-1">
            {ui
              .match('pending', () => <FullLoader />)
              .match('error', () => <></>)
              .match('not-logged', () => <></>)
              .match('default', ({ data }) => (
                <Card>
                  <CardHeader>
                    <View className="flex flex-row items-center gap-2">
                      <AvatarWithFallback
                        name={data.user.name}
                        image={data.user.image}
                      />
                      <CardTitle>{data.user.name}</CardTitle>
                    </View>
                    <Button
                      variant="ghost"
                      onPress={() => signoutSheet.onOpen()}
                    >
                      <Icon icon={IconLogOut} />
                      <Button.Text>{t('account:user.signOut')}</Button.Text>
                    </Button>
                    <BottomSheet
                      isOpen={signoutSheet.isOpen}
                      onClose={signoutSheet.onClose}
                    >
                      <View className="flex flex-1 gap-1">
                        <Text className="font-bold">
                          {t('auth:signOut.confirm.title')}
                        </Text>
                        <Text className="text-sm font-medium" variant="muted">
                          {t('auth:signOut.confirm.description')}
                        </Text>
                      </View>
                      <View className="flex flex-row gap-2">
                        <Button
                          variant="secondary"
                          onPress={() => signoutSheet.onClose()}
                        >
                          {t('auth:signOut.confirm.cancel')}
                        </Button>
                        <Button
                          variant="destructive"
                          onPress={() => {
                            queryClient.clear();
                            authClient.signOut();
                          }}
                          className="flex flex-1"
                        >
                          <Icon
                            icon={IconLogOut}
                            className="size-5 text-primary-foreground"
                          />
                          <Button.Text>
                            {t('auth:signOut.confirm.signOut')}
                          </Button.Text>
                        </Button>
                      </View>
                    </BottomSheet>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <View className="gap-0.5">
                      <Text className="text-xs font-medium" variant="muted">
                        {t('account:user.name')}
                      </Text>
                      <Button
                        variant="link"
                        size="sm"
                        onPress={() => updateNameSheet.onOpen()}
                        className="-mx-3 self-start"
                      >
                        <Button.Text>{data.user.name}</Button.Text>
                        <Icon icon={IconEdit3} />
                      </Button>
                      <BottomSheet
                        isOpen={updateNameSheet.isOpen}
                        onClose={handleCloseNameSheet}
                      >
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
                                  className="min-w-64"
                                />
                              </field.Field>
                            )}
                          </updateNameForm.AppField>

                          <View className="flex flex-row gap-2">
                            <Button
                              variant="secondary"
                              onPress={() => handleCloseNameSheet()}
                            >
                              {t('account:user.updateName.cancel')}
                            </Button>
                            <updateNameForm.Submit full>
                              {t('account:user.updateName.save')}
                            </updateNameForm.Submit>
                          </View>
                        </updateNameForm.AppForm>
                      </BottomSheet>
                    </View>
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <View className="gap-0.5">
                      <Text className="text-xs font-medium" variant="muted">
                        {t('account:user.email')}
                      </Text>
                      <Text className="text-sm font-medium">
                        {data.user.email}
                      </Text>
                    </View>
                  </CardBody>
                </Card>
              ))
              .exhaustive()}
          </View>
          <View className="flex md:flex-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('account:displayPreferences.title')}</CardTitle>
              </CardHeader>
              <Divider />
              <CardBody className="p-4">
                <View>
                  <Text className="text-xs font-medium" variant="muted">
                    {t('account:displayPreferences.theme')}
                  </Text>
                  <ThemeSwitcher />
                </View>
              </CardBody>
              <Divider />
              <CardBody className="p-4">
                <View>
                  <Text className="text-xs font-medium" variant="muted">
                    {t('account:displayPreferences.language')}
                  </Text>
                  <LocaleSwitcher />
                </View>
              </CardBody>
            </Card>
          </View>
        </View>
        <ViewSafeContent className="absolute right-0 bottom-2 left-0 flex flex-row items-center justify-center">
          <Version />
        </ViewSafeContent>
      </View>
    </ViewSafeScrollContent>
  );
};
