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
  const {
    data: ipV6Address,
    isLoading: isLoadingIpv6Address,
    isError: hasErrorGettingIpV6Address,
  } = useQuery('ipv6Address', () => NetworkInfo.getIPAddress());

  const {
    data: ipV4Address,
    isLoading: isLoadingIpv4Address,
    isError: hasErrorGettingIpV4Address,
  } = useQuery('ipv4Address', () => NetworkInfo.getIPV4Address());

  const {
    data: ssid,
    isLoading: isLoadingSSID,
    isError: hasErrorGettingSSID,
  } = useQuery('ssid', () => NetworkInfo.getSSID());

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
          Adresse IPV6:
          {isLoadingIpv6Address && <ActivityIndicator />}
          {hasErrorGettingIpV6Address && <Text>Une erreur est survenue</Text>}
          {!hasErrorGettingIpV6Address && !isLoadingIpv6Address && (
            <Text>{ipV6Address}</Text>
          )}
        </Text>
        <Text>
          Adresse IPV4:
          {isLoadingIpv4Address && <ActivityIndicator />}
          {hasErrorGettingIpV4Address && <Text>Une erreur est survenue</Text>}
          {!hasErrorGettingIpV4Address && !isLoadingIpv4Address && (
            <Text>{ipV4Address}</Text>
          )}
        </Text>
        <Text>
          SSID:
          {isLoadingSSID && <ActivityIndicator />}
          {hasErrorGettingSSID && <Text>Une erreur est survenue</Text>}
          {!hasErrorGettingSSID && !isLoadingSSID && <Text>{ssid}</Text>}
        </Text>
        <Text>Api URL: {CONFIG.API_URL}</Text>
        <Text>
          Connexion au backend:
          {isLoadingApiTest && <ActivityIndicator />}
          {hasErrorTestingApi && (
            <Text>
              ❌ Non connecté: ${logAxiosErrorAndGet(apiConnectionError)}
            </Text>
          )}
          {!hasErrorTestingApi && !isLoadingApiTest && <Text>✅ Connecté</Text>}
        </Text>
      </Div>
    </ScrollDiv>
  );
};

export default NetworkHelperScreen;
