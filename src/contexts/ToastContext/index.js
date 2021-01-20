import React, {useRef, useState} from 'react';
import {
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from '../../components/Toasts';

export const ToastContext = React.createContext(null);

export const ToastProvider = ({children}) => {
  const [currentMessage, setCurrentMessage] = useState(null);

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
    setCurrentMessage(message);
    if (ref.current) {
      ref.current.show();
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
      <ToastError ref={toastErrorRef} message={currentMessage} />
      <ToastSuccess ref={toastSuccessRef} message={currentMessage} />
      <ToastInfo ref={toastInfoRef} message={currentMessage} />
      <ToastWarning ref={toastWarningRef} message={currentMessage} />
    </ToastContext.Provider>
  );
};
