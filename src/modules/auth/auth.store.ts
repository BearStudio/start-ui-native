// stores/useSessionStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'better-auth';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const SESSION_STORAGE_KEY = 'user-session-storage';
type StoreUser = User & {
  onboardedAt?: Date | null;
};

type SessionState = {
  user: StoreUser | null;
  setUser: (user: StoreUser | null) => void;
  clearUser: () => void;
  isHydrated: boolean;
  setIsHydrated: (value: boolean) => void;
};

const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
        isHydrated: false,
        setIsHydrated: (value) => set({ isHydrated: value }),
      }),
      {
        name: SESSION_STORAGE_KEY,
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          user: state.user,
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
