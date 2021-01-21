import React from 'react';
import {Snackbar, Icon} from 'react-native-magnus';

const DURATION = 4000;

export const ToastSuccess = React.forwardRef(({message}, ref) => (
  <Snackbar
    suffix={<Icon name="checkcircle" color="white" fontFamily="AntDesign" />}
    onDismiss={() => {}}
    ref={ref}
    bg="green700"
    color="white"
    duration={DURATION}>
    {message}
  </Snackbar>
));

export const ToastError = React.forwardRef(({message}, ref) => (
  <Snackbar
    suffix={<Icon name="times-circle" color="white" fontFamily="FontAwesome" />}
    onDismiss={() => {}}
    ref={ref}
    bg="red700"
    color="white"
    duration={DURATION}>
    {message}
  </Snackbar>
));

export const ToastWarning = React.forwardRef(({message}, ref) => (
  <Snackbar
    suffix={<Icon name="warning" color="white" fontFamily="FontAwesome" />}
    onDismiss={() => {}}
    ref={ref}
    bg="yellow700"
    color="white"
    duration={DURATION}>
    {message}
  </Snackbar>
));

export const ToastInfo = React.forwardRef(({message}, ref) => (
  <Snackbar
    suffix={<Icon name="info-circle" color="white" fontFamily="FontAwesome5" />}
    onDismiss={() => {}}
    ref={ref}
    bg="blue700"
    color="white"
    duration={DURATION}>
    {message}
  </Snackbar>
));
