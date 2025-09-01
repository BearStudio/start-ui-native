// src/screens/VerifyPage.tsx
import { useEffect, useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { Box, Button, Text } from 'react-native-ficus-ui';

import { FieldCodeInput } from '@/components/FieldCodeInput';
import { LucideIcon } from '@/components/LucideIcon';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { authClient } from '@/lib/auth-client';
import { CardInfoAuthStep } from '@/modules/auth/components/CardInfoAuthStep';
import useSessionStore from '@/modules/auth/stores/auth.store';
import { useToast } from '@/modules/toast/useToast';

const VerifyPage = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();
  const { t } = useTranslation();
  const { showSuccess } = useToast();

  // Formiz instance for the 6-digit code
  const codeForm = useForm<{ code: string }>({
    onValidSubmit: async ({ code }) => {
      try {
        const { error } = await authClient.signIn.emailOtp({
          email,
          otp: code,
        });
        if (error) {
          codeForm.setValues({ code: '' });
          codeForm.setErrors({
            code: t('login:validation.error'),
          });
          return;
        }
        const session = await authClient.getSession();
        if (session.data?.user) {
          useSessionStore.getState().setIsAuthentificated(true);
          useSessionStore
            .getState()
            .setIsOnboarded(!!session.data.user.onboardedAt);
        }

        showSuccess(t('login:validation.success'));
        // TODO: navigate into the app
      } catch (err) {
        codeForm.setValues({ code: '' });
        codeForm.setErrors({
          code: t('login:validation.error'),
        });
        console.error('verify emailOtp error:', err);
      }
    },
  });
  const router = useRouter();
  // Focus the first input when screen mounts
  const codeInputRef = useRef<TextInput>(null);
  useEffect(() => {
    codeInputRef.current?.focus();
  }, []);

  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}
      >
        <Formiz connect={codeForm}>
          <Button
            variant="link"
            onPress={() => router.back()}
            colorScheme="neutral"
            px={0}
          >
            <LucideIcon icon={ArrowLeft} size={16} />
            {t('login:verification.back')}
          </Button>
          {/* Title */}
          <Text fontSize="lg" variant="bold" mb="sm">
            {t('login:verification.title')}
          </Text>

          {/* Description */}
          <Box>
            <Text
              fontSize="md"
              variant="medium"
              color="neutral.600"
              _dark={{
                color: 'neutral.300',
              }}
            >
              {t('login:verification.description1')}
            </Text>
            <Text
              fontSize="md"
              variant="medium"
              color="neutral.600"
              _dark={{
                color: 'neutral.300',
              }}
              mb="md"
            >
              <Text
                fontSize="md"
                variant="bold"
                color="neutral.600"
                _dark={{
                  color: 'neutral.300',
                }}
                mx={10}
              >
                {email}
              </Text>
              {'. '}
              {t('login:verification.description2')}
            </Text>
          </Box>

          {/* Code Input */}
          <FieldCodeInput
            ref={codeInputRef}
            name="code"
            mt="md"
            label={t('login:verification.code')}
            required={t('login:verification.required')}
            codeLength={6}
            onValueChange={(code) => {
              if (code?.length === 6) {
                codeForm.submit();
              }
            }}
          />
          <Text
            fontSize="sm"
            color="neutral.600"
            _dark={{
              color: 'neutral.300',
            }}
            mb="md"
          >
            {t('login:verification.expires')}
          </Text>
          {/* Confirm button */}
          <Button
            mt="lg"
            variant="@primary"
            size="lg"
            isLoading={codeForm.isValidating}
            onPress={() => codeForm.submit()}
          >
            {t('login:verification.confirm')}
          </Button>

          {/* Dev-mode Card */}
          {process.env.MODE === 'DEV' && (
            <CardInfoAuthStep type="code" mt="16" />
          )}
        </Formiz>
      </Content>
    </Container>
  );
};

export default VerifyPage;
