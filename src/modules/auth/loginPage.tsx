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

import { FieldInput } from '@/components/FieldInput';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { HeaderAuth } from '@/layout/HeaderAuth';
import { authClient } from '@/lib/auth-client';
import { CardInfoAuthStep } from '@/modules/auth/CardInfoAuthStep';
import { useToast } from '@/modules/toast/useToast';

export const Separator = () => {
  const lineColor = useColorModeValue('brand.200', 'brand.600');
  const textColor = useColorModeValue('brand.500', 'brand.400');
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

  return (
    <Container>
      <HeaderAuth />
      <Formiz connect={loginForm}>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text fontSize="2xl" variant="bold">
            {/* Login or Sign Up */}
            {t('login:title')}
          </Text>
          <Text
            fontSize="sm"
            variant="medium"
            color={useColorModeValue('brand.600', 'white')}
            mt="md"
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
            variant="@secondary"
            full
            isLoading={social.isLoading}
            onPress={() => social.mutate('github')}
          >
            {t('login:actions.loginWithGitHub', { provider: 'GitHub' })}
          </Button>
        </Content>
      </Formiz>
    </Container>
  );
};

export default LoginPage;
