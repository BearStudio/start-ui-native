import Constants from 'expo-constants';
import { Stack } from 'expo-router';

export default function StorybookLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={Constants.expoConfig?.extra?.isStorybook}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
}
