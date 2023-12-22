import { useToast as useFicusToast } from 'react-native-ficus-ui';

export const useToast = () => {
  const toast = useFicusToast();
  return {
    showError: (message: string) =>
      toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
      }),
    showInfo: (message: string) =>
      toast.show({
        type: 'info',
        text1: 'Info',
        text2: message,
        position: 'top',
      }),
    showSuccess: (message: string) =>
      toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
        position: 'top',
      }),
    showWarning: (message: string) =>
      toast.show({
        type: 'warning',
        text1: 'Warning',
        text2: message,
        position: 'top',
      }),
  };
};
