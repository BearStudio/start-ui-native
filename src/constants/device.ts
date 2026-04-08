import * as Device from 'expo-device';
import { Dimensions } from 'react-native';

export const deviceScreen =
  Device.deviceType === Device.DeviceType['DESKTOP']
    ? Dimensions.get('window')
    : Dimensions.get('screen');

export const isApple = Device.brand === 'Apple';

export const isAndroid = Device.osName === 'Android';

export const isTablet = Device.deviceType === Device.DeviceType.TABLET;

export const isPhone = Device.deviceType === Device.DeviceType.PHONE;
