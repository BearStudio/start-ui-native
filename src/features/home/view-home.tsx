import appConfig from 'app.config';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, HStack, ScrollBox, Stack, Text } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useShare } from '@/hooks/use-share';

import { IconShare2 } from '@/components/icons/generated';

import { MarketingBento } from '@/features/marketing/marketing-bento';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewHome = () => {
  const { t } = useTranslation(['home']);
  const insets = useSafeAreaInsets();

  const share = useShare();

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
          <Button
            size="sm"
            variant="@secondary"
            onPress={() =>
              share.open({
                title: 'Github • Start UI [native]',
                message: appConfig.githubUrl,
              })
            }
            isLoading={share.isPending}
          >
            <IconShare2 width={16} height={16} />
            {t('home:welcome.share')}
          </Button>
        </HStack>
        <MarketingBento />
      </ScrollBox>
    </ViewTabContent>
  );
};
