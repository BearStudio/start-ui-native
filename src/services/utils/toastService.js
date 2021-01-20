import {useContext} from 'react';
import {ToastContext} from '../../contexts/ToastContext';

export const useToast = () => {
  const {showError, showInfo, showSuccess, showWarning} = useContext(
    ToastContext,
  );

  return {showError, showInfo, showSuccess, showWarning};
};
