import { ScrollView, ScrollViewProps, ViewProps } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const ViewSafeContent = (props: ViewProps) => {
  return (
    <SafeAreaView
      {...props}
      style={{
        flex: 1,
      }}
    />
  );
};

export const ScrollViewSafeContent = (props: ScrollViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      {...props}
      style={{
        ...insets,
        flex: 1,
        backgroundColor: 'lightgray',
      }}
    />
  );
};
