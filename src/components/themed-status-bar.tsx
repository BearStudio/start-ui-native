import { NavigationBar } from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

export const ThemedStatusBar = () => {
  const { theme } = useUniwind();
  const style = theme === 'dark' ? 'light' : 'dark';

  return (
    <>
      <StatusBar style={style} />
      <NavigationBar style={style} />
    </>
  );
};
