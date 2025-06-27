import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../Api/users";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    })
}

export const useDeteleUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: (err) => {
            throw err
        }
    })
}