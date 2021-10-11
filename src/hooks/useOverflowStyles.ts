import { useToken } from 'native-base';
import { StyleSheet } from 'react-native';

export const useOverflowStyles = (margin = 2) => {
  const [marginValue] = useToken('sizes', [margin]);
  const overflowStyles = {
    marginLeft: -1 * marginValue,
    paddingLeft: marginValue,
    marginRight: -1 * marginValue,
    paddingRight: marginValue,
    marginTop: -1 * marginValue,
    paddingTop: marginValue,
    marginBottom: -1 * marginValue,
    paddingBottom: marginValue,
  };
  const styles = StyleSheet.create({
    overflowStyles,
  });

  return styles.overflowStyles;
};
