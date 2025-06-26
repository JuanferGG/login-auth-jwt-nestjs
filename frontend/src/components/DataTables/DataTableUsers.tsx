import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import type { User } from "../../Api/users";
import EditUserModal from "../modals/Users/EditUser";
import DeleteUserModal from "../modals/Users/DeleteUser";

type UserRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function DataTableUsers({ users }: { users: User[] }) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const rows: GridRowsProp = users.map((user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleString(),
  }));

  const handleEdit = (user: UserRow) => {
    setSelectedUser(user);
    setIsOpenEditModal(true);
  };

  const handleDelete = (user: UserRow) => {
    setIsOpenDeleteModal(true)
    setSelectedUser(user)
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "firstName", headerName: "Nombre", width: 150 },
    { field: "lastName", headerName: "Apellido", width: 150 },
    { field: "email", headerName: "Correo", width: 230 },
    { field: "role", headerName: "Rol", width: 120 },
    { field: "createdAt", headerName: "Fecha de Registro", width: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center justify-center flex-wrap h-full gap-2 w-full">
          <button
            className="cursor-pointer px-2 bg-green-500 font-semibold rounded-md h-[40px] text-white flex items-center"
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </button>
          <button
            className="cursor-pointer px-2 bg-red-500 font-semibold rounded-md h-[40px] text-white flex items-center"
            onClick={() => handleDelete(params.row)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          sx={{ backgroundColor: "white", borderRadius: 2 }}
        />
      </div>

      <EditUserModal
        IsOpenView={isOpenEditModal}
        setOpenView={setIsOpenEditModal}
        user={selectedUser}
      />
      <DeleteUserModal 
        IsOpenView={isOpenDeleteModal}
        setOpenView={setIsOpenDeleteModal}
        user={selectedUser}
      />
    </>
  );
}
