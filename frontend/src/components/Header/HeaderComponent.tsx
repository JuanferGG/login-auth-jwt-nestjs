// TODO Context
import { useUserStore } from "../../hooks/useUserStore";

// TODO Components

// TODO Icon's
import { Link } from "react-router-dom";
import SubMenuProfile from "./SubMenuProfile";

export default function HeaderComponent() {
  const { user } = useUserStore();


  return (
    <header className="w-[90vw] m-auto px-2 py-2 flex justify-between bg-white rounded-b-xl fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Link to={"/"}>
          <img src="./vite.svg" alt="logo_vite"></img>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {/* User Data */}
        <div className="flex gap-2 items-center">
          <img src={`${import.meta.env.VITE_BASE_API}${user?.image}`} className="w-11 h-11 border-2 border-gray-600 rounded-full" />
          <div className="flex flex-col">
            <h3 className="text-[#222831] font-bold text-left">Bienvenido</h3>
            <div className="flex gap-1.5">
              <span className="text-gray-600 font-semibold">{user?.firstName}</span>
              <span className="text-gray-600 font-semibold">{user?.lastName}</span>
            </div>
          </div>
        </div>
       <SubMenuProfile />
      </div>
    </header>
  );
}
