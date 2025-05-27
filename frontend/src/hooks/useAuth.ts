/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login, logout, register } from "../Api/auth";
import type { UserLogin } from "../Api/auth";
import { useUserStore } from "./useUserStore";
import { useMutation } from "@tanstack/react-query"

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
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      // TODO: redirect to login page
    },
    onError: (err) => {
      throw err;
    }
  })
};

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoutUser = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      logoutUser();
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
