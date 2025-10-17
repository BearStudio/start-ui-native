import { useQuery } from '@tanstack/react-query';
import { TerminalIcon } from 'lucide-react-native';
import { Pressable, Text } from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';
import { ConfigEnvResponse } from '@/lib/hey-api/generated';
import { useFormContext } from '@/lib/tanstack-form/context';

import { Icon } from '@/components/icons/icon';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';

const mockedEmail = 'admin@admin.com';
const mockedOtp = '000000';

const shouldDisplayLoginHints = (configEnv?: ConfigEnvResponse) =>
  configEnv?.isDev || configEnv?.isDemo;

export const LoginEmailHint = () => {
  const env = useQuery(api.configEnvOptions());

  const form = useFormContext();

  if (!shouldDisplayLoginHints(env.data)) {
    return <></>;
  }

  return (
    <Pressable onPress={() => form.setFieldValue('email', mockedEmail)}>
      <Card
        borderColor="neutral.200"
        bg="neutral.50"
        _dark={{ bg: 'neutral.900', borderColor: 'neutral.700' }}
      >
        <CardHeader>
          <CardTitle>
            <Icon
              icon={TerminalIcon}
              color="neutral.800"
              _dark={{ color: 'neutral.200' }}
              size={16}
            />
            <Text> {env.data?.isDev ? 'Dev mode' : 'Demo mode'}</Text>
          </CardTitle>
        </CardHeader>

        <CardBody pt={0}>
          <Text fontWeight="medium">
            You can login with{' '}
            <Text fontWeight="bold" textDecorationLine="underline">
              {mockedEmail}
            </Text>
          </Text>
        </CardBody>
      </Card>
    </Pressable>
  );
};

export const LoginOtpHint = () => {
  const env = useQuery(api.configEnvOptions());

  const form = useFormContext();

  if (!shouldDisplayLoginHints(env.data)) {
    return <></>;
  }

  return (
    <Pressable onPress={() => form.setFieldValue('code', mockedOtp)}>
      <Card
        borderColor="neutral.200"
        bg="neutral.50"
        _dark={{ bg: 'neutral.900', borderColor: 'neutral.700' }}
      >
        <CardHeader>
          <CardTitle>
            <Icon
              icon={TerminalIcon}
              color="neutral.800"
              _dark={{ color: 'neutral.200' }}
              size={16}
            />
            <Text> {env.data?.isDev ? 'Dev mode' : 'Demo mode'}</Text>
          </CardTitle>
        </CardHeader>

        <CardBody pt={0}>
          <Text fontWeight="medium">
            Use the code{' '}
            <Text fontWeight="bold" textDecorationLine="underline">
              {mockedOtp}
            </Text>
          </Text>
        </CardBody>
      </Card>
    </Pressable>
  );
};
