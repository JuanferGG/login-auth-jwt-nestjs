import { DiAptana } from "react-icons/di";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-2 bg-[#DFD0B8] h-[100vh] w-full items-center justify-center">
      <div className="flex items-center align-middle text-9xl">
        <p className="-rotate-12">4</p>
        <DiAptana className="text-red-400" />
        <p className="rotate-12">4</p>
      </div>
      <h1 className="text-center px-2 font-bold text-xl">
        Algo ha ocurrido mal!{" "}
      </h1>
      <button
          type="submit"
          className="cursor-pointer w-fit px-5 bg-[#2e3237] hover:bg-[#393E46] text-white font-semibold py-2 rounded transition-all duration-200"
          onClick={() => navigate("/")}
        >
          Ir a inicio
        </button>
    </section>
  );
}

export default NotFoundPage;
