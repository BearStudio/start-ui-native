import { ComponentProps } from 'react';
import { ficus } from 'react-native-ficus-ui';
import { SafeAreaView } from 'react-native-safe-area-context';

const FicusSafeAreaView = ficus(SafeAreaView);

export const ViewSafeContent = (
  props: ComponentProps<typeof FicusSafeAreaView>
) => {
  return <FicusSafeAreaView flex={1} {...props} />;
};
