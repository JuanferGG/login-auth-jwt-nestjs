import { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown, BiUserCircle } from "react-icons/bi";

interface Route {
  path: string;
  label: string;
  icon: JSX.Element;
}

interface SubMenuRoutesProps {
  routes: Route[];
  title: string;
  icon?: JSX.Element;
  bgColor?: string;
  textColor?: string;
  isCollapsed: boolean;
}

export default function SubMenuRoutes({
  routes,
  title,
  icon = <BiUserCircle />,
  bgColor = "green",
  textColor = "green",
  isCollapsed,
}: SubMenuRoutesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer flex items-center justify-between w-full px-2 py-2 rounded-lg text-gray-700 font-medium
          hover:bg-${bgColor}-50 hover:text-${textColor}-600 transition-all duration-200 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <span
            className={`cursor-pointer w-8 h-8 flex items-center justify-center bg-${bgColor}-100 text-${textColor}-600 rounded-full text-xl`}
          >
            {icon}
          </span>
          {!isCollapsed && <span>{title}</span>}
        </div>

        {!isCollapsed && (
          <BiChevronDown
            className={`text-xl transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Drawer interno de rutas */}
      <div
        className={`flex flex-col gap-1 pl-4 mt-2 overflow-hidden transition-all duration-300 ${
          isOpen && !isCollapsed ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {routes.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 py-2 rounded-lg text-gray-700 font-medium 
              hover:bg-${bgColor}-50 hover:text-${textColor}-600 transition-all duration-200`}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center bg-${bgColor}-100 text-${textColor}-600 rounded-full text-sm`}
            >
              {icon}
            </span>
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
