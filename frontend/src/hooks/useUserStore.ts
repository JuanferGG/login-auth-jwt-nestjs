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
}

export const useUserStore = create<UserStore>((set) => {
  // Leer del localStorage al iniciar
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const initialToken = storedToken ? storedToken : null;
  const initialAuth = !!(storedUser && storedToken);

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: initialAuth,
    setUser: (user, token) => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user, token, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});