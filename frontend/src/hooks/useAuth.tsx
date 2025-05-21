/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login } from "../Api/auth";
import type { UserLogin } from "../Api/auth";
import { useUserStore } from "./useUserStore";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (userData: UserLogin) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(userData);
      if (response?.data?.user && response?.data?.token) {
        setUser(response.data.user, response.data.token);
      }
      return response;
    } catch (err: any) {
      setError(err)
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};