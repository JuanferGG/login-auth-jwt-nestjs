import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../hooks/useUserStore";
import { useLogout } from "../../hooks/useAuth";
import { NotyfComponent } from "../UI/NotyfComponent";
import { menuRoutes } from "./Routes";
import SubMenuRoutes from "./SubMenuRoutes";

//! ICONOS
import logoVite from "../../assets/react.svg";
import { BiChevronLeft, BiLogOutCircle } from "react-icons/bi";

const adminRoutes = menuRoutes.admin;
const userRoutes = menuRoutes.user;

export default function AdminHeader() {
  const { user } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { handleLogout } = useLogout();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      NotyfComponent.success("Sesión Terminada");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* //! Overlay cuando el menú está abierto */}
      {!isCollapsed && (
        <div
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 
        ${
          isCollapsed ? "w-16" : "w-64"
        } flex flex-col transition-all duration-300`}
      >
        {/* //! Botón para colapsar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`cursor-pointer z-50 absolute -right-3 top-6 bg-white rounded-full p-1.5
            shadow-md hover:bg-gray-50 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
        >
          <BiChevronLeft className="text-gray-600 text-xl" />
        </button>

        {/* //! Logo y título */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Link to={"/"}>
            <img src={logoVite} alt="logo_vite" className="w-8 h-8" />
          </Link>
          <h1
            className={`text-xl font-bold text-gray-800 transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
          >
            Admin Panel
          </h1>
        </div>

        {/* //! Perfil de usuario */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.VITE_BASE_API}${user?.image}`}
              className={`border-2 border-gray-600 rounded-full object-cover ${
                isCollapsed ? "w-10 h-10" : "w-12 h-12"
              }`}
              alt="Profile"
            />
            <div
              className={`transition-opacity duration-300 ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              <h3 className="font-semibold text-gray-800">Bienvenido</h3>
              <p className="text-sm text-gray-600 capitalize truncate w-32">
                {user?.firstName + " " + user?.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* //! Navegación principal */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {/* //! ADMIN */}
          <span
            className={`text-sm font-medium text-gray-500 uppercase transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Menu
          </span>
          <div className="mt-3 flex flex-col gap-1">
            {adminRoutes.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "gap-3"
                } py-2 rounded-lg text-gray-700 font-medium 
                  hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group relative`}
              >
                <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-xl">
                  {icon}
                </span>
                <span
                  className={`truncate transition-opacity duration-300 ${
                    isCollapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* //! SUBMENÚ USUARIO */}
          <SubMenuRoutes
            routes={userRoutes}
            title="Func. Usuario"
            isCollapsed={isCollapsed}
            bgColor="green"
            textColor="green"
          />
        </nav>

        {/* //! Logout */}
        <button
          onClick={handleLogoutClick}
          className="cursor-pointer absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 
          px-4 py-2 w-[85%] rounded-lg bg-red-50 text-red-600 font-medium 
        hover:bg-red-100 hover:text-red-700 transition-all duration-200"
        >
          <BiLogOutCircle className="text-xl" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </aside>
    </>
  );
}
