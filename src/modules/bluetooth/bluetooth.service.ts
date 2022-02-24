import { PermissionsAndroid, Platform } from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  Service,
} from 'react-native-ble-plx';

/**
 * Check permissions related to location
 * [Android only]
 * @returns A promise resolving to a boolean or a string meaning if the user has the permissions or not
 */
export const checkPermissionsAndroid = (): Promise<boolean | String> => {
  return new Promise((resolv, reject) => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((result) => {
        if (result) {
          resolv(result);
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          )
            .then((result) => {
              resolv(result);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    }
  });
};

/**
 * Scan every devices with Bluetooth around of you.
 * You need to check permissions related to location before to use it.
 * @params bleManager The unique instance of Bluetooth
 * @params deviceName The name of the device that you want to find
 * @returns A promise which contains the Device object of the targeted device.
 */
export const scanDevices = async (
  bleManager: BleManager,
  deviceName: string
): Promise<Device | null> => {
  return new Promise((resolv, reject) => {
    bleManager.startDeviceScan(
      null,
      null,
      (error: BleError, device: Device) => {
        if (error) {
          bleManager.stopDeviceScan();
          reject(error);
        }
        if (device && device.name && device.name.startsWith(deviceName)) {
          bleManager.stopDeviceScan();
          resolv(device);
        }
      }
    );
  });
};

/**
 * Allow you to connect to a given device
 * @params bleManager The unique instance of Bluetooth
 * @params device The targeted device
 * @returns A promise which contains the Device object of the targeted device.
 */
export const connectToDevice = (
  bleManager: BleManager,
  device: Device
): Promise<boolean | null> => {
  return new Promise((resolv, reject) => {
    bleManager
      .connectToDevice(device.id, {})
      .then(() => {
        resolv(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Allow you to disconnect to a given device
 * @params bleManager The unique instance of Bluetooth
 * @params device The targeted device
 * @returns A promise which contains either a boolean to know if we disconnected the device or not, either a BleError.
 */
export const disconnectDevice = (
  bleManager: BleManager,
  device: Device
): Promise<boolean | BleError> => {
  return new Promise((resolv, reject) => {
    bleManager
      .cancelDeviceConnection(device.id)
      .then(() => {
        resolv(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Allow you to retrieve every accessible services of the given device.
 * You need to be connected to this device to get data.
 * @params device The targeted device
 * @returns A promise with a list of Service object
 */
export const getServices = async (device: Device): Promise<Service[]> => {
  const isConnected = await device.isConnected();
  if (!isConnected) {
    return;
  }

  await device.discoverAllServicesAndCharacteristics();
  const devices = await device.services();

  return devices;
};

/**
 * Allow you to retrieve every accessible services of the given device.
 * You need to be connected to this device to get data.
 * @params device The targeted device
 * @params device The targeted service
 * @returns A promise with a list of Service object
 */
export const getCharacteristics = async (
  device: Device,
  service: Service
): Promise<Characteristic[]> => {
  const isConnected = await isConnectedDevice(device);
  if (!isConnected) {
    return;
  }

  const characteristics = await device.characteristicsForService(service.uuid);

  return characteristics;
};

// This method is just wrapping the isConnected method of Bluetooth library
// Don't hesitate to update this method if you want a custom logic
/**
 * Allow you to know if the given device is connected or not
 * @params device The targeted device
 * @returns A promise which contains a boolean to know if the given device is connected.
 */
export const isConnectedDevice = async (device: Device): Promise<boolean> => {
  try {
    const isConnected = await device.isConnected();
    if (!isConnected) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
