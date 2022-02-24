import React from 'react';

import { useNavigation } from '@react-navigation/core';
import {
  ArrowBackIcon,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from 'native-base';
import { ActivityIndicator } from 'react-native';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import { useQuery } from 'react-query';

import { useBluetoothContext } from '@/modules/bluetooth/BluetoothContext';
import { PERIPHERAL_IDENTIFIER } from '@/modules/bluetooth/bluetooth.constants';
import {
  checkPermissionsAndroid,
  connectToDevice,
  disconnectDevice,
  scanDevices,
} from '@/modules/bluetooth/bluetooth.service';

import Services from './_partials/Services';

export const BluetoothHelperScreen = () => {
  const navigation = useNavigation();
  const { bleManager } = useBluetoothContext();

  const {
    data: isPermissionChecked,
    isLoading: isLoadingPermissionChecked,
    isError: hasErrorPermissionChecked,
  } = useQuery('permissionChecked', () => checkPermissionsAndroid(), {
    retry: true,
    refetchInterval: 100,
  });

  const {
    data: isBluetoothOn,
    isLoading: isLoadingBluetoothOn,
    isError: hasErrorBluetoothOn,
  } = useQuery('bluetoothStatus', () => BluetoothStatus.state(), {
    retry: true,
    refetchInterval: 100,
  });

  const {
    data: device,
    isLoading: isLoadingDevice,
    isError: hasErrorDevice,
  } = useQuery(
    'deviceScanned',
    () => scanDevices(bleManager, PERIPHERAL_IDENTIFIER),
    {
      retry: true,
    }
  );

  const {
    data: isDeviceConnected,
    isLoading: isLoadingDeviceConnected,
    isError: hasErrorDeviceConnected,
    refetch: refetchConnectToDevice,
  } = useQuery('deviceConnected', () => connectToDevice(bleManager, device), {
    enabled: false,
    retry: true,
  });

  const {
    data: isDeviceDisconnected,
    isLoading: isLoadingDeviceDisconnected,
    isError: hasErrorDeviceDisconnected,
    refetch: refetchDisconnectDevice,
  } = useQuery(
    'deviceDisconnected',
    () => disconnectDevice(bleManager, device),
    {
      enabled: false,
      initialData: false,
    }
  );

  return (
    <Box bg="white" h="full" p="6">
      <Stack space="lg">
        <HStack alignItems="center" space="xs">
          <IconButton
            ml={-3}
            onPress={() => navigation.goBack()}
            icon={<ArrowBackIcon color="gray.600" size="6" />}
          />
          <Heading>Bluetooth helper</Heading>
        </HStack>
        <Stack space="md">
          <Text>
            <Text fontWeight="bold">Permission checked: </Text>
            {isLoadingPermissionChecked && <ActivityIndicator />}
            {hasErrorPermissionChecked && <Text>❌ An error occurred</Text>}
            {!hasErrorPermissionChecked && !isLoadingPermissionChecked && (
              <Text>{isPermissionChecked ? '✅' : '❌'}</Text>
            )}
          </Text>
          <Text>
            <Text fontWeight="bold">Bluetooth activated: </Text>
            {isLoadingBluetoothOn && <ActivityIndicator />}
            {hasErrorBluetoothOn && <Text>❌ An error occurred</Text>}
            {!hasErrorBluetoothOn && !isLoadingBluetoothOn && (
              <Text>{isBluetoothOn ? '✅' : '❌'}</Text>
            )}
          </Text>
          <Text>
            <Text fontWeight="bold">Device scanned: </Text>
            {isLoadingDevice && <ActivityIndicator />}
            {hasErrorDevice && <Text>❌ An error occurred</Text>}
            {!hasErrorDevice && !isLoadingDevice && (
              <>
                <Text>{device && device?.name}</Text>
                <Text>{device ? ' ✅' : ' ❌'}</Text>
              </>
            )}
          </Text>
          {(!isDeviceConnected || isDeviceDisconnected) && device && (
            <Button onPress={() => refetchConnectToDevice()}>
              {!isLoadingDeviceConnected ? (
                'Connect to device'
              ) : (
                <ActivityIndicator />
              )}
            </Button>
          )}
          <Text>
            <Text fontWeight="bold">Device connected: </Text>
            {(isLoadingDeviceConnected || isLoadingDeviceDisconnected) && (
              <ActivityIndicator />
            )}
            {hasErrorDeviceConnected && <Text>❌ An error occurred</Text>}
            {!hasErrorDeviceConnected && !isLoadingDeviceConnected && (
              <Text>
                {isDeviceConnected && !isDeviceDisconnected ? '✅' : '❌'}
              </Text>
            )}
          </Text>
          {isDeviceConnected && !isDeviceDisconnected && (
            <Button
              colorScheme="danger"
              onPress={() => refetchDisconnectDevice()}
            >
              {!isLoadingDeviceDisconnected ? (
                'Disconnect to device'
              ) : (
                <ActivityIndicator />
              )}
            </Button>
          )}
          {hasErrorDeviceDisconnected && (
            <Text>❌ An error occurred while disconnecting</Text>
          )}
        </Stack>
      </Stack>
      {isDeviceConnected && !isDeviceDisconnected && device && (
        <Services device={device} />
      )}
    </Box>
  );
};
