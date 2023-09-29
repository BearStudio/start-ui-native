import { useToast as useFicusToast } from 'react-native-ficus-ui';

export const useToast = () => {
  const toast = useFicusToast();
  return {
    showError: (message: string) =>
      toast.show({ type: 'error', text1: message, position: 'top' }),
    showInfo: (message: string) => toast.show({ type: 'info', text1: message }),
    showSuccess: (message: string) =>
      toast.show({ type: 'success', text1: message, position: 'top' }),
    showWarning: (message: string) =>
      toast.show({ type: 'warning', text1: message, position: 'top' }),
  };
};
