import * as Device from 'expo-device';

export const isApple = Device.brand === 'Apple';

export const isAndroid = Device.osName === 'Android';

export const isTablet = Device.deviceType === Device.DeviceType.TABLET;

export const isPhone = Device.deviceType === Device.DeviceType.PHONE;
