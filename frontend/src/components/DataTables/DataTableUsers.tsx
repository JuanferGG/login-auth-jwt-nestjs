// TODO Libraries
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

// TODO Icon's
import {
  BiPencil,
  BiSolidTrash,
  BiShowAlt,
  BiSearch,
  BiPlus,
  BiRefresh,
} from "react-icons/bi";

// TODO Components
import EditUserModal from "../modals/Users/EditUser";
import DeleteUserModal from "../modals/Users/DeleteUser";
import ShowUserModal from "../modals/Users/ShowUser";
import CreateUserAdmin from "../modals/Users/CreateUserAdmin";

// TODO Types
import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import type { User } from "../../Api/users";

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

export default function DataTableUsers({
  users,
  refetchUsersData,
}: {
  users: User[];
  refetchUsersData: () => void;
}) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenShowModal, setisOpenShowModal] = useState(false);
  const [isOpenCreateAdminModal, setIsOpenCreateAdminModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows: GridRowsProp = filteredUsers.map((user) => ({
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
    setSelectedUser(user);
    setisOpenShowModal(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
      headerClassName: "bg-gray-50",
    },
    {
      field: "firstName",
      headerName: "Nombre",
      width: 150,
      headerClassName: "bg-gray-50",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      width: 150,
      headerClassName: "bg-gray-50",
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
      minWidth: 230,
      headerClassName: "bg-gray-50",
    },
    {
      field: "role",
      headerName: "Rol",
      width: 120,
      headerClassName: "bg-gray-50",
      renderCell: (params) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {params.value}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Fecha de Registro",
      width: 200,
      headerClassName: "bg-gray-50",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 180,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-gray-50",
      renderCell: (params) => (
        <div className="flex items-center justify-center gap-2 h-full">
          <button
            className="cursor-pointer group relative p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-all duration-200 transform hover:scale-110 shadow-sm hover:shadow-md"
            onClick={() => handleShow(params.row)}
            title="Ver detalles"
          >
            <BiShowAlt className="text-xl" />
          </button>
          <button
            className="cursor-pointer group relative p-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white transition-all duration-200 transform hover:scale-110 shadow-sm hover:shadow-md"
            onClick={() => handleEdit(params.row)}
            title="Editar usuario"
          >
            <BiPencil className="text-xl" />
          </button>
          <button
            className="cursor-pointer group relative p-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-white transition-all duration-200 transform hover:scale-110 shadow-sm hover:shadow-md"
            onClick={() => handleDelete(params.row)}
            title="Eliminar usuario"
          >
            <BiSolidTrash className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        {/* Contenedor del input de búsqueda */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border-2 border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
          <BiSearch className="text-2xl text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Botón de agregar */}
        <button
          className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r 
        from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold
        px-5 py-3 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
        >
          <BiPlus className="text-2xl" />
          <span onClick={() => setIsOpenCreateAdminModal(true)}>Nuevo Usuario</span>
        </button>
        <button
          className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 
      hover:from-green-600 hover:to-green-700 text-white font-semibold px-2 py-3 rounded-lg 
        shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
        >
          <BiRefresh onClick={refetchUsersData} className="text-2xl" />
        </button>
      </div>

      <div className="w-full h-[500px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f1f5f9",
              fontSize: "0.875rem",
              padding: "12px 16px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              borderBottom: "2px solid #e2e8f0",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#475569",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "600",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: "#f8fafc",
                transition: "background-color 0.2s ease",
              },
              "&.Mui-selected": {
                backgroundColor: "#eff6ff",
                "&:hover": {
                  backgroundColor: "#dbeafe",
                },
              },
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "2px solid #e2e8f0",
              backgroundColor: "#f8fafc",
              minHeight: "56px",
            },
            "& .MuiTablePagination-root": {
              color: "#475569",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#ffffff",
            },
          }}
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
      <CreateUserAdmin
        IsOpenView={isOpenCreateAdminModal}
        setOpenView={setIsOpenCreateAdminModal}
      />
    </>
  );
}
