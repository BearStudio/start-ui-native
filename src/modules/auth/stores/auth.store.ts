import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const SESSION_STORAGE_KEY = 'user-session-storage';

type SessionState = {
  isAuthentificated: boolean;
  isOnboarded: boolean;
  theme: 'light' | 'dark' | 'system';
  setIsAuthentificated: (value: boolean) => void;
  setIsOnboarded: (value: boolean) => void;
  setTheme: (value: 'light' | 'dark' | 'system') => void;
  reset: () => void;
  isHydrated: boolean;
  setIsHydrated: (value: boolean) => void;
};

const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        isAuthentificated: false,
        isOnboarded: false,
        setIsAuthentificated: (value) => set({ isAuthentificated: value }),
        setIsOnboarded: (value) => set({ isOnboarded: value }),
        theme: 'system',
        setTheme: (value) => set({ theme: value }),
        reset: () =>
          set({ isAuthentificated: false, isOnboarded: false, theme: 'light' }),
        isHydrated: false,
        setIsHydrated: (value) => set({ isHydrated: value }),
      }),
      {
        name: SESSION_STORAGE_KEY,
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          isAuthentificated: state.isAuthentificated,
          isOnboarded: state.isOnboarded,
          theme: state.theme,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            console.error('Failed to rehydrate session store:', error);
          }
          state?.setIsHydrated?.(true);
        },
      }
    )
  )
);

export default useSessionStore;
