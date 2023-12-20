import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEY } from '@/modules/auth/auth.constants';
import { queryClient } from '@/api/query-client';

type AuthState = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  logout: () => void;
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
      }),
      {
        name: AUTH_STORAGE_KEY,
        storage: createJSONStorage(() => AsyncStorage), // Specifying the storage
        partialize: (state) => ({ token: state.token }), // Persist only the token
      }
    )
  )
);

export default useAuthStore;
