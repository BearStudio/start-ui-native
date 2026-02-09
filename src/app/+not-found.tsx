import { Link, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { ViewSafeContent } from '@/layout/view-safe-content';

export default function NotFound() {
  const { t } = useTranslation(['layout']);

  const path = usePathname();

  return (
    <ViewSafeContent>
      <View className="flex-1 gap-4 items-center justify-center">
        <Text className="text-xl">{t('layout:notFound.title')}</Text>
        <View>
          <Link href="/(logged)/(tabs)/home" asChild>
            <Button>{t('layout:notFound.backInSafety')}</Button>
          </Link>
        </View>
        {process.env.NODE_ENV === 'development' && (
          <Text className="text-sm">{path}</Text>
        )}
      </View>
    </ViewSafeContent>
  );
}
