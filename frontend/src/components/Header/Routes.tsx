import {
  BiSolidDashboard,
  BiSolidUserDetail,
  BiSolidWasher,
} from "react-icons/bi";

export const menuRoutes = {
  admin: [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <BiSolidDashboard />,
    },
    { path: "/admin/users", label: "Users", icon: <BiSolidUserDetail /> },
    { path: "/profile", label: "Perfil", icon: <BiSolidWasher /> },
  ],
  user: [
    { path: "/", label: "Inicio" },
    { path: "/profile", label: "Perfil" },
  ],
};
