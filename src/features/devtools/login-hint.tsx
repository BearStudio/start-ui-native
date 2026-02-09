import { useQuery } from '@tanstack/react-query';
import { TerminalIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { api } from '@/lib/hey-api/api';
import { ConfigEnvResponse } from '@/lib/hey-api/generated';
import { useFormContext } from '@/lib/tanstack-form/context';

import { Icon } from '@/components/icons/icon';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

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
      <Card>
        <CardHeader>
          <CardTitle>
            <Icon icon={TerminalIcon} />
            <Text> {env.data?.isDev ? 'Dev mode' : 'Demo mode'}</Text>
          </CardTitle>
        </CardHeader>

        <CardBody className="p-4 pt-0">
          <Text className="font-medium">
            You can login with{' '}
            <Text className="font-bold underline">{mockedEmail}</Text>
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
      <Card>
        <CardHeader>
          <CardTitle>
            <Icon icon={TerminalIcon} />
            <Text> {env.data?.isDev ? 'Dev mode' : 'Demo mode'}</Text>
          </CardTitle>
        </CardHeader>

        <CardBody className="p-4 pt-0">
          <Text className="font-medium">
            Use the code{' '}
            <Text className="font-bold underline">{mockedOtp}</Text>
          </Text>
        </CardBody>
      </Card>
    </Pressable>
  );
};
