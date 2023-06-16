import {
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from '@/components/Toasts';
import React, { PropsWithChildren, useRef } from 'react';
import { Snackbar } from 'react-native-magnus';

export const ToastContext = React.createContext<{
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
}>({
  showError: () => null,
  showInfo: () => null,
  showSuccess: () => null,
  showWarning: () => null,
});

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const toastErrorRef = useRef<Snackbar>(null);
  const toastSuccessRef = useRef<Snackbar>(null);
  const toastWarningRef = useRef<Snackbar>(null);
  const toastInfoRef = useRef<Snackbar>(null);

  const handleShowMessage = (
    ref: React.MutableRefObject<Snackbar | null>,
    message: string
  ) => {
    if (ref.current) {
      ref.current.show(message);
    }
  };

  const handleShowErrorMessage = (message: string) => {
    handleShowMessage(toastErrorRef, message);
  };

  const handleShowSuccessMessage = (message: string) => {
    handleShowMessage(toastSuccessRef, message);
  };

  const handleShowInfoMessage = (message: string) => {
    handleShowMessage(toastInfoRef, message);
  };

  const handleShowWarningMessage = (message: string) => {
    handleShowMessage(toastWarningRef, message);
  };

  return (
    <ToastContext.Provider
      value={{
        showError: handleShowErrorMessage,
        showInfo: handleShowInfoMessage,
        showSuccess: handleShowSuccessMessage,
        showWarning: handleShowWarningMessage,
      }}
    >
      {children}
      <ToastError ref={toastErrorRef} />
      <ToastSuccess ref={toastSuccessRef} />
      <ToastInfo ref={toastInfoRef} />
      <ToastWarning ref={toastWarningRef} />
    </ToastContext.Provider>
  );
};
