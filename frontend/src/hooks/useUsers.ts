/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, updateUser, updateUserMe } from "../Api/users";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false, //? 🔴 evita que se haga al volver a la pestaña
    refetchOnReconnect: true, //? 🔴 evita recargar la data al reconectar
    retry: false, //? 🔴 evita el reintento en caso de error
    staleTime: 1000 * 60 * 5, //? ✅ 5 minutos "frescos"
  });
};

export const useDeteleUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      throw err;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      console.error("Error al actualizar el usuario:", err);
    },
  });
};

export const useUpdateUserMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateUserMe(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      console.error("Error al actualizar el usuario:", err);
    },
  });
};