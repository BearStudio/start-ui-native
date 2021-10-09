import React from 'react';

import {
  Box,
  IToastProps,
  useToast as useToastFromNativeBase,
} from 'native-base';

type StatusType = 'info' | 'warning' | 'error' | 'success';

const statusProps = {
  info: {
    bg: 'primary.600',
  },
  success: {
    bg: 'success.600',
  },
  warning: {
    bg: 'warning.600',
  },
  error: {
    bg: 'error.600',
  },
};

export const useToast = () => {
  const toast = useToastFromNativeBase();

  const show = (
    status: StatusType,
    description: string,
    config?: IToastProps
  ) =>
    toast.show({
      description,
      status,
      render: () => (
        <Box px="2" py="1" rounded="sm" mb={5} {...statusProps[status]}>
          {description}
        </Box>
      ),
      ...(config || {}),
    });

  return {
    showInfo: (description: string, config?: IToastProps) =>
      show('info', description, config),
    showSuccess: (description: string, config?: IToastProps) =>
      show('success', description, config),
    showWarning: (description: string, config?: IToastProps) =>
      show('warning', description, config),
    showError: (description: string, config?: IToastProps) =>
      show('error', description, config),
  };
};
