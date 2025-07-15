import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { Box, Button, Text, useColorModeValue } from 'react-native-ficus-ui';

import { apiHooks } from '@/api/api-hooks';
import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { Footer } from '@/layout/Footer';
import { authClient } from '@/lib/auth-client';
import { useToast } from '@/modules/toast/useToast';

const OnboardingPage = () => {
  const { t } = useTranslation('onboarding');
  const { showError, showSuccess } = useToast();
  const session = authClient.useSession();
  // 1) form setup
  const onboardingForm = useForm<{ name: string }>({
    onValidSubmit: (values) => {
      submitOnboarding.mutate(values);
    },
  });

  // 2) mutation to your onboarding endpoint
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
        <Content>
          {/* Header */}
          <Box mb="md">
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={useColorModeValue('gray.900', 'gray.50')}
              mb="sm"
            >
              {t('title')}
            </Text>
            <Text
              fontSize="md"
              color={useColorModeValue('gray.700', 'gray.400')}
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
        </Content>

        <Footer>
          <Button
            onPress={() => onboardingForm.submit()}
            isLoading={submitOnboarding.isLoading}
            isDisabled={onboardingForm.isSubmitted && !onboardingForm.isValid}
            colorScheme="brand"
            full
          >
            {t('actions.submit')}
          </Button>
        </Footer>
      </Formiz>
    </Container>
  );
};

export default OnboardingPage;
