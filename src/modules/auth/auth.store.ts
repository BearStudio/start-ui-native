import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { queryClient } from '@/api/query-client';
import { AUTH_STORAGE_KEY } from '@/modules/auth/auth.constants';

type AuthState = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  appMode: 'light' | 'dark';
  setAppMode: (newAppMode: 'light' | 'dark') => void;
  logout: () => void;
  isHydrated: boolean;
  setIsHydrated: (isHydrated: boolean) => void;
};

// Apperance is a React Native API that allows you to determine if the user prefers a dark or light mode
const DEFAULT_SYSTEM_MODE =
  Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isHydrated: false,
        appMode: DEFAULT_SYSTEM_MODE,
        setAppMode: (newAppMode: 'light' | 'dark') => {
          set({ appMode: newAppMode });
        },
        token: null,
        setIsHydrated: (isHydrated: boolean) => {
          set({ isHydrated });
        },
        setToken: (newToken: string | null) => {
          set({ token: newToken });
        },
        logout: () => {
          set({ token: null });
          queryClient.clear();
        },
      }),
      {
        name: AUTH_STORAGE_KEY,
        storage: createJSONStorage(() => AsyncStorage), // Specifying the storage
        partialize: (state) => ({ token: state.token, appMode: state.appMode }), // Persist only the token and app mode
        onRehydrateStorage: () => (state, error) => {
          // Called when the storage is rehydrated
          if (error) {
            console.error(error);
          }
          state?.setIsHydrated?.(true);
        },
      }
    )
  )
);

export default useAuthStore;
