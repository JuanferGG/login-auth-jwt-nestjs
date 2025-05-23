import { useLogout } from "../../hooks/useAuth";
import { NotyfComponent } from "../UI/NotyfComponent";
import { useUserStore } from "../../hooks/useUserStore";

// TODO Icon's
import { BiLogOutCircle } from "react-icons/bi";

export default function HeaderComponent() {
  const { user } = useUserStore();
  const { handleLogout } = useLogout();

  console.log(user);

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
    <header className="w-[90vw] m-auto px-2 py-2 flex justify-between bg-cyan-200/20">
      <div>
        <img src="./vite.svg" alt="logo_vite"></img>
      </div>
      <button onClick={handleLogoutClick} className="cursor-pointer">
        <BiLogOutCircle className="text-4xl text-red-500" />
      </button>
    </header>
  );
}
