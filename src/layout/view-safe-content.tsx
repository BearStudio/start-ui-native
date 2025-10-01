import { ScrollView, ScrollViewProps, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return (
    <ViewSafeContent>
      <ScrollView
        {...props}
        style={{
          flex: 1,
        }}
      />
    </ViewSafeContent>
  );
};
