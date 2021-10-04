import React from 'react';

import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { Div, ScrollDiv, Text } from 'react-native-magnus';
import { NetworkInfo } from 'react-native-network-info';
import { useQuery } from 'react-query';

import { BackButton } from '@/components/BackButton';
import { logAxiosErrorAndGet } from '@/config/axios';
import { CONFIG } from '@/environment/config';

const NetworkHelperScreen = () => {
  const { data: ipAddress, isLoading, isError } = useQuery('ipAddress', () =>
    NetworkInfo.getIPAddress()
  );

  const {
    isError: hasErrorTestingApi,
    isLoading: isLoadingApiTest,
    error: apiConnectionError,
  } = useQuery('backendConnection', () => axios.get('/authenticate'));

  return (
    <ScrollDiv p="xl" bg="body">
      <BackButton />
      <Div my="xl">
        <Text fontSize="6xl" color="text">
          📦 Start UI Native
        </Text>
      </Div>

      <Text fontSize="lg" fontWeight="bold">
        Aide réseau
      </Text>
      <Div mt="md">
        <Text>
          Adresse IP:
          {isLoading && <ActivityIndicator />}
          {isError && <Text>Une erreur est survenue</Text>}
          {!isError && !isLoading && <Text>{ipAddress}</Text>}
        </Text>
        <Text>Api URL: {CONFIG.API_URL}</Text>
        <Text>
          Connexion au backend:
          {isLoadingApiTest && <ActivityIndicator />}
          {hasErrorTestingApi && (
            <Text>
              Non connecté: ${logAxiosErrorAndGet(apiConnectionError)}
            </Text>
          )}
          {!hasErrorTestingApi && !isLoadingApiTest && <Text>Connecté</Text>}
        </Text>
      </Div>
    </ScrollDiv>
  );
};

export default NetworkHelperScreen;
