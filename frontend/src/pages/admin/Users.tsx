import type { User } from "../../Api/users";
import { useGetUsers } from "../../hooks/useUsers";

function Users() {
  const { data: usersData, isLoading, isError, error } = useGetUsers();

  const users = usersData?.data ?? [];

  if (isLoading)
    return (
      <div className="mt-6 m-auto w-[90vw]">
        <h1 className="font-bold text-[#222831] mb-4 text-4xl">Usuarios:</h1>
        <p className="text-gray-500">Cargando usuarios...</p>
      </div>
    );

  if (isError) {
    // console.log((error as any)?.response?.data);
    return (
      <div className="mt-6 m-auto w-[90vw]">
        <h1 className="font-bold text-[#222831] mb-4 text-4xl">Usuarios:</h1>
        <div className="text-red-600 bg-red-100 p-4 rounded">
          <strong>Error:</strong>{" "}
          {(error as Error).message || "ERROR"} <br/>
          Ha ocurrido un error, vuelve a iniciar sesion
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 m-auto w-[90vw]">
      <h1 className="font-bold text-[#222831] mb-4 text-4xl">Usuarios:</h1>
      <ul>
        {users.map((user : User) => (
          <li key={user._id}>
            {user._id} {user.firstName} {user.lastName} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
