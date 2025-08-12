import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  totalBudget: number | null;
  login: () => void;
  logout: () => void;
  setUserBudget: (value: number) => void;
  getUserBudget: () => number | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  totalBudget: null,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setUserBudget: (value) => set({ totalBudget: value }),
  getUserBudget: () => get().totalBudget,
}));


