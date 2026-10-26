import * as Updates from 'expo-updates';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, type AppStateStatus, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const logUpdateCheckError = (error: unknown) => {
  console.warn('[expo-updates] checkForUpdateAsync failed', error);
};

export function UpdateBanner() {
  if (__DEV__ || !Updates.isEnabled) {
    return null;
  }

  return <UpdateBannerContent />;
}

function UpdateBannerContent() {
  const { t } = useTranslation(['updates']);
  const insets = useSafeAreaInsets();
  const { isUpdateAvailable, isUpdatePending, isDownloading } =
    Updates.useUpdates();
  const [isApplying, setIsApplying] = useState(false);

  const checkForUpdate = useCallback(() => {
    Updates.checkForUpdateAsync().catch(logUpdateCheckError);
  }, []);

  useEffect(() => {
    if (AppState.currentState === 'active') {
      checkForUpdate();
    }

    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          checkForUpdate();
        }
      }
    );

    return () => subscription.remove();
  }, [checkForUpdate]);

  const showBanner = isUpdateAvailable || isUpdatePending;
  if (!showBanner) {
    return null;
  }

  const isLoading = isDownloading || isApplying;

  const handlePress = async () => {
    try {
      setIsApplying(true);
      if (isUpdatePending) {
        await Updates.reloadAsync();
        return;
      }
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.warn('[expo-updates] apply update failed', error);
    } finally {
      setIsApplying(false);
    }
  };

  const actionLabel = isUpdatePending
    ? t('updates:banner.reload')
    : isLoading
      ? t('updates:banner.downloading')
      : t('updates:banner.update');

  return (
    <View
      className="border-border bg-card absolute inset-x-0 z-50 flex-row items-center justify-between gap-3 border-b px-4 py-2.5 shadow-sm"
      style={{ top: insets.top }}
      pointerEvents="box-none"
    >
      <Text className="flex-1 text-sm">{t('updates:banner.message')}</Text>
      <Button
        size="sm"
        variant="default"
        disabled={isLoading}
        onPress={handlePress}
      >
        {actionLabel}
      </Button>
    </View>
  );
}
