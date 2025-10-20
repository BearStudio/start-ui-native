import { Stack } from 'expo-router';

export default function StorybookLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected
        guard={process.env.EXPO_PUBLIC_ENVIRONMENT === 'storybook'}
      >
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
}
