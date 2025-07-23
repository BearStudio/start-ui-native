// src/screens/VerifyPage.tsx
import { useEffect, useRef } from 'react';

import { Formiz, useForm } from '@formiz/core';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import {
  Box,
  Button,
  HStack,
  Text,
  TouchableOpacity,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { FieldCodeInput } from '@/components/FieldCodeInput';
import { LucideIcon } from '@/components/LucideIcon';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { HeaderAuth } from '@/layout/HeaderAuth';
import { authClient } from '@/lib/auth-client';
import { CardInfoAuthStep } from '@/modules/auth/CardInfoAuthStep';
import { useToast } from '@/modules/toast/useToast';

export const VerifyPage = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();
  const { t } = useTranslation();
  const { showError, showSuccess } = useToast();

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

  // Optional: resend OTP mutation
  const resend = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      showSuccess(t('login:feedbacks.otpSent'));
    },
    onError: () => {
      showError(t('login:feedbacks.error'));
    },
  });

  const lineColor = useColorModeValue('brand.200', 'brand.600');
  const textColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <Container>
      <HeaderAuth />
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
            colorScheme="brand"
            px={0}
          >
            <LucideIcon icon={ArrowLeft} size={16} />
            {t('login:verification.back')}
          </Button>
          {/* Title */}
          <Text fontSize="2xl" variant="bold" mb="sm">
            {t('login:verification.title')}
          </Text>

          {/* Description */}
          <Text fontSize="sm" variant="medium" color={textColor} mb="lg">
            {t('login:verification.description', { email })}
          </Text>

          {/* Code Input */}
          <FieldCodeInput
            ref={codeInputRef}
            name="code"
            required={t('login:verification.required')}
            codeLength={6}
            onValueChange={(code) => {
              if (code?.length === 6) {
                codeForm.submit();
              }
            }}
          />

          {/* Confirm button */}
          <Button
            mt="lg"
            full
            variant="@primary"
            isLoading={codeForm.isValidating}
            onPress={() => codeForm.submit()}
          >
            {t('login:verification.confirm')}
          </Button>

          {/* Resend / Expiry */}
          <HStack w="100%" alignItems="center" my="xl" spacing="sm">
            <Box flex={1} h={1} bg={lineColor} />
            <TouchableOpacity onPress={() => resend.mutate()}>
              <Text variant="medium" fontSize="sm" color={textColor} px="sm">
                {t('login:verification.resend')}
              </Text>
            </TouchableOpacity>
            <Box flex={1} h={1} bg={lineColor} />
          </HStack>
          <Text fontSize="xs" color={textColor} textAlign="center">
            {t('login:verification.expires')}
          </Text>

          {/* Dev-mode Card */}
          {process.env.MODE === 'DEV' && (
            <CardInfoAuthStep type="code" mt="16" />
          )}
        </Formiz>
      </Content>
    </Container>
  );
};
