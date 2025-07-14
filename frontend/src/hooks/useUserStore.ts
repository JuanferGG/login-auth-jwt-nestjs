import { create } from "zustand";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  checkSessionExpiration: () => void;
}

// Constante para 3 horas en milisegundos
const SESSION_DURATION_MS = 3 * 60 * 60 * 1000;

export const useUserStore = create<UserStore>((set) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const storedExpiration = localStorage.getItem("sessionExpiration");

  const isSessionValid =
    storedExpiration && new Date().getTime() < Number(storedExpiration);

  const initialUser = storedUser && isSessionValid ? JSON.parse(storedUser) : null;
  const initialToken = storedToken && isSessionValid ? storedToken : null;
  const initialAuth = !!(initialUser && initialToken);

  // Si la sesión ya expiró, limpiamos el localStorage
  if (!isSessionValid) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpiration");
  }

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: initialAuth,

    setUser: (user, token) => {
      const expirationTime = new Date().getTime() + SESSION_DURATION_MS;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("sessionExpiration", expirationTime.toString());

      set({ user, token, isAuthenticated: true });

      // Opcional: reiniciar timeout cuando se loguea
      setTimeout(() => {
        useUserStore.getState().logout();
      }, SESSION_DURATION_MS);
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("sessionExpiration");
      set({ user: null, token: null, isAuthenticated: false });
    },

    checkSessionExpiration: () => {
      const expiration = localStorage.getItem("sessionExpiration");
      if (expiration && new Date().getTime() >= Number(expiration)) {
        useUserStore.getState().logout();
      }
    },
  };
});
