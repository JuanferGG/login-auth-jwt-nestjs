import {
  BiSolidDashboard,
  BiSolidUserDetail,
  BiSolidWasher,
  BiHomeAlt2,
  BiUser,
  BiFoodMenu,
} from "react-icons/bi";

export const menuRoutes = {
  admin: [
    { path: "/admin/dashboard", label: "Dashboard", icon: <BiSolidDashboard /> },
    { path: "/admin/users", label: "Usuarios", icon: <BiSolidUserDetail /> },
    { path: "/admin/profile", label: "Perfil", icon: <BiSolidWasher /> },
  ],
  user: [
    { path: "/", label: "Inicio", icon: <BiHomeAlt2 /> },
    { path: "/profile", label: "Perfil", icon: <BiUser /> },
  ],
  chef: [
    { path: "/chef/menu", label: "Menú", icon: <BiFoodMenu /> },
    { path: "/chef/profile", label: "Perfil", icon: <BiUser /> },
  ],
};
