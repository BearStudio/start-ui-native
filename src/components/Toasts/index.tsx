import React from 'react';
import { Snackbar, Icon } from 'react-native-magnus';

const DEFAULT_DURATION = 4000;

export const ToastSuccess = React.forwardRef<Snackbar>((_, ref) => (
  <Snackbar
    ref={ref}
    suffix={<Icon name="checkcircle" color="white" fontFamily="AntDesign" />}
    bg="green700"
    color="white"
    duration={DEFAULT_DURATION}
  />
));

export const ToastError = React.forwardRef<Snackbar>((_, ref) => (
  <Snackbar
    ref={ref}
    suffix={<Icon name="times-circle" color="white" fontFamily="FontAwesome" />}
    bg="red700"
    color="white"
    duration={DEFAULT_DURATION}
  />
));

export const ToastWarning = React.forwardRef<Snackbar>((_, ref) => (
  <Snackbar
    ref={ref}
    suffix={<Icon name="warning" color="white" fontFamily="FontAwesome" />}
    bg="yellow700"
    color="white"
    duration={DEFAULT_DURATION}
  />
));

export const ToastInfo = React.forwardRef<Snackbar>((_, ref) => (
  <Snackbar
    ref={ref}
    suffix={<Icon name="info-circle" color="white" fontFamily="FontAwesome5" />}
    bg="blue700"
    color="white"
    duration={DEFAULT_DURATION}
  />
));
