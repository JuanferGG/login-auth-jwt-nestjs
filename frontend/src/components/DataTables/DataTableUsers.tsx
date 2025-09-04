// TODO Libraries
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

// TODO Icon's
import { BiPencil, BiSolidTrash, BiShowAlt } from "react-icons/bi";

// TODO Components
import EditUserModal from "../modals/Users/EditUser";
import DeleteUserModal from "../modals/Users/DeleteUser";

// TODO Types
import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import type { User } from "../../Api/users";
import ShowUserModal from "../modals/Users/ShowUser";
type UserRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
  password: string | null;
  createdAt: string;
};

export default function DataTableUsers({ users }: { users: User[] }) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenShowModal, setisOpenShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const rows: GridRowsProp = users.map((user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    image: user.image,
    password: null,
    createdAt: new Date(user.createdAt).toLocaleString(),
  }));

  const handleEdit = (user: UserRow) => {
    setSelectedUser(user);
    setIsOpenEditModal(true);
  };

  const handleDelete = (user: UserRow) => {
    setIsOpenDeleteModal(true);
    setSelectedUser(user);
  };

  const handleShow = (user: UserRow) => {
    setSelectedUser(user)
    setisOpenShowModal(true)
  }

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
            className="cursor-pointer px-2 bg-blue-500 font-semibold rounded-md h-[40px] text-white flex items-center"
            onClick={() => handleShow(params.row)}
          >
            <BiShowAlt className="text-2xl" />
          </button>
          <button
            className="cursor-pointer px-2 bg-green-500 font-semibold rounded-md h-[40px] text-white flex items-center"
            onClick={() => handleEdit(params.row)}
          >
            <BiPencil className="text-2xl" />
          </button>
          <button
            className="cursor-pointer px-2 bg-red-500 font-semibold rounded-md h-[40px] text-white flex items-center"
            onClick={() => handleDelete(params.row)}
          >
            <BiSolidTrash className="text-2xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="w-full h-[500px]">
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
      <ShowUserModal 
        IsOpenView={isOpenShowModal}
        setOpenView={setisOpenShowModal}
        user={selectedUser}
      />
    </>
  );
}
