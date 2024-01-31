import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { queryClient } from '@/api/query-client';
import { AUTH_STORAGE_KEY } from '@/modules/auth/auth.constants';

type AuthState = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  logout: () => void;
  isHydrated: boolean;
  setIsHydrated: (isHydrated: boolean) => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (newToken: string | null) => {
          set({ token: newToken });
        },
        logout: () => {
          set({ token: null });
          queryClient.clear();
        },
        isHydrated: false,
        setIsHydrated: (isHydrated: boolean) => {
          set({ isHydrated });
        },
      }),
      {
        name: AUTH_STORAGE_KEY,
        storage: createJSONStorage(() => AsyncStorage), // Specifying the storage
        partialize: (state) => ({ token: state.token }), // Persist only the token
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
