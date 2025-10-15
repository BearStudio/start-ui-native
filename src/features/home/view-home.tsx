import appConfig from 'app.config';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, HStack, ScrollBox, Stack, Text } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MarketingBento } from '@/features/marketing/marketing-bento';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewHome = () => {
  const { t } = useTranslation(['home']);
  const insets = useSafeAreaInsets();

  return (
    <ViewTabContent mt={insets.top} gap={16}>
      <ScrollBox flex={1}>
        <Stack gap={8}>
          <Text fontWeight="bold" fontSize="xl">
            {t('home:welcome.title')}
          </Text>
          <Text fontWeight="medium">{t('home:welcome.description')}</Text>
        </Stack>
        <HStack gap={8} mt="md">
          <Link href={appConfig.githubUrl} asChild>
            <Button size="sm" variant="@secondary">
              GitHub
            </Button>
          </Link>
          <Link href={`${appConfig.githubUrl}/issues/new`} asChild>
            <Button size="sm" variant="@secondary">
              {t('home:welcome.openIssue')}
            </Button>
          </Link>
        </HStack>
        <MarketingBento />
      </ScrollBox>
    </ViewTabContent>
  );
};
