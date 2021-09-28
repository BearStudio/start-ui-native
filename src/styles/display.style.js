import { StyleSheet } from 'react-native';

const OVERFLOW_MARGIN = 50;

// This aims at fixing the bug that make impossible for shadows or anything to be outside a container, like a list.
// A simple "Overflow: visible" isn't working, this is why we extend the element with margins and add padding to keep
// its size
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

// same comment as above
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

const safeArea = {
  flex: 1,
  backgroundColor: 'white',
};

export const displayStyles = StyleSheet.create({
  overflowVisibleTrick,
  safeArea,
});
