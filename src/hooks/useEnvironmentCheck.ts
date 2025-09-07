import { useCallback, useState } from 'react';

// List of required environment variables for  authentication
const REQUIRED_ENV_VARS = [
  'API_URL',
  'OPEN_API_URL',
  'AUTH_BASE_URL',
  'BETTER_AUTH_OPEN_API',
];

export const useEnvironmentCheck = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [missingVariables, setMissingVariables] = useState<string[]>([]);

  const checkEnvironmentVariables = useCallback(() => {
    const missing: string[] = [];

    REQUIRED_ENV_VARS.forEach((envVar) => {
      if (!process.env[envVar] || process.env[envVar] === '') {
        missing.push(envVar);
      }
    });

    setMissingVariables(missing);
    return missing.length === 0;
  }, []);

  const showEnvironmentModal = useCallback(() => {
    const hasAllVariables = checkEnvironmentVariables();
    if (!hasAllVariables) {
      setIsModalVisible(true);
      return false;
    }
    return true;
  }, [checkEnvironmentVariables]);

  const hideEnvironmentModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return {
    isModalVisible,
    missingVariables,
    showEnvironmentModal,
    hideEnvironmentModal,
    checkEnvironmentVariables,
  };
};
