import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../Api/users";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    })
}