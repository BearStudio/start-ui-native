import appConfig from 'app.config';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useShare } from '@/hooks/use-share';

import { IconShare2 } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { MarketingBento } from '@/features/marketing/marketing-bento';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewHome = () => {
  const { t } = useTranslation(['home']);

  const share = useShare();

  return (
    <ViewTabContent>
      <View className="gap-2">
        <Text className="text-xl font-bold text-accent-foreground">
          {t('home:welcome.title')}
        </Text>
        <Text className="font-medium text-muted-foreground">
          {t('home:welcome.description')}
        </Text>
      </View>
      <View className="mt-4 flex flex-row gap-2">
        <Link href={appConfig.githubUrl} asChild>
          <Button size="sm" variant="secondary">
            GitHub
          </Button>
        </Link>
        <Link href={`${appConfig.githubUrl}/issues/new`} asChild>
          <Button size="sm" variant="secondary">
            {t('home:welcome.openIssue')}
          </Button>
        </Link>
        <Button
          size="sm"
          variant="secondary"
          disabled={share.isPending}
          onPress={() =>
            share.open({
              title: 'Github • Start UI [native]',
              message: appConfig.githubUrl,
            })
          }
        >
          <Icon icon={IconShare2} className="text-secondary-foreground" />
          {t('home:welcome.share')}
        </Button>
      </View>
      <MarketingBento />
    </ViewTabContent>
  );
};
