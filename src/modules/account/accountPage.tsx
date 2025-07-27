import { Formiz, useForm, useFormFields } from '@formiz/core';
import { Edit2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Stack,
  Text,
  TouchableOpacity,
  useColorModeValue,
  useDisclosure,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { CardStatus } from '@/components/CardStatus';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import {
  DataCard,
  DataCardRow,
  DataCardRowDivider,
  DataCardTitle,
} from '@/components/DataCard';
import { DraggableModalInput } from '@/components/DraggableModalInput';
import { FieldInput } from '@/components/FieldInput';
import { LanguageSelect } from '@/components/LanguageSelect';
import { LucideIcon } from '@/components/LucideIcon';
import { ThemeSelect } from '@/components/ThemeSelect';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { LoadingScreen } from '@/layout/LoadingScreen';
import { authClient } from '@/lib/auth-client';
import { useAccountUpdate } from '@/modules/account/account.service';
import { useToast } from '@/modules/toast/useToast';

const AccountPage = () => {
  const session = authClient.useSession();
  const { showError, showSuccess, showInfo } = useToast();
  const { t } = useTranslation();

  const logoutModal = useDisclosure();
  const deleteAccountModal = useDisclosure();
  const updateNameModal = useDisclosure();

  const { updateAccount: updateProfile, isLoading: isUpdatingProfile } =
    useAccountUpdate({
      onSuccess: () => {
        showSuccess(t('account:feedbacks.updateAccount.success'));
        session.refetch();
        updateNameModal.onClose();
      },
      onError: (err) => {
        showError(
          err.response?.data?.message?.startsWith('[DEMO]')
            ? t('account:feedbacks.updateAccount.error.demo')
            : t('account:feedbacks.updateAccount.error.default')
        );
      },
    });

  const submitProfile = (values: { name: string }) => {
    updateProfile({ name: values.name });
  };

  const profileForm = useForm({ onValidSubmit: submitProfile });

  const deleteAccountForm = useForm({
    onValidSubmit: () => {
      deleteAccountModal.onClose();
      showInfo(t('account:confirmationModals.deleteAccount.submit'));
    },
  });

  const { confirmation } = useFormFields({
    connect: deleteAccountForm,
    selector: (field) => field.isValid,
    fields: ['confirmation'] as const,
  });

  const handlerValue = t(
    'account:confirmationModals.deleteAccount.input.validations.isValid.handlerValue'
  );

  const colorIcon = useColorModeValue('neutral.500', 'neutral.400');

  if (session.isPending || !session.data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container>
        <Content>
          <DataCard mb="xl">
            <DataCardRow>
              <Avatar
                size="sm"
                src={session.data?.user.image || ''}
                name={session.data?.user.name || ''}
              />
              <DataCardTitle>
                {session.data?.user.name || t('account:sections.profile.title')}
              </DataCardTitle>
              <Box flex={1} />
              <ButtonIcon
                icon="logout"
                onPress={logoutModal.onOpen}
                variant="ghost"
                iconSet="AntDesign"
                size="sm"
              >
                {t('account:actions.logout')}
              </ButtonIcon>
            </DataCardRow>

            <DataCardRowDivider />
            <DataCardRow label="Name">
              <TouchableOpacity
                flexDirection="row"
                align="center"
                gap="md"
                onPress={updateNameModal.onOpen}
              >
                <Text
                  fontSize="md"
                  color="neutral.800"
                  _dark={{ color: 'neutral.200' }}
                >
                  {session.data?.user.name}
                </Text>
                <LucideIcon icon={Edit2} size="md" color={colorIcon} />
              </TouchableOpacity>
            </DataCardRow>
            <DataCardRow label="Email">
              <Text
                fontSize="md"
                color="neutral.800"
                _dark={{ color: 'neutral.200' }}
              >
                {session.data?.user.email || t('account:sections.email.title')}
              </Text>
            </DataCardRow>
          </DataCard>
          <DataCard>
            <DataCardRow>
              <DataCardTitle>
                {t('account:sections.profile.displayPreferences')}
              </DataCardTitle>
            </DataCardRow>
            <DataCardRowDivider />
            <DataCardRow label="Theme">
              <ThemeSelect type="select" />
            </DataCardRow>
            <DataCardRowDivider />
            <DataCardRow label="Language">
              <LanguageSelect />
            </DataCardRow>
          </DataCard>
          <Box h={50} />
        </Content>
      </Container>

      <ConfirmationModal
        title={t('account:confirmationModals.logout.title')}
        description={t('account:confirmationModals.logout.description')}
        confirmColorScheme="error"
        confirmLabel={t('account:confirmationModals.logout.confirmLabel')}
        confirmIcon="logout"
        confirmIconSet="AntDesign"
        onConfirm={() => authClient.signOut()}
        onClose={logoutModal.onClose}
        isOpen={logoutModal.isOpen}
        h={150}
      />

      <ConfirmationModal
        title={t('account:sections.profile.updateName.title')}
        confirmColorScheme="neutral"
        confirmLabel={t('commons:actions.update')}
        isOpen={updateNameModal.isOpen}
        onClose={updateNameModal.onClose}
        onConfirm={() => profileForm.submit()}
        isLoadingConfirm={isUpdatingProfile}
        h={180}
      >
        <Formiz connect={profileForm}>
          <Stack spacing="lg">
            <FieldInput
              name="name"
              required={t('account:sections.profile.input.required')}
              defaultValue={session.data?.user.name}
              componentProps={{
                autoCapitalize: 'none',
                returnKeyType: 'done',
              }}
            />
          </Stack>
        </Formiz>
      </ConfirmationModal>

      <ConfirmationModal
        title={t('account:confirmationModals.deleteAccount.title')}
        description={t('account:confirmationModals.deleteAccount.description')}
        confirmColorScheme="error"
        confirmLabel={t(
          'account:confirmationModals.deleteAccount.confirmLabel'
        )}
        isDisabledConfirm={!confirmation}
        onConfirm={() => deleteAccountForm.submit()}
        onClose={deleteAccountModal.onClose}
        isOpen={deleteAccountModal.isOpen}
        h={450}
      >
        <Formiz connect={deleteAccountForm}>
          <Stack spacing="lg">
            <CardStatus
              type="warning"
              title={t('account:confirmationModals.deleteAccount.card.title')}
            >
              <Text
                color="neutral.800"
                _dark={{
                  color: 'neutral.100',
                }}
                fontWeight="bold"
                mt="lg"
              >
                {t('account:confirmationModals.deleteAccount.card.description')}
              </Text>
            </CardStatus>

            <FieldInput
              name="confirmation"
              label={t('account:confirmationModals.deleteAccount.input.label', {
                handlerValue,
              })}
              required={t(
                'account:confirmationModals.deleteAccount.input.required'
              )}
              validations={[
                {
                  handler: (value: string) => value === handlerValue,
                  message: t(
                    'account:confirmationModals.deleteAccount.input.validations.isValid.message',
                    {
                      handlerValue,
                    }
                  ),
                },
              ]}
              InputComponent={DraggableModalInput}
            />
          </Stack>
        </Formiz>
      </ConfirmationModal>
    </>
  );
};

export default AccountPage;
