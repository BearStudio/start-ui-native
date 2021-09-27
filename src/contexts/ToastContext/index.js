import React, {useRef} from 'react';

import {
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from '../../components/Toasts';

export const ToastContext = React.createContext(null);

export const ToastProvider = ({children}) => {
  const toastErrorRef = useRef(null);
  const toastSuccessRef = useRef(null);
  const toastWarningRef = useRef(null);
  const toastInfoRef = useRef(null);

  const handleShowErrorMessage = (message) => {
    handleShowMessage(toastErrorRef, message);
  };

  const handleShowSuccessMessage = (message) => {
    handleShowMessage(toastSuccessRef, message);
  };

  const handleShowInfoMessage = (message) => {
    handleShowMessage(toastInfoRef, message);
  };

  const handleShowWarningMessage = (message) => {
    handleShowMessage(toastWarningRef, message);
  };

  const handleShowMessage = (ref, message) => {
    if (ref.current) {
      ref.current.show(message);
    }
  };

  return (
    <ToastContext.Provider
      value={{
        showError: handleShowErrorMessage,
        showInfo: handleShowInfoMessage,
        showSuccess: handleShowSuccessMessage,
        showWarning: handleShowWarningMessage,
      }}>
      {children}
      <ToastError ref={toastErrorRef} />
      <ToastSuccess ref={toastSuccessRef} />
      <ToastInfo ref={toastInfoRef} />
      <ToastWarning ref={toastWarningRef} />
    </ToastContext.Provider>
  );
};
