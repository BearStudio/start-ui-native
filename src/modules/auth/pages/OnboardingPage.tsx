import { Formiz, useForm } from '@formiz/core';
import { LogOut } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { apiHooks } from '@/api/api-hooks';
import { FieldInput } from '@/components/FieldInput';
import { LucideIcon } from '@/components/LucideIcon';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import { authClient } from '@/lib/auth-client';
import useSessionStore from '@/modules/auth/stores/auth.store';
import { useToast } from '@/modules/toast/useToast';

const OnboardingPage = () => {
  const { t } = useTranslation('onboarding');
  const { showError, showSuccess } = useToast();
  const session = authClient.useSession();

  const onboardingForm = useForm<{ name: string }>({
    onValidSubmit: (values) => {
      submitOnboarding.mutate(values);
    },
  });

  const submitOnboarding = apiHooks.useAccountSubmitOnboarding(
    {},
    {
      onSuccess: (_data, variables) => {
        session?.refetch?.();
        showSuccess(t('feedbacks.success', { name: variables.name }));
      },
      onError: (err) => {
        console.log(JSON.stringify(err, null, 2));
        showError(t('feedbacks.error'));
      },
    }
  );
  return (
    <Container>
      <Formiz connect={onboardingForm}>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
          }}
        >
          {/* Header */}
          <Box mb="md">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue('neutral.900', 'neutral.50')}
            >
              {t('title')}
            </Text>
            <Text
              fontSize="md"
              color={useColorModeValue('neutral.700', 'neutral.400')}
            >
              {t('description')}
            </Text>
          </Box>

          {/* Name field */}
          <FieldInput
            name="name"
            label={t('inputs.name.label')}
            required={t('inputs.name.required')}
            defaultValue={session.data?.user.name || ''}
            componentProps={{
              autoCapitalize: 'words',
              returnKeyType: 'done',
            }}
          />

          {/* Submit button */}
          <Button
            onPress={() => onboardingForm.submit()}
            isLoading={submitOnboarding.isLoading}
            isDisabled={onboardingForm.isSubmitted && !onboardingForm.isValid}
            variant="@primary"
            size="md"
            mt="md"
          >
            {t('actions.submit')}
          </Button>
        </Content>

        {/* Footer */}
        <Footer alignItems="center">
          <Text size="sm" color="neutral.700">
            {t('loggedWith', { email: session?.data?.user?.email })}
          </Text>
          <HStack
            as="TouchableOpacity"
            alignItems="center"
            spacing="sm"
            onPress={() => {
              authClient.signOut();
              useSessionStore.getState().reset();
            }}
          >
            <LucideIcon icon={LogOut} size={12} color="neutral.700" />
            <Text size="sm" color="neutral.700">
              {t('actions.logout')}
            </Text>
          </HStack>
        </Footer>
      </Formiz>
    </Container>
  );
};

export default OnboardingPage;
