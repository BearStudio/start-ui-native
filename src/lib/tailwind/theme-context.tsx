import { VariableContextProvider } from 'nativewind';
import React, { createContext, use, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: Readonly<{
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}>) {
  const systemColorScheme = useColorScheme() ?? 'light';

  const [theme, setTheme] = useState<ThemeType>(
    defaultTheme === 'system' ? systemColorScheme : defaultTheme
  );

  console.log({ theme });

  useEffect(() => {
    setTheme(systemColorScheme);
  }, [systemColorScheme]);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <VariableContextProvider
        value={{ '--background': 'var(--color-neutral-700)' }}
      >
        <View style={[{ flex: 1 }]}>{children}</View>
      </VariableContextProvider>
    </ThemeContext>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
