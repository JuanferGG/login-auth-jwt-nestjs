// TODO Context
import { useUserStore } from "../../hooks/useUserStore";
import { useState } from "react";

// TODO Components
import SubMenuProfile from "./SubMenuProfile";
import { Link } from "react-router-dom";

// TODO Icon's
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import logoVite from "../../assets/react.svg";

// TODO Rutas por rol
import { menuRoutes } from "./Routes";

export default function HeaderComponent() {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = user?.role || "user";

  // ✅ Si es admin, solo mostramos Dashboard
  const filteredRoutes =
    userRole === "admin"
      ? menuRoutes[userRole].filter((r) => r.label === "Dashboard")
      : menuRoutes[userRole as keyof typeof menuRoutes];

  return (
    <header className="w-full md:w-[90vw] px-2 py-2 flex justify-between bg-white rounded-b-xl fixed top-0 left-0 right-0 mx-auto z-50 shadow-2xl">
      <div className="flex items-center">
        <BiMenu
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-2xl"
        />
        <Link to={"/"} className="hidden sm:block">
          <img src={logoVite} alt="logo_vite" />
        </Link>

        {/* //! Overlay fondo oscuro */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-gray-700/40 bg-opacity-50 z-40 transition-opacity duration-300"
          ></div>
        )}

        {/* //! NavBar móvil */}
        <aside
          className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 sm:w-0 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 px-1 mt-2 rounded hover:bg-gray-100 sm:hidden"
          >
            <IoClose className="text-3xl" />
          </button>

          <nav className="mt-14 flex flex-col gap-1 px-3 sm:hidden">
            <span className="text-gray-600 text-xl">Menu</span>
            {filteredRoutes?.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-1 py-2 rounded-lg text-gray-700 font-medium 
               hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group relative"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 transition-all duration-200"></span>
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 font-bold rounded-full text-sm">
                  {label.charAt(0)}
                </span>
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* //! Menu header para desktop */}
        {filteredRoutes?.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="hidden sm:block text-[#222831] font-semibold px-2 py-2 hover:text-blue-500 transition-all duration-200"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
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
