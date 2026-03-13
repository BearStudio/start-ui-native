import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

export const ThemedStatusBar = () => {
  const { theme } = useUniwind();
  return <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />;
};
