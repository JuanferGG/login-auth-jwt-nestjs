// TODO Context
import { useUserStore } from "../../hooks/useUserStore";

// TODO Components
import SubMenuProfile from "./SubMenuProfile";
import { Link } from "react-router-dom";

// TODO Icon's
import { BiMenu } from "react-icons/bi";
import logoVite from "../../assets/react.svg";

// TODO Rutas por rol
const menuRoutes = {
  admin: [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
  ],
  user: [
    { path: "/", label: "Inicio" },
    { path: "/profile", label: "Perfil" },
  ],
};

export default function HeaderComponent() {
  const { user } = useUserStore();
  const userRole = user?.role || "user";

  return (
    <header className="w-full md:w-[90vw] px-2 py-2 flex justify-between bg-white rounded-b-xl fixed top-0 left-0 right-0 mx-auto z-50 shadow-2xl">
      <div className="flex items-center">
        <BiMenu className="block sm:hidden text-2xl" />
        <Link to={"/"} className="hidden sm:block">
          <img src={logoVite} alt="logo_vite"></img>
        </Link>
        {menuRoutes[userRole as keyof typeof menuRoutes]?.map(
          ({ path, label }: { path: string; label: string }) => {
            return (
              <Link
                key={path}
                to={path}
                className="hidden sm:block text-[#222831] font-semibold px-2 py-2 hover:text-blue-500 transition-all duration-200"
              >
                {label}
              </Link>
            );
          }
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* User Data */}
        <div className="flex gap-2 items-center">
          <img
            src={`${import.meta.env.VITE_BASE_API}${user?.image}`}
            className="w-11 h-11 border-2 border-gray-600 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-[#222831] font-bold text-left">Bienvenido</h3>
            <div className="flex gap-1.5">
              <span className="text-gray-600 font-semibold capitalize truncate w-[12ch]">
                {user?.firstName + " " + user?.lastName}
              </span>
            </div>
          </div>
        </div>
        <SubMenuProfile />
      </div>
    </header>
  );
}
