import { useTranslation } from 'react-i18next';
import { useToast as useFicusToast } from 'react-native-ficus-ui';

export const useToast = () => {
  const toast = useFicusToast();
  const { t } = useTranslation();

  return {
    showError: (message: string) =>
      toast.show({
        type: 'error',
        text1: t('commons:toast.error'),
        text2: message,
        position: 'top',
      }),
    showInfo: (message: string) =>
      toast.show({
        type: 'info',
        text1: t('commons:toast.info'),
        text2: message,
        position: 'top',
      }),
    showSuccess: (message: string) =>
      toast.show({
        type: 'success',
        text1: t('commons:toast.success'),
        text2: message,
        position: 'top',
      }),
    showWarning: (message: string) =>
      toast.show({
        type: 'warning',
        text1: t('commons:toast.warning'),
        text2: message,
        position: 'top',
      }),
  };
};
