import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { uid, email, name, role: 'user' | 'admin' }
      login: (email, password) => {
        // Mock authentication logic
        if (email === 'admin@hotel.com' && password === 'admin') {
          set({ user: { uid: 'admin-1', email, name: 'Admin', role: 'admin' } });
          return true;
        } else if (password === 'password') {
          set({ user: { uid: `user-${Date.now()}`, email, name: email.split('@')[0], role: 'user' } });
          return true;
        }
        return false;
      },
      signup: (name, email, password) => {
        set({ user: { uid: `user-${Date.now()}`, name, email, role: 'user' } });
        return true;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'hotel-auth-storage',
    }
  )
);
