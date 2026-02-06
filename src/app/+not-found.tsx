import { Link, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Center } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

import { ViewSafeContent } from '@/layout/view-safe-content';

export default function NotFound() {
  const { t } = useTranslation(['layout']);

  const path = usePathname();

  return (
    <ViewSafeContent>
      <Center flex={1} gap={16}>
        <Text className="text-xl">{t('layout:notFound.title')}</Text>
        <Box>
          <Link href="/(logged)/(tabs)/home" asChild>
            <Button>{t('layout:notFound.backInSafety')}</Button>
          </Link>
        </Box>
        {process.env.NODE_ENV === 'development' && (
          <Text className="text-sm">{path}</Text>
        )}
      </Center>
    </ViewSafeContent>
  );
}
