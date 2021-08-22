import {StyleSheet} from 'react-native';

const OVERFLOW_MARGIN = 50;

const overflowVisibleTrick = {
  marginLeft: -1 * OVERFLOW_MARGIN,
  paddingLeft: OVERFLOW_MARGIN,
  marginRight: -1 * OVERFLOW_MARGIN,
  paddingRight: OVERFLOW_MARGIN,
  marginTop: -1 * OVERFLOW_MARGIN,
  paddingTop: OVERFLOW_MARGIN,
  marginBottom: -1 * OVERFLOW_MARGIN,
  paddingBottom: OVERFLOW_MARGIN,
};

export const magnusOverflowVisibleTrick = {
  mt: -1 * OVERFLOW_MARGIN,
  mr: -1 * OVERFLOW_MARGIN,
  mb: -1 * OVERFLOW_MARGIN,
  ml: -1 * OVERFLOW_MARGIN,
  pt: OVERFLOW_MARGIN,
  pr: OVERFLOW_MARGIN,
  pb: OVERFLOW_MARGIN,
  pl: OVERFLOW_MARGIN,
};

export const displayStyles = StyleSheet.create({
  overflowVisibleTrick,
});
