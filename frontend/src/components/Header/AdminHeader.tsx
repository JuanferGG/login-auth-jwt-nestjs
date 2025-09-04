import { useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";

// TODO Components
import { Link } from "react-router-dom";
import { menuRoutes } from "./Routes";
// TODO Icon's
import logoVite from "../../assets/react.svg";
import { BiChevronLeft } from "react-icons/bi";

// TODO Rutas admin
const adminRoutes = menuRoutes.admin;

export default function AdminHeader() {
  const { user } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      {/* //! Overlay */}
      {!isCollapsed && (
        <div
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 ${
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

        {/* //! Navegación */}
        <nav className="flex-1 p-4">
          <span
            className={`text-sm font-medium text-gray-500 uppercase transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Menu
          </span>
          <div className="mt-3 flex flex-col gap-1">
            {adminRoutes.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "gap-3"
                } px-3 py-2 rounded-lg text-gray-700 font-medium 
                hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group relative`}
              >
                {/* //! Indicador lateral en hover */}
                <span
                  className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 
                group-hover:opacity-100 transition-all duration-200"
                ></span>

                {/* //! Circulito inicial */}
                <span
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 
                text-blue-600 font-bold rounded-full text-sm"
                >
                  {label.charAt(0)}
                </span>

                {/* //! Texto */}
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
        </nav>

        {/* //! Footer */}
        <footer
          className={`p-4 border-t border-gray-200 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Admin Dashboard
          </p>
        </footer>
      </aside>
    </>
  );
}
