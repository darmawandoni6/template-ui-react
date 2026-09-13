import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { User } from '@/types/auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    set => ({
      user: {
        id: 'usr_1',
        name: 'Doni Darmawan',
        email: 'doni@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        role: 'Administrator',
      },
      isAuthenticated: true,
      setUser: user => set({ user, isAuthenticated: !!user }, false, 'auth/setUser'),
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
        set({ user: null, isAuthenticated: false }, false, 'auth/logout');
      },
    }),
    { name: 'auth-store' },
  ),
);
