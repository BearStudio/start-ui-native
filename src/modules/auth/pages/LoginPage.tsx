import { Formiz, useForm } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { EnvironmentVariablesModal } from '@/components/EnvironmentVariablesModal';
import { FieldInput } from '@/components/FieldInput';
import { useEnvironmentCheck } from '@/hooks/useEnvironmentCheck';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { authClient } from '@/lib/auth-client';
import { CardInfoAuthStep } from '@/modules/auth/components/CardInfoAuthStep';
import { useToast } from '@/modules/toast/useToast';

export const Separator = () => {
  const lineColor = useColorModeValue('neutral.200', 'neutral.600');
  const textColor = useColorModeValue('neutral.500', 'neutral.400');
  const { t } = useTranslation();
  return (
    <HStack w="100%" alignItems="center" my="xl" spacing="sm">
      <Box flex={1} h={1} bg={lineColor} />

      {/* “OR” label */}
      <Text
        variant="medium"
        fontSize="sm"
        color={textColor}
        px="sm" /* a touch of breathing room */
      >
        {t('login:card.or')}
      </Text>

      {/* right line */}
      <Box flex={1} h={1} bg={lineColor} />
    </HStack>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();
  const { showError } = useToast();
  const router = useRouter();
  const {
    isModalVisible,
    missingVariables,
    showEnvironmentModal,
    hideEnvironmentModal,
  } = useEnvironmentCheck();

  const loginForm = useForm<{ email: string }>({
    onValidSubmit: async ({ email }) => {
      try {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'sign-in',
        });
        if (error) {
          showError(
            error.code
              ? t(`auth:errorCode.${String(error.code)}`)
              : t('login:feedbacks.error')
          );
          return;
        }
        router.navigate({
          pathname: '/verify',
          params: {
            email,
          },
        });
      } catch (err) {
        showError(t('login:feedbacks.error'));
        console.error('sendVerificationOtp error:', err);
      }
    },
  });

  const social = useMutation({
    mutationFn: async (
      provider: Parameters<typeof authClient.signIn.social>[0]['provider']
    ) => {
      const response = await authClient.signIn.social({
        provider: provider,
        callbackURL: 'start-ui-native://login',
        errorCallbackURL: 'start-ui-native://login',
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });

  const handleGitHubLogin = () => {
    const canProceed = showEnvironmentModal();
    if (canProceed) {
      social.mutate('github');
    }
  };

  return (
    <Container>
      <Formiz connect={loginForm}>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          p={48}
        >
          <Text fontSize="2xl" variant="bold">
            {/* Login or Sign Up */}
            {t('login:title')}
          </Text>
          <Text
            fontSize="sm"
            variant="medium"
            color={useColorModeValue('neutral.600', 'white')}
            mt="md"
            textAlign="center"
          >
            {/* Enter your email to login or create an account */}
            {t('login:subtitle')}
          </Text>
          <FieldInput
            name="email"
            required={t('login:input.required')}
            validations={[
              {
                handler: isEmail(),
                message: t('login:input.validations.email'),
              },
            ]}
            mt="xl"
            componentProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              returnKeyType: 'next',
              placeholder: 'Email',
            }}
          />
          <Button
            onPress={() => loginForm.submit()}
            isLoading={false}
            variant="@primary"
            size="lg"
            full
            mt={16}
          >
            {t('login:actions.login')}
          </Button>

          {process.env.MODE === 'DEV' && (
            <CardInfoAuthStep type="email" mt="16" />
          )}

          <Separator />
          <Button
            variant="outline"
            full
            isLoading={social.isLoading}
            onPress={handleGitHubLogin}
          >
            {t('login:actions.loginWithGitHub')}
          </Button>
        </Content>
      </Formiz>

      <EnvironmentVariablesModal
        isOpen={isModalVisible}
        onClose={hideEnvironmentModal}
        missingVariables={missingVariables}
      />
    </Container>
  );
};

export default LoginPage;
