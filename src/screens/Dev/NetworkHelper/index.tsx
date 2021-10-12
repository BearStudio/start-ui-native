import React from 'react';

import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import {
  ArrowBackIcon,
  Box,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from 'native-base';
import { ActivityIndicator } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { useQuery } from 'react-query';

import { logAxiosErrorAndGet } from '@/config/axios';
import { CONFIG } from '@/environment/config';

const NetworkHelperScreen = () => {
  const navigation = useNavigation();

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
    <Box bg="white" h="full" p="6">
      <Stack space="lg">
        <HStack alignItems="center" space="xs">
          <IconButton
            ml={-3}
            onPress={() => navigation.goBack()}
            icon={<ArrowBackIcon color="gray.600" size="6" />}
          />
          <Heading>Network helper</Heading>
        </HStack>

        <Stack space="md">
          <Text>
            <Text fontWeight="bold">IPV6 Address: </Text>
            {isLoadingIpv6Address && <ActivityIndicator />}
            {hasErrorGettingIpV6Address && <Text>An error occurred</Text>}
            {!hasErrorGettingIpV6Address && !isLoadingIpv6Address && (
              <Text>{ipV6Address}</Text>
            )}
          </Text>
          <Text>
            <Text fontWeight="bold">IPV4 Address: </Text>
            {isLoadingIpv4Address && <ActivityIndicator />}
            {hasErrorGettingIpV4Address && <Text>An error occurred</Text>}
            {!hasErrorGettingIpV4Address && !isLoadingIpv4Address && (
              <Text>{ipV4Address}</Text>
            )}
          </Text>
          <Text>
            <Text fontWeight="bold">SSID: </Text>
            {isLoadingSSID && <ActivityIndicator />}
            {hasErrorGettingSSID && <Text>An error occurred</Text>}
            {!hasErrorGettingSSID && !isLoadingSSID && <Text>{ssid}</Text>}
          </Text>
          <Text>
            <Text fontWeight="bold">Api URL: </Text>
            {CONFIG.API_URL}
          </Text>
          <Text>
            <Text fontWeight="bold">Backend connected: </Text>
            {isLoadingApiTest && <ActivityIndicator />}
            {hasErrorTestingApi && (
              <Text>
                ❌ Not connected: ${logAxiosErrorAndGet(apiConnectionError)}
              </Text>
            )}
            {!hasErrorTestingApi && !isLoadingApiTest && (
              <Text>✅ Connected</Text>
            )}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NetworkHelperScreen;
