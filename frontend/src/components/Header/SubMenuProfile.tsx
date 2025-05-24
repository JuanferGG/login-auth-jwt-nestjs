import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

// TODO Components
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NotyfComponent } from "../UI/NotyfComponent";

// TODO Icon's
import { BiLogOutCircle, BiUser, BiSpreadsheet } from "react-icons/bi";

export default function SubMenuProfile() {
  const { handleLogout } = useLogout();

  const handleLogoutClick = async () => {
    await handleLogout()
      .then(() => {
        NotyfComponent.success("Sesion Terminada");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full cursor-pointer justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 ring-gray-300 ring-inset hover:bg-gray-50">
          {/* // TODO Svg ... */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clipRule="evenodd"
            />
          </svg>
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 
      ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform 
      data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to="/profile"
              className="flex items-center w-full gap-1 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 
            data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <BiUser className="text-xl text-[#222831]" /> Perfil
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/profile"
              className="flex items-center w-full gap-1 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 
            data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <BiSpreadsheet className="text-xl text-[#222831]" /> Acerca de
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full gap-1 cursor-pointer px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 
            data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <BiLogOutCircle className="text-xl text-red-500" /> Cerrar Sesion
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
