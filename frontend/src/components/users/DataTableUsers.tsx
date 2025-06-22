// TODO Component's
import { DataGrid } from "@mui/x-data-grid";

// TODO Type's
import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import type { User } from "../../Api/users";

export default function DataTableUsers({ users }: { users: User[] }) {
  // Transformamos los usuarios en rows válidos para MUI
  const rows: GridRowsProp = users.map((user) => ({
    id: user._id, // ⚠️ "id" es obligatorio
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleString(),
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "firstName", headerName: "Nombre", width: 150 },
    { field: "lastName", headerName: "Apellido", width: 150 },
    { field: "email", headerName: "Correo", width: 230 },
    { field: "role", headerName: "Rol", width: 120 },
    { field: "createdAt", headerName: "Fecha de Registro", width: 200 },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        sx={{ backgroundColor: "white", borderRadius: 2 }}
      />
    </div>
  );
}
