// TODO Component's
import DataTableUsers from "../../components/DataTables/DataTableUsers";

// TODO Icon's
import { BiSolidUserAccount } from "react-icons/bi";

// TODO Hooks - Api's
import { useGetUsers } from "../../hooks/useUsers";

function Users() {
  const { data: usersData, isLoading, isError, error } = useGetUsers();

  const users = usersData?.data ?? [];

  if (isLoading)
    return (
      <div className="mt-6 m-auto w-[90vw]">
        <h1 className="flex gap-1 font-bold text-[#222831] mb-2 text-5xl"><BiSolidUserAccount/> Usuarios:</h1>
        <p className="text-gray-500">Cargando usuarios...</p>
      </div>
    );

  if (isError) {
    // console.log((error as any)?.response?.data);
    return (
      <div className="mt-6 m-auto w-[90vw]">
        <h1 className="flex gap-1 font-bold text-[#222831] mb-2 text-5xl"><BiSolidUserAccount/> Usuarios:</h1>
        <div className="text-red-600 bg-red-100 p-4 rounded">
          <strong>Error:</strong> {(error as Error).message || "ERROR"} <br />
          Ha ocurrido un error, vuelve a iniciar sesion
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 m-auto w-[90vw]">
      <h1 className="flex gap-1 font-bold text-[#222831] mb-2 text-5xl"><BiSolidUserAccount/> Usuarios:</h1>
      <p className="text-gray-900 text-xl mb-4">
        Estos son todos los usuarios del sistema puedes editar, eliminar y ver sus datos.
      </p>
      <div>
        <DataTableUsers users={users} />
      </div>
    </div>
  );
}

export default Users;
