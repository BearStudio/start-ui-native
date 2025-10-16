// app/(public)/storybook/_layout.tsx
import { Stack } from 'expo-router';

export default function StorybookLayout() {
  const devOnly = process.env.EXPO_PUBLIC_ENVIRONMENT === 'development';

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={devOnly}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
}
