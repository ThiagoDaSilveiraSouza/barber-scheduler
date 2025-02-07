import { z } from "zod";
import { create } from "zustand";
import { authSchema } from "../schemas";
import { AuthServiceWithToken } from "../services";

type UseAuthStoreProps = {
  isAuthenticated: boolean;
  userData: z.infer<typeof authSchema> | null;
  initializeAuth: () => Promise<void>;
  setIsAuthenticated: (userData?: z.infer<typeof authSchema>) => void;
  logout: () => void;
};

export const useAuthStore = create<UseAuthStoreProps>((set, get) => ({
  isAuthenticated: false,
  userData: null,

  initializeAuth: async () => {
    const localStorageAuthToken = localStorage.getItem("authToken");
    const { isAuthenticated } = get();
    if (!localStorageAuthToken || isAuthenticated) return;

    try {
      const response = await AuthServiceWithToken(localStorageAuthToken);
      if (response.success) {
        const userData: z.infer<typeof authSchema> = {
          username: response.data.userData.username,
          password: response.data.userData.password,
        };
        set({ userData, isAuthenticated: true });
      } else {
        set({ isAuthenticated: false, userData: null });
      }
    } catch (error) {
      console.error("Erro ao inicializar a autenticação:", error);
      set({ isAuthenticated: false, userData: null });
    }
  },

  // Atualiza o estado de autenticação manualmente
  setIsAuthenticated: (userData) =>
    userData
      ? set({ userData, isAuthenticated: true })
      : set({ isAuthenticated: false, userData: null }),
  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, userData: null });
    window.location.href = "/";
  },
}));
